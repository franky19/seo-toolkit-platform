import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FileText, Gauge, Keyboard, Search, Settings, ShoppingCart, FileDigit } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { href: '/dashboard', icon: Gauge, label: 'Dashboard' },
    { href: '/dashboard/keyword-research', icon: Search, label: 'Keyword Research' },
    { href: '/dashboard/meta-generator', icon: FileText, label: 'Meta Generator' },
    { href: '/dashboard/serp-preview', icon: FileDigit, label: 'SERP Preview' },
    { href: '/dashboard/ai-content-helper', icon: Keyboard, label: 'AI Content Helper' },
    { href: '/dashboard/export-center', icon: ShoppingCart, label: 'Export Center' },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-16 flex-col border-r border-gray-200 bg-white px-4 py-6 dark:border-gray-800 dark:bg-gray-900 sm:w-20">
      <div className="flex flex-col items-center space-y-8">
        <Link href="/dashboard" className="flex items-center justify-center">
          {/* Replace with your logo */}
          <span className="text-2xl font-bold text-primary">TK</span>
        </Link>
        <nav className="flex flex-col items-center space-y-4">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>
      <div className="mt-auto flex flex-col items-center space-y-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                <Settings className="h-6 w-6" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Settings
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-md border-none bg-transparent p-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 2v10" />
                  <path d="M12 22v-10" />
                  <path d="M22 12H12" />
                  <path d="M2 12H12" />
                  <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20Z" />
                </svg>
                <span className="sr-only">Upgrade to Pro</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Upgrade to Pro
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
}
