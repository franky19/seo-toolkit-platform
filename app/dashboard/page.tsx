/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Gauge,
  Search,
  FileText,
  FileDigit,
  Keyboard,
  ShoppingCart,
} from "lucide-react";

const stats = [
  { title: "Total Keywords", value: "10,567", change: "+2.5%" },
  { title: "Meta Descriptions Generated", value: "1,234", change: "-1.2%" },
  { title: "SERP Previews Run", value: "5,678", change: "+5.8%" },
  { title: "AI Content Pieces", value: "987", change: "+10.2%" },
];

const quickLinks = [
  {
    href: "/dashboard/keyword-research",
    title: "Keyword Research",
    icon: Search,
  },
  {
    href: "/dashboard/meta-generator",
    title: "Meta Generator",
    icon: FileText,
  },
  { href: "/dashboard/serp-preview", title: "SERP Preview", icon: FileDigit },
  {
    href: "/dashboard/ai-content-helper",
    title: "AI Content Helper",
    icon: Keyboard,
  },
  {
    href: "/dashboard/export-center",
    title: "Export Center",
    icon: ShoppingCart,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your SEO toolkit performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground">
                <path d="M12 2v10" />
                <path d="M12 22v-10" />
                <path d="M22 12H12" />
                <path d="M2 12H12" />
                <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20Z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>
            Access your favorite tools instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {quickLinks.map((link) => (
              <Card
                key={link.href}
                className="group relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 p-4 transition-all hover:shadow-lg">
                <div className="absolute inset-0 -z-10 scale-0 transition-all duration-300 group-hover:scale-100">
                  <div className="h-full w-full bg-primary/50 blur-lg"></div>
                </div>
                <CardContent className="p-0">
                  <Link
                    href={link.href}
                    className="flex items-center space-x-3"
                    prefetch={false}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <link.icon className="h-6 w-6" />
                    </span>
                    <span className="text-lg font-semibold text-primary-foreground group-hover:text-primary-foreground">
                      {link.title}
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
