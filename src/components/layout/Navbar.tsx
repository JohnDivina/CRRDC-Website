"use client";

import React, { useState } from "react";
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
    { name: "Resources", link: "#resources" },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2.5">
            <NavbarButton href="/shop" variant="secondary">
              Shop Now
            </NavbarButton>
            <NavbarButton href="#contact" variant="primary">
              Contact
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
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
                className="w-full py-1 text-sm font-medium text-neutral-700 hover:text-neutral-950 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="mt-2 flex w-full flex-col gap-2 pt-2 border-t border-neutral-100">
              <NavbarButton
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full py-2 text-xs"
              >
                Shop Now
              </NavbarButton>
              <NavbarButton
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full py-2 text-xs"
              >
                Contact
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
