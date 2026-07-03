import type { Metadata } from "next";
import { JournalCard } from "@/components/editorial/JournalCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/editorial/ScrollReveal";
import { getJournalPosts, getSiteSettingsData } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsData();
  return {
    title: "Journal",
    description: `Stories from ${settings.studioName}`,
  };
}

export default async function JournalPage() {
  const posts = await getJournalPosts();

  return (
    <div className="section-padding pt-8 md:pt-12">
      <ScrollReveal className="narrow-container text-center mb-12 md:mb-20">
        <p className="section-label">Editorial</p>
        <h1 className="display-heading mt-3">Journal</h1>
        <p className="mt-6 prose-editorial">
          Behind the scenes, destination guides, filmmaking tips, and real
          wedding stories from our studio.
        </p>
      </ScrollReveal>
      <StaggerContainer className="space-y-16 md:space-y-28">
        {posts.map((post) => (
          <StaggerItem key={post.id}>
            <JournalCard post={post} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
