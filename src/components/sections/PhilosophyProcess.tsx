"use client";

import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/editorial/ScrollReveal";

export function PhilosophySection({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section className="section-padding">
      <ScrollReveal className="narrow-container text-center mb-10">
        <p className="section-label">Philosophy</p>
        <h2 className="display-heading mt-3">How We See Love</h2>
      </ScrollReveal>
      <StaggerContainer className="narrow-container space-y-8">
        {paragraphs.map((text, i) => (
          <StaggerItem key={i}>
            <p className="prose-editorial">{text}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function ProcessSection({
  steps,
}: {
  steps: { step: string; title: string; text: string }[];
}) {
  return (
    <section className="section-padding border-t border-border/50">
      <ScrollReveal className="narrow-container text-center mb-12 md:mb-16">
        <p className="section-label">The Process</p>
        <h2 className="display-heading mt-3">How We Work</h2>
      </ScrollReveal>
      <StaggerContainer className="content-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        {steps.map((item) => (
          <StaggerItem key={item.step} className="text-center px-2">
            <p className="text-xs tracking-[0.2em] text-text-secondary mb-3">
              {item.step}
            </p>
            <h3 className="font-display text-lg md:text-xl text-text-primary mb-3">
              {item.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{item.text}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

export function CTABanner() {
  return (
    <ScrollReveal>
      <section className="section-padding">
        <div className="narrow-container text-center border border-border/60 py-14 md:py-20 px-6">
          <h2 className="font-display text-2xl md:text-4xl text-text-primary mb-4">
            Begin Your Story.
          </h2>
          <p className="prose-editorial mb-8 max-w-md mx-auto">
            We take on a limited number of weddings each year. Share your vision
            and let&apos;s create something timeless together.
          </p>
          <Link href="/contact" className="inline-link text-sm tracking-widest uppercase">
            Get In Touch
          </Link>
        </div>
      </section>
    </ScrollReveal>
  );
}
