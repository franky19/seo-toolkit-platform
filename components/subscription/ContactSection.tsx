'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ContactSection() {
  return (
    <section className="space-y-6" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="text-2xl font-bold">Hubungi Kami</h2>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Email: support@seotoolkit.com</p>
        <p>Jam Operasional: 09:00 - 17:00 WIB</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-medium">Name</label>
          <Input id="contact-name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
          <Input id="contact-email" type="email" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
          <textarea 
            id="contact-message"
            required 
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <Button type="submit">Kirim Pesan</Button>
      </form>
    </section>
  );
}
