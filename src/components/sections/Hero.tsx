"use client";

import React from "react";
import Link from "next/link";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";

// Curated 6 pictures for the hero parallax
const heroImages = [
  "/images/hero/hero-01.jpg",
  "/images/hero/hero-02.jpg",
  "/images/hero/hero-03.jpg",
  "/images/hero/hero-04.jpg",
  "/images/hero/hero-05.jpg",
  "/images/hero/hero-06.jpg",
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-[84dvh] sm:min-h-[88dvh] w-full items-center justify-center overflow-hidden bg-[#fbfcf9] pt-24 pb-16"
    >
      {/* Aceternity — Parallax Hero Images (6 images, edge-focus) */}
      <ParallaxHeroImages images={heroImages} variant="edge-focus" />

      {/* Central Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center">
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
          <Link
            href="/shop"
            className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-xs font-semibold text-neutral-700 shadow-xs transition hover:border-neutral-300 hover:text-neutral-900 active:scale-[0.98]"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
