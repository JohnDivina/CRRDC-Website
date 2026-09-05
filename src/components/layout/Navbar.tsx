"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ExternalLink, ArrowRight } from "lucide-react";

export function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "About", link: "#about" },
    { name: "Divisions", link: "#divisions" },
    { name: "Facilities", link: "#facilities" },
    { name: "Research", link: "#research" },
    { name: "Projects", link: "#systems" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Philippine Republic Standard GovBar */}
      <div className="bg-[#124d26] text-white text-[11px] font-medium tracking-wide py-1 px-4 sm:px-8 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
              <span>CLSU Portal</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-white/30">|</span>
            <span className="hidden md:inline">Science City of Muñoz, Nueva Ecija</span>
          </div>
        </div>
      </div>

      {/* Aceternity UI — Resizable Navbar */}
      <Navbar>
        {/* Desktop NavBody */}
        <NavBody>
          <NavbarLogo href="#about">
            <div className="flex items-center gap-2 py-0.5">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logos/clsu-logo.png"
                  alt="CLSU Seal"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logos/crrdc-logo.png"
                  alt="CRRDC Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold tracking-wider text-[#008736] uppercase leading-none">
                  CLSU
                </span>
                <span className="text-sm font-extrabold text-neutral-900 leading-tight">
                  CRRDC
                </span>
              </div>
            </div>
          </NavbarLogo>

          <NavItems items={navItems} />

          <div className="flex items-center gap-2.5">
            <NavbarButton
              href="https://crrdc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <span>Resursee</span>
              <ExternalLink className="w-3 h-3" />
            </NavbarButton>

            <NavbarButton href="#contact" variant="primary">
              <span>Inquire</span>
              <ArrowRight className="w-3 h-3" />
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo href="#about">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image
                    src="/logos/clsu-logo.png"
                    alt="CLSU Seal"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image
                    src="/logos/crrdc-logo.png"
                    alt="CRRDC Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-bold text-neutral-900">CRRDC</span>
              </div>
            </NavbarLogo>

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex flex-col w-full space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-2 pb-1 border-b border-neutral-100">
                CRRDC Navigation
              </div>
              {navItems.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 py-1.5 text-sm font-semibold text-neutral-800 hover:text-[#008736] rounded-md transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
                <a
                  href="https://crrdc.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 text-xs font-semibold text-center text-[#008736] bg-[#008736]/10 rounded-lg border border-[#008736]/20 flex items-center justify-center gap-1.5"
                >
                  <span>Resursee Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2 px-3 text-xs font-semibold text-center text-white bg-[#008736] rounded-lg shadow-sm"
                >
                  Inquire / Visit
                </a>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </header>
  );
}

export { AppNavbar as Navbar };
