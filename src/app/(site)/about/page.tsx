import { BrandLogo } from "@/components/layout/BrandLogo";
import { ScrollReveal } from "@/components/editorial/ScrollReveal";
import { ProcessSection, CTABanner } from "@/components/sections/PhilosophyProcess";
import { AwardsStrip } from "@/components/sections/StatsAwards";
import { mockPhilosophy, mockProcess, mockAwards } from "@/data/mock/content";
import { getSiteSettingsData } from "@/lib/data";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsData();
  return {
    title: "About",
    description: `About ${settings.studioName}`,
  };
}

export default async function AboutPage() {
  const settings = await getSiteSettingsData();

  return (
    <>
      <div className="section-padding pt-8 md:pt-12">
        <ScrollReveal className="flex justify-center mb-10 md:mb-16">
          <BrandLogo studioName={settings.studioName} size="lg" />
        </ScrollReveal>
        <ScrollReveal className="narrow-container text-center mb-6">
          <p className="section-label">Our Story</p>
          <h1 className="display-heading mt-3">About the Studio</h1>
        </ScrollReveal>
        <div className="narrow-container space-y-8">
          <ScrollReveal>
            <p className="prose-editorial">{settings.aboutContent}</p>
          </ScrollReveal>
          {mockPhilosophy.map((text, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <p className="prose-editorial">{text}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AwardsStrip awards={mockAwards} />
      <ProcessSection steps={mockProcess} />

      <section className="section-padding border-t border-border/50">
        <ScrollReveal className="narrow-container text-center">
          <p className="section-label">Locations</p>
          <h2 className="display-heading mt-3">Where We Create</h2>
          <p className="mt-8 prose-editorial">
            Based in Mumbai and Bangalore, we travel across India and internationally
            for destination weddings. From palace celebrations in Rajasthan to beach
            ceremonies in Goa, from Italian cliffside vows to New York engagements —
            wherever your story takes us.
          </p>
          <p className="mt-6 text-sm text-text-secondary">
            Mumbai · Bangalore · Destination Worldwide
          </p>
        </ScrollReveal>
      </section>

      <CTABanner />
    </>
  );
}
