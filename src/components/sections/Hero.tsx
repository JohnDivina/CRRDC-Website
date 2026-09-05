"use client";

import React from "react";
import Image from "next/image";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { ArrowRight, Microscope, ExternalLink, ShieldCheck, Database, Award, Users, FileText } from "lucide-react";
import { institutionData } from "@/data/institution";

// Hero images structured for easy replacement with final CRRDC institutional photographs
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
    <section className="relative flex min-h-[90vh] lg:min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-50 border-b border-neutral-200">
      {/* Aceternity UI — Parallax Hero Images (Edge Focus) */}
      <ParallaxHeroImages images={heroImages} variant="edge-focus" />

      {/* Subtle architectural grid pattern */}
      <div className="pointer-events-none absolute inset-0 institutional-grid opacity-30" />

      {/* Central Institutional Content Overlay with enhanced contrast */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center py-16">
        {/* Institutional Verification Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#008736]/30 text-[#008736] text-xs font-semibold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#008736] animate-pulse" />
          <span>Central Luzon State University · Research & Development Center</span>
        </div>

        {/* Dual Seal Accent */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0 drop-shadow-md">
            <Image
              src="/logos/clsu-logo.png"
              alt="CLSU Official Seal"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="h-6 w-px bg-neutral-300" />
          <div className="relative w-12 h-12 flex-shrink-0 drop-shadow-md">
            <Image
              src="/logos/crrdc-logo.png"
              alt="CRRDC Official Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Acronym Callout */}
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#008736] drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
          Crops and Resources Research & Development Center (CRRDC)
        </span>

        {/* Main Institutional Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 drop-shadow-[0_2px_15px_rgba(255,255,255,0.9)] leading-[1.12]">
          Pioneering{" "}
          <span className="text-[#008736] underline decoration-[#eab308] decoration-4 underline-offset-4">
            Science-Driven
          </span>{" "}
          Agriculture & Resource Sustainability
        </h1>

        {/* Short Supporting Statement */}
        <p className="max-w-2xl text-sm sm:text-base text-neutral-700 font-normal leading-relaxed drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)]">
          {institutionData.center.mandate}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#research"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#008736] hover:bg-[#124d26] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#008736]/25 transition-all hover:translate-y-[-1px]"
          >
            <span>Explore Research Outputs</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#divisions"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/95 hover:bg-white text-neutral-800 text-xs sm:text-sm font-semibold border border-neutral-300 shadow-sm transition-all hover:border-[#008736]/50"
          >
            <Microscope className="w-4 h-4 text-[#008736]" />
            <span>Four Operating Divisions</span>
          </a>

          <a
            href="https://crrdc.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/95 hover:bg-white text-[#008736] text-xs sm:text-sm font-semibold border border-[#008736]/30 shadow-sm transition-all"
          >
            <span>Resursee Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Credibility Micro Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-600 font-medium">
          <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-neutral-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008736]" />
            <span>ISTA-Aligned Seed Testing</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-neutral-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008736]" />
            <span>DOST-PCAARRD Collaborating Node</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1 rounded-md border border-neutral-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#008736]" />
            <span>PhilGAP Experimental Plots</span>
          </div>
        </div>
      </div>
    </section>
  );
}
