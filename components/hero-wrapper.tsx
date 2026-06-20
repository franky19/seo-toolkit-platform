import dynamic from "next/dynamic";

const HeroAnalyzer = dynamic(() => import("@/components/home-hero-analyzer"), { ssr: true });

export default function HeroWrapper() {
  return <HeroAnalyzer />;
}
