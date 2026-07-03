import Image from "next/image";
import type { MockSiteSettings } from "@/data/mock";

interface HeroMediaProps {
  settings: MockSiteSettings;
}

export function HeroMedia({ settings }: HeroMediaProps) {
  return (
    <section className="relative w-full aspect-[3/4] md:aspect-[16/10] overflow-hidden grain-overlay">
      {settings.heroMediaType === "video" && settings.heroMediaUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale"
          poster={settings.heroMediaUrl}
        >
          <source src={settings.heroMediaUrl} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={settings.heroMediaUrl!}
          alt={settings.studioName ?? "Hero"}
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
      )}
    </section>
  );
}
