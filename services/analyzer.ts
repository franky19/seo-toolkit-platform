/** @format */

import { CheerioAPI } from "cheerio";
import {
  SEOAuditResult,
  GoogleNewsAuditResult,
  SchemaValidationResult,
  SitemapValidationResult,
  AISearchAuditResult,
  AuditStatus,
  SchemaOrgData,
} from "@/types";
import {
  getSchemaTextValue,
  getSchemaUrlValue,
  hasSchemaProperty,
  isJsonLdItem,
  isString,
  parseJsonLdTypes,
} from "@/lib/type-guards";
import { WebCrawler } from "./crawler";

export class SEOAnalyzer {
  static analyzeSEO($: CheerioAPI, url: string): SEOAuditResult {
    const meta = this.analyzeMeta($);
    const technical = this.analyzeTechnical($, url);
    const social = this.analyzeSocial($);
    const indexability = this.analyzeIndexability($);

    const scores = [
      meta.status === "PASS" ? 100 : meta.status === "WARNING" ? 60 : 20,
      technical.status === "PASS"
        ? 100
        : technical.status === "WARNING"
          ? 60
          : 20,
      social.status === "PASS" ? 100 : social.status === "WARNING" ? 60 : 20,
      indexability.status === "PASS"
        ? 100
        : indexability.status === "WARNING"
          ? 60
          : 20,
    ];

    const score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return {
      meta,
      technical,
      social,
      indexability,
      score,
      status: score >= 80 ? "PASS" : score >= 50 ? "WARNING" : "ERROR",
    };
  }

  private static analyzeMeta($: CheerioAPI): SEOAuditResult["meta"] {
    const title = $("title").text().trim() || "";
    const h1 = $("h1").first().text().trim() || "";
    const description =
      $('meta[name="description"]').attr("content")?.trim() || "";
    const canonical = $('link[rel="canonical"]').attr("href")?.trim() || "";
    const robots = $('meta[name="robots"]').attr("content")?.trim() || "";
    const viewport = $('meta[name="viewport"]').attr("content")?.trim() || "";

    const issues: string[] = [];
    let hasError = false;
    let hasWarning = false;

    if (!title) {
      issues.push("Missing title tag");
      hasError = true;
    } else if (title.length < 30 || title.length > 60) {
      issues.push(
        `Title length is ${title.length} characters (recommended: 30-60)`,
      );
      hasWarning = true;
    }

    if (!description) {
      issues.push("Missing meta description");
      hasError = true;
    } else if (description.length < 120 || description.length > 160) {
      issues.push(
        `Description length is ${description.length} characters (recommended: 120-160)`,
      );
      hasWarning = true;
    }

    if (!viewport) {
      issues.push("Missing viewport meta tag");
      hasWarning = true;
    }

    const status: AuditStatus = hasError
      ? "ERROR"
      : hasWarning
        ? "WARNING"
        : "PASS";

    return {
      status,
      data: { title, description, h1, canonical, robots, viewport },
      issues,
    };
  }

  private static analyzeTechnical(
    $: CheerioAPI,
    url: string,
  ): SEOAuditResult["technical"] {
    const issues: string[] = [];
    const hreflang: string[] = [];

    $('link[rel="alternate"][hreflang]').each((_, el) => {
      const lang = $(el).attr("hreflang");
      if (lang) hreflang.push(lang);
    });

    // Note: robots.txt and sitemap checks will be done separately in the API
    const status: AuditStatus = issues.length === 0 ? "PASS" : "WARNING";

    return {
      status,
      robotsTxt: true, // Will be checked in API
      sitemap: true, // Will be checked in API
      hreflang,
      issues,
    };
  }

  private static analyzeSocial($: CheerioAPI): SEOAuditResult["social"] {
    const openGraph = {
      title: $('meta[property="og:title"]').attr("content")?.trim(),
      description: $('meta[property="og:description"]').attr("content")?.trim(),
      type: $('meta[property="og:type"]').attr("content")?.trim(),
      image: $('meta[property="og:image"]').attr("content")?.trim(),
      url: $('meta[property="og:url"]').attr("content")?.trim(),
    };

    const twitterCard = {
      card: $('meta[name="twitter:card"]').attr("content")?.trim(),
      site: $('meta[name="twitter:site"]').attr("content")?.trim(),
      title: $('meta[name="twitter:title"]').attr("content")?.trim(),
      description: $('meta[name="twitter:description"]')
        .attr("content")
        ?.trim(),
      image: $('meta[name="twitter:image"]').attr("content")?.trim(),
    };

    const issues: string[] = [];
    let status: AuditStatus = "PASS";

    if (!openGraph.title || !openGraph.description || !openGraph.image) {
      issues.push("Incomplete Open Graph tags");
      status = "WARNING";
    }

    if (!twitterCard.card) {
      issues.push("Missing Twitter Card");
      status = "WARNING";
    }

    return {
      status,
      openGraph,
      twitterCard,
      issues,
    };
  }

  private static analyzeIndexability(
    $: CheerioAPI,
  ): SEOAuditResult["indexability"] {
    const robots =
      $('meta[name="robots"]').attr("content")?.toLowerCase() || "";
    const noindex = robots.includes("noindex") ? true : false;
    const canonical = $('link[rel="canonical"]').attr("href");

    const issues: string[] = [];
    const canonicalIssues: string[] = [];

    if (noindex) {
      issues.push("Page has noindex directive");
    }

    if (!canonical) {
      canonicalIssues.push("Missing canonical URL");
      issues.push("Missing canonical URL");
    }

    const status: AuditStatus = noindex
      ? "ERROR"
      : issues.length > 0 || canonicalIssues.length > 0
        ? "WARNING"
        : "PASS";

    return {
      status,
      noindex,
      canonicalIssues,
      issues,
    };
  }

  static analyzeGoogleNews($: CheerioAPI): GoogleNewsAuditResult {
    const schemas = this.extractSchemas($);
    const newsArticle = schemas.find((s) => s["@type"] === "NewsArticle");

    const issues: string[] = [];
    let status: AuditStatus = "PASS";

    if (!newsArticle) {
      issues.push("Missing NewsArticle schema");
      status = "ERROR";
    }

    // Safe access to schema data
    const schemaData = newsArticle;
    const headline =
      (isString(schemaData?.headline) ? schemaData.headline : null) ||
      $("h1").first().text().trim();
    const headlineLength = headline?.length || 0;

    if (headlineLength < 10 || headlineLength > 110) {
      issues.push(
        `Headline length is ${headlineLength} characters (recommended: 10-110)`,
      );
      status = status === "ERROR" ? status : "WARNING";
    }

    // Safe access to nested schema properties
    const author = getSchemaTextValue(schemaData?.author);
    const publisher = getSchemaTextValue(schemaData?.publisher);
    const datePublished = isString(schemaData?.datePublished)
      ? schemaData.datePublished
      : undefined;
    const dateModified = isString(schemaData?.dateModified)
      ? schemaData.dateModified
      : undefined;
    const featuredImage = getSchemaUrlValue(schemaData?.image);

    if (!author) {
      issues.push("Missing author information");
      status = status === "ERROR" ? status : "WARNING";
    }

    if (!publisher) {
      issues.push("Missing publisher information");
      status = status === "ERROR" ? status : "WARNING";
    }

    if (!datePublished) {
      issues.push("Missing publication date");
      status = status === "ERROR" ? status : "WARNING";
    }

    if (!featuredImage) {
      issues.push("Missing featured image");
      status = status === "ERROR" ? status : "WARNING";
    }

    const score = Math.max(0, 100 - issues.length * 15);

    return {
      status,
      hasNewsArticleSchema: !!newsArticle,
      author,
      publisher,
      datePublished,
      dateModified,
      featuredImage,
      headlineLength,
      issues,
      score,
    };
  }

  static analyzeSchema($: CheerioAPI): SchemaValidationResult {
    const schemas = this.extractSchemas($);
    const issues: string[] = [];

    const hasOrganization = schemas.some((s) => s["@type"] === "Organization");
    const hasArticle = schemas.some((s) => s["@type"] === "Article");
    const hasNewsArticle = schemas.some((s) => s["@type"] === "NewsArticle");
    const hasWebsite = schemas.some((s) => s["@type"] === "WebSite");
    const hasBreadcrumb = schemas.some((s) => s["@type"] === "BreadcrumbList");

    if (schemas.length === 0) {
      issues.push("No structured data found");
    }

    if (!hasOrganization) {
      issues.push("Missing Organization schema");
    }

    const status: AuditStatus =
      schemas.length === 0 ? "ERROR" : issues.length > 2 ? "WARNING" : "PASS";
    const score = Math.max(0, 100 - issues.length * 10);

    return {
      status,
      schemas,
      hasOrganization,
      hasArticle,
      hasNewsArticle,
      hasWebsite,
      hasBreadcrumb,
      issues,
      score,
    };
  }

  static extractSchemas($: CheerioAPI): SchemaOrgData[] {
    const schemas: SchemaOrgData[] = [];

    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const content = $(el).html();
        if (!content) return;

        const data = JSON.parse(content) as unknown;
        const items = Array.isArray(data) ? data : [data];

        items.forEach((item) => {
          if (!isJsonLdItem(item)) return;

          parseJsonLdTypes(item).forEach((type) => {
            schemas.push({
              "@context": (item as any)["@context"] || "",
              "@type": Array.isArray(type) ? type[0] : type,
              ...item,
            });
          });
        });
      } catch (error) {
        schemas.push({
          "@context": "",
          "@type": "Invalid",
          errors: ["Failed to parse JSON-LD"],
        });
      }
    });

    return schemas;
  }

  static async analyzeSitemap(
    baseUrl: string,
  ): Promise<SitemapValidationResult> {
    const sitemapUrls = [
      "/sitemap.xml",
      "/sitemap_index.xml",
      "/news-sitemap.xml",
      "/post-sitemap.xml",
      "/sitemap.php",
    ];

    const issues: string[] = [];
    const sitemaps: SitemapValidationResult["sitemaps"] = [];
    const xmlFiles: string[] = [];
    let newsSitemap: SitemapValidationResult["newsSitemap"];

    for (const path of sitemapUrls) {
      const url = new URL(path, baseUrl).href;
      try {
        const exists = await WebCrawler.checkResource(url);
        if (exists) {
          xmlFiles.push(url);

          const isNews = path.includes("news");
          const sitemapInfo = {
            url,
            exists: true,
            valid: true,
            entries: 0,
          };

          if (isNews) {
            newsSitemap = sitemapInfo;
          } else {
            sitemaps.push(sitemapInfo);
          }
        }
      } catch {
        // Sitemap doesn't exist
      }
    }

    if (sitemaps.length === 0) {
      issues.push("No sitemap found");
    }

    if (!newsSitemap) {
      issues.push("No news sitemap found");
    }

    const status: AuditStatus = sitemaps.length === 0 ? "ERROR" : !newsSitemap ? "WARNING" : "PASS";
    const score = Math.max(0, 100 - issues.length * 20);

    return {
      status,
      sitemaps,
      xmlFiles,
      newsSitemap,
      issues,
      score,
    };
  }

  static analyzeAISearch(
    $: CheerioAPI,
    schemaResult: SchemaValidationResult,
  ): AISearchAuditResult {
    const issues: string[] = [];
    const hasFAQSchema = schemaResult.schemas.some(
      (s) => s["@type"] === "FAQPage",
    );
    const hasOrganizationSchema = schemaResult.hasOrganization;

    // Safe check for author schema
    const hasAuthorSchema = schemaResult.schemas.some((s) => {
      if (s["@type"] === "Person") return true;
      return hasSchemaProperty(s, "author");
    });

    // Calculate schema completeness
    const totalSchemas = 5;
    const presentSchemas = [
      schemaResult.hasOrganization,
      schemaResult.hasArticle || schemaResult.hasNewsArticle,
      schemaResult.hasWebsite,
      schemaResult.hasBreadcrumb,
      hasFAQSchema,
    ].filter(Boolean).length;

    const schemaCompleteness = Math.round(
      (presentSchemas / totalSchemas) * 100,
    );

    // Check for entity SEO elements
    const hasStructuredData = schemaResult.schemas.length > 0;
    const entitySEO = hasStructuredData && hasOrganizationSchema;

    if (!hasFAQSchema) {
      issues.push("Missing FAQ schema for AI assistants");
    }

    if (!hasOrganizationSchema) {
      issues.push("Missing Organization schema for entity recognition");
    }

    if (!hasAuthorSchema) {
      issues.push("Missing Author schema for E-E-A-T signals");
    }

    if (schemaCompleteness < 60) {
      issues.push("Low schema completeness for AI understanding");
    }

    const status: AuditStatus =
      schemaCompleteness >= 80
        ? "PASS"
        : schemaCompleteness >= 50
          ? "WARNING"
          : "ERROR";
    const score = Math.round(
      schemaCompleteness * 0.6 +
        (issues.length === 0 ? 40 : Math.max(0, 40 - issues.length * 10)),
    );

    return {
      status,
      schemaCompleteness,
      hasFAQSchema,
      hasOrganizationSchema,
      hasAuthorSchema,
      hasLlmsTxt: false, // Will be checked separately
      hasAiTxt: false, // Will be checked separately
      entitySEO,
      issues,
      score,
    };
  }
}
