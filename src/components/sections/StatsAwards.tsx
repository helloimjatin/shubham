"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/editorial/ScrollReveal";
import type { Stat } from "@/data/mock/content";

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-border/60 py-10 md:py-14">
      <StaggerContainer className="content-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="text-center">
            <p className="font-display text-3xl md:text-4xl text-text-primary">
              {stat.value}
            </p>
            <p className="mt-2 text-xs md:text-sm text-text-secondary tracking-wide">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function AwardsStrip({ awards }: { awards: { id: string; label: string }[] }) {
  return (
    <ScrollReveal>
      <section className="overflow-hidden py-8 md:py-10 border-b border-border/40">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...awards, ...awards].map((award, i) => (
            <span
              key={`${award.id}-${i}`}
              className="mx-8 md:mx-12 text-sm md:text-base text-text-secondary font-display shrink-0"
            >
              {award.label}
            </span>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
