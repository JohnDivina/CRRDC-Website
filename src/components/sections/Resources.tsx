"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { IconExternalLink, IconLock } from "@tabler/icons-react";

interface ResourceItem {
  name: string;
  category: string;
  description: string;
  href: string;
  icon: string;
  isExternal?: boolean;
  status: "Active" | "Internal Access" | "Beta";
}

const resources: ResourceItem[] = [
  {
    name: "Resursee Platform",
    category: "Operations & Asset Management",
    description:
      "CRRDC's primary operational management system for tracking institutional commodities, research assets, and supply logistics.",
    href: "https://crrdc.vercel.app",
    icon: "/images/placeholders/system-resursee.jpg",
    isExternal: true,
    status: "Active",
  },
  {
    name: "Inventory System",
    category: "Supply & Sales Control",
    description:
      "Commodity, certified seed, chemical inventory, and transactional records management for CRRDC production divisions.",
    href: "https://crrdc.vercel.app",
    icon: "/images/placeholders/system-inventory.jpg",
    isExternal: true,
    status: "Active",
  },
  {
    name: "Seed Registry",
    category: "Germplasm Catalog",
    description:
      "Comprehensive tracking database for certified breeder, foundation, and registered crop germplasm seedlots.",
    href: "#",
    icon: "/images/placeholders/system-seed.jpg",
    status: "Internal Access",
  },
  {
    name: "LabAccess Desk",
    category: "Facility Scheduling",
    description:
      "Online instrument booking, laboratory facility reservation, and safety clearance management for research personnel.",
    href: "#",
    icon: "/images/placeholders/system-labaccess.jpg",
    status: "Internal Access",
  },
  {
    name: "AgroClimate Hub",
    category: "Telemetry & Weather",
    description:
      "Microclimate telemetry network integrating local weather station sensors, soil moisture data, and seasonal crop advisories.",
    href: "#",
    icon: "/images/placeholders/system-agroclimate.jpg",
    status: "Beta",
  },
];

export function Resources() {
  return (
    <section id="resources" className="py-20 bg-neutral-50/70 border-t border-neutral-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#008736]">
            Portals &amp; Tools
          </span>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            CRRDC Resources
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Digital platforms, laboratory service portals, and internal
            information systems built for research and operations.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((item, idx) => {
            const isClickable = item.href && item.href !== "#";
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs transition hover:border-neutral-300 hover:shadow-sm"
              >
                <div>
                  {/* Image Preview Header */}
                  <div className="relative mb-4 h-36 w-full overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className={`absolute top-2.5 right-2.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${
                        item.status === "Active"
                          ? "bg-emerald-600 text-white"
                          : item.status === "Beta"
                          ? "bg-amber-600 text-white"
                          : "bg-neutral-800/80 text-neutral-200 backdrop-blur-xs"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Text Information */}
                  <span className="text-[11px] font-medium text-neutral-400">
                    {item.category}
                  </span>
                  <h3 className="mt-0.5 text-base font-semibold text-neutral-900 group-hover:text-[#008736] transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-600">
                    {item.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  {isClickable ? (
                    <a
                      href={item.href}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#008736] hover:underline"
                    >
                      Access System
                      <IconExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400">
                      <IconLock className="h-3.5 w-3.5" />
                      Institutional Access
                    </span>
                  )}
                  <span className="text-[10px] text-neutral-400 font-mono">
                    CRRDC
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
