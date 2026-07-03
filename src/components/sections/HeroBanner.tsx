"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { MockProject } from "@/data/mock";

interface HeroBannerProps {
  project?: MockProject;
  studioName: string;
  tagline?: string;
}

export function HeroBanner({ project, studioName, tagline }: HeroBannerProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const imageSrc =
    project?.coverImage ??
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80";
  const href = project
    ? project.type === "PHOTOGRAPHY"
      ? `/photography/${project.slug}`
      : `/films/${project.slug}`
    : "/films";

  return (
    <section ref={ref} className="relative w-full overflow-hidden">
      <Link href={href} className="block relative aspect-[3/4] sm:aspect-[4/5] md:aspect-[16/9] grain-overlay">
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { y, opacity }}
        >
          <Image
            src={imageSrc}
            alt={project?.title ?? studioName}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-1000"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-center text-white safe-bottom">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[10px] md:text-xs tracking-[0.25em] uppercase mb-3 opacity-90"
          >
            {project?.category ?? "Featured Story"}
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="font-display text-3xl sm:text-4xl md:text-6xl"
          >
            {project?.title ?? studioName}
          </motion.h1>
          {(project?.location || tagline) && (
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-3 text-sm md:text-base opacity-80 max-w-md mx-auto"
            >
              {project?.location ?? tagline}
            </motion.p>
          )}
        </div>
      </Link>
    </section>
  );
}
