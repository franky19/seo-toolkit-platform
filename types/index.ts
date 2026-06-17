export type AuditStatus = 'PASS' | 'WARNING' | 'ERROR';

export interface SEOMetaData {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  viewport?: string;
}

export interface OpenGraphData {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
  url?: string;
}

export interface TwitterCardData {
  card?: string;
  site?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface SchemaOrgData {
  type: string;
  data: Record<string, unknown>;
  valid: boolean;
  errors?: string[];
}

export interface SitemapInfo {
  url: string;
  exists: boolean;
  valid: boolean;
  entries?: number;
  errors?: string[];
}

export interface SEOAuditResult {
  meta: {
    status: AuditStatus;
    data: SEOMetaData;
    issues: string[];
  };
  technical: {
    status: AuditStatus;
    robotsTxt: boolean;
    sitemap: boolean;
    hreflang: string[];
    issues: string[];
  };
  social: {
    status: AuditStatus;
    openGraph: OpenGraphData;
    twitterCard: TwitterCardData;
    issues: string[];
  };
  indexability: {
    status: AuditStatus;
    noindex: boolean;
    canonicalIssues: string[];
    issues: string[];
  };
  score: number;
}

export interface GoogleNewsAuditResult {
  status: AuditStatus;
  hasNewsArticleSchema: boolean;
  author?: string;
  publisher?: string;
  datePublished?: string;
  dateModified?: string;
  featuredImage?: string;
  headlineLength?: number;
  issues: string[];
  score: number;
}

export interface SchemaValidationResult {
  status: AuditStatus;
  schemas: SchemaOrgData[];
  hasOrganization: boolean;
  hasArticle: boolean;
  hasNewsArticle: boolean;
  hasWebsite: boolean;
  hasBreadcrumb: boolean;
  issues: string[];
  score: number;
}

export interface SitemapValidationResult {
  status: AuditStatus;
  sitemaps: SitemapInfo[];
  newsSitemap?: SitemapInfo;
  xmlFiles: string[];
  issues: string[];
  score: number;
}

export interface AISearchAuditResult {
  status: AuditStatus;
  schemaCompleteness: number;
  hasFAQSchema: boolean;
  hasOrganizationSchema: boolean;
  hasAuthorSchema: boolean;
  hasLlmsTxt: boolean;
  hasAiTxt: boolean;
  entitySEO: boolean;
  issues: string[];
  score: number;
}

export interface Recommendation {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
  impact: string;
  action: string;
}

export interface AuditReport {
  url: string;
  timestamp: string;
  seoAudit: SEOAuditResult;
  googleNewsAudit: GoogleNewsAuditResult;
  schemaValidation: SchemaValidationResult;
  sitemapValidation: SitemapValidationResult;
  aiSearchAudit: AISearchAuditResult;
  recommendations: Recommendation[];
  overallScore: number;
  technicalSEOScore: number;
  schemaScore: number;
  googleNewsScore: number;
  aiSearchScore: number;
}

export interface AuditRequest {
  url: string;
}

export interface RateLimitInfo {
  count: number;
  resetTime: number;
}

export type QuotaInfo = {
  limit: number;
  used: number;
  remaining: number;
  resetAt: string;
  keyType: "anonymous" | "authenticated";
};
