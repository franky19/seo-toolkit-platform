import type { Metadata } from "next";
import LandingPageTemplate from "@/components/landing-page-template";

export const metadata: Metadata = {
  title: "Google Discover Checker – Optimize Your Articles for Google Discover",
  description:
    "Check if your articles are optimized for Google Discover. Validate image quality, content freshness, E-E-A-T signals, and Discover eligibility requirements.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/google-discover-checker" },
};

export default function GoogleDiscoverCheckerPage() {
  return (
    <LandingPageTemplate
      title="Google Discover Checker"
      metaTitle="Google Discover Checker – Optimize for Google Discover Feed"
      metaDescription="Check if your articles meet Google Discover requirements."
      badge="Free Tool · Google Discover Optimization"
      headline="Google Discover Checker – Get Your Articles in the Discovery Feed"
      subheadline="Analyze your articles for Google Discover eligibility. Check image quality, E-E-A-T signals, content freshness, mobile experience, and the Core Web Vitals signals that influence Discover performance."
      ctaText="Check Discover Readiness"
      ctaHref="/#analyze"
      features={[
        "Large image check (1200px minimum width)",
        "Content freshness signals",
        "E-E-A-T (Experience, Expertise, Authoritativeness, Trust)",
        "Mobile-first design validation",
        "Core Web Vitals signals (LCP, CLS, INP)",
        "Open Graph image tags",
        "Twitter Card markup",
        "Article engagement signals",
        "Content depth and quality signals",
        "Author authority indicators",
        "Avoid clickbait headline detection",
        "Google News Publisher Center status",
      ]}
      sections={[
        {
          heading: "What is Google Discover?",
          content: `<p>Google Discover is a personalized content feed that appears on the Google app homepage and Chrome's New Tab page. Unlike traditional search where users search for specific queries, Discover proactively surfaces content based on users' interests, search history, and engagement patterns.</p>
<p>Google Discover reaches over 800 million users monthly and can drive massive amounts of traffic to publishers. A single article featured in Discover can receive tens of thousands of visitors. For news publishers and content creators, optimizing for Discover is as important as optimizing for traditional search.</p>
<p>Discover content is personalized for each user, making it harder to predict what will be surfaced. However, there are specific technical and editorial signals that make content more eligible for Discover.</p>`,
        },
        {
          heading: "Image Requirements for Google Discover",
          content: `<p>Images are one of the most critical factors for Google Discover. Articles with large, high-quality images perform significantly better in Discover. Here are the key image requirements:</p>
<ul>
<li><strong>Minimum Width:</strong> 1200 pixels. Google strongly recommends images at least 1200px wide for large card display in Discover.</li>
<li><strong>Aspect Ratio:</strong> The recommended aspect ratio is 16:9 for the main article image. Avoid very narrow or very tall images.</li>
<li><strong>Image Quality:</strong> Use original, high-resolution images. Stock photos and generic images perform worse than original photography or compelling custom graphics.</li>
<li><strong>max-image-preview:</strong> Set the robots meta tag to max-image-preview:large to allow Google to display large images in Discover.</li>
<li><strong>Open Graph:</strong> Include og:image tags with the correct image URL. The og:image should match the main article image.</li>
</ul>`,
        },
        {
          heading: "E-E-A-T and Content Quality for Discover",
          content: `<p>Google Discover heavily prioritizes E-E-A-T content. Experience, Expertise, Authoritativeness, and Trustworthiness are the four pillars that Google uses to evaluate content quality for Discover inclusion.</p>
<p><strong>Experience:</strong> Does the author have first-hand experience with the topic? Articles based on original reporting, personal experience, or direct research perform better than aggregated content.</p>
<p><strong>Expertise:</strong> Are the authors recognized experts in their field? Include author bios with credentials, years of experience, and relevant publications.</p>
<p><strong>Authoritativeness:</strong> Is your publication recognized as an authority in your niche? Brand recognition, backlinks from authoritative sources, and mentions in reputable outlets all contribute.</p>
<p><strong>Trustworthiness:</strong> Does your site have clear editorial standards, privacy policies, contact information, and fact-checking practices? Transparency builds trust with both Google and readers.</p>`,
        },
        {
          heading: "Content Freshness in Google Discover",
          content: `<p>While Google Discover can surface older evergreen content, news publishers benefit most from freshness. Here's how to optimize content freshness for Discover:</p>
<ul>
<li>Publish articles with accurate datePublished and dateModified in NewsArticle schema</li>
<li>Update evergreen articles when new information becomes available, updating the dateModified</li>
<li>Avoid backdating articles to manipulate freshness signals — Google can detect this</li>
<li>Submit updated articles to your news sitemap to prompt faster recrawling</li>
<li>For breaking news, publish quickly and update the article as the story develops</li>
</ul>`,
        },
      ]}
      faqs={[
        {
          q: "How do I get my content into Google Discover?",
          a: "There's no direct way to submit content to Google Discover. Instead, optimize for Discover by: implementing NewsArticle schema, using large original images (1200px+ wide), demonstrating E-E-A-T, maintaining fast page speeds, and publishing high-quality original content consistently. Building a loyal audience that engages with your content also signals quality to Google.",
        },
        {
          q: "Why did my Discover traffic suddenly drop?",
          a: "Discover traffic is inherently volatile. Common causes for drops include: Core Web Vitals degradation (especially LCP and CLS), content quality issues, reduced content publication frequency, or Google's algorithm updates. Check Google Search Console's Discover performance report for data, and our Discover Checker to identify technical issues.",
        },
        {
          q: "Does Google Discover work for non-news sites?",
          a: "Yes! While news publishers benefit significantly from Discover, any website can appear in Discover. Evergreen content that matches user interests — how-to guides, in-depth explainers, product reviews — can also appear. The key is high-quality content with strong engagement signals.",
        },
        {
          q: "What Core Web Vitals matter most for Discover?",
          a: "All three Core Web Vitals (LCP, CLS, INP) matter for Discover. LCP (Largest Contentful Paint) affects how quickly your article appears to load. CLS (Cumulative Layout Shift) affects visual stability. INP (Interaction to Next Paint) measures responsiveness. Google may reduce Discover traffic if your Core Web Vitals scores are consistently poor.",
        },
        {
          q: "Can I track Discover performance?",
          a: "Yes, Google Search Console has a dedicated Discover performance report that shows impressions, clicks, and CTR for your content in Google Discover. Look for it under Performance > Discover in your Search Console property.",
        },
      ]}
      relatedTools={[
        { href: "/google-news-validator", label: "Google News Validator" },
        { href: "/news-schema-generator", label: "Schema Generator" },
        { href: "/ai-citation-checker", label: "AI Citation Checker" },
        { href: "/news-seo-checker", label: "News SEO Checker" },
        { href: "/google-news-score", label: "Google News Score" },
      ]}
    />
  );
}
