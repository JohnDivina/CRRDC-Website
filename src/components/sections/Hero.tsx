"use client";

import React from "react";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";

// Curated 6 pictures for the hero parallax
const heroImages = [
  "/images/placeholders/hero-01.jpg",
  "/images/placeholders/hero-02.jpg",
  "/images/placeholders/hero-03.jpg",
  "/images/placeholders/hero-04.jpg",
  "/images/placeholders/hero-05.jpg",
  "/images/placeholders/hero-06.jpg",
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-[88dvh] w-full items-center justify-center overflow-hidden bg-[#fafafa] pt-24 pb-16"
    >
      {/* Aceternity — Parallax Hero Images (6 images, edge-focus) */}
      <ParallaxHeroImages images={heroImages} variant="edge-focus" />

      {/* Central Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-neutral-200/80 bg-white/90 px-3 py-1 text-[11px] font-medium tracking-wide text-neutral-600 shadow-xs backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#008736]" />
          Central Luzon State University
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
          Crops and Resources Research
          <br />
          <span className="text-[#008736]">&amp; Development Center</span>
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-600 sm:text-base">
          Pioneering science-driven agriculture, genetic improvement, and
          sustainable farming technology for Central Luzon and beyond.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#divisions"
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-neutral-800 active:scale-[0.98]"
          >
            Explore Divisions
          </a>
          <a
            href="#resources"
            className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-700 shadow-xs transition hover:border-neutral-300 hover:text-neutral-900 active:scale-[0.98]"
          >
            View Resources
          </a>
        </div>
      </div>
    </section>
  );
}
