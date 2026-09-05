"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen, ShieldCheck, Microscope, Database, Users, Sparkles, ExternalLink } from "lucide-react";
import { institutionData } from "@/data/institution";
import { researchMetrics } from "@/data/research";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f7f2] via-white to-white border-b border-neutral-200">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 institutional-grid opacity-60 pointer-events-none" />

      {/* Subtle brand glow accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#008736]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 right-10 w-80 h-80 bg-[#eab308]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-14 lg:pb-24">
        {/* Top Institutional Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008736]/10 border border-[#008736]/20 text-[#008736] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#008736] animate-ping" />
            <span>CLSU Center of Excellence in Agricultural Research</span>
          </div>
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
            Muñoz, Nueva Ecija · Est. {institutionData.center.establishedYear}
          </span>
        </div>

        {/* Main Grid: Headline + Editorial Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Institutional Copy */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
              Pioneering{" "}
              <span className="text-[#008736] underline decoration-[#eab308] decoration-4 underline-offset-4">
                Science-Driven
              </span>{" "}
              Agriculture & Resource Sustainability
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
              {institutionData.center.mandate}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#research"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#008736] hover:bg-[#124d26] text-white text-sm font-semibold shadow-md shadow-[#008736]/20 transition-all hover:translate-y-[-1px]"
              >
                <span>Explore Research Thrusts</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#facilities"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-semibold border border-neutral-300 shadow-sm transition-all hover:border-[#008736]/40"
              >
                <Microscope className="w-4 h-4 text-[#008736]" />
                <span>10 Research Laboratories</span>
              </a>

              <a
                href="https://crrdc.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg bg-[#008736]/5 hover:bg-[#008736]/10 text-[#008736] text-sm font-semibold border border-[#008736]/20 transition-all"
              >
                <span>Resursee System</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Credibility Badges / Institutional Endorsements */}
            <div className="pt-4 border-t border-neutral-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#008736]" />
                <span>ISTA-Aligned Seed Testing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#008736]" />
                <span>DOST-PCAARRD Collaborating Node</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#008736]" />
                <span>PhilGAP Aligned Experimental Grounds</span>
              </div>
            </div>
          </div>

          {/* Right Column: Edge-Focused Editorial Graphic with Authentic Assets */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-300/80 shadow-2xl bg-neutral-900 group">
              {/* Authentic CLSU Campus Banner Image */}
              <div className="relative w-full h-80 sm:h-96">
                <Image
                  src="/images/clsu-campus-banner.jpg"
                  alt="Central Luzon State University Campus"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>

              {/* Floating Verified Seals Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-white/50">
                  <div className="relative w-7 h-7">
                    <Image
                      src="/logos/clsu-logo.png"
                      alt="CLSU Official Seal"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-900 leading-none">CLSU MAIN</span>
                    <span className="text-[9px] text-[#008736] font-semibold leading-none">Nueva Ecija</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-white/50">
                  <div className="relative w-7 h-7">
                    <Image
                      src="/logos/crrdc-logo.png"
                      alt="CRRDC Official Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-900 leading-none">CRRDC</span>
                    <span className="text-[9px] text-[#008736] font-semibold leading-none">R&D Center</span>
                  </div>
                </div>
              </div>

              {/* Editorial Caption at bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#eab308] text-neutral-900 mb-1">
                  Institutional Campus
                </span>
                <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug">
                  Research, Extension & Training (RET) Complex · Science City of Muñoz
                </p>
                <p className="text-[11px] text-white/70 mt-0.5">
                  Over 25 hectares of precision agronomic research plots and 10 state-of-the-art laboratories.
                </p>
              </div>
            </div>

            {/* Floating Metric Highlight Card */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-white rounded-xl p-3.5 shadow-xl border border-neutral-200">
              <div className="w-10 h-10 rounded-lg bg-[#008736]/10 flex items-center justify-center text-[#008736]">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-bold text-neutral-900 leading-tight">1,250+</div>
                <div className="text-[11px] text-neutral-500 font-medium">Curated Germplasm Accessions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Institutional Key Statistics Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {researchMetrics.slice(0, 4).map((metric, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 border border-neutral-200 shadow-sm hover:border-[#008736]/30 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#008736] font-display tracking-tight">
                  {metric.value}
                  {metric.suffix}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-800 mt-1">
                  {metric.label}
                </div>
                <div className="text-[11px] text-neutral-500 mt-1 leading-snug">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
