"use client";

import React, { useState } from "react";
import { divisionsData, Division } from "@/data/divisions";
import { Microscope, Wheat, TrendingUp, Cog, CheckCircle, Mail, Building, ArrowRight } from "lucide-react";

const divisionIcons: Record<string, React.ReactNode> = {
  Microscope: <Microscope className="w-5 h-5" />,
  Wheat: <Wheat className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Cog: <Cog className="w-5 h-5" />,
};

export function Divisions() {
  const [activeTab, setActiveTab] = useState<string>(divisionsData[0].id);

  const selectedDivision = divisionsData.find((d) => d.id === activeTab) || divisionsData[0];

  return (
    <section id="divisions" className="py-16 sm:py-20 bg-[#fbfcf9] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Organizational Structure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Four Core Operating Divisions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            The center executes its research, production, extension, and operational mandates through four specialized divisions, each coordinating dedicated laboratories and field assets.
          </p>
        </div>

        {/* Division Tab Selector */}
        <div className="mt-8 flex flex-wrap gap-2 p-1.5 bg-neutral-200/60 rounded-xl max-w-4xl">
          {divisionsData.map((division) => {
            const isActive = division.id === activeTab;
            return (
              <button
                key={division.id}
                onClick={() => setActiveTab(division.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex-1 text-center justify-center min-w-[140px] ${
                  isActive
                    ? "bg-white text-[#008736] shadow-sm border border-neutral-200"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/50"
                }`}
              >
                <span className={isActive ? "text-[#008736]" : "text-neutral-400"}>
                  {divisionIcons[division.iconName]}
                </span>
                <span className="font-mono font-bold tracking-tight">{division.code}</span>
                <span className="hidden md:inline font-normal text-xs text-neutral-500 truncate max-w-[130px]">
                  ({division.id === "crrdd" ? "Crops R&D" : division.id === "spmpd" ? "Seed Prod" : division.id === "ttcd" ? "Tech Transfer" : "Admin Support"})
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Division Detailed Card */}
        <div className="mt-6 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Overview & Responsibilities */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#008736]/10 text-[#008736] font-mono text-xs font-bold">
                    {selectedDivision.code}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">CRRDC Operating Division</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug">
                  {selectedDivision.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#008736] mt-1">
                  {selectedDivision.subtitle}
                </p>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed">
                {selectedDivision.description}
              </p>

              {/* Responsibilities List */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Core Responsibilities & Operations
                </h4>
                <ul className="space-y-2.5">
                  {selectedDivision.keyResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 text-[#008736] flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Priority Programs & Facilities Link */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-neutral-100 lg:pl-8">
              {/* Priority Programs */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                  Priority Research & Action Programs
                </h4>
                <div className="space-y-2">
                  {selectedDivision.priorityPrograms.map((prog, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#f8faf6] border border-neutral-200/80 text-xs font-medium text-neutral-800 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008736] mt-1.5 flex-shrink-0" />
                      <span>{prog}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Associated Facilities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                  Coordinated Laboratories & Units
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDivision.associatedFacilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 text-[11px] font-medium border border-neutral-200"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Institutional Head Designation & Contact */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-medium">{selectedDivision.headTitle}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                    OFFICIAL DESIGNATION
                  </span>
                </div>
                <div className="font-semibold text-neutral-900">
                  {selectedDivision.headNamePlaceholder}
                </div>
                <div className="flex items-center gap-1 text-neutral-500 pt-1">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <a
                    href={`mailto:${selectedDivision.contactEmail}`}
                    className="hover:text-[#008736] transition-colors font-mono text-[11px]"
                  >
                    {selectedDivision.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Division Summary Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {divisionsData.map((div) => (
            <button
              key={div.id}
              onClick={() => setActiveTab(div.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                div.id === activeTab
                  ? "bg-[#f2f8f3] border-[#008736] shadow-sm"
                  : "bg-white border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#008736]">{div.code}</span>
                <span className="text-neutral-400">{divisionIcons[div.iconName]}</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-1">
                {div.name}
              </h4>
              <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                {div.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
