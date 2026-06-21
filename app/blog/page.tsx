import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { requestedBlogPosts } from "@/lib/blog-architecture";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog – Google News SEO Guides & Tutorials",
  description:
    "Guides and tutorials for news publishers, journalists, and SEO teams. Learn Google News requirements, NewsArticle schema, Discover optimization, and AI search.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/blog" },
};

const allPosts = [
  ...requestedBlogPosts,
  ...blogPosts.filter(
    (post) => !requestedBlogPosts.some((requested) => requested.slug === post.slug),
  ),
];

export default function BlogIndexPage() {
  const featured = allPosts[0];
  const rest = allPosts.slice(1);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Navbar />

      <main>
        <section className="pt-32 pb-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Blog &amp; Guides
              </p>
              <h1 className="text-4xl font-bold text-foreground mb-3">
                Google News SEO Guides
              </h1>
              <p className="text-muted-foreground max-w-xl">
                In-depth guides for publishers, journalists, and SEO teams on Google News, schema markup, AI search, and modern publisher SEO.
              </p>
            </div>

            <article>
              <Link
                href={`/blog/${featured.slug}`}
                className="block card-surface rounded-2xl p-8 mb-8 group hover:border-primary/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Featured article: ${featured.title}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-medium">
                    Featured
                  </span>
                  <span className="text-xs text-muted-foreground">{featured.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-5 leading-relaxed">{featured.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {featured.readTime} min read
                    </span>
                    <time dateTime={featured.date}>{new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
                    <span>By {featured.author}</span>
                  </div>
                </div>
              </Link>
            </article>

            <section>
              <h2 className="sr-only">All blog posts</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {rest.map((post) => (
                  <article key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block card-surface rounded-2xl p-6 group hover:border-primary/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-muted-foreground bg-accent px-2.5 py-1 rounded-full border border-border">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {post.readTime} min
                        </span>
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Google News SEO Toolkit Blog",
            url: "https://seo-toolkit-platform.vercel.app/blog",
            description: "Guides and tutorials for news publishers on Google News SEO, schema markup, and AI search optimization.",
            blogPost: allPosts.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://seo-toolkit-platform.vercel.app/blog/${p.slug}`,
              datePublished: p.date,
              author: {
                "@type": "Organization",
                name: p.author,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
