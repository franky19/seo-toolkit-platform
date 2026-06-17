import { NextRequest, NextResponse } from 'next/server';
import { WebCrawler } from '@/services/crawler';
import { SEOAnalyzer } from '@/services/analyzer';
import { RecommendationEngine } from '@/lib/recommendation-engine';
import { calculateOverallScore, normalizeUrl } from '@/lib/utils';
import { AuditReport } from '@/types';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Normalize URL
    let normalizedUrl: string;
    try {
      normalizedUrl = normalizeUrl(url);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Basic SSRF guard: block localhost / private IP targets (does not prevent DNS rebinding)
    const host = new URL(normalizedUrl).hostname.toLowerCase();
    const isIpv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
    const isPrivateIpv4 =
      isIpv4 &&
      (host.startsWith('10.') ||
        host.startsWith('192.168.') ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
        host.startsWith('127.') ||
        host === '169.254.169.254');

    if (host === 'localhost' || host.endsWith('.localhost') || host === '::1' || isPrivateIpv4) {
      return NextResponse.json({ error: 'URL hostname is not allowed' }, { status: 400 });
    }

    // Crawl the website
    let crawlResult;
    try {
      crawlResult = await WebCrawler.crawl(normalizedUrl);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to crawl website';
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
      seoAudit.meta.status === 'PASS' ? 100 : seoAudit.meta.status === 'WARNING' ? 60 : 20,
      seoAudit.technical.status === 'PASS' ? 100 : seoAudit.technical.status === 'WARNING' ? 60 : 20,
      seoAudit.social.status === 'PASS' ? 100 : seoAudit.social.status === 'WARNING' ? 60 : 20,
      seoAudit.indexability.status === 'PASS' ? 100 : seoAudit.indexability.status === 'WARNING' ? 60 : 20,
    ];
    seoAudit.score = Math.round(seoScores.reduce((a, b) => a + b, 0) / seoScores.length);
    // Analyze sitemap (async)
    let sitemapValidation;
    try {
      const baseUrl = new URL(finalUrl);
      sitemapValidation = await SEOAnalyzer.analyzeSitemap(baseUrl.origin);
    } catch (error) {
      sitemapValidation = {
        status: 'ERROR' as const,
        sitemaps: [],
        xmlFiles: [],
        issues: ['Failed to check sitemap'],
        score: 0,
      };
    }

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

    return NextResponse.json(auditReport);
  } catch (error: unknown) {
    console.error('Audit error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
