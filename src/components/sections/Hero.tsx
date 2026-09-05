"use client";

import React from "react";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";

// Placeholder images — replace with actual CRRDC institutional photographs later
const heroImages = [
  "/images/placeholders/hero-01.jpg",
  "/images/placeholders/hero-02.jpg",
  "/images/placeholders/hero-03.jpg",
  "/images/placeholders/hero-04.jpg",
  "/images/placeholders/hero-05.jpg",
  "/images/placeholders/hero-06.jpg",
  "/images/placeholders/hero-07.jpg",
  "/images/placeholders/hero-08.jpg",
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-50"
    >
      {/* Aceternity — Parallax Hero Images (edge-focus) */}
      <ParallaxHeroImages images={heroImages} variant="edge-focus" />

      {/* Central Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#008736] drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]">
          Central Luzon State University
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl">
          Crops and Resources Research
          <br />
          <span className="text-[#008736]">&amp; Development Center</span>
        </h1>

        <p className="max-w-lg text-neutral-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
          Pioneering science-driven agriculture, crop innovation, and resource
          sustainability in Central Luzon and the Philippines.
        </p>

        <div className="mt-2 flex items-center gap-3">
          <a
            href="#divisions"
            className="rounded-full bg-[#008736] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#008736]/25 transition hover:-translate-y-0.5 hover:bg-[#006d2c]"
          >
            Explore Our Center
          </a>
          <a
            href="#contact"
            className="rounded-full border border-neutral-300 bg-white/80 px-6 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#008736]/40"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
