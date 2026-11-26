"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { RotateCw } from "lucide-react";
import { CometCard } from "@/components/ui/comet-card";
import { divisionsData, type Division } from "@/data/divisions";

function DivisionFlipCard({
  division,
  isFlipped,
  onToggle,
}: {
  division: Division;
  isFlipped: boolean;
  onToggle: () => void;
}) {
  return (
    <CometCard rotateDepth={10} translateDepth={12} className="w-full max-w-[270px] mx-auto">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={isFlipped}
        aria-label={
          isFlipped
            ? `Flip back ${division.name}`
            : `View details for ${division.name}`
        }
        className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#008736] focus-visible:ring-offset-2 rounded-[16px]"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[3/4.2]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT FACE */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[16px] bg-[#0b1c11] p-8 text-center text-white"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <h3 className="text-lg font-bold leading-snug tracking-tight text-white text-balance sm:text-xl">
              {division.name}
            </h3>
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-[16px] border border-[#e2e7dc] bg-[#fbfcf9] p-6 text-[#18231c] overflow-y-auto"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full border border-[#e2e7dc] bg-[#f4f6f1] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#18231c]">
                  {division.code}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#526356]">
                  <RotateCw className="h-2.5 w-2.5" aria-hidden="true" />
                  <span>Flip back</span>
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold leading-snug tracking-tight text-[#18231c]">
                {division.name}
              </h3>
              <p className="mt-1.5 text-[11px] font-semibold leading-snug text-[#008736]">
                {division.subtitle}
              </p>

              <p className="mt-3 text-xs leading-relaxed text-[#526356]">
                {division.description}
              </p>

              <div className="mt-4 border-t border-[#e2e7dc] pt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#18231c]">
                  Key Focus
                </h4>
                <ul className="mt-2 space-y-1.5 text-[11.5px] leading-snug text-[#526356]">
                  {division.keyResponsibilities.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#18231c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </button>
    </CometCard>
  );
}

export function Divisions() {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="divisions"
      className="relative py-28 sm:py-32 overflow-x-clip border-y border-[#e2e7dc]"
      style={{
        backgroundColor: "#f7f8f5",
        backgroundImage: `linear-gradient(180deg, rgba(251, 252, 249, 0.35) 0%, rgba(251, 252, 249, 0.18) 50%, rgba(251, 252, 249, 0.35) 100%), url("/textures/divisions-plaster-seamless.jpg")`,
        backgroundRepeat: "no-repeat, repeat",
        backgroundSize: "100% 100%, 420px auto",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Concise Section Header */}
        <div className="mx-auto max-w-xl text-center mb-20">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Four Core Operating Divisions
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            CRRDC executes research mandates across four specialized divisions
            advancing crop science, genomics, farm engineering, and communication.
          </p>
        </div>

        {/* 4 Flippable CometCards in a Straight Row */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 xl:gap-16">
          {divisionsData.map((division) => (
            <DivisionFlipCard
              key={division.id}
              division={division}
              isFlipped={Boolean(flippedIds[division.id])}
              onToggle={() => toggleCard(division.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
