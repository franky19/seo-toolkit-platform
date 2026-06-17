import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "Free Google News Validator – Check Google News Eligibility",
  description:
    "Instantly validate your article for Google News eligibility. Check NewsArticle schema, author byline, publisher info, canonical URL, and indexability — free, no signup.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/google-news-validator" },
};

export default function GoogleNewsValidatorPage() {
  return (
    <LandingPageTemplate
      title="Google News Validator"
      metaTitle="Free Google News Validator – Check Google News Eligibility"
      metaDescription="Check if your article meets Google News requirements."
      badge="Free Tool · No Signup Required"
      headline="Google News Validator – Check Your Article Eligibility"
      subheadline="Instantly verify whether your article meets all Google News requirements including NewsArticle schema, author information, publisher details, and technical SEO signals."
      ctaText="Validate My Article"
      ctaHref="/#analyze"
      features={[
        "NewsArticle JSON-LD schema validation",
        "Author byline detection and validation",
        "Publisher name and logo check",
        "Canonical URL verification",
        "Article publication date (datePublished)",
        "Article modified date (dateModified)",
        "Image dimensions and alt text",
        "Indexability check (robots meta, X-Robots-Tag)",
        "Google News sitemap submission status",
        "Breadcrumb schema validation",
        "Organization schema check",
        "Mobile-friendliness signals",
      ]}
      sections={[
        {
          heading: "What is a Google News Validator?",
          content: `<p>A Google News Validator is a tool that checks whether your article meets the technical and editorial requirements set by Google for inclusion in Google News. Google News is one of the world's largest news aggregation platforms, with over 1 billion monthly users. Being indexed in Google News can dramatically increase your article's reach and traffic.</p>
<p>Google has specific requirements for publishers who want their content to appear in Google News. These include technical requirements like proper structured data markup (NewsArticle schema), editorial guidelines about article quality, and publisher requirements around transparency and accountability.</p>
<p>Our free Google News Validator analyzes your article URL in real time and checks all the critical signals that Google uses to evaluate news content.</p>`,
        },
        {
          heading: "Google News Requirements for 2025",
          content: `<p>To appear in Google News, your articles must meet several key requirements:</p>
<ul>
<li><strong>NewsArticle Schema:</strong> Implement proper JSON-LD markup with @type: "NewsArticle", including headline, author, datePublished, dateModified, image, and publisher fields.</li>
<li><strong>Author Byline:</strong> Every article must have a clearly identifiable author. Anonymous content is less likely to be featured in Google News.</li>
<li><strong>Publisher Information:</strong> Your site must have clear publisher information including organization name, logo, and contact details.</li>
<li><strong>Canonical URL:</strong> Use canonical tags to prevent duplicate content issues, especially important for syndicated content.</li>
<li><strong>Indexability:</strong> Make sure your article pages are not blocked by robots.txt or noindex meta tags.</li>
<li><strong>Fresh Content:</strong> Google News prioritizes recent content. Articles should have accurate publication dates.</li>
<li><strong>Google News Sitemap:</strong> Submit a news sitemap to Google Search Console to help Google discover your articles faster.</li>
</ul>`,
        },
        {
          heading: "Why Your Article Might Not Appear in Google News",
          content: `<p>There are several common reasons why articles fail to appear in Google News:</p>
<p><strong>Missing or Invalid NewsArticle Schema:</strong> This is the most common technical issue. Without proper structured data, Google may not recognize your content as a news article. Make sure your JSON-LD includes all required fields.</p>
<p><strong>No Author Information:</strong> Google News strongly emphasizes editorial transparency. Articles without clear author attribution are less likely to be featured.</p>
<p><strong>Indexability Issues:</strong> If your article page has a noindex tag or is blocked in robots.txt, Google simply cannot index it in any search surface, including Google News.</p>
<p><strong>Slow Page Speed:</strong> While not a hard requirement, slow-loading pages are less likely to receive prominent placement in Google News. Core Web Vitals matter.</p>
<p><strong>Thin Content:</strong> Articles with very little original content or that appear to be scraped/reposted are filtered out of Google News.</p>
<p><strong>Publisher Not Approved:</strong> New publishers may need to apply to Google News Publisher Center. Our validator checks your technical compliance but publisher approval is a separate process.</p>`,
        },
        {
          heading: "How to Fix Common Google News Validation Errors",
          content: `<p>Here's how to fix the most common validation errors our tool detects:</p>
<p><strong>1. Adding NewsArticle Schema:</strong> Add the following JSON-LD to your article pages:</p>
<pre><code>{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Your Article Headline",
  "datePublished": "2024-01-15T08:00:00Z",
  "dateModified": "2024-01-15T10:00:00Z",
  "author": [{"@type": "Person", "name": "Jane Smith"}],
  "publisher": {
    "@type": "Organization",
    "name": "Your Publication",
    "logo": {"@type": "ImageObject", "url": "https://example.com/logo.png"}
  },
  "image": "https://example.com/article-image.jpg"
}</code></pre>
<p><strong>2. Author Markup:</strong> If you have multiple authors, list them all in the author array. Include the author's profile URL using the "url" property.</p>
<p><strong>3. Publisher Logo:</strong> The publisher logo should be exactly 60px tall and up to 600px wide. Use PNG or SVG format on a white background.</p>`,
        },
      ]}
      faqs={[
        {
          q: "How long does it take to get indexed in Google News?",
          a: "After fixing all validation errors and submitting your news sitemap to Google Search Console, new articles are typically indexed within minutes to a few hours. However, new publishers may take several weeks to be approved by Google News Publisher Center.",
        },
        {
          q: "Do I need to apply to Google News Publisher Center?",
          a: "For full Google News inclusion, yes. However, your articles can still appear in Google Search's 'Top Stories' and 'News' sections without explicit Publisher Center approval, as long as you implement proper NewsArticle schema and meet content guidelines.",
        },
        {
          q: "Is NewsArticle schema required for Google News?",
          a: "Yes, NewsArticle schema (or Article schema at minimum) is strongly recommended and essentially required for optimal Google News indexing. Without it, Google has difficulty identifying your content as a news article.",
        },
        {
          q: "Can I use this validator for any CMS?",
          a: "Yes! Our validator works with any CMS including WordPress, Ghost, Webflow, custom-built sites, and any other platform. We analyze the live URL, not the underlying technology.",
        },
        {
          q: "How often should I run the Google News validation?",
          a: "We recommend validating each article before publication, and running site-wide audits monthly. CMS updates or theme changes can inadvertently break your structured data markup.",
        },
        {
          q: "What's the difference between Google News validation and regular SEO audit?",
          a: "A regular SEO audit focuses on general search rankings. Our Google News Validator specifically checks signals that matter for Google News, Google Discover, and Top Stories — like NewsArticle schema, author attribution, publisher information, and news-specific technical requirements.",
        },
      ]}
      relatedTools={[
        { href: "/news-schema-generator", label: "NewsArticle Schema Generator" },
        { href: "/news-sitemap-validator", label: "News Sitemap Validator" },
        { href: "/google-discover-checker", label: "Google Discover Checker" },
        { href: "/ai-citation-checker", label: "AI Citation Checker" },
        { href: "/news-seo-checker", label: "News SEO Checker" },
      ]}
    />
  );
}
