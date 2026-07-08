import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    // Capitalize the first letter of each segment
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return {
      href,
      label,
    };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <Link href="/dashboard" className="hover:text-primary underline-offset-4" prefetch={false}>
            Dashboard
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center space-x-2">
            <span>/</span>
            <Link
              href={breadcrumb.href}
              className="hover:text-primary underline-offset-4"
              aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
              prefetch={false}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
