export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorTitle: string;
  category: string;
  readTime: number;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "google-news-requirements",
    title: "Google News Requirements in 2025: Complete Publisher Checklist",
    description:
      "Everything you need to know about Google News requirements in 2025. Covers technical SEO, NewsArticle schema, publisher eligibility, editorial guidelines, and a complete compliance checklist.",
    date: "2025-06-01",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "Google News",
    readTime: 12,
    tags: ["google news", "news seo", "structured data", "publisher seo"],
    content: `
<p>Getting your publication into Google News is one of the most powerful ways to drive organic traffic to your articles. With over 1 billion monthly users, Google News can send thousands of readers to your stories within minutes of publication.</p>

<p>But Google News has specific requirements, and failing to meet even one critical requirement can prevent your content from being indexed. This guide covers everything you need to know about Google News requirements in 2025.</p>

<h2>Technical Requirements for Google News</h2>

<p>Before worrying about editorial guidelines, you need to ensure your website meets the technical requirements that allow Google to crawl and understand your content.</p>

<h3>1. NewsArticle Schema Markup</h3>

<p>Google strongly recommends NewsArticle structured data on every article page. Without it, Google may not recognize your content as a news article. The schema must include:</p>

<ul>
<li><strong>@type: "NewsArticle"</strong> (or "Article" at minimum)</li>
<li><strong>headline:</strong> Maximum 110 characters</li>
<li><strong>image:</strong> At least 1200px wide, provided as ImageObject with url, width, and height</li>
<li><strong>datePublished:</strong> ISO 8601 format</li>
<li><strong>dateModified:</strong> ISO 8601 format</li>
<li><strong>author:</strong> Person or Organization schema with name</li>
<li><strong>publisher:</strong> Organization schema with name and logo</li>
</ul>

<h3>2. Indexability</h3>

<p>Your article pages must be indexable by Google. Common indexability mistakes include:</p>
<ul>
<li>noindex meta robots tags on article pages</li>
<li>Blocking Googlebot in robots.txt</li>
<li>Soft 404 errors</li>
<li>Requiring login to access articles</li>
</ul>

<h3>3. News Sitemap</h3>

<p>A Google News sitemap is a specialized XML sitemap containing only articles published in the last 48 hours. Submitting one to Google Search Console dramatically speeds up indexing. See our <a href="/news-sitemap-validator">News Sitemap Validator</a> for structure requirements.</p>

<h3>4. Canonical URLs</h3>

<p>Each article should have a self-referencing canonical tag. For syndicated content, the canonical should point to the original source. Duplicate content issues can prevent Google News inclusion.</p>

<h3>5. HTTPS</h3>

<p>All pages must be served over HTTPS. HTTP-only pages are not eligible for Google News.</p>

<h2>Publisher Requirements</h2>

<p>Technical compliance is just the foundation. Google also evaluates you as a publisher.</p>

<h3>Google News Publisher Center</h3>

<p>While Google automatically crawls and includes some publications in Google News based on technical signals, applying to Google News Publisher Center at <a href="https://publishercenter.google.com" rel="noopener noreferrer" target="_blank">publishercenter.google.com</a> gives you more control and visibility.</p>

<p>To apply, you need:</p>
<ul>
<li>A website that publishes original news content</li>
<li>Clear ownership and editorial responsibility information</li>
<li>An About page with publication name, location (if applicable), and editorial staff</li>
<li>A clear distinction between news articles and other content types</li>
</ul>

<h3>Authorship and Bylines</h3>

<p>Every article should have a clear, real author. Anonymous bylines ("Staff Writer" or "Editorial Team") are acceptable but less authoritative than named individuals. Google's E-E-A-T evaluation considers author expertise.</p>

<h3>Editorial Standards</h3>

<p>Google expects news publishers to adhere to journalistic standards:</p>
<ul>
<li>Clear distinction between news reporting and opinion</li>
<li>Corrections policy</li>
<li>No deceptive or manipulative headlines</li>
<li>No hateful content</li>
<li>No misinformation</li>
</ul>

<h2>Content Requirements</h2>

<h3>Original Reporting</h3>

<p>Google News prioritizes original content. While aggregated or reprinted content may appear, original reporting receives preferential treatment in Top Stories and News surfaces.</p>

<h3>Freshness</h3>

<p>News content must be timely. Articles published more than 3 days ago are typically not featured in News feeds (though they can still appear in News search results).</p>

<h3>Not Eligible Content</h3>

<p>The following content types are excluded from Google News:</p>
<ul>
<li>Primarily opinion, satire, or entertainment</li>
<li>Real estate, classified, or job listings</li>
<li>Product or service listings</li>
<li>Pure press releases without editorial commentary</li>
<li>Content primarily in a language not supported by the publication's declared language</li>
</ul>

<h2>Google News Compliance Checklist</h2>

<p>Use this checklist before launching a new publication or conducting a Google News audit:</p>

<ul>
<li>☐ NewsArticle JSON-LD schema on all article pages</li>
<li>☐ Schema includes: headline, image (1200px+), datePublished, author, publisher</li>
<li>☐ Publisher logo in schema (max 600×60px)</li>
<li>☐ All article URLs are indexable (no noindex, no robots.txt blocking)</li>
<li>☐ HTTPS on all pages</li>
<li>☐ News sitemap submitted to Google Search Console</li>
<li>☐ Google News Publisher Center registration</li>
<li>☐ About page with editorial information</li>
<li>☐ Contact page</li>
<li>☐ Privacy Policy</li>
<li>☐ Clear author bylines on all articles</li>
<li>☐ Canonical tags on all article pages</li>
<li>☐ No duplicate content issues</li>
<li>☐ Mobile-friendly pages</li>
<li>☐ Reasonable page load speeds</li>
</ul>

<h2>How to Verify Your Compliance</h2>

<p>Use our free <a href="/google-news-validator">Google News Validator</a> to check your articles against these requirements automatically. Enter any article URL and get an instant report on what's working and what needs to be fixed.</p>

<p>Also check Google Search Console's URL Inspection tool for specific crawling and indexing issues. The Coverage report will show any systematic problems with your site's indexability.</p>
    `,
  },
  {
    slug: "how-to-get-indexed-in-google-news",
    title: "How to Get Indexed in Google News: Step-by-Step Guide for Publishers",
    description:
      "A complete step-by-step guide to getting your publication indexed in Google News. From technical setup to Publisher Center approval and ongoing optimization.",
    date: "2025-06-05",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "Google News",
    readTime: 10,
    tags: ["google news indexing", "google news publisher center", "news seo"],
    content: `
<p>Getting indexed in Google News is the goal of every news publisher. Whether you run a local newspaper, a niche industry blog, or a major media outlet, Google News can be one of your largest traffic sources.</p>

<p>This guide walks you through every step of the process, from initial technical setup to maintaining your Google News presence long-term.</p>

<h2>Step 1: Implement NewsArticle Schema</h2>

<p>The first step is implementing NewsArticle structured data on all your article pages. This JSON-LD markup tells Google that your page contains a news article and provides the metadata Google needs to index it correctly.</p>

<p>At minimum, include these fields in your NewsArticle schema:</p>
<ul>
<li>headline</li>
<li>image (1200px+ wide)</li>
<li>datePublished</li>
<li>dateModified</li>
<li>author (Person with name and url)</li>
<li>publisher (Organization with name and logo)</li>
</ul>

<p>After implementing, validate using Google's Rich Results Test at search.google.com/test/rich-results.</p>

<h2>Step 2: Set Up Your News Sitemap</h2>

<p>A news sitemap is a special XML file that lists your most recent articles (published in the last 48 hours) with publication metadata. Submitting this to Google Search Console tells Google to prioritize crawling these URLs.</p>

<p>Most major CMS platforms have plugins that auto-generate news sitemaps:</p>
<ul>
<li><strong>WordPress:</strong> Yoast SEO, Rank Math, or The SEO Framework all include news sitemap features</li>
<li><strong>Ghost:</strong> Includes a basic sitemap; may need customization for news format</li>
<li><strong>Custom CMS:</strong> Generate dynamically using your publishing timestamp data</li>
</ul>

<p>Submit your news sitemap at Search Console > Sitemaps. Also add it to your robots.txt:</p>
<pre><code>Sitemap: https://yourdomain.com/news-sitemap.xml</code></pre>

<h2>Step 3: Ensure Technical Compliance</h2>

<p>Before applying to Google News, verify:</p>
<ul>
<li>All article pages load over HTTPS</li>
<li>No noindex tags on article pages</li>
<li>Googlebot is not blocked in robots.txt</li>
<li>Pages load in under 3 seconds (mobile)</li>
<li>No login walls on article content</li>
<li>Canonical URLs are set correctly</li>
</ul>

<p>Use our free <a href="/">Google News SEO Toolkit</a> to run a comprehensive technical audit of your articles.</p>

<h2>Step 4: Apply to Google News Publisher Center</h2>

<p>Visit publishercenter.google.com and click "Add publication." You'll need to verify ownership of your website (similar to Google Search Console verification).</p>

<p>Fill in all publisher information accurately:</p>
<ul>
<li>Publication name (must match your site's actual name)</li>
<li>Website URL</li>
<li>Country</li>
<li>Language</li>
<li>Content categories (select up to 5 that best describe your coverage)</li>
</ul>

<p>Google reviews new publisher applications. The review process can take a few days to a few weeks. During this time, your articles may still appear in Google News search results (if technically compliant), but you won't have full Publisher Center benefits.</p>

<h2>Step 5: Set Up Publisher Center Properties</h2>

<p>Once approved, configure your Publisher Center properties:</p>

<h3>Publication Details</h3>
<ul>
<li>Upload your publication logo (used in Google News display)</li>
<li>Add a description of your publication</li>
<li>Set your publication's primary content categories</li>
</ul>

<h3>Content Settings</h3>
<ul>
<li>Configure which sections of your site are news content vs. other pages</li>
<li>Exclude non-news pages (about pages, contact pages, category archives) from News indexing</li>
</ul>

<h2>Step 6: Monitor Performance in Google Search Console</h2>

<p>After setup, monitor your Google News performance in Search Console:</p>
<ul>
<li><strong>Performance > News:</strong> Shows impressions and clicks specifically from Google News</li>
<li><strong>Performance > Discover:</strong> Shows performance in Google Discover feed</li>
<li><strong>URL Inspection:</strong> Check individual article URLs for indexing status</li>
<li><strong>Sitemaps:</strong> Monitor your news sitemap for errors</li>
</ul>

<h2>Step 7: Maintain Your Google News Presence</h2>

<p>Getting indexed is just the beginning. Maintaining strong Google News performance requires ongoing attention:</p>

<ul>
<li><strong>Consistent publishing:</strong> Publish fresh content regularly. Inactive publications can lose News prominence.</li>
<li><strong>Quality over quantity:</strong> Focus on original, well-reported stories rather than thin rewrites of wire service content.</li>
<li><strong>Monitor for errors:</strong> Check Search Console weekly for new coverage errors or sitemap issues.</li>
<li><strong>Update schema as Google evolves:</strong> Google updates its structured data requirements periodically. Run our validator quarterly to catch any new requirements.</li>
<li><strong>Author pages:</strong> Build out author profile pages with credentials, bios, and social links to strengthen E-E-A-T signals.</li>
</ul>

<h2>Common Reasons for Google News Rejection</h2>

<p>If your application is rejected or your content stops appearing in Google News, common causes include:</p>

<ul>
<li>Content that doesn't qualify as news (opinion, marketing, entertainment-only)</li>
<li>Missing or invalid structured data</li>
<li>Deceptive or sensationalist content</li>
<li>Thin, low-quality, or duplicate content</li>
<li>Poor site technical health (slow loading, mobile issues)</li>
<li>Lack of editorial transparency (no about page, no author information)</li>
</ul>

<p>If rejected, address the issues and wait at least 30 days before reapplying.</p>
    `,
  },
  {
    slug: "news-schema-guide",
    title: "NewsArticle Schema Guide: Complete JSON-LD Implementation for 2025",
    description:
      "Complete guide to implementing NewsArticle JSON-LD schema for Google News. Includes all required and recommended fields, examples, common errors, and validation tips.",
    date: "2025-06-08",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "Schema Markup",
    readTime: 15,
    tags: ["newsarticle schema", "json-ld", "structured data", "google news"],
    content: `
<p>NewsArticle schema is the foundation of Google News SEO. Without proper structured data markup, your articles cannot fully participate in Google News, Top Stories, or AI-powered search surfaces. This guide covers everything you need to implement NewsArticle schema correctly in 2025.</p>

<h2>Understanding the Schema.org Vocabulary</h2>

<p>Schema.org is a collaborative project between Google, Bing, Yahoo, and Yandex to create a shared vocabulary for structured data on the web. NewsArticle is a type in the schema.org hierarchy: Thing > CreativeWork > Article > NewsArticle.</p>

<p>Google recommends JSON-LD (JavaScript Object Notation for Linked Data) as the preferred format for structured data, though Microdata and RDFa are also supported. JSON-LD is implemented as a <code>&lt;script&gt;</code> tag and doesn't require modifying your HTML structure.</p>

<h2>Required Fields for NewsArticle</h2>

<p>The following fields are required or strongly recommended by Google for NewsArticle schema:</p>

<h3>@context and @type</h3>
<pre><code>{
  "@context": "https://schema.org",
  "@type": "NewsArticle"
}</code></pre>

<h3>headline</h3>
<p>The article's title. Maximum 110 characters. Must not be promotional or clickbait.</p>
<pre><code>"headline": "Scientists Discover New Species of Deep-Sea Octopus"</code></pre>

<h3>image</h3>
<p>The main article image as an ImageObject. Must be at least 1200 pixels wide for eligibility in Top Stories rich results.</p>
<pre><code>"image": {
  "@type": "ImageObject",
  "url": "https://example.com/octopus-discovery.jpg",
  "width": 1200,
  "height": 675
}</code></pre>

<h3>datePublished</h3>
<p>The date and time the article was first published in ISO 8601 format. This MUST be the original publication date, not a modification date.</p>
<pre><code>"datePublished": "2025-03-15T09:30:00Z"</code></pre>

<h3>dateModified</h3>
<p>The date and time the article was most recently modified. If the article has never been modified, use the same value as datePublished.</p>
<pre><code>"dateModified": "2025-03-15T14:00:00Z"</code></pre>

<h3>author</h3>
<p>The author(s) of the article. Can be a Person or Organization. Use an array for multiple authors.</p>
<pre><code>"author": [{
  "@type": "Person",
  "name": "Dr. Sarah Johnson",
  "url": "https://example.com/authors/sarah-johnson",
  "sameAs": "https://twitter.com/sarahjohnson"
}]</code></pre>

<h3>publisher</h3>
<p>The organization responsible for publishing the article. The logo must meet Google's size requirements: maximum 600px × 60px.</p>
<pre><code>"publisher": {
  "@type": "Organization",
  "name": "Science Daily News",
  "logo": {
    "@type": "ImageObject",
    "url": "https://example.com/logo.png",
    "width": 200,
    "height": 60
  }
}</code></pre>

<h2>Complete NewsArticle Schema Example</h2>

<pre><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Scientists Discover New Species of Deep-Sea Octopus",
  "description": "Marine biologists have identified a new species of octopus living at depths of 3,000 meters in the Pacific Ocean.",
  "image": {
    "@type": "ImageObject",
    "url": "https://example.com/octopus.jpg",
    "width": 1200,
    "height": 675
  },
  "datePublished": "2025-03-15T09:30:00Z",
  "dateModified": "2025-03-15T14:00:00Z",
  "author": [{
    "@type": "Person",
    "name": "Dr. Sarah Johnson",
    "url": "https://example.com/authors/sarah-johnson",
    "jobTitle": "Science Editor",
    "sameAs": [
      "https://twitter.com/sarahjohnson",
      "https://www.linkedin.com/in/sarahjohnson"
    ]
  }],
  "publisher": {
    "@type": "Organization",
    "name": "Science Daily News",
    "url": "https://example.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png",
      "width": 200,
      "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://example.com/science/new-octopus-species"
  },
  "url": "https://example.com/science/new-octopus-species",
  "articleSection": "Science",
  "keywords": "octopus, marine biology, deep sea, new species, Pacific Ocean"
}
&lt;/script&gt;</code></pre>

<h2>Common Schema Validation Errors</h2>

<ul>
<li><strong>"headline" missing:</strong> The most common error. Every NewsArticle must have a headline field.</li>
<li><strong>Image too small:</strong> Images must be at least 1200px wide for Top Stories eligibility. Smaller images will cause a "Warning" in Rich Results Test.</li>
<li><strong>Invalid date format:</strong> Dates must be in ISO 8601 format. "March 15, 2025" is invalid; "2025-03-15" is valid.</li>
<li><strong>Publisher logo too large:</strong> The logo URL's image must not exceed 600×60 pixels. Larger logos cause errors.</li>
<li><strong>No mainEntityOfPage:</strong> This optional field is recommended for connecting the schema to the specific page URL.</li>
</ul>

<h2>Validating Your NewsArticle Schema</h2>

<p>Always validate your schema before publishing:</p>
<ol>
<li>Use <a href="https://search.google.com/test/rich-results" rel="noopener noreferrer" target="_blank">Google's Rich Results Test</a> — enter your URL or paste the HTML</li>
<li>Check the Schema.org validator at validator.schema.org</li>
<li>Use our free <a href="/google-news-validator">Google News Validator</a> for comprehensive news-specific validation</li>
</ol>

<p>After your article is published and indexed, you can also view the parsed structured data in Google Search Console's URL Inspection tool under "Enhancements."</p>
    `,
  },
  {
    slug: "google-discover-guide",
    title: "Google Discover Guide: How to Get Your Articles in the Discovery Feed",
    description:
      "Complete guide to getting articles in Google Discover. Covers image requirements, E-E-A-T, content freshness, Core Web Vitals, and strategies to increase Discover traffic.",
    date: "2025-06-10",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "Google Discover",
    readTime: 11,
    tags: ["google discover", "discover optimization", "content marketing", "seo"],
    content: `
<p>Google Discover is one of the most powerful, yet least understood, content surfaces for publishers. Unlike search, you don't chase specific keywords — Google brings relevant content to users based on their interests. This guide explains how to optimize for Discover and increase your chances of appearing in the feed.</p>

<h2>What Is Google Discover?</h2>

<p>Google Discover is a content feed that appears on the Google app's homepage (replacing the old Google Now), on the Chrome New Tab page, and on google.com on mobile devices. The feed is personalized for each user based on their Google account history, search behavior, and explicitly stated interests.</p>

<p>For publishers, Discover can be a massive traffic source. A single article featured prominently in Discover can receive 50,000-500,000+ pageviews. Unlike search traffic which requires users to have intent and search for something, Discover traffic comes from users who didn't even know they wanted your content — it finds them.</p>

<h2>How Google Discover Works</h2>

<p>Google Discover uses machine learning to determine which content to surface to which users. Key factors include:</p>

<ul>
<li><strong>Content relevance to user interests</strong></li>
<li><strong>Content quality and E-E-A-T signals</strong></li>
<li><strong>Content freshness</strong></li>
<li><strong>Publisher authority</strong></li>
<li><strong>Image quality</strong></li>
<li><strong>Engagement predictions (CTR, time on page)</strong></li>
<li><strong>Core Web Vitals scores</strong></li>
</ul>

<h2>Image Optimization for Google Discover</h2>

<p>Images are the most visible element of a Discover card. Getting your images right is critical.</p>

<h3>Size Requirements</h3>
<p>For large card display in Discover (the more prominent format), images must be at least 1200 pixels wide. Small images result in small, thumbnail-style cards that perform significantly worse.</p>

<h3>Opt-in to Large Images</h3>
<p>Add this to your pages' robots meta tags to explicitly enable large image preview in Discover:</p>
<pre><code>&lt;meta name="robots" content="max-image-preview:large"&gt;</code></pre>

<h3>Image Quality Best Practices</h3>
<ul>
<li>Use original photography when possible — Google can detect stock photo usage</li>
<li>High contrast, visually striking images perform better</li>
<li>People in images (authentic, real-person photography) tend to drive higher CTR</li>
<li>Match the image to the article topic — misleading thumbnails can harm your Discover standing</li>
</ul>

<h2>Content Quality and E-E-A-T</h2>

<p>Google's quality raters evaluate content against E-E-A-T criteria. For Discover, these signals matter:</p>

<h3>Experience</h3>
<p>Does the content demonstrate first-hand experience? Original interviews, on-the-ground reporting, personal expertise, and real-world observations signal experience. Content that clearly synthesizes other sources without adding original insight scores lower.</p>

<h3>Expertise</h3>
<p>Are your authors recognized experts? Include detailed author bios, credentials, years of experience, and links to their other work. Google's quality guidelines specifically mention "author expertise" as a Discover factor.</p>

<h3>Authoritativeness</h3>
<p>Is your publication recognized in its niche? Build authority through: consistent quality publishing, getting cited by other reputable sources, building a social media following, and being mentioned by established publications.</p>

<h3>Trustworthiness</h3>
<p>Transparency signals trust. Ensure you have: a clear About page, editorial policies, a corrections policy, transparent advertising disclosure, and accurate author attributions.</p>

<h2>Content Freshness Strategy</h2>

<p>Fresh content performs better in Discover, but "fresh" doesn't just mean new. Here's how to maximize freshness signals:</p>

<ul>
<li>Publish timely takes on trending topics quickly</li>
<li>Update evergreen articles when new information becomes available, and update the dateModified in your schema</li>
<li>Avoid using past dates for new articles — always use the actual publication date</li>
<li>Breaking news and developing stories often get featured multiple times as they evolve</li>
</ul>

<h2>Core Web Vitals and Discover Performance</h2>

<p>Google has confirmed that Core Web Vitals scores affect Discover eligibility. Poor Core Web Vitals can result in reduced Discover exposure. Target these benchmarks:</p>

<ul>
<li><strong>LCP (Largest Contentful Paint):</strong> Under 2.5 seconds</li>
<li><strong>CLS (Cumulative Layout Shift):</strong> Under 0.1</li>
<li><strong>INP (Interaction to Next Paint):</strong> Under 200ms</li>
</ul>

<p>Common Discover performance killers include: slow-loading large images, ads that shift content (CLS), and JavaScript-heavy pages (slow INP). Optimize your article templates for all three metrics.</p>

<h2>Monitoring Discover Performance</h2>

<p>Track your Discover performance in Google Search Console:</p>
<ul>
<li>Go to Performance > Discover</li>
<li>Filter by URL to see which specific articles are performing</li>
<li>Monitor impressions, clicks, and CTR over time</li>
<li>Compare article performance to identify content patterns that Discover rewards</li>
</ul>

<p>Note that Discover traffic can be highly variable. A single viral article can spike your numbers, making trend analysis more useful than single-month comparisons.</p>
    `,
  },
  {
    slug: "ai-search-optimization-guide",
    title: "AI Search Optimization Guide: How to Rank in ChatGPT, Gemini & Perplexity",
    description:
      "Complete guide to AI search optimization (GEO). Learn how to optimize your content for ChatGPT Search, Google Gemini, Perplexity AI, and other AI search engines.",
    date: "2025-06-12",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "AI Search",
    readTime: 14,
    tags: ["ai search", "chatgpt seo", "gemini optimization", "perplexity", "geo"],
    content: `
<p>AI search is no longer the future — it's the present. ChatGPT Search, Google Gemini, Perplexity AI, and other AI-powered search surfaces are changing how people find information. For publishers and content creators, this represents both a challenge and a massive opportunity.</p>

<p>This guide explains how AI search works, why it matters for your content strategy, and the specific optimization techniques that increase your chances of being cited by AI systems.</p>

<h2>What is AI Search Optimization (GEO)?</h2>

<p>GEO stands for Generative Engine Optimization — optimizing content to rank in AI-generated search responses. Unlike traditional SEO where you aim to appear in a list of 10 blue links, GEO aims to have your content cited, summarized, or referenced in AI-generated answers.</p>

<p>The distinction matters because AI search responses are usually more direct, synthesizing information from multiple sources into a single answer. Being one of those cited sources is highly valuable for credibility and referral traffic.</p>

<h2>How AI Search Engines Discover and Cite Content</h2>

<p>Each major AI search engine has a slightly different approach:</p>

<h3>ChatGPT Search</h3>
<p>OpenAI's search feature uses real-time web browsing via the OAI-SearchBot crawler. It searches the web, reads pages, and incorporates recent content into responses with citations. ChatGPT Search shows up as a traffic source in analytics as referrals from chatgpt.com.</p>

<h3>Google Gemini with Search</h3>
<p>Gemini integrates Google's search index for real-time information. It draws from the same sources that rank well in traditional Google Search, so traditional SEO signals matter. AI Overviews (formerly SGE) show AI-generated summaries at the top of Google results, with links to sources.</p>

<h3>Perplexity AI</h3>
<p>Perplexity is a search engine built around AI-generated answers. It actively crawls the web and shows source citations prominently. Publishers have reported significant referral traffic from Perplexity citations. Perplexity tends to favor authoritative, well-structured content with specific data points.</p>

<h2>GEO Strategy 1: Optimize for Questions</h2>

<p>AI search is fundamentally question-answering. Users ask questions, and AI provides answers. Structure your content around questions:</p>

<ul>
<li>Include FAQ sections on all major articles</li>
<li>Use question-format H2 and H3 subheadings</li>
<li>Answer questions directly and concisely before expanding</li>
<li>Implement FAQ schema markup to help AI identify Q&A content</li>
</ul>

<p>Example: Instead of a subheading like "Publisher Logo Size," use "What size should the publisher logo be for Google News?" This directly mirrors how AI search users phrase queries.</p>

<h2>GEO Strategy 2: Build Entity Authority</h2>

<p>AI systems understand entities — named people, places, organizations, and concepts. Building entity authority for your publication and authors is crucial for GEO:</p>

<ul>
<li><strong>Consistent entity naming:</strong> Use your publication's exact name consistently across all pages, social profiles, and mentions</li>
<li><strong>sameAs links:</strong> In your Organization schema, include sameAs links to your Wikipedia page (if you have one), Wikidata entry, social profiles, and other authoritative mentions</li>
<li><strong>Author profiles:</strong> Build comprehensive author pages with credentials, affiliations, social profiles, and notable work</li>
<li><strong>Knowledge panel optimization:</strong> Having a Google Knowledge Panel for your publication or key authors strongly signals authority to AI systems</li>
</ul>

<h2>GEO Strategy 3: Prioritize Original Data and Research</h2>

<p>AI systems love to cite content that contains original statistics, research, or data. This type of content:</p>
<ul>
<li>Gets cited directly with your attribution</li>
<li>Builds backlinks naturally as others cite your data</li>
<li>Establishes you as an authoritative source in your niche</li>
</ul>

<p>Publish original surveys, research reports, data analyses, and proprietary insights regularly. Even small-scale original research (surveying 100 industry professionals) can generate high-value citation opportunities.</p>

<h2>GEO Strategy 4: Implement AI-Specific Technical Optimizations</h2>

<h3>llms.txt</h3>
<p>Create a <code>/llms.txt</code> file at the root of your domain. This emerging standard provides AI systems with a structured overview of your site's most important content in a format optimized for LLMs. Include links to your most authoritative content with brief descriptions.</p>

<h3>AI Crawler Access</h3>
<p>Ensure these AI crawlers are allowed in your robots.txt:</p>
<pre><code>User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /</code></pre>

<h3>Complete Schema Markup</h3>
<p>Implement comprehensive schema markup including: NewsArticle/Article, Organization, Person (for authors), FAQ, HowTo, and Breadcrumb. Rich structured data helps AI systems understand your content's type, context, and authority.</p>

<h2>Measuring AI Search Performance</h2>

<p>Tracking AI citation is still evolving, but here's what you can measure now:</p>

<ul>
<li><strong>Search Console AI Overviews:</strong> If your content appears in Google's AI Overviews, Search Console may show this data</li>
<li><strong>Analytics referrals:</strong> Monitor referral traffic from chatgpt.com, perplexity.ai, and bing.com (for Copilot)</li>
<li><strong>Brand mentions:</strong> Track mentions of your publication name across AI responses manually or with monitoring tools</li>
<li><strong>Branded search growth:</strong> Increased branded searches can indicate growing AI-driven brand awareness</li>
</ul>
    `,
  },
  {
    slug: "chatgpt-seo-guide",
    title: "ChatGPT SEO Guide: How to Get Your Content Cited by ChatGPT",
    description:
      "Step-by-step guide to optimizing your website for ChatGPT Search citations. Learn about OAI-SearchBot, content structure, author signals, and technical ChatGPT SEO.",
    date: "2025-06-14",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "AI Search",
    readTime: 10,
    tags: ["chatgpt seo", "chatgpt search", "openai", "ai citation"],
    content: `
<p>ChatGPT has become one of the most visited websites in the world. With its search feature enabled, it's now a search engine as well as a conversational AI. For publishers, getting cited by ChatGPT is an increasingly valuable goal.</p>

<h2>Understanding ChatGPT Search</h2>

<p>ChatGPT Search allows the AI to browse real-time web content when answering questions. When ChatGPT searches the web, it uses a crawler called OAI-SearchBot to access and read web pages, then incorporates that information into its responses with source citations.</p>

<p>For news publishers specifically, ChatGPT Search is particularly valuable because it provides timely information that the AI's training data may not include. Breaking news, current events, and recent developments are exactly the kind of content ChatGPT needs to browse for.</p>

<h2>Technical Setup for ChatGPT Visibility</h2>

<h3>Verify Crawler Access</h3>
<p>Check your robots.txt for any blocks on OpenAI crawlers:</p>
<pre><code>User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /</code></pre>

<h3>Implement Proper Schema</h3>
<p>NewsArticle schema helps ChatGPT understand your content type. Key fields for ChatGPT visibility include author information (builds credibility), datePublished (confirms freshness), and publisher details (establishes authority).</p>

<h2>Content Optimization for ChatGPT Citation</h2>

<p>ChatGPT prefers to cite content that directly and clearly answers questions. Optimize each article by:</p>

<ul>
<li>Starting with a clear summary of the main point (inverted pyramid structure)</li>
<li>Including specific facts, figures, and data points that ChatGPT can cite</li>
<li>Using clear subheadings that describe each section's content</li>
<li>Including a FAQ section for common questions about your topic</li>
<li>Citing your sources with links to authoritative references</li>
</ul>

<h2>Author Authority for ChatGPT SEO</h2>

<p>ChatGPT evaluates author credibility when deciding whether to cite content. Strengthen author signals:</p>

<ul>
<li>Include author bios with professional credentials on every article</li>
<li>Link to the author's professional profiles (LinkedIn, Twitter/X, professional website)</li>
<li>Include author schema markup with sameAs links to social profiles</li>
<li>Build author presence on authoritative platforms (contributing to industry publications, speaking at conferences)</li>
</ul>

<h2>Monitoring ChatGPT Citations</h2>

<p>To track if ChatGPT is citing your content, look for referral traffic from chatgpt.com in your analytics. As ChatGPT's citation interface evolves, more direct tracking tools may emerge. You can also manually test by asking ChatGPT questions related to your coverage areas and seeing if it cites your publication.</p>
    `,
  },
  {
    slug: "google-news-sitemap-guide",
    title: "Google News Sitemap Guide: Setup, Submission & Troubleshooting",
    description:
      "Complete guide to Google News sitemaps. Learn the XML format, required fields, how to submit to Google Search Console, and how to troubleshoot common errors.",
    date: "2025-06-16",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "Technical SEO",
    readTime: 9,
    tags: ["news sitemap", "google news", "xml sitemap", "search console"],
    content: `
<p>A Google News sitemap is one of the most effective technical tools for news publishers. It tells Google exactly which articles you've recently published and helps ensure rapid indexing. This guide covers everything you need to know.</p>

<h2>What is a Google News Sitemap?</h2>

<p>A Google News sitemap is a specialized XML file that lists your most recently published articles, using a news-specific XML namespace that includes metadata like publication name, language, and article title. Unlike regular sitemaps that list all your pages, news sitemaps only include articles published in the last 48 hours.</p>

<p>The key benefit: Google's news crawler checks your news sitemap frequently (every few minutes in some cases) to discover new articles. With a properly configured news sitemap, your articles can be indexed in Google News within minutes of publication.</p>

<h2>News Sitemap Structure</h2>

<pre><code>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"&gt;
  &lt;url&gt;
    &lt;loc&gt;https://example.com/news/breaking-story&lt;/loc&gt;
    &lt;news:news&gt;
      &lt;news:publication&gt;
        &lt;news:name&gt;Example News&lt;/news:name&gt;
        &lt;news:language&gt;en&lt;/news:language&gt;
      &lt;/news:publication&gt;
      &lt;news:publication_date&gt;2025-06-15T09:00:00Z&lt;/news:publication_date&gt;
      &lt;news:title&gt;Breaking: Major Tech Announcement</news:title&gt;
    &lt;/news:news&gt;
  &lt;/url&gt;
&lt;/urlset&gt;</code></pre>

<h2>Required News Sitemap Fields</h2>

<ul>
<li><strong>loc:</strong> The full URL of the article</li>
<li><strong>news:name:</strong> Your publication name (must match your Google News Publisher Center name)</li>
<li><strong>news:language:</strong> ISO 639 language code (en, es, fr, de, etc.)</li>
<li><strong>news:publication_date:</strong> ISO 8601 datetime when article was published</li>
<li><strong>news:title:</strong> Article title (can differ from the HTML title tag)</li>
</ul>

<h2>Submitting to Google Search Console</h2>

<p>Steps to submit your news sitemap:</p>
<ol>
<li>Log in to Google Search Console</li>
<li>Select your property</li>
<li>Go to Sitemaps in the left navigation</li>
<li>Enter your news sitemap URL (e.g., https://yourdomain.com/news-sitemap.xml)</li>
<li>Click Submit</li>
</ol>

<p>Also add a Sitemap directive to your robots.txt:</p>
<pre><code>Sitemap: https://yourdomain.com/news-sitemap.xml</code></pre>

<h2>Common News Sitemap Errors and Fixes</h2>

<ul>
<li><strong>Sitemap contains URLs that are not in the news sitemap format:</strong> Make sure your news sitemap URL only returns the news sitemap XML, not a regular sitemap</li>
<li><strong>URLs older than 2 days:</strong> Remove articles older than 48 hours from your news sitemap automatically</li>
<li><strong>Missing required news fields:</strong> Validate with our <a href="/news-sitemap-validator">News Sitemap Validator</a></li>
<li><strong>Wrong character encoding:</strong> Ensure the file is UTF-8 encoded with no BOM</li>
<li><strong>XML parsing errors:</strong> Validate XML structure with an online XML validator</li>
</ul>

<h2>CMS-Specific Setup</h2>

<p><strong>WordPress with Yoast SEO:</strong> Enable the news sitemap in Yoast SEO > Search Appearance > News SEO (requires Yoast News SEO plugin or premium).</p>
<p><strong>WordPress with Rank Math:</strong> Enable News Sitemap in Rank Math > Sitemap Settings.</p>
<p><strong>Ghost CMS:</strong> Uses a standard sitemap; consider a custom integration for news sitemap format.</p>
<p><strong>Custom CMS:</strong> Generate dynamically by querying articles published in the last 48 hours and formatting as news sitemap XML.</p>
    `,
  },
  {
    slug: "news-publisher-seo-guide",
    title: "News Publisher SEO Guide: Complete Strategy for 2025",
    description:
      "Complete SEO strategy guide for news publishers in 2025. Covers Google News, Discover, AI search, technical SEO, E-E-A-T, and building a sustainable traffic strategy.",
    date: "2025-06-17",
    author: "Editorial Team",
    authorTitle: "Google News SEO Toolkit",
    category: "Publisher SEO",
    readTime: 16,
    tags: ["news seo", "publisher seo", "news strategy", "google news", "ai search"],
    content: `
<p>News publisher SEO in 2025 requires a multi-channel approach. With Google News, Google Discover, AI search surfaces, and traditional Google Search all driving traffic, publishers need a unified strategy that optimizes across all these channels.</p>

<h2>The Four Pillars of Modern News Publisher SEO</h2>

<h3>1. Google News Optimization</h3>
<p>Your articles must be technically eligible for Google News. This requires NewsArticle schema, news sitemaps, proper author markup, and Google News Publisher Center setup. See our <a href="/google-news-validator">Google News Validator</a> to audit your current articles.</p>

<h3>2. Google Discover Optimization</h3>
<p>Discover brings serendipitous traffic from users who aren't actively searching for your content. Optimize with large images (1200px+), strong E-E-A-T signals, and fast Core Web Vitals. See our <a href="/google-discover-checker">Discover Checker</a>.</p>

<h3>3. AI Search Optimization (GEO)</h3>
<p>ChatGPT, Gemini, Perplexity, and other AI search tools are becoming significant traffic sources. Optimize with structured content, FAQ sections, and ensuring AI crawlers can access your site.</p>

<h3>4. Traditional SEO</h3>
<p>Don't neglect traditional organic search. Evergreen content, topic authority building, and on-page SEO continue to drive long-term sustainable traffic alongside real-time news traffic.</p>

<h2>Content Architecture for News Publishers</h2>

<p>Successful news publishers structure their content across three tiers:</p>

<h3>Tier 1: Breaking News (0-24 hours)</h3>
<p>Fast-moving stories that need rapid indexing. Priority: NewsArticle schema, news sitemap, fast publication. These articles may be shorter but must be factually accurate and cover the essential 5 Ws.</p>

<h3>Tier 2: Developing Stories (1-7 days)</h3>
<p>Ongoing stories with new developments. Update the original article, update dateModified in schema, re-submit to news sitemap. Developing stories with multiple updates tend to perform well in Google News.</p>

<h3>Tier 3: Evergreen Analysis (ongoing)</h3>
<p>In-depth explainers, guides, and analysis that provide long-term value. These are less time-sensitive but crucial for topical authority and long-tail search traffic. Invest more time in comprehensive research, expert interviews, and high-quality writing for evergreen content.</p>

<h2>Author SEO Strategy</h2>

<p>In 2025, author identity is a major ranking factor for news content. Google's E-E-A-T framework emphasizes that content should come from people with demonstrated expertise and experience.</p>

<p>Build author authority by:</p>
<ul>
<li>Creating comprehensive author profile pages with bio, credentials, and portfolio</li>
<li>Linking author profiles to social media accounts (Twitter, LinkedIn)</li>
<li>Implementing Person schema on author pages</li>
<li>Encouraging authors to build personal platforms and expertise</li>
<li>Getting author bylines cited in other publications</li>
<li>Pursuing Google Knowledge Panels for prominent authors</li>
</ul>

<h2>Technical SEO for News Publishers</h2>

<h3>Site Speed</h3>
<p>News pages must load fast on mobile. Target LCP under 2.5 seconds. Common issues: oversized images, excessive JavaScript, third-party scripts (ads, tracking). Use lazy loading for below-fold content and optimize your critical rendering path.</p>

<h3>Crawl Budget Optimization</h3>
<p>Large news sites can have crawl budget issues. Optimize by: disallowing non-news pages from news sitemap, using proper canonicals, removing duplicate content, and keeping 404 pages cleaned up.</p>

<h3>URL Structure</h3>
<p>News URLs should be descriptive but not overly long. Best practice: /category/article-keyword-url. Avoid dates in URLs if you plan to update articles long-term (dated URLs can hurt freshness perception for updated content).</p>

<h2>Measuring SEO Success for News Publishers</h2>

<p>Track these key metrics monthly:</p>
<ul>
<li>Google News impressions and clicks (Search Console)</li>
<li>Google Discover impressions and clicks (Search Console)</li>
<li>Organic search clicks from Google Search</li>
<li>AI referral traffic (chatgpt.com, perplexity.ai, bing.com)</li>
<li>Indexed articles / total published articles (indexing rate)</li>
<li>Average time to index for new articles</li>
<li>Core Web Vitals scores (pass/fail rate)</li>
</ul>

<p>Use these metrics to prioritize your SEO investment. If indexing rate is low, focus on technical SEO. If Discover traffic is minimal, focus on image quality and E-E-A-T. If AI referrals are growing, double down on structured content and FAQ sections.</p>

<h2>Building Sustainable News SEO</h2>

<p>The most successful news publishers build SEO into their editorial workflow:</p>
<ul>
<li>Pre-publication checklist for all articles (schema, images, meta, canonical)</li>
<li>Author training on SEO basics relevant to news writing</li>
<li>Regular technical audits (weekly for large sites, monthly for smaller)</li>
<li>Post-publication monitoring for indexing issues</li>
<li>Quarterly content audits to update high-performing evergreen articles</li>
</ul>

<p>Use our free toolkit to make auditing a routine part of your publishing workflow. Start with the <a href="/">Google News SEO Analyzer</a> to establish a baseline for your publication's technical health.</p>
    `,
  },
];
