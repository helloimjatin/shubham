import type { Metadata } from "next";
import { ProjectGrid } from "@/components/editorial/ProjectGrid";
import { getProjectsByType, getProjectCategories, getSiteSettingsData } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsData();
  return {
    title: "Films",
    description: `Wedding films by ${settings.studioName}`,
  };
}

export default async function FilmsPage() {
  const projects = await getProjectsByType("FILM");
  const categories = await getProjectCategories("FILM");

  return (
    <div className="section-padding pt-8">
      <div className="narrow-container text-center mb-12 md:mb-16">
        <h1 className="display-heading">Films</h1>
        <p className="mt-6 prose-editorial">
          Cinematic wedding films crafted with an editorial eye and documentary heart.
        </p>
      </div>
      <div className="content-container">
        <ProjectGrid projects={projects} categories={categories} basePath="/films" />
      </div>
    </div>
  );
}
