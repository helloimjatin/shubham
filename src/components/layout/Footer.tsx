import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  studioName: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
  instagramUrl?: string | null;
}

export function Footer({
  studioName,
  contactEmail,
  contactPhone,
  instagramUrl,
}: FooterProps) {
  return (
    <footer className="section-padding border-t border-border/50">
      <div className="content-container text-center space-y-10">
        <BrandLogo studioName={studioName} size="sm" />

        <p className="text-sm text-text-secondary tracking-wide">
          Mumbai · Bangalore
        </p>

        <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              Instagram
            </a>
          )}
          <a href="#" className="hover:text-text-primary transition-colors">
            Facebook
          </a>
          <a href="#" className="hover:text-text-primary transition-colors">
            Twitter
          </a>
        </div>

        {(contactPhone || contactEmail) && (
          <p className="text-sm text-text-secondary">
            {contactPhone && <span>{contactPhone} </span>}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="hover:text-text-primary transition-colors"
              >
                {contactEmail}
              </a>
            )}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-text-secondary">
          <Link href="/contact" className="hover:text-text-primary transition-colors">
            Privacy Policy
          </Link>
          <p>&copy; {new Date().getFullYear()} {studioName}</p>
        </div>
      </div>
    </footer>
  );
}
