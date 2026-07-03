"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 safe-top",
          scrolled
            ? "bg-background/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-background"
        )}
      >
        <div className="relative flex items-center justify-center h-16 sm:h-20 md:h-24 px-4 sm:px-6">
          <button
            type="button"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-[7px] p-3 touch-target"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 8 }
                  : { rotate: 0, y: 0 }
              }
              className="block w-6 h-px bg-text-primary origin-center"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0 }
              }
              className="block w-6 h-px bg-text-primary origin-center"
            />
          </button>

          <BrandLogo studioName={studioName} size="sm" />

          <nav
            className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 items-center gap-8"
            aria-label="Desktop navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-text-primary transition-colors py-2",
                  pathname === link.href && "text-text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col items-center justify-center safe-top safe-bottom"
          >
            <nav className="flex flex-col items-center gap-6 sm:gap-8" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-display text-2xl sm:text-3xl text-text-primary block py-2 touch-target",
                      pathname === link.href && "opacity-60"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 text-xs text-text-secondary tracking-widest uppercase"
            >
              {studioName}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
