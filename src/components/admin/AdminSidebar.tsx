"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-text-primary text-white min-h-screen p-6 flex flex-col">
      <div className="mb-10">
        <Link href="/admin" className="font-display text-xl">
          Admin
        </Link>
        <Link
          href="/"
          className="block text-xs text-white/60 mt-2 hover:text-white"
        >
          View Site →
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-3 py-2 text-sm rounded transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={handleSignOut}
        className="text-sm text-white/60 hover:text-white text-left"
      >
        Sign Out
      </button>
    </aside>
  );
}
