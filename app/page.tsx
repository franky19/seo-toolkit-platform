// app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const NewsletterWrapper = dynamic(() => import('@/components/newsletter-wrapper'), {
  ssr: false,
});

const ExitWrapper = dynamic(() => import('@/components/exit-wrapper'), {
  ssr: false,
});

const siteUrl = "https://seo-toolkit-platform.vercel.app";

export default function HomePage() {
  return (
    <main>
      <NewsletterWrapper />
      <ExitWrapper />
      {/* Other page content */}
    </main>
  );
}
