import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowRight, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog – Google News SEO Guides & Tutorials",
  description:
    "Guides and tutorials for news publishers, journalists, and SEO teams. Learn Google News requirements, NewsArticle schema, Discover optimization, and AI search.",
  alternates: { canonical: "https://seo-toolkit-platform.vercel.app/blog" },
};

const categories = [...new Set(blogPosts.map((p) => p.category))];

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />

      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3">
              Blog & Guides
            </p>
            <h1 className="text-4xl font-bold text-white mb-3">
              Google News SEO Guides
            </h1>
            <p className="text-white/50 max-w-xl">
              In-depth guides for publishers, journalists, and SEO teams on Google News, schema markup, AI search, and modern publisher SEO.
            </p>
          </div>

          {/* Featured post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="block card-surface rounded-2xl p-8 mb-8 group hover:border-indigo-500/20 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-medium">
                Featured
              </span>
              <span className="text-xs text-white/40">{featured.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors leading-snug">
              {featured.title}
            </h2>
            <p className="text-white/60 mb-5 leading-relaxed">{featured.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTime} min read
                </span>
                <span>{new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>{featured.author}</span>
              </div>
              <span className="text-xs text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* All posts grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card-surface rounded-2xl p-6 group hover:border-indigo-500/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/8">
                    {post.category}
                  </span>
                </div>
                <h2 className="font-semibold text-white mb-2 group-hover:text-indigo-200 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-white/50 mb-4 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-xs text-white/30">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min
                  </span>
                  <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Blog list structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Google News SEO Toolkit Blog",
            url: "https://seo-toolkit-platform.vercel.app/blog",
            description: "Guides and tutorials for news publishers on Google News SEO, schema markup, and AI search optimization.",
            blogPost: blogPosts.map((p) => ({
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
