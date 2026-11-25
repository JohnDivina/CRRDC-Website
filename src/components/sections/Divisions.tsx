"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";
import { InfiniteMovingCards, DivisionSlide } from "@/components/ui/infinite-moving-cards";
import { divisionsData, Division } from "@/data/divisions";

const divisions: DivisionSlide[] = divisionsData.map((d) => ({
  id: d.id,
  title: d.name,
  description: d.description,
  button: d.button,
  src: d.src,
}));

export function Divisions() {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedDivision && !dialog.open) {
      dialog.showModal();
    } else if (!selectedDivision && dialog.open) {
      dialog.close();
    }
  }, [selectedDivision]);

  const handleSelect = (slide: DivisionSlide) => {
    const found = divisionsData.find((d) => d.id === slide.id || d.name === slide.title);
    if (found) setSelectedDivision(found);
  };

  return (
    <section id="divisions" className="py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Concise Section Header */}
        <div className="mx-auto max-w-xl text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Four Core Operating Divisions
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            CRRDC executes research mandates across four specialized divisions
            advancing crop science, genomics, farm engineering, and communication.
          </p>
        </div>
      </div>

      {/* Infinite Moving Cards with Wide Span and Faded Edges */}
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden px-4 sm:px-6 lg:px-8">
        <InfiniteMovingCards
          items={divisions}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          onSelect={handleSelect}
        />
      </div>

      {/* Native Division Details Dialog */}
      <dialog
        ref={dialogRef}
        onClose={() => setSelectedDivision(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setSelectedDivision(null);
        }}
        className="m-auto w-[92vw] max-w-2xl rounded-2xl border border-neutral-200 bg-white p-0 text-left shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-xs"
      >
        {selectedDivision && (
          <div className="overflow-hidden">
            <div className="relative h-44 w-full sm:h-52">
              <Image
                src={selectedDivision.src}
                alt={selectedDivision.name}
                fill
                sizes="(max-width: 640px) 92vw, 672px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedDivision(null)}
                aria-label="Close division details"
                className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-black/80"
              >
                <IconX className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="inline-block rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                  {selectedDivision.code}
                </span>
                <h3 className="mt-1.5 text-lg font-bold text-white sm:text-xl">
                  {selectedDivision.name}
                </h3>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#008736]">
                  {selectedDivision.subtitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {selectedDivision.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Key Responsibilities
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-neutral-600">
                    {selectedDivision.keyResponsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#008736]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Priority Programs
                  </h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-neutral-600">
                    {selectedDivision.priorityPrograms.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-800" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
