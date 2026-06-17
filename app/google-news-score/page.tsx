import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "Google News Score – Calculate Your Article's Google News Readiness",
  description:
    "Calculate your article's Google News readiness score out of 100. Get a detailed breakdown of NewsArticle schema, technical SEO, author signals, and publisher factors.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/google-news-score" },
};

export default function GoogleNewsScorePage() {
  return (
    <LandingPageTemplate
      title="Google News Score"
      metaTitle="Google News Score – Calculate Your Article's Readiness"
      metaDescription="Calculate your article's Google News score out of 100."
      badge="Free Tool · Readiness Score"
      headline="Google News Score – How Ready Is Your Article for Google News?"
      subheadline="Get a comprehensive Google News readiness score from 0 to 100. Our scoring algorithm evaluates NewsArticle schema, technical SEO, author authority, publisher setup, and discovery signals."
      ctaText="Calculate My Score"
      ctaHref="/#analyze"
      features={[
        "Overall Google News Score (0-100)",
        "NewsArticle schema score",
        "Technical SEO score",
        "Author authority score",
        "Publisher setup score",
        "Discover readiness score",
        "AI citation readiness score",
        "News sitemap check",
        "Core Web Vitals score",
        "Mobile usability score",
        "Indexability score",
        "Detailed improvement recommendations",
      ]}
      sections={[
        {
          heading: "How We Calculate Your Google News Score",
          content: `<p>Our Google News Score is a composite metric that evaluates your article across six key dimensions, each weighted based on its importance for Google News inclusion:</p>
<ul>
<li><strong>NewsArticle Schema (25%):</strong> The completeness and accuracy of your structured data markup. This is the most heavily weighted factor because it's the primary technical signal Google uses to identify news content.</li>
<li><strong>Technical SEO (20%):</strong> Indexability, canonical tags, robots.txt, sitemap inclusion, HTTPS, and other technical factors.</li>
<li><strong>Author & Publisher (20%):</strong> Author byline presence, publisher name, logo, organization schema, and transparency signals.</li>
<li><strong>Discover Signals (15%):</strong> Image quality, content freshness, mobile experience, and Core Web Vitals.</li>
<li><strong>AI Citation Readiness (10%):</strong> FAQ schema, llms.txt, AI crawler access, and structured content.</li>
<li><strong>Article SEO (10%):</strong> Title optimization, meta description, heading structure, and on-page factors.</li>
</ul>`,
        },
        {
          heading: "What a Score of 90+ Means",
          content: `<p>A Google News Score of 90 or above indicates that your article is well-optimized for Google News inclusion. Articles with scores in this range have:</p>
<ul>
<li>Complete and valid NewsArticle JSON-LD schema with all required fields</li>
<li>Clear author attribution with linked profiles</li>
<li>Publisher information with organization schema</li>
<li>Properly sized images (1200px+ width)</li>
<li>No indexability issues (no noindex, not blocked in robots.txt)</li>
<li>Canonical URLs set correctly</li>
<li>Fast load times and good Core Web Vitals</li>
</ul>
<p>Note that even with a perfect technical score, inclusion in Google News also depends on your publisher status, editorial quality, and content originality — factors our tool cannot fully assess from the URL alone.</p>`,
        },
        {
          heading: "Improving Your Google News Score",
          content: `<p>If your score is below 70, here are the most impactful improvements:</p>
<p><strong>Score 0-40 (Critical Issues):</strong> You likely have fundamental indexability problems or missing required schema. Check if your article is blocked by robots.txt or has a noindex tag. Add basic NewsArticle schema immediately.</p>
<p><strong>Score 40-70 (Needs Improvement):</strong> You have some schema in place but it may be incomplete. Common fixes include adding missing required fields (datePublished, author, publisher logo), fixing canonical tags, and improving image quality.</p>
<p><strong>Score 70-90 (Good, Room for Improvement):</strong> Your article is technically eligible but could be better optimized. Focus on adding FAQ schema, improving content depth, and enhancing author profiles.</p>
<p><strong>Score 90-100 (Excellent):</strong> Your article is technically well-optimized. Continue focusing on content quality, editorial standards, and building publisher authority.</p>`,
        },
      ]}
      faqs={[
        {
          q: "Does a high Google News Score guarantee inclusion in Google News?",
          a: "No. A high score means your article is technically well-optimized for Google News, but inclusion also depends on: your publisher's standing with Google News Publisher Center, content quality and originality, editorial standards, and whether your publication is approved as a Google News source. Our score covers the technical factors you can control.",
        },
        {
          q: "How often does the score update?",
          a: "The score is calculated fresh each time you analyze a URL. Run the analysis after making changes to verify improvements. We recommend re-checking new articles within 24 hours of publication to catch any issues.",
        },
        {
          q: "What's the most important factor in the Google News Score?",
          a: "NewsArticle schema completeness has the highest weight (25%) because it's the primary technical signal Google uses to identify and categorize news content. Without valid NewsArticle schema, your articles will struggle to appear in Top Stories or Google News regardless of other optimization.",
        },
        {
          q: "Can I improve my score without changing the article content?",
          a: "Yes! Many score improvements are purely technical: adding/fixing structured data markup, correcting canonical tags, ensuring proper indexability, and improving image markup. These can often be done without changing the article's editorial content.",
        },
      ]}
      relatedTools={[
        { href: "/google-news-validator", label: "Google News Validator" },
        { href: "/news-schema-generator", label: "Schema Generator" },
        { href: "/news-sitemap-validator", label: "Sitemap Validator" },
        { href: "/google-discover-checker", label: "Discover Checker" },
        { href: "/ai-citation-checker", label: "AI Citation Checker" },
      ]}
    />
  );
}
