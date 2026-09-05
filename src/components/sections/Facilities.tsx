"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// Facility data — replace descriptions and src with actual content later
const facilities = [
  {
    quote: "[Facility description to be provided]",
    name: "Agro-biological Research Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-01.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Biomass Bioenergy and Environmental Science Research Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-02.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Crop Pest and Disease Diagnostic Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-03.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Engineering Makerspace (e-Makerspace)",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-04.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Food Product and Development Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-05.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Molecular Biology and Biotechnology Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-06.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Multimedia Editing and Management Operations (MEMO) Studio",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-07.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Plant Breeding and Nursery Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-08.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Seed Technology and Post-Harvest Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-09.jpg",
  },
  {
    quote: "[Facility description to be provided]",
    name: "Soil and Plant Analytical Laboratory",
    designation: "R&D Facility · CRRDC",
    src: "/images/placeholders/facility-10.jpg",
  },
];

export function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#008736]">
            Research Infrastructure
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Our R&amp;D Facilities
          </h2>
          <p className="mt-3 text-neutral-500">
            Ten specialized laboratories and research facilities powering
            agricultural innovation at CRRDC.
          </p>
        </div>

        {/* Aceternity — Animated Testimonials (adapted for facilities) */}
        <AnimatedTestimonials testimonials={facilities} autoplay />
      </div>
    </section>
  );
}
