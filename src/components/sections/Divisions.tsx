"use client";

import React from "react";
import { InfiniteMovingCards, DivisionSlide } from "@/components/ui/infinite-moving-cards";

const divisions: DivisionSlide[] = [
  {
    title: "Information and Communications Division",
    description:
      "Modern ICT systems, peer-reviewed knowledge synthesis, scientific media dissemination, and digital knowledge platforms for farmers.",
    button: "Explore Division",
    src: "/images/placeholders/division-01.jpg",
  },
  {
    title: "Crop Management Division",
    description:
      "Integrated pest diagnostics, climate-smart agronomy protocols, precision nutrient management, and soil ecology sustainability.",
    button: "Explore Division",
    src: "/images/placeholders/division-02.jpg",
  },
  {
    title: "Farm Resources and Post-harvest Division",
    description:
      "Post-harvest engineering, bioenergy technology, automated storage preservation, and mechanized prototype fabrication.",
    button: "Explore Division",
    src: "/images/placeholders/division-03.jpg",
  },
  {
    title: "Plant Breeding and Genetic Resources Division",
    description:
      "Breeder seed development, marker-assisted molecular breeding, germplasm indexing, and stress-tolerant crop cultivars.",
    button: "Explore Division",
    src: "/images/placeholders/division-04.jpg",
  },
];

export function Divisions() {
  return (
    <section id="divisions" className="py-20 bg-white overflow-hidden">
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
      </div>

      {/* Infinite Moving Cards with Wide Span and Faded Edges */}
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <InfiniteMovingCards
          items={divisions}
          direction="left"
          speed="normal"
          pauseOnHover={true}
        />
      </div>
    </section>
  );
}
