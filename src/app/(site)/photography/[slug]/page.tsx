import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedGallery } from "@/components/editorial/AnimatedGallery";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { getProjectBySlug, getProjectsByType, getSiteSettingsData } from "@/lib/data";
import { getCanonicalUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjectsByType("PHOTOGRAPHY");
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, "PHOTOGRAPHY");
  if (!project) return { title: "Gallery Not Found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: getCanonicalUrl(`/photography/${slug}`) },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.coverImage }],
    },
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function PhotographyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, settings, allProjects] = await Promise.all([
    getProjectBySlug(slug, "PHOTOGRAPHY"),
    getSiteSettingsData(),
    getProjectsByType("PHOTOGRAPHY"),
  ]);
  if (!project) notFound();

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const storyText = stripHtml(project.storyContent);

  return (
    <article>
      <div className="section-padding pt-8 md:pt-12">
        <div className="flex justify-center mb-10 md:mb-16">
          <BrandLogo studioName={settings.studioName} size="lg" />
        </div>

        <div className="narrow-container">
          <h1 className="story-title">{project.title}.</h1>
          <p className="prose-editorial">{storyText || project.summary}</p>

          {project.vendorCredits &&
            Object.keys(project.vendorCredits).length > 0 && (
              <div className="credits-block mt-10 mb-6">
                {Object.entries(project.vendorCredits).map(([key, value]) => (
                  <p key={key}>
                    {key} : {value}
                  </p>
                ))}
              </div>
            )}
        </div>
      </div>

      {project.images.length > 0 && <AnimatedGallery images={project.images} />}

      <nav className="flex justify-between items-center content-container py-12 text-sm text-text-secondary">
        {prev ? (
          <Link
            href={`/photography/${prev.slug}`}
            className="hover:text-text-primary transition-colors"
          >
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/photography/${next.slug}`}
            className="hover:text-text-primary transition-colors"
          >
            Next →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
