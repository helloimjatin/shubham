"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MockProjectImage } from "@/data/mock";

interface AnimatedGalleryProps {
  images: MockProjectImage[];
}

export function AnimatedGallery({ images }: AnimatedGalleryProps) {
  const reduceMotion = useReducedMotion();
  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-1 md:space-y-2">
      {sorted.map((image, i) => (
        <motion.figure
          key={image.id}
          className="relative w-full overflow-hidden"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
        >
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10]">
            <Image
              src={image.url}
              alt={image.alt ?? ""}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
