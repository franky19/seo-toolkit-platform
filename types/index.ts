export interface Keyword {
  keyword: string;
  volume: number;
  difficulty: number;
  cpc: number;
  competition: string;
  intent: string;
  trend: number[];
}

export interface MetaResult {
  title: string;
  description: string;
  score: number;
}

export interface SERPResult {
  score: number;
  warnings: string[];
}

export interface AIContentResult {
  content: string;
  score: number;
}

export interface ExportRecord {
  id: number;
  name: string;
  type: string;
  status: string;
  size: string;
  created: string;
}

export type AuditStatus = "PASS" | "WARNING" | "ERROR";

export interface AuditReport {
  id: number;
  name: string;
  url: string;
  timestamp: string;
  seoAudit: SEOAuditResult;
  googleNewsAudit: GoogleNewsAuditResult;
  schemaValidation: SchemaValidationResult;
  sitemapValidation: SitemapValidationResult;
  aiSearchAudit: AISearchAuditResult;
  overallScore: number;
  technicalSEOScore: number;
  schemaScore: number;
  googleNewsScore: number;
  aiSearchScore: number;
  recommendations?: Recommendation[];
}

export interface QuotaInfo {
  limit: number;
  used: number;
  remaining: number;
}

export interface Recommendation {
  id?: string;
  title: string;
  description: string;
  severity?: "low" | "medium" | "high";
  priority: "HIGH" | "MEDIUM" | "LOW";
  impact: "low" | "medium" | "high";
  action: string;
}

export interface SEOAuditResult {
  score: number;
  status: AuditStatus;
  meta: {
    status: AuditStatus;
    data: { title: string; description: string; h1: string; canonical?: string; robots?: string; viewport?: string };
    issues: string[];
  };
  technical: {
    status: AuditStatus;
    issues: string[];
    robotsTxt?: boolean;
    sitemap?: boolean;
    hreflang?: string[];
  };
  social: { 
    status: AuditStatus;
    openGraph: { title?: string; image?: string; description?: string; type?: string; url?: string };
    twitterCard: { card?: string; site?: string; title?: string; description?: string; image?: string };
    issues: string[];
  };
  indexability: { 
    status: AuditStatus;
    noindex: boolean;
    canonicalIssues: string[];
    issues: string[];
  };
}

export interface GoogleNewsAuditResult {
  score: number;
  status: AuditStatus;
  issues: string[];
  headlineLength?: number;
  hasNewsArticleSchema: boolean;
  author?: string;
  publisher?: string;
  datePublished?: string;
  dateModified?: string;
  featuredImage?: string;
}

export interface SchemaValidationResult {
  score: number;
  status: AuditStatus;
  schemas: SchemaOrgData[];
  issues: string[];
  hasArticle?: boolean;
  hasNewsArticle?: boolean;
  hasWebsite?: boolean;
  hasBreadcrumb?: boolean;
  hasProduct?: boolean;
  hasFAQ?: boolean;
  hasHowTo?: boolean;
  hasOrganization?: boolean;
}

export interface SitemapValidationResult {
  status: AuditStatus;
  sitemaps: { url: string; exists: boolean; valid: boolean; entries: number }[];
  xmlFiles: string[];
  issues: string[];
  score: number;
  newsSitemap?: { url: string; exists: boolean; valid: boolean; entries: number };
}

export interface AISearchAuditResult {
  score: number;
  status: AuditStatus;
  hasLlmsTxt: boolean;
  hasAiTxt: boolean;
  issues: string[];
  hasFAQSchema: boolean;
  hasAuthorSchema: boolean;
  schemaCompleteness: number;
  entitySEO?: boolean;
  hasOrganizationSchema?: boolean;
}

export interface SchemaOrgData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}
