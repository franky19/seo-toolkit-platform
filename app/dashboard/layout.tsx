/** @format */

import { Suspense } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 md:p-10">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
