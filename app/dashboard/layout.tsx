import { NavbarDashboard } from "@/components/navbarDashboard";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <NavbarDashboard />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
