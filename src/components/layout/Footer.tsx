"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ShieldCheck, MapPin, Phone, Mail, FileText } from "lucide-react";
import { institutionData } from "@/data/institution";
import { contactData } from "@/data/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1c11] text-white border-t border-neutral-800">
      {/* Upper Footer: Institutional Brand, Mandate & Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Institutional Identity & Dual Seals */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {/* CLSU Logo */}
              <div className="relative w-12 h-12 bg-white/10 rounded-full p-1 border border-white/20 flex-shrink-0">
                <Image
                  src="/logos/clsu-logo.png"
                  alt="Official Seal of Central Luzon State University"
                  fill
                  className="object-contain"
                />
              </div>

              {/* CRRDC Logo */}
              <div className="relative w-12 h-12 bg-white/10 rounded-full p-1 border border-white/20 flex-shrink-0">
                <Image
                  src="/logos/crrdc-logo.png"
                  alt="Official Logo of CRRDC"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  Central Luzon State University
                </span>
                <span className="text-base font-bold text-white leading-tight">
                  CRRDC
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              The Crops and Resources Research and Development Center (CRRDC) is the apex agricultural science institution under the Office of the Vice President for Research and Extension (OVPRE) at Central Luzon State University, Science City of Muñoz, Nueva Ecija.
            </p>

            <div className="pt-2 text-[11px] text-emerald-300/80 font-mono">
              University Charter: Republic Act No. 4067
            </div>
          </div>

          {/* Col 2: Institutional Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Center Mandate & Vision
                </a>
              </li>
              <li>
                <a href="#divisions" className="hover:text-white transition-colors">
                  Operating Divisions
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">
                  10 Research Laboratories
                </a>
              </li>
              <li>
                <a href="#research" className="hover:text-white transition-colors">
                  Research Thrusts & Papers
                </a>
              </li>
              <li>
                <a href="#systems" className="hover:text-white transition-colors">
                  Digital Platforms & Portals
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Location & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Divisions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Operating Divisions
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <span className="font-semibold text-white">ICD: </span>
                <span>Information & Communications</span>
              </li>
              <li>
                <span className="font-semibold text-white">CMD: </span>
                <span>Crop Management</span>
              </li>
              <li>
                <span className="font-semibold text-white">FRPD: </span>
                <span>Farm Resources & Post-harvest</span>
              </li>
              <li>
                <span className="font-semibold text-white">PBGRD: </span>
                <span>Plant Breeding & Genetic Resources</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://crrdc.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                <span>Resursee Plant Doctor Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 4: Campus Contact & Transparency */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Center Headquarters
            </h4>
            <div className="text-xs text-neutral-300 space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>CRRDC Complex, RET Avenue, CLSU, Science City of Muñoz, 3120 Nueva Ecija</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{contactData.contactNumbers.trunkline}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{contactData.officialEmails.general}</span>
              </div>
            </div>

            {/* Transparency Seal / FOI Reference */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>CLSU Freedom of Information (FOI) Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Philippine Republic Standard Gov Footer Bar */}
      <div className="bg-[#07130c] text-neutral-400 text-[11px] py-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {currentYear} Central Luzon State University · Crops and Resources Research and Development Center. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <a href="https://clsu.edu.ph" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              CLSU Portal
            </a>
            <span>•</span>
            <a href="https://ovpre.clsu.edu.ph" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              OVPRE CLSU
            </a>
            <span>•</span>
            <span className="font-mono text-[10px]">ISO 9001:2015 Certified University</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
