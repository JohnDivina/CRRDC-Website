import React from "react";
import { AppNavbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";
import { Facilities } from "@/components/sections/Facilities";
import { Research } from "@/components/sections/Research";
import { Resources } from "@/components/sections/Resources";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Resizable Navbar */}
      <AppNavbar />

      <main id="main-content" className="flex-grow">
        {/* Section 1: Hero — Parallax Hero Images */}
        <Hero />

        {/* Section 2: Divisions — Compact 3D Carousel */}
        <Divisions />

        {/* Section 3: Facilities — Animated Testimonials */}
        <Facilities />

        {/* Section 4: Research & Achievements — Metrics */}
        <Research />

        {/* Section 5: Resources & Digital Tools */}
        <Resources />
      </main>

      {/* Section 6: Contact & Footer */}
      <Footer />
    </div>
  );
}
