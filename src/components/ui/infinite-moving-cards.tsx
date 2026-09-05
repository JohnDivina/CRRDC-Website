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

  // Internal float accumulator for subpixel precision so browser rounding never stalls auto-scroll
  const scrollPosRef = useRef<number>(0);
  const isUserScrollingRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startScrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 3-second delay after user finishes scrolling before auto-scroll resumes
  const RESUME_DELAY_MS = 3000;

  const pauseUserScroll = useCallback(() => {
    isUserScrollingRef.current = true;

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      // Sync float position directly with DOM scroll position before resuming
      if (containerRef.current) {
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
      isUserScrollingRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // 3 sets of items for seamless infinite bidirectional scrolling
  const triplicatedItems = [...items, ...items, ...items];

  // Guaranteed continuous auto-scroll using float accumulator on RAF
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize to middle set so user can scroll left or right infinitely
    const initScrollPos = () => {
      if (container.scrollWidth > 0 && scrollPosRef.current === 0) {
        const startX = container.scrollWidth / 3;
        container.scrollLeft = startX;
        scrollPosRef.current = startX;
      }
    };

    initScrollPos();
    const t1 = setTimeout(initScrollPos, 60);
    const t2 = setTimeout(initScrollPos, 250);
    const t3 = setTimeout(initScrollPos, 600);

    let lastTime = performance.now();
    let animationFrameId: number;

    const pxPerSecond =
      speed === "fast" ? 54 : speed === "slow" ? 22 : 36;
    const sign = direction === "left" ? 1 : -1;

    const step = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Auto-scroll runs whenever the user is NOT actively scrolling or dragging
      if (
        container &&
        !isUserScrollingRef.current &&
        !isDraggingRef.current &&
        container.scrollWidth > 0
      ) {
        scrollPosRef.current += sign * pxPerSecond * dt;

        const singleSetWidth = container.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (scrollPosRef.current >= singleSetWidth * 2) {
            scrollPosRef.current -= singleSetWidth;
          } else if (scrollPosRef.current <= 5) {
            scrollPosRef.current += singleSetWidth;
          }
        }

        // Apply float position to container
        container.scrollLeft = scrollPosRef.current;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [direction, speed]);

  // Scroll event: maintains infinite boundaries and refreshes 3s timer if user is scrolling
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.scrollWidth <= 0) return;

    if (isUserScrollingRef.current || isDraggingRef.current) {
      scrollPosRef.current = container.scrollLeft;
      pauseUserScroll();
    }

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (container.scrollLeft >= singleSetWidth * 2) {
        container.scrollLeft -= singleSetWidth;
        scrollPosRef.current = container.scrollLeft;
      } else if (container.scrollLeft <= 5) {
        container.scrollLeft += singleSetWidth;
        scrollPosRef.current = container.scrollLeft;
      }
    }
  }, [pauseUserScroll]);

  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);

  // Wheel event: ONLY intentional horizontal trackpad swipe interacts with the carousel
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      // If user is scrolling vertically through the webpage, ignore it completely so carousel keeps moving!
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5 && Math.abs(e.deltaX) > 6) {
        const container = containerRef.current;
        if (container) {
          scrollPosRef.current = container.scrollLeft;
        }
        pauseUserScroll();
      }
    },
    [pauseUserScroll]
  );

  // Pointer / Mouse Drag Handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.pageX - containerRef.current.offsetLeft;
      startScrollLeftRef.current = containerRef.current.scrollLeft;
      pauseUserScroll();
    },
    [pauseUserScroll]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current || !containerRef.current) return;
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startXRef.current) * 1.3;
      if (Math.abs(walk) > 5) {
        hasDraggedRef.current = true;
      }
      containerRef.current.scrollLeft = startScrollLeftRef.current - walk;
      scrollPosRef.current = containerRef.current.scrollLeft;
      pauseUserScroll();
    },
    [pauseUserScroll]
  );

  const handlePointerUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      if (containerRef.current) {
        scrollPosRef.current = containerRef.current.scrollLeft;
      }
      pauseUserScroll(); // Starts the 3-second countdown from release
    }
  }, [pauseUserScroll]);

  // Touch handlers: only pause if user is swiping horizontally on the carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const dx = Math.abs(e.touches[0].clientX - touchStartXRef.current);
      const dy = Math.abs(e.touches[0].clientY - touchStartYRef.current);
      if (dx > dy * 1.5 && dx > 8) {
        pauseUserScroll();
      }
    }
  };

  const handleTouchEnd = () => {
    if (isUserScrollingRef.current) {
      pauseUserScroll();
    }
  };

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
