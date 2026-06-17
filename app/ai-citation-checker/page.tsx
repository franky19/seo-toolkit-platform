import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "AI Citation Checker – Is Your Article Ready for ChatGPT, Gemini & Perplexity?",
  description:
    "Check if your article can be cited by ChatGPT Search, Google Gemini, Perplexity AI, and Claude. Validate AI citation readiness with structured data, author info, and entity optimization.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/ai-citation-checker" },
};

export default function AICitationCheckerPage() {
  return (
    <LandingPageTemplate
      title="AI Citation Checker"
      metaTitle="AI Citation Checker – ChatGPT, Gemini & Perplexity Readiness"
      metaDescription="Check if your content can be cited by AI search engines."
      badge="Free Tool · AI Search Optimization"
      headline="AI Citation Checker – Is Your Content AI Search Ready?"
      subheadline="Verify whether your articles and web pages are optimized for citation by ChatGPT Search, Google Gemini, Perplexity AI, Claude, and other AI language models that browse the web."
      ctaText="Check AI Citation Readiness"
      ctaHref="/#analyze"
      features={[
        "ChatGPT Search optimization check",
        "Google Gemini citation readiness",
        "Perplexity AI indexability signals",
        "FAQ schema for AI question answering",
        "HowTo schema detection",
        "Entity clarity and disambiguation",
        "Author E-E-A-T signals",
        "llms.txt file detection",
        "ai.txt permission signals",
        "Structured data completeness score",
        "Content freshness for AI training",
        "Publisher authority signals",
      ]}
      sections={[
        {
          heading: "What is AI Citation and Why Does It Matter?",
          content: `<p>AI citation refers to when AI-powered search engines like ChatGPT Search, Google Gemini, and Perplexity AI reference or link to your content in their responses. As AI search grows in adoption, being cited by AI systems is becoming as valuable as ranking in traditional Google search.</p>
<p>In 2024 and 2025, millions of users are getting information directly from AI assistants. When someone asks ChatGPT about a news topic, the AI may cite your article as a source. This drives referral traffic, builds brand authority, and establishes your publication as a trusted source in AI knowledge bases.</p>
<p>Unlike traditional SEO, AI citation optimization requires a different approach. AI systems prioritize clarity, structure, authoritative authorship, and factual accuracy over traditional ranking signals like backlinks and keyword density.</p>`,
        },
        {
          heading: "How ChatGPT Search Works for News Content",
          content: `<p>ChatGPT Search (formerly Browse with Bing) crawls and indexes web content to provide up-to-date answers. For news publishers, several factors influence whether your content gets cited:</p>
<ul>
<li><strong>Crawlability:</strong> Your content must be accessible to OpenAI's web crawler (OAI-SearchBot). Check your robots.txt to ensure it's not blocked.</li>
<li><strong>Content Structure:</strong> ChatGPT prefers content with clear headings, subheadings, and bulleted lists. Dense paragraphs without structure are harder for AI to parse and summarize.</li>
<li><strong>Author Credibility:</strong> AI systems consider author expertise. Include author bios with credentials, social profiles, and publication history.</li>
<li><strong>Publisher Trust:</strong> Established, transparent publishers with clear editorial standards are more likely to be cited. Organization schema and About/Contact pages matter.</li>
<li><strong>FAQ Schema:</strong> FAQ markup helps AI systems understand your content's question-answering potential, making it ideal for citation in AI responses.</li>
</ul>`,
        },
        {
          heading: "Optimizing for Perplexity AI",
          content: `<p>Perplexity AI is a search engine built specifically around AI-generated answers. It actively crawls and cites web sources, often linking directly to news articles. For publishers, Perplexity can be a significant traffic source.</p>
<p>Perplexity prioritizes content that directly answers specific questions. To optimize for Perplexity citation:</p>
<ul>
<li>Use clear, factual language with specific data points and figures</li>
<li>Structure articles with H2 and H3 subheadings that answer common questions about your topic</li>
<li>Include a FAQ section at the bottom of major articles</li>
<li>Add schema markup (NewsArticle, FAQ, HowTo) to help AI understand content type</li>
<li>Ensure your content is original and not scraped from other sources</li>
<li>Link to authoritative external sources as references</li>
</ul>`,
        },
        {
          heading: "The llms.txt Standard for AI Optimization",
          content: `<p>A new standard emerging for AI search optimization is the <code>llms.txt</code> file, similar to robots.txt but specifically for large language models. This plain text file at the root of your domain provides AI systems with a structured overview of your site's most important content.</p>
<p>A well-formatted llms.txt includes links to your most important pages with brief descriptions, helping AI systems quickly understand your content hierarchy and identify your most authoritative pages. This is especially valuable for news publishers with large article archives.</p>
<p>Similarly, <code>ai.txt</code> (from Spawning.ai) lets you specify permissions for AI training datasets. While this is primarily about dataset opt-in/opt-out, having this file signals to AI systems that you're engaged with AI optimization.</p>`,
        },
      ]}
      faqs={[
        {
          q: "How do I know if ChatGPT is citing my content?",
          a: "Currently, there's no official tool from OpenAI to track citations. You can search Perplexity or ChatGPT for your domain name or article topics and see if your content appears as a source. Some analytics platforms are starting to show 'chatgpt.com' as a referral source when users click through from ChatGPT responses.",
        },
        {
          q: "Can I opt out of AI training and citation?",
          a: "You can block AI training crawlers via robots.txt (e.g., User-agent: GPTBot; Disallow: /). However, blocking crawlers also prevents citation in AI search. This is a strategic decision — opt out if you're concerned about training data use, but know it may reduce AI citation traffic.",
        },
        {
          q: "Does E-E-A-T apply to AI search?",
          a: "Yes, Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) concept applies to AI search as well. AI systems are designed to prefer authoritative sources. Demonstrating author expertise, having clear editorial standards, and building publisher authority all contribute to AI citation likelihood.",
        },
        {
          q: "What schema markup best helps with AI citation?",
          a: "FAQ schema and HowTo schema are particularly valuable because they mirror the question-answering format that AI systems use. NewsArticle schema with complete author information signals content quality. Article schema with speakable markup may also influence AI voice and summary responses.",
        },
        {
          q: "Is AI SEO different from traditional SEO?",
          a: "AI SEO (or GEO — Generative Engine Optimization) shares foundations with traditional SEO but has different emphases. AI systems care more about content structure, factual accuracy, entity clarity, and author authority. They care less about keyword density and traditional link signals. Both approaches should be pursued in parallel.",
        },
      ]}
      relatedTools={[
        { href: "/chatgpt-citation-checker", label: "ChatGPT Citation Checker" },
        { href: "/google-news-validator", label: "Google News Validator" },
        { href: "/news-schema-generator", label: "Schema Generator" },
        { href: "/google-discover-checker", label: "Discover Checker" },
        { href: "/news-seo-checker", label: "News SEO Checker" },
      ]}
    />
  );
}
