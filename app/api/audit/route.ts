import { NextRequest, NextResponse } from 'next/server';
import { WebCrawler } from '@/services/crawler';
import { SEOAnalyzer } from '@/services/analyzer';
import { RecommendationEngine } from '@/lib/recommendation-engine';
import { calculateOverallScore, normalizeUrl } from '@/lib/utils';
import { getErrorMessage } from '@/lib/type-guards';
import { QuotaManager } from '@/lib/quota-manager';
import { AuditReport } from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 30;

function statusToScore(status: 'PASS' | 'WARNING' | 'ERROR'): number {
  if (status === 'PASS') return 100;
  if (status === 'WARNING') return 60;
  return 20;
}

function normalizeInputUrl(url: string): { ok: true; value: string } | { ok: false } {
  try {
    return { ok: true, value: normalizeUrl(url) };
  } catch {
    return { ok: false };
  }
}

function isBlockedHost(normalizedUrl: string): boolean {
  const host = new URL(normalizedUrl).hostname.toLowerCase();
  const isIpv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
  const cloudMetadataIpv4 = '169.254.169.' + '254';
  const isPrivateIpv4 =
    isIpv4 &&
    (host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
      host.startsWith('127.') ||
      // AWS IMDS endpoint is blocked intentionally to prevent metadata access.
      host === cloudMetadataIpv4);

  return host === 'localhost' || host.endsWith('.localhost') || host === '::1' || isPrivateIpv4;
}

async function safeAnalyzeSitemap(finalUrl: string) {
  try {
    const baseUrl = new URL(finalUrl);
    return await SEOAnalyzer.analyzeSitemap(baseUrl.origin);
  } catch {
    return {
      status: 'ERROR' as const,
      sitemaps: [],
      xmlFiles: [],
      issues: ['Failed to check sitemap'],
      score: 0,
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const quota = QuotaManager.consume(request);
    if (!quota.allowed) {
      const blocked = NextResponse.json(
        {
          error: 'Daily limit reached. Please try again tomorrow.',
          quota: quota.payload,
        },
        { status: 429 }
      );
      QuotaManager.attachAnonymousCookie(blocked, quota.anonIdToSet);
      return blocked;
    }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const normalizedResult = normalizeInputUrl(url);
    if (!normalizedResult.ok) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }
    const normalizedUrl = normalizedResult.value;

    // Basic SSRF guard: block localhost / private IP targets (does not prevent DNS rebinding)
    if (isBlockedHost(normalizedUrl)) {
      return NextResponse.json({ error: 'URL hostname is not allowed' }, { status: 400 });
    }

    // Crawl the website
    let crawlResult;
    try {
      crawlResult = await WebCrawler.crawl(normalizedUrl);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Failed to crawl website');
      return NextResponse.json(
        { error: `Failed to crawl website: ${errorMessage}` },
        { status: 500 }
      );
    }

    const { $, url: finalUrl, statusCode } = crawlResult;

    if (statusCode >= 400) {
      return NextResponse.json(
        { error: `Target responded with HTTP ${statusCode}` },
        { status: 400 }
      );
    }
    // Perform audits
    const seoAudit = SEOAnalyzer.analyzeSEO($, finalUrl);
    const googleNewsAudit = SEOAnalyzer.analyzeGoogleNews($);
    const schemaValidation = SEOAnalyzer.analyzeSchema($);

    // Enrich technical SEO with real robots.txt / sitemap checks
    const origin = new URL(finalUrl).origin;
    const [robotsTxt, sitemap] = await Promise.all([
      WebCrawler.checkResource(`${origin}/robots.txt`),
      WebCrawler.checkResource(`${origin}/sitemap.xml`),
    ]);

    seoAudit.technical.robotsTxt = robotsTxt;
    seoAudit.technical.sitemap = sitemap;
    if (!robotsTxt) seoAudit.technical.issues.push('robots.txt not found');
    if (!sitemap) seoAudit.technical.issues.push('sitemap.xml not found');
    seoAudit.technical.status = seoAudit.technical.issues.length > 0 ? 'WARNING' : 'PASS';

    // Recompute SEO score since technical status may have changed
    const seoScores = [
      statusToScore(seoAudit.meta.status),
      statusToScore(seoAudit.technical.status),
      statusToScore(seoAudit.social.status),
      statusToScore(seoAudit.indexability.status),
    ];
    seoAudit.score = Math.round(seoScores.reduce((a, b) => a + b, 0) / seoScores.length);
    const sitemapValidation = await safeAnalyzeSitemap(finalUrl);

    // Check for llms.txt and ai.txt
    const baseUrl = new URL(finalUrl).origin;
    const hasLlmsTxt = await WebCrawler.checkResource(`${baseUrl}/llms.txt`);
    const hasAiTxt = await WebCrawler.checkResource(`${baseUrl}/ai.txt`);

    const aiSearchAudit = {
      ...SEOAnalyzer.analyzeAISearch($, schemaValidation),
      hasLlmsTxt,
      hasAiTxt,
    };

    // Calculate scores
    const technicalSEOScore = seoAudit.score;
    const schemaScore = schemaValidation.score;
    const googleNewsScore = googleNewsAudit.score;
    const aiSearchScore = aiSearchAudit.score;

    const overallScore = calculateOverallScore({
      technicalSEO: technicalSEOScore,
      schema: schemaScore,
      googleNews: googleNewsScore,
      aiSearch: aiSearchScore,
    });

    // Generate audit report (without recommendations first)
    const auditReportWithoutRecommendations = {
      url: finalUrl,
      timestamp: new Date().toISOString(),
      seoAudit,
      googleNewsAudit,
      schemaValidation,
      sitemapValidation,
      aiSearchAudit,
      overallScore,
      technicalSEOScore,
      schemaScore,
      googleNewsScore,
      aiSearchScore,
    };

    // Generate recommendations
    const recommendations = RecommendationEngine.generate(auditReportWithoutRecommendations);

    // Final audit report
    const auditReport: AuditReport = {
      ...auditReportWithoutRecommendations,
      recommendations,
    };

    const response = NextResponse.json({ ...auditReport, quota: quota.payload });
    QuotaManager.attachAnonymousCookie(response, quota.anonIdToSet);
    return response;
  } catch (error: unknown) {
    console.error('Audit error:', error);
    const errorMessage = getErrorMessage(error, 'Internal server error');
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
