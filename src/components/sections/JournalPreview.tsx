"use client";

import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/editorial/ScrollReveal";
import { JournalCard } from "@/components/editorial/JournalCard";
import type { MockJournalPost } from "@/data/mock";

export function JournalPreview({ posts }: { posts: MockJournalPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="section-padding border-t border-border/50">
      <ScrollReveal className="narrow-container text-center mb-12 md:mb-16">
        <p className="section-label">From the Journal</p>
        <h2 className="display-heading mt-3">Stories & Insights</h2>
      </ScrollReveal>
      <StaggerContainer className="space-y-16 md:space-y-24">
        {posts.slice(0, 3).map((post) => (
          <StaggerItem key={post.id}>
            <JournalCard post={post} />
          </StaggerItem>
        ))}
      </StaggerContainer>
      <ScrollReveal className="text-center mt-12">
        <Link
          href="/journal"
          className="inline-link text-sm"
        >
          Read All Journal Posts
        </Link>
      </ScrollReveal>
    </section>
  );
}
