"use client";

import { useState } from "react";
import { AnimatedProjectCard } from "./AnimatedProjectCard";
import type { MockProject } from "@/data/mock";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

interface ProjectGridProps {
  projects: MockProject[];
  categories: string[];
  basePath?: string;
}

export function ProjectGrid({
  projects,
  categories,
  basePath = "/films",
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <div>
      {categories.length > 1 && (
        <ScrollReveal>
          <div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 md:mb-14 px-2"
            role="tablist"
            aria-label="Filter by category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!activeCategory}
              onClick={() => setActiveCategory(null)}
              className={cn(
                "text-xs sm:text-sm tracking-widest uppercase px-4 py-3 touch-target-sm transition-colors",
                !activeCategory
                  ? "text-text-primary border-b border-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-xs sm:text-sm tracking-widest uppercase px-4 py-3 touch-target-sm transition-colors",
                  activeCategory === cat
                    ? "text-text-primary border-b border-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
        {filtered.map((project, i) => (
          <AnimatedProjectCard
            key={project.id}
            project={project}
            basePath={basePath}
            index={i}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-secondary py-16">No projects found.</p>
      )}
    </div>
  );
}
