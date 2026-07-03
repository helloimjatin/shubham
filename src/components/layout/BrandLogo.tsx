import Link from "next/link";

interface BrandLogoProps {
  studioName?: string;
  size?: "sm" | "lg";
  className?: string;
}

export function BrandLogo({
  studioName = "Shubham Video Graphics",
  size = "lg",
  className = "",
}: BrandLogoProps) {
  const isLarge = size === "lg";

  return (
    <Link
      href="/"
      className={`inline-block text-center font-display text-text-primary ${className}`}
      aria-label={studioName}
    >
      <span
        className={`block tracking-tight leading-none ${
          isLarge ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"
        }`}
      >
        SVG
      </span>
      <span
        className={`block mt-1 tracking-[0.15em] uppercase text-text-secondary ${
          isLarge ? "text-[9px] md:text-[10px]" : "text-[8px]"
        }`}
      >
        {studioName}
      </span>
    </Link>
  );
}
