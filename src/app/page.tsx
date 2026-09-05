import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { Divisions } from "@/components/sections/Divisions";
import { Facilities } from "@/components/sections/Facilities";
import { Research } from "@/components/sections/Research";
import { DigitalSystems } from "@/components/sections/DigitalSystems";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Institutional Navbar */}
      <Navbar />

      {/* Main Page Landmark */}
      <main id="main-content" className="flex-grow">
        {/* Section 1: Institutional Hero with Key Indicators */}
        <Hero />

        {/* Section 2: Mandate, Vision, Mission & 4 Pillars */}
        <Overview />

        {/* Section 3: Four Operating Divisions */}
        <Divisions />

        {/* Section 4: Ten Research Laboratories & Facilities */}
        <Facilities />

        {/* Section 5: Scientific Research Thrusts, Commodities & Publications */}
        <Research />

        {/* Section 6: Digital Transformation Portals (Resursee, Seed Registry, etc.) */}
        <DigitalSystems />

        {/* Section 7: Campus Location, Google Maps Embed & Communication Desk */}
        <Contact />
      </main>

      {/* Global Institutional Footer */}
      <Footer />
    </div>
  );
}
