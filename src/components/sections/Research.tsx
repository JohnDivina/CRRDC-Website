"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface StatItem {
  label: string;
  value: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { label: "Patents", value: "—" },
  { label: "Utility Models", value: "—" },
  { label: "Copyrights", value: "—" },
  { label: "Finished Projects", value: "—" },
  { label: "Ongoing Projects", value: "—" },
];

const collaborators = [
  "DOST-PCAARRD",
  "DA-BAR",
  "BPI",
  "PhilRice",
  "IRRI",
  "PHilMech",
  "DA-BSWM",
  "CHED",
];

function AnimatedNumber({ value }: { value: string }) {
  // If placeholder, just show the dash
  if (value === "—") {
    return <span className="text-neutral-400">—</span>;
  }

  const numericValue = parseInt(value, 10);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || isNaN(numericValue)) return;

    let start = 0;
    const duration = 1500;
    const increment = numericValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, numericValue]);

  return <span ref={ref}>{count}</span>;
}

export function Research() {
  return (
    <section id="research" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#008736]">
            Research &amp; Achievements
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Impact at a Glance
          </h2>
          <p className="mt-3 text-neutral-500">
            A snapshot of CRRDC&apos;s intellectual property portfolio, active research projects,
            and institutional collaborations.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center"
            >
              <span className="text-4xl font-bold text-[#008736] sm:text-5xl">
                <AnimatedNumber value={stat.value} />
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </span>
              <span className="mt-2 text-xs font-medium uppercase tracking-wider text-neutral-500">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Collaborating Agencies */}
        <div className="mt-20">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-8">
            Collaborated with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {collaborators.map((agency) => (
              <motion.span
                key={agency}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-[#008736]/30 hover:text-[#008736]"
              >
                {agency}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
