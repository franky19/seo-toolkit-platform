import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "News SEO Checker – Analyze Article SEO for News Publishers",
  description:
    "Free news SEO checker for publishers and journalists. Analyze article title, meta description, headings, readability, internal links, and on-page SEO signals for news articles.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/news-seo-checker" },
};

export default function NewsSEOCheckerPage() {
  return (
    <LandingPageTemplate
      title="News SEO Checker"
      metaTitle="News SEO Checker – Article SEO Analysis for Publishers"
      metaDescription="Free SEO checker for news articles and publishers."
      badge="Free Tool · Article SEO Analysis"
      headline="News SEO Checker – Complete Article SEO Analysis"
      subheadline="Audit the full on-page SEO of your news articles. Check title optimization, meta descriptions, heading structure, readability, internal links, and all the signals that help your articles rank in Google News and traditional search."
      ctaText="Analyze My Article"
      ctaHref="/#analyze"
      features={[
        "Title tag optimization (length, keywords)",
        "Meta description quality check",
        "H1, H2, H3 heading structure analysis",
        "Article content length and depth",
        "Keyword density and distribution",
        "Internal linking opportunities",
        "External link quality check",
        "Image alt text validation",
        "URL structure optimization",
        "Canonical tag verification",
        "Page speed signals",
        "Mobile usability check",
      ]}
      sections={[
        {
          heading: "Why Article SEO Is Different for News Publishers",
          content: `<p>News SEO has unique characteristics that differ from general SEO. While traditional SEO focuses on long-term keyword rankings, news SEO must also consider real-time indexing, content freshness, and the News-specific ranking signals that Google uses for Top Stories and Google News.</p>
<p>For news publishers, every article is time-sensitive. Getting indexed quickly, appearing in Top Stories, and being cited in AI search responses all require different optimization strategies than ranking a product page or blog post that targets long-tail keywords.</p>
<p>Our News SEO Checker analyzes your articles with these news-specific factors in mind, going beyond basic meta tag checks to evaluate all the signals that matter for Google News, Google Discover, and AI search.</p>`,
        },
        {
          heading: "Title Optimization for News Articles",
          content: `<p>News article titles have unique requirements compared to regular web page titles:</p>
<ul>
<li><strong>Length:</strong> Keep titles under 110 characters for NewsArticle schema compliance. For display in SERPs, 50-60 characters is ideal.</li>
<li><strong>Clarity over cleverness:</strong> Unlike magazine headlines that use wordplay, news titles should clearly communicate what the article is about. Google News and AI search favor clear, informative headlines.</li>
<li><strong>Primary keyword placement:</strong> Include the most important keyword or news topic in the first 60 characters of the title.</li>
<li><strong>Avoid clickbait:</strong> Sensational or misleading headlines hurt your credibility with both Google and readers. Google actively penalizes clickbait in Discover.</li>
<li><strong>Include key entities:</strong> Names, organizations, locations, and other named entities in headlines help Google understand the topic and can improve News indexing.</li>
</ul>`,
        },
        {
          heading: "Content Structure for News SEO",
          content: `<p>The structure of your article body affects both readability and SEO performance:</p>
<p><strong>Inverted Pyramid:</strong> News articles traditionally use the inverted pyramid structure — most important information first, background and context later. This structure aligns well with how Google and AI systems parse and summarize news content.</p>
<p><strong>Subheadings:</strong> Use H2 and H3 subheadings throughout long articles (1000+ words). This helps both readers and search engines navigate the content. Each subheading is an opportunity to include additional relevant keywords naturally.</p>
<p><strong>Article Length:</strong> Breaking news articles can be shorter (300-500 words) if they cover all key facts. Analysis and explainer pieces should be comprehensive (1000+ words). For Discover, content quality and uniqueness matter more than length.</p>
<p><strong>Internal Linking:</strong> Link to related articles and topic pages. Internal links help distribute PageRank, improve crawl depth, and keep readers engaged with your publication.</p>`,
        },
      ]}
      faqs={[
        {
          q: "How long should news articles be for SEO?",
          a: "Breaking news can be 300-500 words if comprehensive. Analysis and explainers should be 1000-2000+ words for competitive topics. The key is covering the story completely. Google values depth and original reporting over arbitrary word counts. For Google Discover, engagement metrics matter as much as length.",
        },
        {
          q: "How quickly should news articles be indexed after publication?",
          a: "With a news sitemap, fresh articles are typically indexed within minutes to a few hours. Factors that speed up indexing include: news sitemap submission, Google Search Console site verification, strong crawl budget, and internal linking from the homepage or category pages.",
        },
        {
          q: "Should news articles target specific keywords?",
          a: "News SEO is different from traditional keyword targeting. Focus on covering news topics thoroughly and accurately rather than forcing keywords. Natural language about the topic, including entity names and related concepts, is more important than keyword density. Use Google Trends and Search Console to understand what people are searching about your topics.",
        },
        {
          q: "Do meta descriptions matter for news articles?",
          a: "Meta descriptions don't directly affect rankings but do impact click-through rate (CTR) from search results. For news, Google often rewrites meta descriptions based on the search query. Still, write compelling meta descriptions (150-160 characters) that accurately summarize the article value.",
        },
      ]}
      relatedTools={[
        { href: "/google-news-validator", label: "Google News Validator" },
        { href: "/news-schema-generator", label: "Schema Generator" },
        { href: "/google-discover-checker", label: "Discover Checker" },
        { href: "/ai-citation-checker", label: "AI Citation Checker" },
        { href: "/google-news-score", label: "Google News Score" },
      ]}
    />
  );
}
