import Link from "next/link";
import Image from "next/image";
import { HeroMedia } from "@/components/editorial/HeroMedia";
import { ProjectCard } from "@/components/editorial/ProjectCard";
import { getFeaturedProjects, getProjectsByType, getSiteSettingsData } from "@/lib/data";

export default async function HomePage() {
  const [settings, featured, films] = await Promise.all([
    getSiteSettingsData(),
    getFeaturedProjects(),
    getProjectsByType("FILM"),
  ]);

  const heroProject = featured[0];

  return (
    <>
      {heroProject ? (
        <Link href={`/photography/${heroProject.slug}`}>
          <div className="relative w-full aspect-[3/4] md:aspect-[16/10] overflow-hidden grain-overlay">
            <Image
              src={heroProject.coverImage}
              alt={heroProject.title}
              fill
              priority
              className="object-cover grayscale"
              sizes="100vw"
            />
          </div>
        </Link>
      ) : (
        <HeroMedia settings={settings} />
      )}

      <section className="section-padding">
        <div className="narrow-container space-y-6 text-center">
          <p className="prose-editorial">
            {settings.aboutContent ??
              "Shubham Video Graphics is a modern wedding photography and filmmaking studio crafting cinematic stories with an editorial eye. For years we have been creating photographs and films that stand the test of time."}
          </p>
          <p className="prose-editorial">
            Every wedding is unique and so are our films. We set new benchmarks of
            storytelling within the wedding realm and beyond — celebrating the wild
            ones, the travellers, and the new-age modern couple who are not afraid
            to experiment.
          </p>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="space-y-16 md:space-y-24">
            {featured.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                basePath={
                  project.type === "PHOTOGRAPHY" ? "/photography" : "/films"
                }
                variant="feature"
              />
            ))}
          </div>
        </section>
      )}

      {films.length > 0 && (
        <section className="section-padding border-t border-border/50">
          <div className="narrow-container text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl text-text-primary tracking-wide">
              Award Winning Films
            </h2>
          </div>
          <div className="content-container grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {films.slice(0, 4).map((film) => (
              <ProjectCard
                key={film.id}
                project={film}
                basePath="/films"
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/films"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Watch All Our Films
            </Link>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="narrow-container text-center">
          <p className="prose-editorial mb-8">
            Here are some selected weddings from the past couple of years to
            showcase the union of two people in the most authentic way possible.
          </p>
          <Link
            href="/contact"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
