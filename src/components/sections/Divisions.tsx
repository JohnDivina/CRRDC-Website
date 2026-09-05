"use client";

import React from "react";
import Carousel from "@/components/ui/carousel";

// Division slides — replace src with actual images later
const divisionSlides = [
  {
    title: "Information and Communications Division",
    button: "Explore Division",
    src: "/images/placeholders/division-01.jpg",
  },
  {
    title: "Crop Management Division",
    button: "Explore Division",
    src: "/images/placeholders/division-02.jpg",
  },
  {
    title: "Farm Resources and Post-harvest Division",
    button: "Explore Division",
    src: "/images/placeholders/division-03.jpg",
  },
  {
    title: "Plant Breeding and Genetic Resources Division",
    button: "Explore Division",
    src: "/images/placeholders/division-04.jpg",
  },
];

export function Divisions() {
  return (
    <section id="divisions" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#008736]">
            Our Divisions
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Four Core Operating Divisions
          </h2>
          <p className="mt-3 text-neutral-500">
            CRRDC coordinates its research mandates through four specialized
            divisions covering crop science, post-harvest engineering,
            communications, and genetic resources.
          </p>
        </div>
      </div>

      {/* Aceternity — Carousel */}
      <div className="relative overflow-hidden w-full h-full py-12">
        <Carousel slides={divisionSlides} />
      </div>
    </section>
  );
}
