import Link from 'next/link';
import { Search, FileText, Eye, Brain, Download, CreditCard, Settings, LayoutDashboard } from 'lucide-react';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/keyword-research', label: 'Keyword Research', icon: Search },
  { href: '/meta-generator', label: 'Meta Generator', icon: FileText },
  { href: '/serp-preview', label: 'SERP Preview', icon: Eye },
  { href: '/ai-content', label: 'AI Content Helper', icon: Brain },
  { href: '/export-results', label: 'Export Results', icon: Download },
  { href: '#', label: 'Billing', icon: CreditCard },
  { href: '#', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 flex-col border-r bg-background/80 backdrop-blur-xl p-6">
      <div className="text-2xl font-bold mb-8">SEO Toolkit</div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm hover:bg-muted transition">
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
