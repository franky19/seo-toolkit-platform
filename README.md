# Google News SEO Toolkit

A comprehensive SEO audit tool for validating website SEO, Google News readiness, schema validation, and AI search optimization.

## Features

- **SEO Audit**: Complete technical SEO analysis including meta tags, indexability, and social media optimization
- **Google News Validation**: Check NewsArticle schema, author info, publication dates, and Google News compliance
- **Schema Validation**: Validate JSON-LD structured data and schema.org markup
- **Sitemap Validation**: Discover and validate XML sitemaps and news sitemaps
- **AI Search Audit**: Check readiness for ChatGPT, Gemini, Perplexity with schema completeness
- **Recommendation Engine**: Get actionable recommendations to improve your SEO

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animation**: Framer Motion
- **Analytics**: Vercel Analytics & Speed Insights

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Deployment

### Vercel

This project is optimized for Vercel deployment. Simply connect your GitHub repository to Vercel for automatic deployments.

### Docker

Build the Docker image:

```bash
docker build -t seo-toolkit .
```

Run the container:

```bash
docker run -p 3000:3000 seo-toolkit
```

## Rate Limiting

- Free tier: 5 audits per day per user
- Uses browser localStorage for tracking
- Resets every 24 hours

## Project Structure

```
.
├── app/
│   ├── api/audit/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   └── theme-provider.tsx
├── lib/
│   ├── rate-limiter.ts
│   ├── recommendation-engine.ts
│   └── utils.ts
├── services/
│   ├── analyzer.ts
│   └── crawler.ts
└── types/
    └── index.ts
```

## License

MIT