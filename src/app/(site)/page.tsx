import Link from "next/link";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { StatsBar, AwardsStrip } from "@/components/sections/StatsAwards";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { JournalPreview } from "@/components/sections/JournalPreview";
import {
  PhilosophySection,
  ProcessSection,
  CTABanner,
} from "@/components/sections/PhilosophyProcess";
import { AnimatedProjectCard } from "@/components/editorial/AnimatedProjectCard";
import { ScrollReveal } from "@/components/editorial/ScrollReveal";
import {
  mockStats,
  mockAwards,
  mockServices,
  mockTestimonials,
  mockPhilosophy,
  mockProcess,
} from "@/data/mock/content";
import {
  getFeaturedProjects,
  getProjectsByType,
  getJournalPosts,
  getSiteSettingsData,
} from "@/lib/data";

export default async function HomePage() {
  const [settings, featured, films, photography, journal] = await Promise.all([
    getSiteSettingsData(),
    getFeaturedProjects(),
    getProjectsByType("FILM"),
    getProjectsByType("PHOTOGRAPHY"),
    getJournalPosts(),
  ]);

  const heroProject = featured[0];

  return (
    <>
      <HeroBanner
        project={heroProject}
        studioName={settings.studioName}
        tagline={settings.tagline}
      />

      <StatsBar stats={mockStats} />
      <AwardsStrip awards={mockAwards} />

      <section className="section-padding">
        <ScrollReveal className="narrow-container space-y-6 text-center">
          <p className="prose-editorial">{settings.aboutContent}</p>
          <p className="prose-editorial">
            Awarded for excellence in wedding filmmaking, we continue to set new
            benchmarks of storytelling within the wedding realm and beyond —
            creating photographs and films that families treasure for generations.
          </p>
        </ScrollReveal>
      </section>

      {featured.length > 0 && (
        <section className="pb-12 md:pb-20">
          <ScrollReveal className="narrow-container text-center mb-10 md:mb-16">
            <p className="section-label">Selected Work</p>
            <h2 className="display-heading mt-3">Recent Stories</h2>
          </ScrollReveal>
          <div className="space-y-14 md:space-y-24">
            {featured.map((project, i) => (
              <AnimatedProjectCard
                key={project.id}
                project={project}
                basePath={
                  project.type === "PHOTOGRAPHY" ? "/photography" : "/films"
                }
                variant="feature"
                index={i}
              />
            ))}
          </div>
        </section>
      )}

      <ServicesSection services={mockServices} />
      <PhilosophySection paragraphs={mockPhilosophy} />

      {films.length > 0 && (
        <section className="section-padding border-t border-border/50">
          <ScrollReveal className="narrow-container text-center mb-12 md:mb-16">
            <p className="section-label">Cinema</p>
            <h2 className="display-heading mt-3">Award Winning Films</h2>
            <p className="mt-6 prose-editorial max-w-lg mx-auto">
              Every wedding is unique and so are our films. Handcrafted narratives
              that capture the soul of your celebration.
            </p>
          </ScrollReveal>
          <div className="content-container grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
            {films.map((film, i) => (
              <AnimatedProjectCard
                key={film.id}
                project={film}
                basePath="/films"
                index={i}
              />
            ))}
          </div>
          <ScrollReveal className="text-center mt-12">
            <Link href="/films" className="inline-link text-sm tracking-widest uppercase">
              Watch All Films
            </Link>
          </ScrollReveal>
        </section>
      )}

      {photography.length > 0 && (
        <section className="section-padding border-t border-border/50">
          <ScrollReveal className="narrow-container text-center mb-12 md:mb-16">
            <p className="section-label">Still Frames</p>
            <h2 className="display-heading mt-3">Photography</h2>
          </ScrollReveal>
          <div className="content-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {photography.slice(0, 3).map((project, i) => (
              <AnimatedProjectCard
                key={project.id}
                project={project}
                basePath="/photography"
                index={i}
              />
            ))}
          </div>
          <ScrollReveal className="text-center mt-12">
            <Link href="/photography" className="inline-link text-sm tracking-widest uppercase">
              View All Photography
            </Link>
          </ScrollReveal>
        </section>
      )}

      <TestimonialsSection testimonials={mockTestimonials} />
      <ProcessSection steps={mockProcess} />
      <JournalPreview posts={journal} />
      <CTABanner />
    </>
  );
}
