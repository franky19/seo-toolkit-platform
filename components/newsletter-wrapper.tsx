import dynamic from "next/dynamic";

const NewsletterSection = dynamic(() => import("@/components/home-newsletter"), { ssr: true });

export default function NewsletterWrapper() {
  return <NewsletterSection />;
}
