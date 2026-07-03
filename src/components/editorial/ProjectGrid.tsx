"use client";

import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { MockProject } from "@/data/mock";
import { cn } from "@/lib/utils";

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
        <div className="flex flex-wrap justify-center gap-4 mb-12" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={!activeCategory}
            onClick={() => setActiveCategory(null)}
            className={cn(
              "text-sm text-text-secondary hover:text-text-primary transition-colors",
              !activeCategory && "text-text-primary"
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
                "text-sm text-text-secondary hover:text-text-primary transition-colors",
                activeCategory === cat && "text-text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} basePath={basePath} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-text-secondary py-16">No projects found.</p>
      )}
    </div>
  );
}
