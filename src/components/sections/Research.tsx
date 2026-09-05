"use client";

import React from "react";
import {
  institutionalAchievements,
  collaboratingAgencies,
  priorityCommodities,
} from "@/data/research";
import { Award, ShieldCheck, FolderGit2, Building2, CheckCircle2, FileCheck, Layers } from "lucide-react";

export function Research() {
  return (
    <section id="research" className="py-20 sm:py-24 bg-[#fbfcf9] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Research Portfolio & Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Institutional Research Outputs & Collaborations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            CRRDC generates intellectual property, registered plant varieties, and field technologies in partnership with key Philippine agricultural agencies.
          </p>
        </div>

        {/* Institutional Outputs & IP Status Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#008736]" />
              <span>Intellectual Property & Project Registry</span>
            </h3>
            <span className="text-[11px] font-mono text-neutral-500">
              *Official Figures Subject to CLSU R&D Audit
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {institutionalAchievements.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs hover:border-[#008736]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      INSTITUTIONAL METRIC
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-900 mt-1">
                    {item.label}
                  </h4>

                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Record Count:</span>
                  <span className="font-mono text-xs font-bold text-[#008736] bg-[#008736]/10 px-2.5 py-1 rounded-md">
                    {item.placeholderValue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborating Institutions / Agencies */}
        <div className="mt-14 pt-10 border-t border-neutral-200">
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#008736]" />
              <span>Collaborating Institutions & Partner Agencies</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Joint research initiatives, funding partners, and national agriculture bodies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {collaboratingAgencies.map((agency, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs hover:border-[#008736]/30 transition-all"
              >
                <span className="font-mono text-xs font-extrabold text-[#008736] block">
                  {agency.acronym}
                </span>
                <span className="text-[11px] font-medium text-neutral-800 line-clamp-2 mt-1 leading-snug">
                  {agency.name}
                </span>
                <span className="text-[10px] text-neutral-400 block mt-2">
                  {agency.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Agricultural Commodities Strip */}
        <div className="mt-14 pt-10 border-t border-neutral-200">
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#008736]" />
              <span>Priority Research Commodities</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Strategic crops under active varietal selection, germplasm preservation, and agronomic optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {priorityCommodities.map((crop, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs"
              >
                <span className="text-[10px] font-mono text-[#008736] font-semibold block">
                  {crop.tag}
                </span>
                <h4 className="text-xs font-bold text-neutral-900 mt-1">
                  {crop.name}
                </h4>
                <p className="text-[10px] text-neutral-500 italic mt-0.5 font-mono">
                  {crop.scientificName}
                </p>
                <p className="text-[11px] text-neutral-600 mt-2 leading-relaxed">
                  {crop.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
