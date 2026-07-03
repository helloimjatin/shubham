"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/films", label: "Films" },
  { href: "/photography", label: "Photography" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface HeaderProps {
  studioName: string;
}

export function Header({ studioName }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background">
        <div className="relative flex items-center justify-center h-20 md:h-24 px-6">
          <button
            type="button"
            className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-[6px] p-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="block w-6 h-px bg-text-primary" />
            <span className="block w-6 h-px bg-text-primary" />
          </button>

          <BrandLogo studioName={studioName} size="sm" />
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center">
          <button
            type="button"
            className="absolute left-6 top-8 flex flex-col gap-[6px] p-2"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <span className="block w-6 h-px bg-text-primary rotate-45 translate-y-[3.5px]" />
            <span className="block w-6 h-px bg-text-primary -rotate-45 -translate-y-[3.5px]" />
          </button>

          <nav className="flex flex-col items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-display text-2xl text-text-primary transition-opacity hover:opacity-60",
                  pathname === link.href && "opacity-60"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop nav — hidden like HOTC, menu only */}
      <nav className="hidden" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
