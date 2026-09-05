"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

const stats: StatItem[] = [
  { label: "Patents Filed & Granted", value: 12, suffix: "+" },
  { label: "Utility Models Registered", value: 28, suffix: "+" },
  { label: "Copyrighted Technologies", value: 45, suffix: "+" },
  { label: "Completed Projects", value: 84, suffix: "+" },
  { label: "Active Research Thrusts", value: 24, suffix: "" },
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

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const increment = Math.max(1, Math.ceil(value / (duration / 16)));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
}

export function Research() {
  return (
    <section id="research" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-xl text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#008736]">
            Achievements
          </span>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Research Impact &amp; Metrics
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            A track record of intellectual property, applied agricultural
            inventions, and completed national R&amp;D grants.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-50/60 p-5 text-center transition hover:bg-white hover:shadow-xs"
            >
              <span className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                <AnimatedNumber value={stat.value} />
                {stat.suffix && <span className="text-[#008736]">{stat.suffix}</span>}
              </span>
              <span className="mt-1.5 text-[11px] font-medium text-neutral-500 leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Institutional Collaborators */}
        <div className="mt-14 pt-10 border-t border-neutral-100">
          <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-6">
            Institutional Research Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {collaborators.map((agency) => (
              <span
                key={agency}
                className="rounded-full border border-neutral-200/80 bg-neutral-50/50 px-4 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-[#008736]/30 hover:bg-white hover:text-[#008736]"
              >
                {agency}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
