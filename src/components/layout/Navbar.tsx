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

export function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "About", link: "#about" },
    { name: "Divisions", link: "#divisions" },
    { name: "Facilities", link: "#facilities" },
    { name: "Research", link: "#research" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo href="/">
            <div className="flex items-center gap-2.5">
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
              <span className="text-sm font-bold text-neutral-900">CRRDC</span>
            </div>
          </NavbarLogo>

          <NavItems items={navItems} />

          <div className="flex items-center gap-3">
            <NavbarButton
              href="https://crrdc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              Resursee
            </NavbarButton>
            <NavbarButton href="#contact" variant="primary">
              Get in Touch
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo href="/">
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
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href="https://crrdc.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Resursee Platform
              </NavbarButton>
              <NavbarButton
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Get in Touch
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
