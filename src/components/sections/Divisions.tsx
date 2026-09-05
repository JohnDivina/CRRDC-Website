"use client";

import React from "react";
import Carousel from "@/components/ui/carousel";

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
    <section id="divisions" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Concise Section Header */}
        <div className="mx-auto max-w-xl text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#008736]">
            Organization
          </span>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Four Core Operating Divisions
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            CRRDC executes research mandates across four specialized divisions
            advancing crop science, genomics, farm engineering, and communication.
          </p>
        </div>

        {/* Aceternity — Carousel (Compact & Centered) */}
        <div className="relative w-full pb-14">
          <Carousel slides={divisionSlides} />
        </div>
      </div>
    </section>
  );
}
