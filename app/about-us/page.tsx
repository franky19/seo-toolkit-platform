import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

const coreValues = [
  { title: "Transparency", description: "Open and honest communication in all our interactions." },
  { title: "Innovation", description: "Continuously evolving to provide cutting-edge SEO solutions." },
  { title: "Reliability", description: "Delivering consistent, accurate, and dependable service." },
  { title: "Customer Success", description: "Dedicated to empowering our users to achieve their SEO goals." },
];

const whyChooseUs = [
  "AI-Powered Insights: Leverage advanced AI for smarter SEO decisions.",
  "All-in-One Platform: Comprehensive tools for every SEO need.",
  "User-Friendly Interface: Designed for efficiency and ease of use.",
  "Data Accuracy: Reliable data to trust your strategies.",
  "Dedicated Support: Expert assistance whenever you need it.",
  "Continuous Updates: Always at the forefront of SEO innovation.",
];

const timelineEvents = [
  { year: 2020, title: "Foundation & Research", description: "Began extensive research into AI and machine learning applications for SEO." },
  { year: 2021, title: "Prototype Development", description: "Developed initial prototypes for keyword analysis and content optimization engines." },
  { year: 2022, title: "Beta Launch", description: "Launched a private beta for select digital marketing agencies to gather feedback." },
  { year: 2023, title: "Public Launch", description: "Officially launched SEO Toolkit Platform to the public with core SEO features." },
  { year: 2024, title: "AI Integration & Expansion", description: "Expanded AI capabilities and integrated advanced features like AI citation checking." },
  { year: 2025, title: "Global Market Entry", description: "Successfully entered international markets and scaled our user base globally." },
  { year: 2026, title: "Future Innovations", description: "Continuously developing next-generation tools to lead the SEO industry." },
];

export const metadata: Metadata = {
  title: "About Us | SEO Toolkit Platform",
  description: "Learn about SEO Toolkit Platform's mission, vision, values, and our commitment to empowering businesses with advanced SEO tools.",
  alternates: { canonical: `${siteUrl}/about-us` },
  openGraph: { title: "About Us | SEO Toolkit Platform", description: "Discover the story behind SEO Toolkit Platform, our goals, and how we help businesses succeed.", url: `${siteUrl}/about-us`, type: "website" },
  twitter: { card: "summary_large_image", title: "About Us | SEO Toolkit Platform", description: "Discover the story behind SEO Toolkit Platform, our goals, and how we help businesses succeed.", },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <nav className="text-sm text-muted-foreground mb-6"><Link href="/" className="hover:text-foreground">Home</Link> / <span aria-current="page">About Us</span></nav>
          <h1 className="text-4xl font-bold tracking-tight mb-3">About Us</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">Learn more about SEO Toolkit Platform, our mission, vision, and the values that drive us.</p>

          <section className="space-y-8 mb-10">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Company Overview</h2>
              <p className="text-muted-foreground leading-relaxed">SEO Toolkit is an all-in-one SEO platform providing modern SEO tools to help businesses, agencies, and digital marketers increase their website visibility. It is operated as an individual venture by [Your Full Name].</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Mission</h2>
              <p className="text-muted-foreground leading-relaxed">To empower users by enhancing their SEO performance through accessible and powerful tools.</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Vision</h2>
              <p className="text-muted-foreground leading-relaxed">To be a trusted SEO toolkit platform for global businesses.</p>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-10">
            <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {coreValues.map((value) => (
                <div key={value.title} className="rounded-2xl border border-border bg-background p-4">
                  <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Our Journey</h2>
            <div className="relative pl-4 border-l-2 border-border">
              {timelineEvents.map((event, index) => (
                <div key={index} className="mb-8 last:mb-0 relative">
                  <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-primary border-4 border-background flex items-center justify-center text-primary-foreground text-xs font-bold">{event.year.toString().slice(2)}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-1 ml-4">{event.title}</h3>
                  <p className="text-muted-foreground leading-relaxed ml-4">{event.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm mb-10">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {whyChooseUs.map((reason) => (
                <li key={reason} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-primary/20 bg-primary/10 p-6 text-center shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Ready to boost your SEO?</h2>
            <p className="text-muted-foreground mb-5">Explore our powerful features and plans today!</p>
            <Link href="/pricing" className="inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-all">View Plans & Pricing</Link>
          </section>
        </div>
      </main>
    </div>
  );
}
