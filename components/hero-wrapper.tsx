"use client";

import dynamic from "next/dynamic";

const HeroAnalyzer = dynamic(() => import("@/components/home-hero-analyzer"), { ssr: false });

export default function HeroWrapper() {
  return <HeroAnalyzer />;
}
