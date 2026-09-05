"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";

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
  const [start, setStart] = useState(true);
  const [isMomentarilyPaused, setIsMomentarilyPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const startXRef = useRef(0);
  const currentDragOffsetRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Set animation duration and direction CSS variables
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      const duration =
        speed === "fast" ? "22s" : speed === "slow" ? "52s" : "34s";
      containerRef.current.style.setProperty("--animation-duration", duration);
      setStart(true);
    }
  }, [direction, speed]);

  // Momentary stop only when user actively interacts with the carousel
  const triggerMomentaryPause = useCallback((duration = 1600) => {
    setIsMomentarilyPaused(true);
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }
    pauseTimerRef.current = setTimeout(() => {
      setIsMomentarilyPaused(false);
    }, duration);
  }, []);

  // Only pause on wheel if user is scrolling horizontally on the carousel
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 6) {
      triggerMomentaryPause(1800);
    }
  };

  // Pointer Drag Handlers (supports both mouse and touch drag)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    currentDragOffsetRef.current = dragOffset;
    triggerMomentaryPause(3000);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 5) {
      hasDraggedRef.current = true;
    }
    // Dampen drag bounds for clean feel
    const newOffset = currentDragOffsetRef.current + deltaX;
    setDragOffset(Math.max(-250, Math.min(250, newOffset)));
    triggerMomentaryPause(3000);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      triggerMomentaryPause(2000);
      // Smoothly return drag offset to 0 so the marquee loop remains aligned
      setTimeout(() => {
        setDragOffset(0);
      }, 800);
    }
  };

  // Duplicate items for seamless continuous looping
  const duplicatedItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
        className
      )}
    >
      {/* Soft gradient edge fade overlays pinned to outer boundaries */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-16 sm:w-28 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-16 sm:w-28 bg-gradient-to-l from-white via-white/85 to-transparent" />

      {/* Interactive Drag & Marquee Wrapper */}
      <div
        className="w-full cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={{
            animationPlayState:
              isMomentarilyPaused || isDragging ? "paused" : "running",
          }}
        >
          {duplicatedItems.map((item, idx) => {
            const divisionNumber = (idx % items.length) + 1;
            return (
              <li
                key={`${item.title}-${idx}`}
                className="group relative flex h-[275px] w-[300px] sm:h-[290px] sm:w-[350px] md:w-[380px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-900 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-neutral-300 cursor-pointer"
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                {/* Background Image with subtle zoom on hover */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
                    loading="eager"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Division Content */}
                <div className="relative z-10 pointer-events-none">
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
                    <span className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-neutral-900 shadow-sm transition hover:bg-white active:scale-95">
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
    </div>
  );
};
