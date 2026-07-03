"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import type { MockProject } from "@/data/mock";

interface AnimatedProjectCardProps {
  project: MockProject;
  basePath?: string;
  variant?: "grid" | "feature";
  index?: number;
}

export function AnimatedProjectCard({
  project,
  basePath = "/films",
  variant = "grid",
  index = 0,
}: AnimatedProjectCardProps) {
  const isFeature = variant === "feature";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`${basePath}/${project.slug}`} className="group block">
        <div
          className={`relative overflow-hidden grain-overlay ${
            isFeature
              ? "w-full aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/2]"
              : "aspect-[4/5]"
          }`}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            sizes={isFeature ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>
        <div className={`${isFeature ? "mt-6 md:mt-8" : "mt-5"} text-center px-2`}>
          <p
            className={`font-display text-text-primary group-hover:opacity-70 transition-opacity ${
              isFeature ? "text-xl md:text-3xl" : "text-lg md:text-xl"
            }`}
          >
            {project.title}
          </p>
          {(project.location || project.eventDate) && (
            <p className="text-xs md:text-sm text-text-secondary mt-2">
              {[project.location, project.eventDate ? formatDate(project.eventDate) : null]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          {project.summary && isFeature && (
            <p className="hidden md:block mt-3 text-sm text-text-secondary max-w-lg mx-auto line-clamp-2">
              {project.summary}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
