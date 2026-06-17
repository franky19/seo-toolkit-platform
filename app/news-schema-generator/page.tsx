import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "NewsArticle Schema Generator – Free JSON-LD Generator for News",
  description:
    "Generate valid NewsArticle JSON-LD structured data for any news article. Get proper schema markup for Google News, Google Discover, and AI search. Free, instant.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/news-schema-generator" },
};

export default function NewsSchemaGeneratorPage() {
  return (
    <LandingPageTemplate
      title="News Schema Generator"
      metaTitle="NewsArticle Schema Generator – Free JSON-LD for News Articles"
      metaDescription="Generate valid NewsArticle JSON-LD schema for your articles."
      badge="Free Tool · Generate JSON-LD Instantly"
      headline="NewsArticle Schema Generator – Free JSON-LD for News Articles"
      subheadline="Generate production-ready NewsArticle JSON-LD structured data that validates in Google's Rich Results Test. Also generates Organization Schema and Breadcrumb Schema."
      ctaText="Generate Schema Now"
      ctaHref="/#analyze"
      features={[
        "NewsArticle JSON-LD structured data",
        "Organization Schema with publisher logo",
        "BreadcrumbList Schema",
        "Person Schema for authors",
        "Article and BlogPosting schemas",
        "ImageObject schema for article images",
        "WebPage schema with speakable",
        "SiteLinksSearchBox Schema",
        "Real-time validation against schema.org",
        "Google Rich Results Test compatibility",
        "Multiple author support",
        "Copy-paste ready code output",
      ]}
      sections={[
        {
          heading: "What is NewsArticle Schema?",
          content: `<p>NewsArticle schema is a type of structured data markup based on the schema.org vocabulary. It helps search engines like Google understand that your web page contains a news article, and extract key metadata like the headline, author, publication date, and publisher.</p>
<p>When you implement NewsArticle JSON-LD correctly, your articles become eligible for Google's Top Stories carousel in search results, Google News indexing, and enhanced display in Google Discover. It also helps AI systems like ChatGPT, Gemini, and Perplexity correctly attribute your content.</p>
<p>JSON-LD (JavaScript Object Notation for Linked Data) is Google's preferred format for structured data. It's implemented as a <code>&lt;script type="application/ld+json"&gt;</code> tag in your page's <code>&lt;head&gt;</code> section.</p>`,
        },
        {
          heading: "Required Fields for NewsArticle Schema",
          content: `<p>Google requires the following fields for a valid NewsArticle schema:</p>
<ul>
<li><strong>@type:</strong> Must be "NewsArticle" (or "Article" for blog posts)</li>
<li><strong>headline:</strong> The article title. Maximum 110 characters. Should not contain promotional language.</li>
<li><strong>image:</strong> URL to the article's main image. Must be at least 1200 pixels wide for Top Stories eligibility.</li>
<li><strong>datePublished:</strong> The date the article was first published in ISO 8601 format (e.g., "2024-01-15T08:00:00Z")</li>
<li><strong>dateModified:</strong> The date the article was last modified</li>
<li><strong>author:</strong> Author name and ideally a link to their profile page</li>
<li><strong>publisher:</strong> Organization schema with name and logo</li>
</ul>
<p>Recommended additional fields include: description, articleBody, wordCount, url, and mainEntityOfPage.</p>`,
        },
        {
          heading: "NewsArticle Schema Example",
          content: `<p>Here is a complete example of a valid NewsArticle schema:</p>
<pre><code>{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Breaking: Tech Giant Announces New AI Model",
  "description": "A major technology company unveiled a new large language model today...",
  "image": {
    "@type": "ImageObject",
    "url": "https://example.com/images/article.jpg",
    "width": 1200,
    "height": 630
  },
  "datePublished": "2024-06-15T09:00:00Z",
  "dateModified": "2024-06-15T14:30:00Z",
  "author": [{
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://example.com/authors/jane-smith"
  }],
  "publisher": {
    "@type": "Organization",
    "name": "Tech News Daily",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png",
      "width": 200,
      "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/tech/ai-announcement"
  }
}</code></pre>`,
        },
        {
          heading: "Organization Schema for News Publishers",
          content: `<p>In addition to NewsArticle schema on each article page, news publishers should implement Organization schema on their homepage. This helps Google and AI systems understand who you are as a publisher.</p>
<p>Key Organization schema fields include: name, url, logo, sameAs (links to your social profiles), and contactPoint. Including your social media profiles in sameAs helps build entity authority, which is increasingly important for AI search citation.</p>
<p>The publisher logo used in your Organization schema should be the same as the one referenced in your NewsArticle schema. Google has strict size requirements: the logo image must be at most 600px × 60px. Images that are taller than 60px will be scaled down, and a minimum width of 200px is recommended.</p>`,
        },
      ]}
      faqs={[
        {
          q: "What's the difference between NewsArticle, Article, and BlogPosting?",
          a: "NewsArticle is for news content published by recognized news organizations. Article is more general and works for any article-type content. BlogPosting is specifically for blog posts. For news publishers, NewsArticle is the most specific and preferred type. For blogs covering news topics, Article or BlogPosting with comprehensive metadata is acceptable.",
        },
        {
          q: "Where should I place the JSON-LD script tag?",
          a: "Google recommends placing JSON-LD in the <head> section of your HTML. However, Google can also read JSON-LD in the <body>. If you're using a CMS plugin, it typically handles placement automatically.",
        },
        {
          q: "How do I validate my NewsArticle schema?",
          a: "Use Google's Rich Results Test (search.google.com/test/rich-results) to validate your schema. You can also use our free Google News Validator to check your schema alongside other Google News requirements.",
        },
        {
          q: "Can I have multiple @type values in my schema?",
          a: "Yes! You can use an array: \"@type\": [\"NewsArticle\", \"Article\"]. This is useful for content that falls into multiple categories. However, for Google News specifically, listing NewsArticle first is recommended.",
        },
        {
          q: "Does schema markup directly affect my Google News ranking?",
          a: "Schema markup helps Google understand and index your content, which is a prerequisite for appearing in Google News. It doesn't directly boost rankings, but without it, your articles may not qualify for Top Stories or Google News inclusion at all.",
        },
      ]}
      relatedTools={[
        { href: "/google-news-validator", label: "Google News Validator" },
        { href: "/news-sitemap-validator", label: "News Sitemap Validator" },
        { href: "/ai-citation-checker", label: "AI Citation Checker" },
        { href: "/google-discover-checker", label: "Google Discover Checker" },
      ]}
    />
  );
}
