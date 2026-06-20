import type { Metadata } from 'next';
import { Fragment } from 'react';

// Assuming these are available shadcn/ui components or custom components
// For the purpose of this example, these imports are illustrative.
// In a real scenario, you'd confirm their paths or generate them.
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// --- Data Definitions ---
interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  monthlyPrice: number; // in IDR
  yearlyPrice: number; // in IDR
  yearlySavings: string;
  targetUser: string;
  features: string[];
  apiQuota: string;
  keywordQuota: string;
  projectLimit: string;
  reports: string;
  support: string;
  isRecommended?: boolean;
  isPopular?: boolean;
}

interface FeatureComparisonItem {
  feature: string;
  basic: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// --- Static Data for the page ---
const SITE_NAME = 'SEO Toolkit Platform';
const SITE_URL = 'https://seo-toolkit-platform.vercel.app/pricing'; // Canonical URL

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    monthlyPrice: 199000,
    yearlyPrice: 1990000,
    yearlySavings: 'Hemat 16%',
    targetUser: 'Untuk individu & startup kecil',
    features: ['Dasbor SEO', 'Analisis Kompetitor Dasar'],
    apiQuota: '1.000 panggilan/bulan',
    keywordQuota: '500 kata kunci/proyek',
    projectLimit: '5 proyek',
    reports: 'Laporan Mingguan',
    support: 'Email Support',
  },
  {
    name: 'Pro',
    monthlyPrice: 499000,
    yearlyPrice: 4990000,
    yearlySavings: 'Hemat 16%',
    targetUser: 'Untuk tim & bisnis berkembang',
    features: ['Semua di Basic', 'Pelacakan Peringkat', 'Analisis Backlink', 'Laporan Kustom'],
    apiQuota: '10.000 panggilan/bulan',
    keywordQuota: '5.000 kata kunci/proyek',
    projectLimit: '50 proyek',
    reports: 'Laporan Harian',
    support: 'Prioritas Email & Chat Support',
    isRecommended: true,
    isPopular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 999000,
    yearlyPrice: 9990000,
    yearlySavings: 'Hemat 16%',
    targetUser: 'Untuk agensi & perusahaan besar',
    features: ['Semua di Pro', 'Audit Situs Tingkat Lanjut', 'Pelacakan SERP Real-time', 'Manajemen Pengguna'],
    apiQuota: 'Tidak Terbatas',
    keywordQuota: 'Tidak Terbatas',
    projectLimit: 'Tidak Terbatas',
    reports: 'Laporan Real-time',
    support: 'Dedicated Account Manager & Telepon Support',
  },
];

const featureComparison: FeatureComparisonItem[] = [
  { feature: 'Riset Kata Kunci', basic: true, pro: true, enterprise: true },
  { feature: 'Pelacakan Peringkat', basic: false, pro: true, enterprise: true },
  { feature: 'Analisis Kompetitor', basic: true, pro: true, enterprise: true },
  { feature: 'Audit Situs Web', basic: 'Dasar', pro: 'Menengah', enterprise: 'Tingkat Lanjut' },
  { feature: 'Analisis Backlink', basic: false, pro: true, enterprise: true },
  { feature: 'Pelacakan SERP', basic: false, pro: false, enterprise: true },
  { feature: 'Laporan', basic: 'Mingguan', pro: 'Harian', enterprise: 'Real-time' },
  { feature: 'Ekspor CSV', basic: true, pro: true, enterprise: true },
  { feature: 'Ekspor PDF', basic: false, pro: true, enterprise: true },
  { feature: 'API Akses', basic: 'Terbatas', pro: 'Menengah', enterprise: 'Penuh' },
  { feature: 'Proyek', basic: '5', pro: '50', enterprise: 'Tidak Terbatas' },
  { feature: 'Pengguna', basic: '1', pro: '5', enterprise: 'Tidak Terbatas' },
  { feature: 'Prioritas Support', basic: false, pro: true, enterprise: true },
  { feature: 'Data Historis', basic: false, pro: true, enterprise: true },
];

const howItWorksSteps = [
  {
    title: 'Pilih Paket Anda',
    description: 'Pilih paket berlangganan yang paling sesuai dengan kebutuhan SEO Anda, mulai dari Basic hingga Enterprise.',
  },
  {
    title: 'Pembayaran Aman',
    description: 'Lakukan pembayaran dengan aman melalui Midtrans. Kami mendukung berbagai metode pembayaran.',
  },
  {
    title: 'Akun Diaktifkan',
    description: 'Setelah pembayaran berhasil, akun Anda akan segera diaktifkan. Anda akan mendapatkan akses penuh.',
  },
  {
    title: 'Mulai Gunakan SEO Toolkit',
    description: 'Langsung gunakan platform kami untuk riset kata kunci, pelacakan peringkat, audit situs, dan banyak lagi.',
  },
];

const whyChooseUsCards = [
  { title: 'Analisis SEO Cepat', description: 'Dapatkan hasil analisis SEO dalam hitungan detik.', icon: '⚡' },
  { title: 'Data Akurat', description: 'Didukung oleh sumber data terpercaya untuk akurasi optimal.', icon: '✅' },
  { title: 'Berbasis Cloud', description: 'Akses dari mana saja, kapan saja dengan solusi cloud kami.', icon: '☁️' },
  { title: 'Laporan Otomatis', description: 'Terima laporan SEO secara otomatis sesuai jadwal yang Anda tentukan.', icon: '📊' },
  { title: 'Pemantauan Real-time', description: 'Pantau perubahan peringkat dan metrik penting secara real-time.', icon: '⏱️' },
  { title: 'Skalabel', description: 'Dirancang untuk berkembang bersama bisnis Anda, dari startup hingga enterprise.', icon: '📈' },
  { title: 'Infrastruktur Andal', description: 'Platform kami dibangun di atas infrastruktur yang kuat dan stabil.', icon: '🛠️' },
  { title: 'Dukungan Profesional', description: 'Tim ahli kami siap membantu Anda kapan saja.', icon: '👨‍💻' },
];

const securityFeatures = [
  { title: 'Koneksi SSL Terenkripsi', description: 'Semua komunikasi dengan platform kami diamankan dengan enkripsi SSL/TLS.', icon: '🔒' },
  { title: 'Pembayaran Aman', description: 'Pembayaran diproses melalui Midtrans, gateway pembayaran terkemuka dengan standar keamanan tinggi.', icon: '💳' },
  { title: 'Privasi Data Terjamin', description: 'Kami memprioritaskan privasi data Anda. Data tidak pernah dibagikan kepada pihak ketiga.', icon: '🛡️' },
  { title: 'Tidak Ada Data Kartu Tersimpan', description: 'Informasi kartu pembayaran Anda tidak pernah disimpan di server kami.', icon: '⛔' },
  { title: 'Perlindungan Akun', description: 'Tersedia fitur keamanan akun untuk melindungi akses Anda.', icon: '🔑' },
  { title: 'Pendekatan Privacy-first', description: 'Kami merancang layanan dengan prinsip privasi sebagai prioritas utama.', icon: '✨' },
];

const paymentMethods = [
  { name: 'Credit Card', icon: '💳' },
  { name: 'Debit Card', icon: ' डेबिट कार्ड' }, // Using a generic icon representation
  { name: 'QRIS', icon: '📱' },
  { name: 'GoPay', icon: '🟢' }, // Using a generic icon representation
  { name: 'Virtual Account', icon: '🏦' },
  { name: 'Bank Transfer', icon: '🏧' },
  { name: 'E-wallet', icon: '💰' },
];

const faqItems: FAQItem[] = [
  {
    question: 'Bagaimana cara kerja langganan?',
    answer: 'Langganan Anda akan aktif segera setelah pembayaran berhasil. Anda akan mendapatkan akses penuh ke fitur yang dipilih sesuai dengan paket Anda.',
  },
  {
    question: 'Bisakah saya membatalkan kapan saja?',
    answer: 'Ya, Anda bisa membatalkan langganan kapan saja melalui dasbor akun Anda. Pembaharuan berikutnya akan berhenti setelah pembatalan.',
  },
  {
    question: 'Apakah saya akan menerima faktur?',
    answer: 'Tentu, faktur akan secara otomatis dibuat dan dikirimkan kepada Anda setelah setiap pembayaran berhasil.',
  },
  {
    question: 'Metode pembayaran apa yang didukung?',
    answer: 'Kami mendukung berbagai metode pembayaran melalui Midtrans, termasuk Kartu Kredit/Debit, QRIS, GoPay, Virtual Account, Transfer Bank, dan E-wallet.',
  },
  {
    question: 'Akankah langganan saya diperbarui secara otomatis?',
    answer: 'Ya, langganan Anda akan diperbarui secara otomatis pada akhir siklus penagihan. Anda akan diberitahu sebelum pembaharuan.',
  },
  {
    question: 'Bisakah saya meng-upgrade atau me-downgrade paket saya?',
    answer: 'Anda dapat meng-upgrade atau me-downgrade paket Anda kapan saja. Perubahan akan berlaku pada siklus penagihan berikutnya.',
  },
  {
    question: 'Apakah pembayaran saya aman?',
    answer: 'Ya, semua pembayaran diproses dengan aman melalui Midtrans, yang menggunakan enkripsi dan standar keamanan tinggi untuk melindungi informasi Anda.',
  },
  {
    question: 'Bagaimana cara menghubungi dukungan?',
    answer: 'Anda dapat menghubungi dukungan kami melalui email di support@seotoolkit.com atau mengunjungi Pusat Bantuan kami.',
  },
];

// --- SEO Metadata ---
export const metadata: Metadata = {
  title: 'Harga Langganan | Platform SEO Toolkit',
  description: 'Pilih paket SEO Toolkit yang paling sesuai untuk bisnis Anda. Dapatkan riset kata kunci, pelacakan peringkat, audit situs, dan lainnya dengan harga transparan.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Harga Langganan | Platform SEO Toolkit',
    description: 'Pilih paket SEO Toolkit yang paling sesuai untuk bisnis Anda. Dapatkan riset kata kunci, pelacakan peringkat, audit situs, dan lainnya dengan harga transparan.',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: 'https://seo-toolkit-platform.vercel.app/og-image.jpg', // Placeholder OG image
        width: 1200,
        height: 630,
        alt: 'SEO Toolkit Platform Pricing',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harga Langganan | Platform SEO Toolkit',
    description: 'Pilih paket SEO Toolkit yang paling sesuai untuk bisnis Anda. Dapatkan riset kata kunci, pelacakan peringkat, audit situs, dan lainnya dengan harga transparan.',
    images: ['https://seo-toolkit-platform.vercel.app/twitter-image.jpg'], // Placeholder Twitter image
  },
};

// --- JSON-LD Schemas ---
function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organization`,
        'name': SITE_NAME,
        'url': 'https://seo-toolkit-platform.vercel.app',
        'logo': 'https://seo-toolkit-platform.vercel.app/logo.png', // Placeholder logo
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+62-812-3456-7890', // Placeholder phone number
          'contactType': 'Customer Service',
          'email': 'support@seotoolkit.com',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        'url': 'https://seo-toolkit-platform.vercel.app',
        'name': SITE_NAME,
        'publisher': { '@id': `${SITE_URL}#organization` },
        'inLanguage': 'id-ID',
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}#service`,
        'name': 'SEO Toolkit Platform Subscription',
        'description': 'Layanan berlangganan platform SEO untuk riset kata kunci, pelacakan peringkat, audit situs, dan analisis kompetitor.',
        'serviceType': 'Digital Marketing Software',
        'provider': { '@id': `${SITE_URL}#organization` },
      },
      {
        '@type': 'Product',
        '@id': `${SITE_URL}#product`,
        'name': 'SEO Toolkit Platform',
        'description': 'Platform perangkat SEO lengkap untuk profesional dan bisnis.',
        'brand': { '@id': `${SITE_URL}#organization` },
        'aggregateRating': { // Placeholder rating
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'reviewCount': '1240',
        },
        'offers': pricingPlans.map(plan => ({
          '@type': 'Offer',
          'name': plan.name,
          'price': (plan.monthlyPrice / 1000).toFixed(2), // Assuming price is in '000s IDR
          'priceCurrency': 'IDR',
          'priceSpecification': {
            '@type': 'PriceSpecification',
            'price': (plan.monthlyPrice / 1000).toFixed(2),
            'priceCurrency': 'IDR',
            'valueAddedTaxIncluded': 'False',
            'billingPeriod': 'P1M', // Monthly billing period
          },
          'url': SITE_URL,
          'seller': { '@id': `${SITE_URL}#organization` },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Beranda',
            'item': 'https://seo-toolkit-platform.vercel.app',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Harga Langganan',
            'item': SITE_URL,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        'mainEntity': faqItems.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// --- Main Pricing Page Component ---
export default function PricingPage() {
  return (
    <Fragment>
      <JsonLd />
      <main className="flex min-h-screen flex-col items-center py-12 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-balance">
            Solusi SEO Lengkap untuk Pertumbuhan Bisnis Anda
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Pilih paket yang tepat dan mulailah mendominasi hasil pencarian dengan alat-alat SEO canggih kami.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button size="lg" className="px-8 py-3 text-lg font-semibold" aria-label="Mulai Uji Coba Gratis">
              Mulai Uji Coba Gratis
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold" aria-label="Lihat Semua Paket">
              Lihat Semua Paket
            </Button>
          </div>
          <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p className="flex items-center gap-1">✔ Tanpa biaya tersembunyi</p>
            <p className="flex items-center gap-1">✔ Batalkan kapan saja</p>
            <p className="flex items-center gap-1">✔ Pembayaran aman</p>
            <p className="flex items-center gap-1">✔ Akses instan</p>
          </div>
          {/* Trust badges placeholder */}
          <div className="mt-8 flex justify-center items-center gap-4">
            {/* Example trust badges - replace with actual images or SVGs */}
            <span className="text-gray-400 text-sm" aria-label="Midtrans Verified">Midtrans Verified</span>
            <span className="text-gray-400 text-sm" aria-label="SSL Secure">SSL Secure</span>
            <span className="text-gray-400 text-sm" aria-label="ISO 27001 Certified">ISO 27001 Certified</span>
          </div>
        </section>

        {/* Pricing Cards */}
        <section id="pricing-cards" className="w-full max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Pilih Paket yang Sesuai untuk Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={\`relative flex flex-col \${plan.isRecommended ? 'border-2 border-blue-500 shadow-lg' : ''}\`}>
                {plan.isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Rekomendasi
                  </div>
                )}
                {plan.isPopular && (
                  <div className="absolute -top-3 right-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Populer
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.targetUser}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col items-center">
                  <div className="text-4xl font-extrabold mb-2">
                    IDR {(plan.monthlyPrice / 1000).toLocaleString('id-ID')}rb
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400">/bulan</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Atau IDR {(plan.yearlyPrice / 1000).toLocaleString('id-ID')}rb/tahun ({plan.yearlySavings})
                  </p>
                  <ul className="text-left text-sm space-y-2 mb-6 w-full">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-green-500">✔</span> {feature}
                      </li>
                    ))}
                    <li className="flex items-center gap-2"><span className="text-gray-400">●</span> Kuota API: {plan.apiQuota}</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400">●</span> Kuota Kata Kunci: {plan.keywordQuota}</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400">●</span> Batas Proyek: {plan.projectLimit}</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400">●</span> Laporan: {plan.reports}</li>
                    <li className="flex items-center gap-2"><span className="text-gray-400">●</span> Support: {plan.support}</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" aria-label={\`Pilih paket \${plan.name}\`}>Pilih Paket {plan.name}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section id="feature-comparison" className="w-full max-w-6xl mx-auto mb-16 md:mb-24 overflow-x-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Perbandingan Fitur Lengkap</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="sr-only">Tabel perbandingan fitur antar paket langganan</caption>
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Fitur</th>
                  {pricingPlans.map(plan => (
                    <th scope="col" key={plan.name} className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {featureComparison.map((item, index) => (
                  <tr key={index}>
                    <th scope="row" className="px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-100">
                      {item.feature}
                    </th>
                    <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300">
                      {typeof item.basic === 'boolean' ? (item.basic ? '✔' : '—') : item.basic}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300">
                      {typeof item.pro === 'boolean' ? (item.pro ? '✔' : '—') : item.pro}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-300">
                      {typeof item.enterprise === 'boolean' ? (item.enterprise ? '✔' : '—') : item.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How Subscription Works */}
        <section id="how-it-works" className="w-full max-w-4xl mx-auto mb-16 md:mb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Bagaimana Langganan Bekerja</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center p-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-left text-gray-600 dark:text-gray-400 space-y-3 px-4">
            <p>
              <strong>Penagihan Berulang:</strong> Langganan Anda akan diperbarui secara otomatis pada akhir setiap siklus penagihan (bulanan atau tahunan), memastikan akses tanpa gangguan ke platform kami.
            </p>
            <p>
              <strong>Pembatalan Kapan Saja:</strong> Anda memiliki fleksibilitas untuk membatalkan langganan Anda kapan saja. Setelah pembatalan, Anda akan tetap memiliki akses hingga akhir periode penagihan Anda saat ini, dan tidak akan ada pembaharuan di masa mendatang.
            </p>
            <p>
              <strong>Upgrade/Downgrade:</strong> Anda dapat dengan mudah meng-upgrade atau me-downgrade paket Anda sesuai kebutuhan bisnis yang berkembang. Perubahan akan diterapkan pada siklus penagihan berikutnya.
            </p>
            <p>
              <strong>Faktur Otomatis:</strong> Setiap pembayaran berhasil akan diikuti dengan pembuatan faktur otomatis, yang akan dikirimkan ke email terdaftar Anda dan juga tersedia di dasbor akun Anda.
            </p>
          </div>
        </section>

        {/* Why Choose Our Platform (Trust Section) */}
        <section id="why-choose-us" className="w-full max-w-6xl mx-auto mb-16 md:mb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Mengapa Para Profesional Memilih Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsCards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <span className="text-4xl">{card.icon}</span>
                  <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section id="payment-methods" className="w-full max-w-4xl mx-auto mb-16 md:mb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Metode Pembayaran</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex flex-col items-center p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm w-28 h-28 justify-center">
                <span className="text-4xl mb-2">{method.icon}</span>
                <p className="text-sm font-medium">{method.name}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Pembayaran diproses dengan aman melalui Midtrans.
          </p>
        </section>

        {/* Security & Privacy */}
        <section id="security-privacy" className="w-full max-w-4xl mx-auto mb-16 md:mb-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Keamanan & Privasi Data Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="text-left">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Refund Policy Summary */}
        <section id="refund-policy-summary" className="w-full max-w-3xl mx-auto mb-16 md:mb-24 p-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-700 rounded-lg text-left">
          <h2 className="text-2xl font-bold mb-4">Ringkasan Kebijakan Pengembalian Dana</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Langganan Anda dimulai segera setelah pembayaran berhasil.</li>
            <li>Anda dapat membatalkan langganan kapan saja melalui dasbor akun Anda.</li>
            <li>Pembaharuan di masa mendatang akan berhenti setelah pembatalan. Anda akan tetap memiliki akses hingga akhir periode penagihan saat ini.</li>
            <li>Kelayakan pengembalian dana mengikuti kebijakan perusahaan kami. Silakan merujuk ke <a href="/refund-policy" className="text-blue-600 dark:text-blue-400 hover:underline" aria-label="Baca Kebijakan Pengembalian Dana Lengkap">Kebijakan Pengembalian Dana</a> lengkap kami untuk detail lebih lanjut.</li>
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full max-w-4xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Pertanyaan yang Sering Diajukan</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={\`item-\${index + 1}\`}>
                <AccordionTrigger className="text-lg font-semibold text-left" aria-controls={\`faq-content-\${index + 1}\`}>{item.question}</AccordionTrigger>
                <AccordionContent id={\`faq-content-\${index + 1}\`} className="text-gray-700 dark:text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full max-w-4xl mx-auto mb-16 md:mb-24 text-center bg-blue-50 dark:bg-blue-950 p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Hubungi Kami</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Tim kami siap membantu Anda dengan pertanyaan apa pun.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Dukungan Pelanggan</h3>
              <p className="text-gray-700 dark:text-gray-300">Email: <a href="mailto:support@seotoolkit.com" className="text-blue-600 dark:text-blue-400 hover:underline" aria-label="Kirim email ke dukungan pelanggan">support@seotoolkit.com</a></p>
              <p className="text-gray-700 dark:text-gray-300">Waktu Respon: Dalam 24 jam</p>
            </div>
            <Separator orientation="vertical" className="hidden sm:block h-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Pertanyaan Bisnis</h3>
              <p className="text-gray-700 dark:text-gray-300">Email: <a href="mailto:business@seotoolkit.com" className="text-blue-600 dark:text-blue-400 hover:underline" aria-label="Kirim email ke pertanyaan bisnis">business@seotoolkit.com</a></p>
              <p className="text-gray-700 dark:text-gray-300">Pusat Bantuan: <a href="/help-center" className="text-blue-600 dark:text-blue-400 hover:underline" aria-label="Kunjungi Pusat Bantuan">Kunjungi</a></p>
            </div>
          </div>
          <Button size="lg" className="px-8 py-3 text-lg font-semibold" aria-label="Hubungi Kami Sekarang">
            Hubungi Kami Sekarang
          </Button>
        </section>

        {/* Legal Links (Footer - Simplified for this page, ideally a global component) */}
        <footer className="w-full max-w-6xl mx-auto text-center py-8 border-t border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-sm">
          <nav aria-label="Tautan Hukum">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
              <li><a href="/privacy-policy" className="hover:underline" aria-label="Baca Kebijakan Privasi">Kebijakan Privasi</a></li>
              <li><a href="/terms-and-conditions" className="hover:underline" aria-label="Baca Syarat & Ketentuan">Syarat & Ketentuan</a></li>
              <li><a href="/refund-policy" className="hover:underline" aria-label="Baca Kebijakan Pengembalian Dana">Kebijakan Pengembalian Dana</a></li>
              <li><a href="/cookie-policy" className="hover:underline" aria-label="Baca Kebijakan Cookie">Kebijakan Cookie</a></li>
              <li><a href="/contact" className="hover:underline" aria-label="Halaman Kontak">Kontak</a></li>
              <li><a href="/about" className="hover:underline" aria-label="Tentang Kami">Tentang</a></li>
              <li><a href="/pricing" className="hover:underline" aria-label="Halaman Harga">Harga</a></li>
            </ul>
          </nav>
          <p>&copy; {new Date().getFullYear()} SEO Toolkit Platform. Hak Cipta Dilindungi.</p>
        </footer>
      </main>
    </Fragment>
  );
}

// Sticky CTA for mobile (conceptual - requires client component for actual sticky behavior and responsiveness)
// For a pure Server Component approach, sticky CTA would be a challenge without client-side JS.
// A simpler approach for responsiveness is to have the CTA visible at the top/bottom depending on scroll,
// but not strictly "sticky" in the CSS sense across all viewports without some JS or client component.
// Given the "No unnecessary JS" constraint, I will omit a dynamic sticky CTA.
// The primary CTAs are already prominent in the Hero and Pricing sections.
// A fixed footer with a CTA could be an alternative for mobile, if strict "sticky" behavior is needed.
// For now, the existing CTAs are considered sufficient and align with Server Component preference.
