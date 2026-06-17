import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "ChatGPT Citation Checker – Is Your Content Cited by ChatGPT?",
  description:
    "Check if your website and articles are optimized for ChatGPT Search citation. Validate OAI-SearchBot access, structured data, and content quality signals for ChatGPT indexing.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/chatgpt-citation-checker" },
};

export default function ChatGPTCitationCheckerPage() {
  return (
    <LandingPageTemplate
      title="ChatGPT Citation Checker"
      metaTitle="ChatGPT Citation Checker – Optimize for ChatGPT Search"
      metaDescription="Check if your content is optimized for ChatGPT Search citation."
      badge="Free Tool · ChatGPT Search Optimization"
      headline="ChatGPT Citation Checker – Get Your Content Cited by ChatGPT"
      subheadline="Analyze your website for ChatGPT Search (formerly Browse with Bing) citation readiness. Check OAI-SearchBot access, content structure, authority signals, and technical requirements."
      ctaText="Check ChatGPT Readiness"
      ctaHref="/#analyze"
      features={[
        "OAI-SearchBot crawl access check",
        "robots.txt GPTBot permission",
        "Content structure and hierarchy",
        "Author E-E-A-T signals",
        "FAQ and structured content markup",
        "Internal linking structure",
        "External citation and source links",
        "Publisher transparency signals",
        "About page and contact info",
        "Editorial policy detection",
        "Content originality signals",
        "Mobile performance for ChatGPT browsing",
      ]}
      sections={[
        {
          heading: "How ChatGPT Search Cites Web Content",
          content: `<p>ChatGPT Search is OpenAI's real-time web browsing feature that allows ChatGPT to search the web and cite sources in its responses. When users enable web search or use ChatGPT Search directly, the AI browses current web pages and cites them as sources.</p>
<p>For publishers and news organizations, being cited by ChatGPT is increasingly valuable. ChatGPT has over 100 million weekly users, and when your content appears as a cited source, it drives brand recognition, referral traffic (when users click the citation links), and establishes your authority in AI knowledge systems.</p>
<p>The crawler that ChatGPT uses to browse the web is called OAI-SearchBot. You can verify if it has access to your site by checking your robots.txt file and server logs.</p>`,
        },
        {
          heading: "Checking Your robots.txt for ChatGPT Access",
          content: `<p>To allow ChatGPT to crawl and cite your content, you must ensure these crawlers are not blocked in your robots.txt:</p>
<pre><code># Allow ChatGPT / OpenAI crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /</code></pre>
<p>If you want to allow ChatGPT Search but not AI training, you can selectively block:</p>
<pre><code># Block AI training but allow ChatGPT Search
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /</code></pre>
<p>GPTBot is used for AI training data. ChatGPT-User and OAI-SearchBot are used for real-time search. You can block training while allowing search.</p>`,
        },
        {
          heading: "Content Structure for ChatGPT Citation",
          content: `<p>ChatGPT prefers to cite well-structured, factual content. Here's how to optimize your content structure:</p>
<ul>
<li><strong>Clear Headings:</strong> Use descriptive H1, H2, H3 headings that clearly indicate what each section covers. ChatGPT uses headings to understand content structure.</li>
<li><strong>Factual Statements:</strong> Lead with facts, statistics, and specific information. ChatGPT cites sources that provide concrete, verifiable information.</li>
<li><strong>Cite Your Sources:</strong> Articles that cite authoritative external sources are more trustworthy and more likely to be cited by AI systems in turn.</li>
<li><strong>FAQ Sections:</strong> Include FAQ sections with direct questions and answers. These match the question-answering format of ChatGPT responses.</li>
<li><strong>Updated Content:</strong> Keep your articles up to date. ChatGPT Search prefers recent, accurate information over outdated content.</li>
</ul>`,
        },
      ]}
      faqs={[
        {
          q: "How can I tell if ChatGPT is crawling my site?",
          a: "Check your server access logs for user agents containing 'GPTBot', 'ChatGPT-User', or 'OAI-SearchBot'. You can also use server log analysis tools or CDN analytics to filter for OpenAI crawlers.",
        },
        {
          q: "Does blocking GPTBot also block ChatGPT Search?",
          a: "No! GPTBot and ChatGPT-User/OAI-SearchBot are different crawlers. GPTBot is used for building AI training datasets. ChatGPT-User and OAI-SearchBot are used for real-time web browsing. You can block GPTBot (training) while allowing the others (search).",
        },
        {
          q: "Can I submit my site to ChatGPT Search directly?",
          a: "Unlike Google Search Console, there's no official submission portal for ChatGPT Search. The best approach is to ensure your site is accessible to OAI-SearchBot and optimize your content quality so ChatGPT naturally finds and cites it.",
        },
        {
          q: "How do I increase the likelihood of ChatGPT citing my articles?",
          a: "Focus on: (1) Publishing unique, factual content with specific data points, (2) Clear content structure with descriptive headings, (3) Author credentials and E-E-A-T signals, (4) FAQ sections on key articles, (5) Ensuring OAI-SearchBot can crawl your site, and (6) Having a trustworthy, transparent publisher presence.",
        },
      ]}
      relatedTools={[
        { href: "/ai-citation-checker", label: "AI Citation Checker" },
        { href: "/google-news-validator", label: "Google News Validator" },
        { href: "/news-schema-generator", label: "Schema Generator" },
        { href: "/google-discover-checker", label: "Discover Checker" },
      ]}
    />
  );
}
