import type { Metadata } from "next";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { getSiteSettingsData } from "@/lib/data";

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
    <div className="section-padding pt-8">
      <div className="flex justify-center mb-12">
        <BrandLogo studioName={settings.studioName} size="lg" />
      </div>
      <div className="narrow-container space-y-6 text-center">
        <p className="prose-editorial">{settings.aboutContent}</p>
        <p className="prose-editorial">
          We believe the ultimate goal of a wedding filmmaker is to justify the
          beauty of the moment — to create photographs and films that stand the
          test of time. Every wedding is unique and so are our films.
        </p>
        <p className="prose-editorial">
          Awarded for excellence in wedding filmmaking, Shubham Video Graphics
          continues to set new benchmarks of storytelling within the wedding realm
          and beyond.
        </p>
      </div>
    </div>
  );
}
