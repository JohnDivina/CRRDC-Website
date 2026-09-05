"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface SystemProject {
  name: string;
  description: string;
  href: string;
  icon: string; // path to icon or placeholder
  status: "Live" | "Coming Soon" | "Beta";
}

const systems: SystemProject[] = [
  {
    name: "Resursee",
    description:
      "CRRDC's central resource management platform for tracking and monitoring institutional resources.",
    href: "https://crrdc.vercel.app",
    icon: "/images/placeholders/system-resursee.jpg",
    status: "Live",
  },
  {
    name: "Inventory System",
    description:
      "Inventory and sales management for CRRDC commodity, chemical, and equipment resources.",
    href: "#",
    icon: "/images/placeholders/system-inventory.jpg",
    status: "Coming Soon",
  },
  {
    name: "Seed Registry",
    description:
      "Registry and tracking system for CRRDC's seed germplasm collection and distribution.",
    href: "#",
    icon: "/images/placeholders/system-seed.jpg",
    status: "Coming Soon",
  },
  {
    name: "LabAccess",
    description:
      "Research laboratory scheduling, reservation, and equipment access management.",
    href: "#",
    icon: "/images/placeholders/system-labaccess.jpg",
    status: "Coming Soon",
  },
  {
    name: "AgroClimate Hub",
    description:
      "Agricultural climate data dashboard with IoT weather station integration for local crop research.",
    href: "#",
    icon: "/images/placeholders/system-agroclimate.jpg",
    status: "Coming Soon",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#008736]">
            Digital Systems
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Projects We&apos;ve Built
          </h2>
          <p className="mt-3 text-neutral-500">
            Custom digital solutions developed by CRRDC to modernize
            agricultural research operations.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {systems.map((system, idx) => (
            <motion.a
              key={system.name}
              href={system.href}
              target={system.href.startsWith("http") ? "_blank" : undefined}
              rel={system.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-[#008736]/30"
            >
              {/* Preview Image */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                <Image
                  src={system.icon}
                  alt={system.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                {/* Status Badge */}
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    system.status === "Live"
                      ? "bg-[#008736] text-white"
                      : system.status === "Beta"
                      ? "bg-amber-500 text-white"
                      : "bg-neutral-700/70 text-neutral-200 backdrop-blur-sm"
                  }`}
                >
                  {system.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#008736] transition-colors">
                  {system.name}
                </h3>
                <p className="mt-1 flex-1 text-sm text-neutral-500 leading-relaxed">
                  {system.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#008736] opacity-0 transition-all group-hover:opacity-100">
                  {system.status === "Live" ? "Visit Platform" : "Coming Soon"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
