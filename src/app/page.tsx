import React from "react";
import { AppNavbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Divisions } from "@/components/sections/Divisions";
import { Facilities } from "@/components/sections/Facilities";
import { Research } from "@/components/sections/Research";
import { Projects } from "@/components/sections/Projects";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <AppNavbar />

      <main id="main-content" className="flex-grow">
        {/* Hero — Parallax Hero Images */}
        <Hero />

        {/* Divisions — Carousel */}
        <Divisions />

        {/* Facilities — Animated Testimonials */}
        <Facilities />

        {/* Research & Achievements — Stats */}
        <Research />

        {/* Digital Projects — Portfolio Cards */}
        <Projects />
      </main>

      {/* Contact + Footer */}
      <Footer />
    </div>
  );
}
