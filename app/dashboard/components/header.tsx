import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { SearchInput } from "@/components/dashboard/search-input";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900 sm:justify-end sm:px-10">
      <div className="flex flex-1 items-center justify-between sm:hidden">
        <Breadcrumbs />
      </div>
      <div className="hidden sm:flex sm:items-center sm:space-x-4">
        <SearchInput />
        <Breadcrumbs />
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {/* <OrganizationSwitcher /> */}
        <UserButton afterSignOutUrl="/login" />
      </div>
    </header>
  );
}
