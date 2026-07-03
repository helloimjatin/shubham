import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { MockProject } from "@/data/mock";

interface ProjectCardProps {
  project: MockProject;
  basePath?: string;
  variant?: "grid" | "feature";
}

export function ProjectCard({
  project,
  basePath = "/films",
  variant = "grid",
}: ProjectCardProps) {
  if (variant === "feature") {
    return (
      <Link href={`${basePath}/${project.slug}`} className="group block">
        <div className="relative w-full aspect-[4/5] md:aspect-[3/2] overflow-hidden grain-overlay">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            sizes="100vw"
          />
        </div>
        <p className="mt-6 text-center font-display text-xl md:text-2xl text-text-primary">
          {project.title}
        </p>
      </Link>
    );
  }

  return (
    <Link href={`${basePath}/${project.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-5 text-center">
        <p className="font-display text-lg md:text-xl text-text-primary">
          {project.title}
        </p>
        {(project.location || project.eventDate) && (
          <p className="text-sm text-text-secondary mt-1">
            {[project.location, project.eventDate ? formatDate(project.eventDate) : null]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
      </div>
    </Link>
  );
}
