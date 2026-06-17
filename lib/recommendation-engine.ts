import {
  AuditReport,
  Recommendation,
  SEOAuditResult,
  GoogleNewsAuditResult,
  SchemaValidationResult,
  SitemapValidationResult,
  AISearchAuditResult,
} from '@/types';

export class RecommendationEngine {
  static generate(auditReport: Omit<AuditReport, 'recommendations'>): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // SEO Audit Recommendations
    recommendations.push(...this.generateSEORecommendations(auditReport.seoAudit));

    // Google News Recommendations
    recommendations.push(...this.generateGoogleNewsRecommendations(auditReport.googleNewsAudit));

    // Schema Recommendations
    recommendations.push(...this.generateSchemaRecommendations(auditReport.schemaValidation));

    // Sitemap Recommendations
    recommendations.push(...this.generateSitemapRecommendations(auditReport.sitemapValidation));

    // AI Search Recommendations
    recommendations.push(...this.generateAISearchRecommendations(auditReport.aiSearchAudit));

    // Sort by priority
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return recommendations;
  }

  private static generateSEORecommendations(seoAudit: SEOAuditResult): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Meta recommendations
    if (!seoAudit.meta.data.title) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Add Title Tag',
        description: 'Your page is missing a title tag, which is crucial for SEO.',
        impact: 'Very High',
        action: 'Add a <title> tag in your HTML <head> section with a descriptive, keyword-rich title (30-60 characters).',
      });
    }

    if (!seoAudit.meta.data.description) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Add Meta Description',
        description: 'Meta description helps improve click-through rates from search results.',
        impact: 'High',
        action: 'Add <meta name="description" content="..."> with a compelling description (120-160 characters).',
      });
    }

    if (!seoAudit.meta.data.canonical) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Add Canonical URL',
        description: 'Canonical tags prevent duplicate content issues.',
        impact: 'Medium',
        action: 'Add <link rel="canonical" href="..."> to specify the preferred URL for this page.',
      });
    }

    // Social recommendations
    if (!seoAudit.social.openGraph.title || !seoAudit.social.openGraph.image) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Complete Open Graph Tags',
        description: 'Improve how your content appears when shared on social media.',
        impact: 'Medium',
        action: 'Add og:title, og:description, og:image, and og:url meta tags.',
      });
    }

    if (!seoAudit.social.twitterCard.card) {
      recommendations.push({
        priority: 'LOW',
        title: 'Add Twitter Card Tags',
        description: 'Enhance how your content appears on Twitter/X.',
        impact: 'Low',
        action: 'Add twitter:card, twitter:title, twitter:description, and twitter:image meta tags.',
      });
    }

    return recommendations;
  }

  private static generateGoogleNewsRecommendations(googleNewsAudit: GoogleNewsAuditResult): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (!googleNewsAudit.hasNewsArticleSchema) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Add NewsArticle Schema',
        description: 'NewsArticle schema is required for Google News indexing.',
        impact: 'Very High',
        action: 'Add JSON-LD structured data with @type: "NewsArticle" including headline, author, datePublished, and image.',
      });
    }

    if (!googleNewsAudit.author) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Add Author Information',
        description: 'Author attribution is crucial for Google News.',
        impact: 'Very High',
        action: 'Include author information in your NewsArticle schema and visible on the page.',
      });
    }

    if (!googleNewsAudit.publisher) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Add Publisher Information',
        description: 'Publisher data helps Google identify your news organization.',
        impact: 'High',
        action: 'Add publisher information with name and logo in your NewsArticle schema.',
      });
    }

    if (!googleNewsAudit.datePublished) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Add Publication Date',
        description: 'Publication date is required for news content.',
        impact: 'Very High',
        action: 'Include datePublished in ISO 8601 format in your NewsArticle schema.',
      });
    }

    if (!googleNewsAudit.featuredImage) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Add Featured Image',
        description: 'Images improve visibility in Google News.',
        impact: 'Medium',
        action: 'Add a high-quality featured image (minimum 1200x675px) to your article.',
      });
    }

    if (googleNewsAudit.headlineLength && (googleNewsAudit.headlineLength < 10 || googleNewsAudit.headlineLength > 110)) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Optimize Headline Length',
        description: 'Google News prefers headlines between 10-110 characters.',
        impact: 'Medium',
        action: `Your headline is ${googleNewsAudit.headlineLength} characters. Adjust it to 10-110 characters for optimal display.`,
      });
    }

    return recommendations;
  }

  private static generateSchemaRecommendations(schemaValidation: SchemaValidationResult): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (!schemaValidation.hasOrganization) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Add Organization Schema',
        description: 'Organization schema helps establish your brand identity.',
        impact: 'High',
        action: 'Add JSON-LD with @type: "Organization" including name, url, logo, and social media profiles.',
      });
    }

    if (!schemaValidation.hasArticle && !schemaValidation.hasNewsArticle) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Add Article Schema',
        description: 'Article schema helps search engines understand your content type.',
        impact: 'Medium',
        action: 'Add JSON-LD with @type: "Article" or "NewsArticle" for your content pages.',
      });
    }

    if (!schemaValidation.hasWebsite) {
      recommendations.push({
        priority: 'LOW',
        title: 'Add Website Schema',
        description: 'Website schema helps with site search features.',
        impact: 'Low',
        action: 'Add JSON-LD with @type: "WebSite" including name, url, and potentialAction for search.',
      });
    }

    if (!schemaValidation.hasBreadcrumb) {
      recommendations.push({
        priority: 'LOW',
        title: 'Add Breadcrumb Schema',
        description: 'Breadcrumbs improve navigation in search results.',
        impact: 'Low',
        action: 'Add JSON-LD with @type: "BreadcrumbList" showing your site hierarchy.',
      });
    }

    return recommendations;
  }

  private static generateSitemapRecommendations(sitemapValidation: SitemapValidationResult): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (sitemapValidation.sitemaps.length === 0) {
      recommendations.push({
        priority: 'HIGH',
        title: 'Create XML Sitemap',
        description: 'XML sitemaps help search engines discover your content.',
        impact: 'High',
        action: 'Create a sitemap.xml file listing all your important pages and submit it to Google Search Console.',
      });
    }

    if (!sitemapValidation.newsSitemap) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Create News Sitemap',
        description: 'News sitemaps are essential for Google News indexing.',
        impact: 'Medium',
        action: 'Create a news-sitemap.xml file for your news articles following Google News sitemap specifications.',
      });
    }

    return recommendations;
  }

  private static generateAISearchRecommendations(aiSearchAudit: AISearchAuditResult): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (!aiSearchAudit.hasFAQSchema) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Add FAQ Schema',
        description: 'FAQ schema helps AI assistants understand and cite your content.',
        impact: 'Medium',
        action: 'Add JSON-LD with @type: "FAQPage" for pages with question-answer content.',
      });
    }

    if (!aiSearchAudit.hasAuthorSchema) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Add Author Schema',
        description: 'Author information improves E-E-A-T signals for AI search.',
        impact: 'Medium',
        action: 'Include detailed author information with @type: "Person" schema including expertise and credentials.',
      });
    }

    if (!aiSearchAudit.hasLlmsTxt) {
      recommendations.push({
        priority: 'LOW',
        title: 'Create /llms.txt File',
        description: 'llms.txt helps AI language models understand your site.',
        impact: 'Low',
        action: 'Create /llms.txt file with structured information about your site, features, and content.',
      });
    }

    if (!aiSearchAudit.hasAiTxt) {
      recommendations.push({
        priority: 'LOW',
        title: 'Create /ai.txt File',
        description: 'ai.txt provides AI-specific metadata about your site.',
        impact: 'Low',
        action: 'Create /ai.txt file with AI-friendly site documentation and usage guidelines.',
      });
    }

    if (aiSearchAudit.schemaCompleteness < 70) {
      recommendations.push({
        priority: 'MEDIUM',
        title: 'Improve Schema Completeness',
        description: 'More comprehensive structured data helps AI understand your content better.',
        impact: 'Medium',
        action: `Your schema completeness is ${aiSearchAudit.schemaCompleteness}%. Add more relevant schema types to improve AI understanding.`,
      });
    }

    return recommendations;
  }
}
