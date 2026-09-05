"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const facilities = [
  {
    name: "Agro-biological Research Laboratory",
    designation: "CRRDC Core Facility",
    quote:
      "Conducts plant physiological assays, biological pest management trials, and bio-fertilizer characterization to support sustainable, climate-adapted crop production.",
    src: "/images/placeholders/facility-01.jpg",
  },
  {
    name: "Biomass Bioenergy & Environmental Science Lab",
    designation: "Renewable Energy & Ecology",
    quote:
      "Investigates agro-waste valorization, thermal gasification biochar synthesis, and greenhouse gas carbon mitigation models in agricultural production systems.",
    src: "/images/placeholders/facility-02.jpg",
  },
  {
    name: "Crop Pest and Disease Diagnostic Laboratory",
    designation: "Phytosanitary Surveillance",
    quote:
      "Provides regional diagnostic services for fungal, bacterial, and viral crop pathogens alongside integrated IPM recommendations for farmers and researchers.",
    src: "/images/placeholders/facility-03.jpg",
  },
  {
    name: "Engineering Makerspace (e-Makerspace)",
    designation: "Mechanization & IoT Prototyping",
    quote:
      "Facilitates rapid prototyping of smallholder smart farm tools, IoT sensor telemetry nodes, automated irrigation controllers, and post-harvest handling apparatus.",
    src: "/images/placeholders/facility-04.jpg",
  },
  {
    name: "Food Product and Development Laboratory",
    designation: "Post-Harvest Processing",
    quote:
      "Researches nutritional enhancement, functional food formulations, and shelf-life stabilization for indigenous crops, grains, and root vegetables.",
    src: "/images/placeholders/facility-05.jpg",
  },
  {
    name: "Molecular Biology and Biotechnology Laboratory",
    designation: "Genomics & In-Vitro Culture",
    quote:
      "Houses DNA extraction, PCR gene screening, marker-assisted breeding platforms, and sterile tissue culture micro-propagation clean rooms.",
    src: "/images/placeholders/facility-06.jpg",
  },
  {
    name: "Multimedia Editing & Management Operations (MEMO)",
    designation: "Scientific Communications",
    quote:
      "Produces peer-reviewed publications, institutional media archives, farmer training materials, and interactive digital knowledge transfer modules.",
    src: "/images/placeholders/facility-07.jpg",
  },
  {
    name: "Plant Breeding and Nursery Laboratory",
    designation: "Genetic Crop Improvement",
    quote:
      "Manages parent crossing blocks, screening nurseries, and pedigree generation cycles for superior yield, pest tolerance, and stress resilience.",
    src: "/images/placeholders/facility-08.jpg",
  },
  {
    name: "Seed Technology and Post-Harvest Laboratory",
    designation: "Seed Purity & Viability Assays",
    quote:
      "Performs germination vigour testing, moisture regulation, seed conditioning trials, and seed longevity monitoring in controlled storage vaults.",
    src: "/images/placeholders/facility-09.jpg",
  },
  {
    name: "Soil and Plant Analytical Laboratory",
    designation: "Soil Fertility & Nutrient Testing",
    quote:
      "Delivers spectrophotometric soil nutrient profiling, pH analysis, organic matter titration, and site-specific fertilizer management prescriptions.",
    src: "/images/placeholders/facility-10.jpg",
  },
];

export function Facilities() {
  return (
    <section id="facilities" className="py-20 bg-neutral-50/70 border-y border-neutral-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Concise Section Header */}
        <div className="mx-auto max-w-xl text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#008736]">
            Infrastructure
          </span>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Ten Specialized R&amp;D Facilities
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Dedicated laboratory environments supporting precision diagnostics,
            biotechnology, and agricultural product development.
          </p>
        </div>

        {/* Aceternity — Animated Testimonials (Repurposed for Facilities) */}
        <AnimatedTestimonials testimonials={facilities} autoplay />
      </div>
    </section>
  );
}
