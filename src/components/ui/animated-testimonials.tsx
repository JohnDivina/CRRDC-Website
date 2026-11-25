"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && !isPaused) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, handleNext]);

  const rotations = [-5, 4, -3, 6, -6, 3];
  const getRotateY = (idx: number) => {
    return rotations[idx % rotations.length];
  };

  return (
    <div
      className="mx-auto max-w-4xl px-4 py-4 font-sans antialiased sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      }}
      tabIndex={0}
      aria-label="Research facilities showcase"
    >
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 items-center">
        {/* Left Side: Image Stack */}
        <div>
          <div className="relative h-64 sm:h-72 md:h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    z: -100,
                    rotate: getRotateY(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.94,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getRotateY(index),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    z: 100,
                    rotate: getRotateY(index),
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    fill
                    sizes="(max-width: 768px) 92vw, 420px"
                    draggable={false}
                    className="rounded-2xl object-cover object-center shadow-md border border-neutral-200/60"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Information & Controls */}
        <div className="flex flex-col justify-between py-2">
          <motion.div
            key={active}
            initial={{
              y: 12,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -12,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="md:min-h-[168px]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#008736]">
              {testimonials[active].designation}
            </span>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
              {testimonials[active].name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
              {testimonials[active].quote}
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-200/70">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-600">
                Lab {active + 1} of {testimonials.length}
              </span>
              <div className="flex items-center gap-1" role="tablist" aria-label="Select facility">
                {testimonials.map((item, idx) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={idx === active}
                    aria-label={`View ${item.name}`}
                    onClick={() => setActive(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === active
                        ? "w-5 bg-[#008736]"
                        : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous facility"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-xs transition hover:border-neutral-300 hover:text-neutral-900 active:scale-95"
              >
                <IconArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next facility"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-xs transition hover:border-neutral-300 hover:text-neutral-900 active:scale-95"
              >
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
