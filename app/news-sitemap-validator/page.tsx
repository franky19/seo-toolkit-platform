import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "News Sitemap Validator – Validate Your Google News Sitemap",
  description:
    "Validate your news sitemap XML for Google News submission. Check sitemap structure, article freshness (48-hour window), required fields, and common submission errors.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/news-sitemap-validator" },
};

export default function NewsSitemapValidatorPage() {
  return (
    <LandingPageTemplate
      title="News Sitemap Validator"
      metaTitle="News Sitemap Validator – Check Google News Sitemap"
      metaDescription="Validate your news sitemap for Google News submission."
      badge="Free Tool · Sitemap Validation"
      headline="News Sitemap Validator – Check Your Google News Sitemap"
      subheadline="Validate your XML news sitemap against Google News requirements. Check article freshness, required fields, URL structure, and submission errors before Google crawls your site."
      ctaText="Validate My Sitemap"
      ctaHref="/#analyze"
      features={[
        "XML sitemap structure validation",
        "News namespace (<news:news>) check",
        "Article publication date freshness (48-hour window)",
        "Required news:title field validation",
        "news:publication_date format check",
        "news:language field validation",
        "news:publication name and URL",
        "Maximum URLs per sitemap (1000 limit)",
        "news:keywords validation",
        "Sitemap index file detection",
        "HTTP response code verification",
        "Sitemap file size check (50MB limit)",
      ]}
      sections={[
        {
          heading: "What is a Google News Sitemap?",
          content: `<p>A Google News sitemap is a special type of XML sitemap that contains only recent articles (published within the last 48 hours). Unlike regular sitemaps that list all your pages, a news sitemap is specifically designed to help Google News discover and index your fresh articles as quickly as possible.</p>
<p>Submitting a news sitemap to Google Search Console is one of the most effective ways to ensure your articles get indexed in Google News quickly — sometimes within minutes of publication. News sitemaps use a special XML namespace (<code>xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"</code>) to include news-specific metadata.</p>`,
        },
        {
          heading: "News Sitemap XML Structure",
          content: `<p>A valid Google News sitemap must follow this structure:</p>
<pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://example.com/article/breaking-news&lt;/loc&gt;
    &lt;news:news&gt;
      &lt;news:publication&gt;
        &lt;news:name&gt;Example News&lt;/news:name&gt;
        &lt;news:language&gt;en&lt;/news:language&gt;
      &lt;/news:publication&gt;
      &lt;news:publication_date&gt;2024-06-15T09:00:00Z&lt;/news:publication_date&gt;
      &lt;news:title&gt;Breaking: Major Tech Announcement&lt;/news:title&gt;
    &lt;/news:news&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</code></pre>
<p>The news:keywords field is optional but can help Google understand your article's topic. Use up to 10 relevant keywords, separated by commas.</p>`,
        },
        {
          heading: "Common News Sitemap Errors",
          content: `<p>Our validator checks for these common news sitemap errors:</p>
<ul>
<li><strong>Missing news namespace:</strong> The XML namespace for Google News must be declared in the urlset element.</li>
<li><strong>Stale articles:</strong> News sitemaps should only contain articles published in the last 48 hours. Older articles should be removed to keep the sitemap fresh.</li>
<li><strong>Wrong date format:</strong> Use W3C Datetime format: YYYY-MM-DDTHH:MM:SSZ or YYYY-MM-DDTHH:MM:SS+HH:MM</li>
<li><strong>Missing required fields:</strong> news:name, news:language, news:publication_date, and news:title are all required.</li>
<li><strong>Too many URLs:</strong> News sitemaps are limited to 1000 URLs. Use a sitemap index file if you publish more than 1000 articles per 2 days.</li>
<li><strong>Encoding issues:</strong> The sitemap must be UTF-8 encoded. Special characters must be XML-escaped.</li>
</ul>`,
        },
      ]}
      faqs={[
        {
          q: "How often should I update my news sitemap?",
          a: "Your news sitemap should be updated every time you publish a new article. Most CMS platforms can auto-generate and update news sitemaps. The sitemap should only contain articles from the last 48 hours.",
        },
        {
          q: "Where should I submit my news sitemap?",
          a: "Submit your news sitemap URL to Google Search Console under Sitemaps. You should also reference it in your robots.txt file with: Sitemap: https://example.com/news-sitemap.xml",
        },
        {
          q: "Can I use a regular sitemap instead of a news sitemap?",
          a: "A regular sitemap can help Google discover articles, but a dedicated news sitemap sends stronger signals to Google News specifically. For timely news indexing, a separate news sitemap is highly recommended.",
        },
        {
          q: "What happens if my news sitemap has errors?",
          a: "If your news sitemap has validation errors, Google may fail to parse it and won't use it for news indexing. Check Google Search Console's Sitemap report for specific errors and fix them promptly.",
        },
      ]}
      relatedTools={[
        { href: "/google-news-validator", label: "Google News Validator" },
        { href: "/news-schema-generator", label: "Schema Generator" },
        { href: "/news-seo-checker", label: "News SEO Checker" },
        { href: "/google-news-score", label: "Google News Score" },
      ]}
    />
  );
}
