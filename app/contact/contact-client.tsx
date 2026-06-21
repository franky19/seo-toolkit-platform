"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSuccess(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <nav className="text-sm text-muted-foreground mb-6"><Link href="/" className="hover:text-foreground">Home</Link> / <span aria-current="page">Contact Us</span></nav>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Contact Us</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">Contact SEO Toolkit Platform for support, billing, and business inquiries.</p>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Business Information</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Business Name:</strong> SEO Toolkit Platform</p>
                <p><strong className="text-foreground">Email Address:</strong> support@seo-toolkit-platform.com</p>
                <p><strong className="text-foreground">Support Email:</strong> support@seo-toolkit-platform.com</p>
                <p><strong className="text-foreground">Billing Email:</strong> billing@seo-toolkit-platform.com</p>
                <p><strong className="text-foreground">Operating Hours:</strong> Monday–Friday, 09:00–18:00 WIB</p>
                <p><strong className="text-foreground">Response Time:</strong> Within 1 business day</p>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
              {success ? (
                <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-700">Your message has been submitted.</p>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <input required placeholder="Name" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
                  <input required type="email" placeholder="Email" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
                  <input required placeholder="Subject" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
                  <textarea required placeholder="Message" rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
                  <button disabled={loading} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">{loading ? "Sending..." : "Send Message"}</button>
                </form>
              )}
            </section>
          </div>

          <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Support Categories</h2>
            <div className="grid gap-3 sm:grid-cols-3 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border bg-background p-4">Product Support</div>
              <div className="rounded-2xl border border-border bg-background p-4">Billing Support</div>
              <div className="rounded-2xl border border-border bg-background p-4">Business Inquiry</div>
            </div>
          </section>

          <section className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
            <details className="rounded-2xl border border-border bg-background p-4"><summary className="cursor-pointer font-medium">When will I get a reply?</summary><p className="mt-2 text-sm text-muted-foreground">Within 1 business day.</p></details>
          </section>
        </div>
      </main>
    </div>
  );
}
