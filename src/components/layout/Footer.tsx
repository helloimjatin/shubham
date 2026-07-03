import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  studioName: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  instagramUrl?: string | null;
}

const footerNav = [
  { href: "/films", label: "Films" },
  { href: "/photography", label: "Photography" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer({
  studioName,
  contactEmail,
  contactPhone,
  instagramUrl,
}: FooterProps) {
  return (
    <footer className="section-padding border-t border-border/50 safe-bottom">
      <div className="content-container text-center space-y-10 md:space-y-12">
        <BrandLogo studioName={studioName} size="sm" />

        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-text-secondary"
          aria-label="Footer navigation"
        >
          {footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-text-primary transition-colors py-1 touch-target-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-text-secondary tracking-wide">
          Mumbai · Bangalore · Destination Worldwide
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-text-secondary">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors py-1"
            >
              Instagram
            </a>
          )}
          <a href="#" className="hover:text-text-primary transition-colors py-1">
            Facebook
          </a>
          <a href="#" className="hover:text-text-primary transition-colors py-1">
            YouTube
          </a>
        </div>

        {(contactPhone || contactEmail) && (
          <p className="text-sm text-text-secondary">
            {contactPhone && <span className="block sm:inline">{contactPhone}</span>}
            {contactPhone && contactEmail && (
              <span className="hidden sm:inline"> · </span>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="block sm:inline hover:text-text-primary transition-colors mt-1 sm:mt-0"
              >
                {contactEmail}
              </a>
            )}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-text-secondary pt-4 border-t border-border/40">
          <Link href="/contact" className="hover:text-text-primary transition-colors">
            Privacy Policy
          </Link>
          <p>&copy; {new Date().getFullYear()} {studioName}</p>
        </div>
      </div>
    </footer>
  );
}
