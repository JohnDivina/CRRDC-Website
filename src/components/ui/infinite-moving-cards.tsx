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

  // Interaction & animation refs
  const isInteractingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const setWidthRef = useRef(0);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef(performance.now());
  const animationFrameIdRef = useRef<number | null>(null);

  // State to reflect active user scrolling for UI classes
  const [isUserActive, setIsUserActive] = useState(false);

  // 3 duplicate sets for seamless infinite bidirectional scrolling
  const triplicatedItems = [...items, ...items, ...items];

  // Pause momentarily when scrolled or interacted with
  const pauseMomentarily = useCallback((duration = 2000) => {
    isInteractingRef.current = true;
    setIsUserActive(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setIsUserActive(false);
    }, duration);
  }, []);

  // Measure card set width for infinite wrap-around
  const measureSetWidth = useCallback(() => {
    if (scrollerRef.current && containerRef.current) {
      const children = scrollerRef.current.children;
      if (children.length >= items.length * 2) {
        const first = children[0] as HTMLElement;
        const middle = children[items.length] as HTMLElement;
        if (first && middle) {
          const width = middle.offsetLeft - first.offsetLeft;
          if (width > 0) {
            setWidthRef.current = width;
            // Initialize scroll position to middle set if at 0
            if (containerRef.current.scrollLeft === 0) {
              containerRef.current.scrollLeft = width;
            }
          }
        }
      }
    }
  }, [items.length]);

  // Initial layout measurement
  useEffect(() => {
    measureSetWidth();
    const t1 = setTimeout(measureSetWidth, 100);
    const t2 = setTimeout(measureSetWidth, 400);

    const handleResize = () => measureSetWidth();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
    };
  }, [measureSetWidth]);

  // Continuous auto-movement loop with momentary pause
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const container = containerRef.current;
      const setW = setWidthRef.current;

      // Only auto-scroll when user is NOT interacting, dragging, or hovering
      if (
        container &&
        setW > 0 &&
        !isInteractingRef.current &&
        !isDraggingRef.current &&
        (!pauseOnHover || !isHoveredRef.current)
      ) {
        const pxPerSec = speed === "fast" ? 52 : speed === "slow" ? 20 : 32;
        const delta = (direction === "left" ? 1 : -1) * pxPerSec * dt;
        container.scrollLeft += delta;

        // Seamless wrap-around
        if (container.scrollLeft >= setW * 2) {
          container.scrollLeft -= setW;
        } else if (container.scrollLeft <= setW * 0.1) {
          container.scrollLeft += setW;
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [direction, speed, pauseOnHover]);

  // Scroll event handler: wraps infinite scroller and detects user scroll
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const setW = setWidthRef.current;
    if (!container || setW <= 0) return;

    // Infinite loop boundaries check
    if (container.scrollLeft >= setW * 2) {
      container.scrollLeft -= setW;
    } else if (container.scrollLeft <= setW * 0.1) {
      container.scrollLeft += setW;
    }

    // If user is touching, wheeling, or dragging, refresh pause timer
    if (isInteractingRef.current || isDraggingRef.current) {
      pauseMomentarily(2200);
    }
  }, [pauseMomentarily]);

  // Wheel event handler: supports trackpad horizontal swipe & mouse wheel
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      pauseMomentarily(2200);

      // If user scrolls using standard vertical mouse wheel over cards, assist with horizontal translation
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
        if (containerRef.current) {
          containerRef.current.scrollLeft += e.deltaY * 0.75;
        }
      }
    },
    [pauseMomentarily],
  );

  // Mouse Drag handlers for desktop
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.pageX - containerRef.current.offsetLeft;
      startScrollLeftRef.current = containerRef.current.scrollLeft;
      pauseMomentarily(3000);
    },
    [pauseMomentarily],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1.2;
      if (Math.abs(walk) > 5) {
        hasDraggedRef.current = true;
      }
      containerRef.current.scrollLeft = startScrollLeftRef.current - walk;
      pauseMomentarily(2500);
    },
    [pauseMomentarily],
  );

  const handleMouseUpOrLeave = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      pauseMomentarily(2000);
    }
  }, [pauseMomentarily]);

  // Touch handlers for mobile / tablet
  const handleTouchStart = useCallback(() => {
    pauseMomentarily(3000);
  }, [pauseMomentarily]);

  const handleTouchMove = useCallback(() => {
    pauseMomentarily(3000);
  }, [pauseMomentarily]);

  const handleTouchEnd = useCallback(() => {
    pauseMomentarily(2200);
  }, [pauseMomentarily]);

  return (
    <div
      className={cn(
        "relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]",
        className,
      )}
    >
      {/* Soft gradient edge fade overlays pinned to outer boundaries */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-20 sm:w-36 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-20 sm:w-36 bg-gradient-to-l from-white via-white/85 to-transparent" />

      {/* Scrollable, draggable card container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={() => {
          handleMouseUpOrLeave();
          isHoveredRef.current = false;
        }}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "scroller relative z-20 flex w-full overflow-x-auto overflow-y-hidden select-none py-4",
          "cursor-grab active:cursor-grabbing",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          isUserActive && "scroll-smooth",
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <ul
          ref={scrollerRef}
          className="flex min-w-max shrink-0 gap-5 px-4 flex-nowrap"
        >
          {triplicatedItems.map((item, idx) => {
            const divisionNumber = (idx % items.length) + 1;
            return (
              <li
                key={`${item.title}-${idx}`}
                className="group relative flex h-[270px] w-[285px] sm:h-[285px] sm:w-[335px] md:w-[365px] flex-shrink-0 flex-col justify-end overflow-hidden rounded-2xl border border-neutral-200/80 bg-neutral-900 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-neutral-300 cursor-pointer"
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
