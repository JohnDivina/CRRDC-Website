"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight, ExternalLink, Phone, Mail, ChevronRight } from "lucide-react";
import { institutionData } from "@/data/institution";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About & Mandate", href: "#about" },
    { label: "Divisions", href: "#divisions" },
    { label: "Facilities & Labs", href: "#facilities" },
    { label: "Research & Thrusts", href: "#research" },
    { label: "Digital Systems", href: "#systems" },
    { label: "Contact & Location", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Republic & Institutional GovBar */}
      <div className="bg-[#124d26] text-white text-[11px] font-medium tracking-wide py-1 px-4 sm:px-8 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-100/90 font-semibold tracking-wider uppercase">
              Republic of the Philippines
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-emerald-100/80 hidden sm:inline">
              Central Luzon State University (CLSU)
            </span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100/80 text-[11px]">
            <a
              href="https://clsu.edu.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>CLSU Main Portal</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-white/30">|</span>
            <span className="hidden md:inline">Science City of Muñoz, Nueva Ecija</span>
          </div>
        </div>
      </div>

      {/* Main Institutional Header & Navigation */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#008736]/15 py-2.5"
            : "bg-white border-b border-neutral-200/80 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dual Institutional Brand: CLSU Seal + CRRDC Seal */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#008736]/40 rounded-lg p-1">
            <div className="flex items-center gap-2">
              {/* CLSU Official Seal */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
                <Image
                  src="/logos/clsu-logo.png"
                  alt="Official Seal of Central Luzon State University"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {/* CRRDC Official Logo */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
                <Image
                  src="/logos/crrdc-logo.png"
                  alt="Official Logo of Crops and Resources Research and Development Center"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#008736] uppercase leading-tight">
                Central Luzon State University
              </span>
              <span className="text-sm sm:text-base font-bold text-neutral-900 leading-tight group-hover:text-[#008736] transition-colors">
                CRRDC
              </span>
              <span className="text-[10px] sm:text-[11px] text-neutral-600 hidden md:inline leading-tight">
                Crops and Resources Research & Development Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-[#008736] hover:bg-[#008736]/5 rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://crrdc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#008736] bg-[#008736]/10 hover:bg-[#008736]/15 rounded-md transition-all border border-[#008736]/20"
            >
              <span>Resursee Platform</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#008736] hover:bg-[#124d26] rounded-md transition-all shadow-sm shadow-[#008736]/20"
            >
              <span>Inquire / Visit</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-neutral-700 hover:text-[#008736] hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-xl px-4 pt-2 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 divide-y divide-neutral-100">
            <div className="py-2">
              <span className="text-[11px] font-semibold uppercase text-neutral-400 px-3 tracking-wider">
                CRRDC Navigation
              </span>
            </div>
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-neutral-800 hover:text-[#008736] hover:bg-neutral-50 rounded-md transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <a
                href="https://crrdc.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 text-xs font-semibold text-[#008736] bg-[#008736]/10 hover:bg-[#008736]/20 rounded-md transition-colors border border-[#008736]/20"
              >
                <span>Access Resursee Digital Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#008736] hover:bg-[#124d26] rounded-md transition-colors shadow-sm"
              >
                <span>Inquire / Visit CRRDC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
