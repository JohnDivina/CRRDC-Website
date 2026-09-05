"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

export interface DivisionSlide {
  title: string;
  description?: string;
  button: string;
  src: string;
  number?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  items: DivisionSlide[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }

      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "22s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "34s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "55s");
      }

      setStart(true);
    }
  }, [direction, speed]);

  // Duplicate items for seamless continuous looping
  const duplicatedItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_18%,white_82%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,white_18%,white_82%,transparent)]",
        className,
      )}
    >
      {/* Deep soft gradient edge fade overlays matching the user-indicated boundary lines */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-28 sm:w-44 bg-gradient-to-r from-white via-white/90 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-28 sm:w-44 bg-gradient-to-l from-white via-white/90 to-transparent" />

      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {duplicatedItems.map((item, idx) => {
          const divisionNumber = (idx % items.length) + 1;
          return (
            <li
              key={`${item.title}-${idx}`}
              className="group relative flex h-[270px] w-[280px] sm:h-[285px] sm:w-[330px] md:w-[350px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-900 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-neutral-300 cursor-pointer"
            >
              {/* Background Image with subtle zoom on hover */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Division Content */}
              <div className="relative z-10">
                <span className="inline-block rounded-full bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#47c76a] backdrop-blur-xs border border-white/10">
                  Division 0{divisionNumber}
                </span>
                <h3 className="mt-2 text-base font-bold leading-snug text-white sm:text-lg md:text-xl">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-300">
                    {item.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-neutral-900 shadow-sm transition hover:bg-white active:scale-95">
                    {item.button}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    CRRDC · CLSU
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
