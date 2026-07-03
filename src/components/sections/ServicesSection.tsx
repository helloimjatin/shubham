"use client";

import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/editorial/ScrollReveal";
import type { Service } from "@/data/mock/content";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="section-padding">
      <ScrollReveal className="narrow-container text-center mb-12 md:mb-16">
        <p className="section-label">What We Do</p>
        <h2 className="display-heading mt-3">Our Craft</h2>
      </ScrollReveal>
      <StaggerContainer className="content-container grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
        {services.map((service) => (
          <StaggerItem key={service.id} className="text-center sm:text-left px-2">
            <h3 className="font-display text-xl md:text-2xl text-text-primary mb-4">
              {service.title}
            </h3>
            <p className="prose-editorial sm:text-left">{service.description}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
