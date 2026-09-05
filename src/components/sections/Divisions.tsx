"use client";

import React from "react";
import Carousel from "@/components/ui/carousel";
import { divisionsData } from "@/data/divisions";

// Division slides mapping directly to the requested Aceternity Carousel structure
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
    <section id="divisions" className="py-20 sm:py-24 bg-[#fbfcf9] border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Organizational Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Four Core Operating Divisions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            CRRDC coordinates its strategic research mandates, field operations, and post-harvest innovations through four specialized institutional divisions.
          </p>
        </div>

        {/* Aceternity UI — Carousel Component */}
        <div className="relative w-full py-6 pb-20">
          <Carousel slides={divisionSlides} />
        </div>

        {/* Division Summary Quick Reference Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {divisionsData.map((div) => (
            <div
              key={div.id}
              className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs hover:border-[#008736]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#008736] bg-[#008736]/10 px-2 py-0.5 rounded">
                  {div.code}
                </span>
                <h3 className="text-sm font-bold text-neutral-900 mt-2 leading-snug">
                  {div.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  {div.subtitle}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-neutral-100 text-[11px] text-neutral-400 font-mono">
                {div.headNamePlaceholder}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
