import type { Metadata } from "next";
import { JournalCard } from "@/components/editorial/JournalCard";
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
    <div className="section-padding pt-8">
      <div className="narrow-container text-center mb-12 md:mb-16">
        <h1 className="display-heading">Journal</h1>
        <p className="mt-6 prose-editorial">
          Behind the scenes, real wedding stories, and notes from our studio.
        </p>
      </div>
      <div className="space-y-20">
        {posts.map((post) => (
          <JournalCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
