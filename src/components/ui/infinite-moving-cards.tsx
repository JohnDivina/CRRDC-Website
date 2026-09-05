"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";

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

  // Interaction refs
  const isInteractingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 3-second delay after user stops scrolling before resuming auto-scroll
  const RESUME_DELAY_MS = 3000;

  const markUserInteracting = useCallback(() => {
    isInteractingRef.current = true;

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // 3 sets of items for seamless infinite wrap-around
  const triplicatedItems = [...items, ...items, ...items];

  // Auto-scroll loop using requestAnimationFrame on native scrollLeft
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize to middle set for infinite bidirectional scroll
    const initScrollPosition = () => {
      if (container.scrollWidth > 0 && container.scrollLeft === 0) {
        container.scrollLeft = container.scrollWidth / 3;
      }
    };

    initScrollPosition();
    const t1 = setTimeout(initScrollPosition, 100);
    const t2 = setTimeout(initScrollPosition, 400);

    let lastTime = performance.now();
    let animationFrameId: number;

    const pxPerSecond =
      speed === "fast" ? 54 : speed === "slow" ? 22 : 36;
    const sign = direction === "left" ? 1 : -1;

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (
        container &&
        !isInteractingRef.current &&
        (!pauseOnHover || !isHoveredRef.current) &&
        !isDraggingRef.current &&
        container.scrollWidth > 0
      ) {
        container.scrollLeft += sign * pxPerSecond * dt;

        const singleSetWidth = container.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft -= singleSetWidth;
          } else if (container.scrollLeft <= 5) {
            container.scrollLeft += singleSetWidth;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(t1);
      clearTimeout(t2);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [direction, speed, pauseOnHover]);

  // Scroll event: maintains infinite loop and refreshes the 3-second timer if user is scrolling
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.scrollWidth <= 0) return;

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
      } else if (container.scrollLeft <= 5) {
        container.scrollLeft += singleSetWidth;
      }
    }

    if (isInteractingRef.current) {
      markUserInteracting();
    }
  }, [markUserInteracting]);

  // Wheel event: trackpad horizontal swipe & mouse wheel
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      markUserInteracting();

      // If user scrolls using standard vertical mouse wheel over cards, assist with smooth horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 3) {
        if (containerRef.current) {
          containerRef.current.scrollLeft += e.deltaY * 0.85;
        }
      }
    },
    [markUserInteracting]
  );

  // Pointer / Mouse drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.pageX - containerRef.current.offsetLeft;
      startScrollLeftRef.current = containerRef.current.scrollLeft;
      markUserInteracting();
    },
    [markUserInteracting]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1.25;
      if (Math.abs(walk) > 5) {
        hasDraggedRef.current = true;
      }
      containerRef.current.scrollLeft = startScrollLeftRef.current - walk;
      markUserInteracting();
    },
    [markUserInteracting]
  );

  const handlePointerUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      markUserInteracting(); // Begins the 3-second countdown from release
    }
  }, [markUserInteracting]);

  return (
    <div
      className={cn(
        "relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)]",
        className
      )}
    >
      {/* Soft gradient edge fade overlays pinned to outer boundaries */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-16 sm:w-28 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-16 sm:w-28 bg-gradient-to-l from-white via-white/85 to-transparent" />

      {/* Smooth, interactive scroll container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          handlePointerUp();
        }}
        onTouchStart={markUserInteracting}
        onTouchMove={markUserInteracting}
        onTouchEnd={markUserInteracting}
        className="scroller relative z-20 flex w-full overflow-x-auto overflow-y-hidden select-none py-4 cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "auto",
        }}
      >
        <ul
          ref={scrollerRef}
          className="flex min-w-max shrink-0 gap-6 px-4 flex-nowrap"
        >
          {triplicatedItems.map((item, idx) => {
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
