"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/editorial/ScrollReveal";
import type { Testimonial } from "@/data/mock/content";

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const current = testimonials[active];

  return (
    <section className="section-padding bg-surface/50">
      <ScrollReveal className="narrow-container text-center mb-10 md:mb-14">
        <p className="section-label">Kind Words</p>
        <h2 className="display-heading mt-3">From Our Couples</h2>
      </ScrollReveal>

      <div className="narrow-container text-center min-h-[200px] md:min-h-[180px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <blockquote className="font-display text-lg md:text-2xl text-text-primary leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-text-secondary">
              — {current.author}
              <span className="block mt-1 text-xs opacity-70">{current.event}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`View testimonial from ${t.author}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 touch-target-sm ${
                i === active
                  ? "w-8 bg-text-primary"
                  : "w-2 bg-border hover:bg-text-secondary"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
