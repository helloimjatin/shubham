import type { Metadata } from "next";
import { ProjectGrid } from "@/components/editorial/ProjectGrid";
import { getProjectsByType, getProjectCategories, getSiteSettingsData } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsData();
  return {
    title: "Photography",
    description: `Wedding photography by ${settings.studioName}`,
  };
}

export default async function PhotographyPage() {
  const projects = await getProjectsByType("PHOTOGRAPHY");
  const categories = await getProjectCategories("PHOTOGRAPHY");

  return (
    <div className="section-padding pt-8">
      <div className="narrow-container text-center mb-12 md:mb-16">
        <h1 className="display-heading">Photography</h1>
        <p className="mt-6 prose-editorial">
          Editorial wedding photography with an artistic, timeless approach.
        </p>
      </div>
      <div className="content-container">
        <ProjectGrid
          projects={projects}
          categories={categories}
          basePath="/photography"
        />
      </div>
    </div>
  );
}
