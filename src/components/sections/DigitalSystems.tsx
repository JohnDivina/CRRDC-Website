"use client";

import React from "react";
import { digitalSystemsData } from "@/data/digitalSystems";
import {
  Stethoscope,
  Wheat,
  FlaskConical,
  MapPinned,
  ShoppingCart,
  ExternalLink,
  ArrowRight,
  Check,
  ShieldCheck,
  Zap,
} from "lucide-react";

const systemIcons: Record<string, React.ReactNode> = {
  Stethoscope: <Stethoscope className="w-6 h-6 text-[#008736]" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6 text-[#008736]" />,
  Wheat: <Wheat className="w-6 h-6 text-[#008736]" />,
  FlaskConical: <FlaskConical className="w-6 h-6 text-[#008736]" />,
  MapPinned: <MapPinned className="w-6 h-6 text-[#008736]" />,
};

export function DigitalSystems() {
  return (
    <section id="systems" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#008736]/10 text-[#008736] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Digital Transformation & Portals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Institutional Digital Platforms & Public Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            CRRDC operates custom software systems and online services that translate agricultural science into real-time tools for farmers, researchers, and regional agricultural officers.
          </p>
        </div>

        {/* Highlighted Flagship: Resursee Card */}
        <div className="mt-10 bg-gradient-to-br from-[#0d2a17] via-[#124d26] to-[#0d2a17] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                  FLAGSHIP DIGITAL PLATFORM
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-[11px] font-mono">
                  v2.4 ACTIVE DEPLOYMENT
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Resursee Platform — Integrated Crop Resources & Plant Doctor
              </h3>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-normal">
                An innovative agricultural software ecosystem linking farmers with plant pathology triage, interactive agronomic crop guides, and direct certified seed stock catalogs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-start gap-2 text-xs text-emerald-100/80">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>AI-assisted visual crop symptom triage & follow-up chat</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-emerald-100/80">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Localized crop library & fertilizer management calendars</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-emerald-100/80">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Real-time foundation & registered seed catalog inventory</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-emerald-100/80">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Direct consultation booking with CRRDC diagnostic clinic</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://crrdc.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-neutral-950 text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-300 transition-all"
                >
                  <span>Launch Resursee Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-xs text-emerald-200/70">
                  Publicly accessible web app optimized for mobile field use
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md max-w-xs w-full text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 text-emerald-300 mx-auto flex items-center justify-center">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <div className="font-bold text-base text-white">Plant Doctor Diagnostic</div>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  Submit field photos for rapid disease identification validated by CRRDC Crop Protection Clinic agronomists.
                </p>
                <div className="pt-2 text-[11px] font-mono text-emerald-300/80 border-t border-white/10">
                  Active in Region III
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Digital Portals Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {digitalSystemsData.slice(1).map((system) => (
            <div
              key={system.id}
              className="bg-[#fbfcf9] rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-[#008736]/40 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#008736]/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {systemIcons[system.iconName] || <Zap className="w-5 h-5 text-[#008736]" />}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-200 text-neutral-700">
                    {system.status}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-[#008736] font-semibold block mb-1">
                  {system.badge}
                </span>
                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#008736] transition-colors leading-snug">
                  {system.name}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  {system.role}
                </p>

                <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                  {system.description}
                </p>

                <ul className="mt-4 space-y-1.5 pt-3 border-t border-neutral-200/80">
                  {system.features.map((f, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-[11px] text-neutral-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008736] mt-1.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-xs">
                <a
                  href="#contact"
                  className="font-semibold text-[#008736] hover:text-[#124d26] inline-flex items-center gap-1 group/btn"
                >
                  <span>{system.linkLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
