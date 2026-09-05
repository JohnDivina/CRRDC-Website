"use client";

import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { facilitiesTestimonialsData } from "@/data/facilities";
import { Microscope, ShieldCheck, MapPin } from "lucide-react";

export function Facilities() {
  return (
    <section id="facilities" className="py-20 sm:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Research Infrastructure & Laboratories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Ten Specialized R&D Facilities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            CRRDC operates ten specialized laboratory complexes supporting agricultural genetics, post-harvest engineering, bio-energy, and certified public testing.
          </p>
        </div>

        {/* Aceternity UI — Animated Testimonials Component Adapted for Facilities */}
        <div className="relative py-4">
          <AnimatedTestimonials
            testimonials={facilitiesTestimonialsData}
            autoplay={false}
          />
        </div>

        {/* Ten Facilities Comprehensive Scannable Directory */}
        <div className="mt-12 pt-10 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                Complete Laboratory & Facility Inventory
              </h3>
              <p className="text-xs text-neutral-500">
                All facilities located within the CRRDC Complex, Central Luzon State University.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#008736] bg-[#008736]/10 px-2.5 py-1 rounded-full">
              10 Operating Laboratories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {facilitiesTestimonialsData.map((facility, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#fbfcf9] border border-neutral-200 shadow-2xs hover:border-[#008736]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#008736]">
                    LAB {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 mt-1 leading-snug">
                    {facility.name}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-neutral-200/60 text-[10px] text-neutral-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#008736] flex-shrink-0" />
                  <span>CRRDC Campus Wing</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
