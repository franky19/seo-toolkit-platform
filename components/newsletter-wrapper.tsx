"use client";

import dynamic from "next/dynamic";

const NewsletterSection = dynamic(() => import("@/components/home-newsletter"), { ssr: false });

export default function NewsletterWrapper() {
  return <NewsletterSection />;
}
