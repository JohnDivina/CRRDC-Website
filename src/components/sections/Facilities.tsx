"use client";

import React, { useState } from "react";
import { facilitiesData, Facility } from "@/data/facilities";
import {
  Microscope,
  Cpu,
  TestTube,
  CheckCircle2,
  ShieldAlert,
  MapPin,
  ChevronRight,
  Sparkles,
  Layers,
  Wrench,
  Search,
} from "lucide-react";

export function Facilities() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeFacilityId, setActiveFacilityId] = useState<string>(facilitiesData[0].id);

  const categories = [
    "All",
    "Biotechnology & Genetics",
    "Analytical & Quality",
    "Engineering & Automation",
    "Field & Ecological",
  ];

  const filteredFacilities =
    selectedCategory === "All"
      ? facilitiesData
      : facilitiesData.filter((f) => f.category === selectedCategory);

  const activeFacility =
    facilitiesData.find((f) => f.id === activeFacilityId) || facilitiesData[0];

  return (
    <section id="facilities" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Research Infrastructure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Ten Specialized Laboratories & Experimental Facilities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            CRRDC houses 10 advanced research laboratories, testing centers, and precision field grounds supporting scientific discovery, regulatory seed certification, and public analytical services.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const matching =
                  cat === "All"
                    ? facilitiesData[0]
                    : facilitiesData.find((f) => f.category === cat);
                if (matching) setActiveFacilityId(matching.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#008736] text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Interactive Browser: Two Column Split */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of Facilities */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredFacilities.map((fac) => {
              const isSelected = fac.id === activeFacilityId;
              return (
                <button
                  key={fac.id}
                  onClick={() => setActiveFacilityId(fac.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-[#f2f8f3] border-[#008736] shadow-sm"
                      : "bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#008736]">
                        {fac.code}
                      </span>
                      <span className="text-[11px] text-neutral-500 font-medium">
                        {fac.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 leading-snug">
                      {fac.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-1">
                      {fac.division}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 flex-shrink-0 mt-2 transition-transform ${
                      isSelected ? "text-[#008736] translate-x-0.5" : "text-neutral-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Active Facility View */}
          <div className="lg:col-span-7 bg-[#fbfcf9] rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
            {/* Header of Active Facility */}
            <div className="border-b border-neutral-200 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded bg-[#008736]/10 text-[#008736] font-mono text-xs font-bold">
                  {activeFacility.code} · {activeFacility.category}
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {activeFacility.division}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                {activeFacility.name}
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {activeFacility.overview}
              </p>
            </div>

            {/* Content Tabs Grid */}
            <div className="mt-6 space-y-6">
              {/* Key Equipment */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  <Wrench className="w-4 h-4 text-[#008736]" />
                  <span>Key Analytical & Field Equipment</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeFacility.keyEquipment.map((eq, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-neutral-200 text-xs font-medium text-neutral-800 flex items-start gap-2 shadow-2xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008736] mt-1.5 flex-shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research & Analytical Capabilities */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  <Layers className="w-4 h-4 text-[#008736]" />
                  <span>Scientific & Service Capabilities</span>
                </div>
                <div className="space-y-2">
                  {activeFacility.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-neutral-700 bg-white p-2.5 rounded-lg border border-neutral-200/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#008736] flex-shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Campus Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-200">
                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Standards & Accreditations
                  </span>
                  <div className="space-y-1">
                    {activeFacility.certificationsOrStandards.map((cert, idx) => (
                      <div key={idx} className="text-xs font-semibold text-neutral-800 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-500" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-neutral-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                    Campus Location & Custody
                  </span>
                  <div className="flex items-center gap-1 text-xs text-neutral-800 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#008736] flex-shrink-0" />
                    <span>{activeFacility.locationDetails}</span>
                  </div>
                  <div className="mt-1 text-[11px] text-neutral-500">
                    Custodian: {activeFacility.headTechnicianPlaceholder}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
