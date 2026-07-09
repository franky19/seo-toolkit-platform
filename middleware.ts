import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://va.vercel-insights.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://va.vercel-scripts.com https://*.vercel-insights.com https://vitals.vercel-insights.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
  response.headers.set("Content-Security-Policy", csp);

  if (request.nextUrl.pathname === "/rss.xml") {
    response.headers.set("Content-Type", "application/rss+xml; charset=utf-8");
    response.headers.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
  }

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|google5e104c0c07fb4da9.html).*)'
};
