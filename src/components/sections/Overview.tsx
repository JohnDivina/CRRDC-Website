"use client";

import React from "react";
import { Dna, Sprout, Cpu, Share2, CheckCircle2, Award, Building2, UserCheck } from "lucide-react";
import { institutionData } from "@/data/institution";

const pillarIcons: Record<string, React.ReactNode> = {
  Dna: <Dna className="w-6 h-6 text-[#008736]" />,
  Sprout: <Sprout className="w-6 h-6 text-[#008736]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#008736]" />,
  Share2: <Share2 className="w-6 h-6 text-[#008736]" />,
};

export function Overview() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Institutional Mandate & Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Advancing Philippine Agriculture Through Scientific Excellence
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Operating under the {institutionData.center.parentOffice} of {institutionData.university.name},
            CRRDC functions as the scientific anchor for regional agricultural research, food resilience, and natural resource stewardship.
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision Card */}
          <div className="rounded-xl p-6 bg-[#f7faf5] border border-[#008736]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#008736]/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#008736] text-white flex items-center justify-center font-bold text-xs">
                V
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Institutional Vision</h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed font-normal">
              {institutionData.center.vision}
            </p>
          </div>

          {/* Mission Card */}
          <div className="rounded-xl p-6 bg-[#f7faf5] border border-[#008736]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#eab308]/10 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#124d26] text-white flex items-center justify-center font-bold text-xs">
                M
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Institutional Mission</h3>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed font-normal">
              {institutionData.center.mission}
            </p>
          </div>
        </div>

        {/* Four Strategic Pillars */}
        <div className="mt-14">
          <div className="text-center sm:text-left mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Four Strategic Research & Development Pillars
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Guiding scientific investigations, laboratory operations, and field extensions across the university.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutionData.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm hover:border-[#008736] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#008736]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {pillarIcons[pillar.icon] || <Sprout className="w-6 h-6 text-[#008736]" />}
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 group-hover:text-[#008736] transition-colors leading-snug">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>PILLAR {String(idx + 1).padStart(2, "0")}</span>
                  <span className="text-[#008736] font-semibold">ACTIVE THRUST</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Institutional Values */}
        <div className="mt-14 pt-10 border-t border-neutral-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">
            Foundational Institutional Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {institutionData.center.coreValues.map((val, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#fbfcf9] border border-neutral-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#008736] flex-shrink-0" />
                  <h4 className="text-sm font-bold text-neutral-900">{val.title}</h4>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Governance & Leadership Notice */}
        <div className="mt-12 p-6 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-200 text-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-neutral-900">Institutional Governance & Administration</h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                CRRDC operations are headed by the Center Director in coordination with Chiefs of the 4 Operating Divisions. Official personnel appointment details and administrative directories are maintained in coordination with the CLSU Human Resource Management Office.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-4 py-2 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 rounded-md border border-neutral-300 transition-colors"
          >
            View Official Directory
          </a>
        </div>
      </div>
    </section>
  );
}
