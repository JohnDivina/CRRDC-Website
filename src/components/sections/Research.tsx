"use client";

import React, { useState } from "react";
import {
  priorityCommodities,
  researchThrusts,
  samplePublications,
  researchMetrics,
} from "@/data/research";
import {
  Sprout,
  FileText,
  Bookmark,
  ExternalLink,
  Target,
  ArrowUpRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

export function Research() {
  const [activePublicationCategory, setActivePublicationCategory] = useState<string>("All");

  const pubCategories = ["All", "Peer-Reviewed Journal", "Technoguide / Extension", "Policy Brief"];

  const filteredPubs =
    activePublicationCategory === "All"
      ? samplePublications
      : samplePublications.filter((p) => p.category === activePublicationCategory);

  return (
    <section id="research" className="py-16 sm:py-20 bg-[#fbfcf9] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Research & Innovation Agenda</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Scientific Thrusts & Priority Commodities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            CRRDC focuses research and development on strategic commodities vital to Philippine food security, climate adaptation, and rural household incomes.
          </p>
        </div>

        {/* Priority Agricultural Commodities Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
              Priority Research Commodities
            </h3>
            <span className="text-xs text-neutral-500 font-mono">
              Region III Agricultural Mandate
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priorityCommodities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-neutral-200 shadow-sm hover:border-[#008736]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#008736]/10 text-[#008736] text-[11px] font-semibold">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400 italic">
                      {item.scientificName}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 mt-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {item.focus}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
                    Benchmark Varieties / Selections
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.highlightedVarieties.map((v, vIdx) => (
                      <span
                        key={vIdx}
                        className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-[10px] font-medium"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Research Thrusts */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                Core Research Thrusts & Collaboration
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Interdisciplinary programs conducted in cooperation with national and international bodies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchThrusts.map((thrust, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-[#008736]" />
                    <h4 className="text-base font-bold text-neutral-900">
                      {thrust.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2">
                    {thrust.scope}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 space-y-2">
                  <div className="text-xs text-neutral-800">
                    <span className="font-semibold text-neutral-900">Target Output: </span>
                    <span className="text-neutral-600">{thrust.keyDeliverable}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-700">Partners: </span>
                    <span>{thrust.collaborators.join(" · ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications & Technical Releases Archive */}
        <div className="mt-16 bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Scientific Publications & Technoguides Archive
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Peer-reviewed contributions, regional bulletins, and farmer guides published by CRRDC scientists.
              </p>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-1.5">
              {pubCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActivePublicationCategory(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    activePublicationCategory === cat
                      ? "bg-[#008736] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 divide-y divide-neutral-100">
            {filteredPubs.map((pub) => (
              <div
                key={pub.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 text-neutral-700">
                      {pub.category}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {pub.year}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#008736] transition-colors leading-snug">
                    {pub.title}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {pub.authors} — <span className="italic">{pub.journalOrPublisher}</span>
                  </p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>{pub.downloadOrRef}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
            <span className="text-xs text-neutral-500">
              For complete institutional publication archives, research reprint requests, or thesis citations, contact the{" "}
              <a href="#contact" className="text-[#008736] font-semibold hover:underline">
                CRRDC Research Information Desk
              </a>.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
