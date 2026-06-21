import type { Metadata } from "next";
import ContactClient from "./contact-client";

const siteUrl = "https://seo-toolkit-platform.vercel.app";

export const metadata: Metadata = {
  title: "Contact Us | SEO Toolkit Platform",
  description: "Contact SEO Toolkit Platform for support, billing, and business inquiries.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: { title: "Contact Us | SEO Toolkit Platform", description: "Contact SEO Toolkit Platform for support, billing, and business inquiries.", url: `${siteUrl}/contact`, type: "website" },
  twitter: { card: "summary_large_image", title: "Contact Us | SEO Toolkit Platform", description: "Contact SEO Toolkit Platform for support, billing, and business inquiries." },
};

export default function ContactPage() {
  return <ContactClient />;
}
