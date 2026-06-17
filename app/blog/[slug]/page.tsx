import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { requestedBlogPosts } from "@/lib/blog-architecture";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = [
    ...requestedBlogPosts,
    ...blogPosts.filter(
      (post) => !requestedBlogPosts.some((requested) => requested.slug === post.slug),
    ),
  ];

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = [
    ...requestedBlogPosts,
    ...blogPosts.filter(
      (post) => !requestedBlogPosts.some((requested) => requested.slug === post.slug),
    ),
  ];
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  const url = `https://seo-toolkit-platform.vercel.app/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const posts = [
    ...requestedBlogPosts,
    ...blogPosts.filter(
      (item) => !requestedBlogPosts.some((requested) => requested.slug === item.slug),
    ),
  ];

  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const postIndex = posts.indexOf(post);
  const prev = posts[postIndex - 1];
  const next = posts[postIndex + 1];
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />

      <article className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/70">{post.category}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <span className="inline-block text-xs px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full mb-5">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">{post.title}</h1>
            <p className="text-lg text-white/60 leading-relaxed mb-6">{post.description}</p>
            <div className="flex items-center gap-5 text-sm text-white/40 pb-6 border-b border-white/5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>By {post.author}</span>
            </div>
          </header>

          {/* Body */}
          <div
            className="prose prose-invert max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
              prose-strong:text-white
              prose-ul:text-white/70 prose-ol:text-white/70
              prose-li:mb-1 prose-li:leading-relaxed
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-5
              prose-code:text-indigo-300 prose-code:bg-indigo-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-blockquote:border-l-indigo-500 prose-blockquote:text-white/60"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 bg-white/5 text-white/50 border border-white/8 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="px-4 sm:px-6 py-12 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold text-white mb-5">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="card-surface rounded-xl p-4 group hover:border-indigo-500/20 transition-all"
                >
                  <h3 className="text-sm font-medium text-white mb-2 group-hover:text-indigo-300 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <span className="text-xs text-white/40 flex items-center gap-1 mt-3">
                    Read more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev/Next navigation */}
      <section className="px-4 sm:px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex justify-between gap-4">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="line-clamp-1">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors text-right group ml-auto"
            >
              <span className="line-clamp-1">{next.title}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>

      <Footer />

      {/* Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: [{ "@type": "Organization", name: post.author }],
            publisher: {
              "@type": "Organization",
              name: "Google News SEO Toolkit",
              url: "https://seo-toolkit-platform.vercel.app",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://seo-toolkit-platform.vercel.app/blog/${post.slug}`,
            },
            keywords: post.tags.join(", "),
            articleSection: post.category,
          }),
        }}
      />

      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://seo-toolkit-platform.vercel.app" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://seo-toolkit-platform.vercel.app/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://seo-toolkit-platform.vercel.app/blog/${post.slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
