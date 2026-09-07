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

  // Subpixel GPU position accumulator for buttery-smooth 120Hz motion
  const xRef = useRef<number>(0);
  const setWidthRef = useRef<number>(0);

  // Interaction tracking
  const isUserInteractingRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startPosRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch tracking
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchStartPosRef = useRef<number>(0);

  // 3-second delay after user interaction before auto-scroll resumes
  const RESUME_DELAY_MS = 3000;

  const pauseAutoScroll = useCallback(() => {
    isUserInteractingRef.current = true;

    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // 3 sets of items for seamless infinite bidirectional scrolling
  const triplicatedItems = [...items, ...items, ...items];

  // Measure card set width from DOM for seamless wrap-around
  const measureSetWidth = useCallback(() => {
    if (scrollerRef.current) {
      const children = scrollerRef.current.children;
      if (children.length >= items.length * 2) {
        const first = children[0] as HTMLElement;
        const middle = children[items.length] as HTMLElement;
        if (first && middle) {
          const w = middle.offsetLeft - first.offsetLeft;
          if (w > 0) {
            setWidthRef.current = w;
            if (xRef.current === 0) {
              xRef.current = w; // Start in middle set (Set 2)
            }
          }
        }
      }
    }
  }, [items.length]);

  // Butter-smooth continuous GPU transform animation loop
  useEffect(() => {
    measureSetWidth();
    const t1 = setTimeout(measureSetWidth, 60);
    const t2 = setTimeout(measureSetWidth, 200);
    const t3 = setTimeout(measureSetWidth, 600);

    const handleResize = () => measureSetWidth();
    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();
    let animationFrameId: number;

    const pxPerSecond =
      speed === "fast" ? 48 : speed === "slow" ? 20 : 32;
    const sign = direction === "left" ? 1 : -1;

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Only auto-scroll when user is NOT actively dragging or swiping
      if (!isUserInteractingRef.current && !isDraggingRef.current) {
        xRef.current += sign * pxPerSecond * dt;

        const setW = setWidthRef.current;
        if (setW > 0) {
          if (xRef.current >= setW * 2) {
            xRef.current -= setW;
          } else if (xRef.current < setW) {
            xRef.current += setW;
          }
        }

        if (scrollerRef.current) {
          scrollerRef.current.style.transform = `translate3d(-${xRef.current}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, [direction, speed, measureSetWidth]);

  // Trackpad horizontal swipe & mouse wheel handling
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const isShift = e.shiftKey;
      const isHorizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 && Math.abs(e.deltaX) > 2;

      // Only respond to intentional horizontal trackpad swipe or Shift+Wheel
      if (isHorizontal || (isShift && Math.abs(e.deltaY) > 2)) {
        pauseAutoScroll();
        const delta = isHorizontal ? e.deltaX : e.deltaY;
        xRef.current += delta * 1.05;

        const setW = setWidthRef.current;
        if (setW > 0) {
          if (xRef.current >= setW * 2) {
            xRef.current -= setW;
          } else if (xRef.current < setW) {
            xRef.current += setW;
          }
        }

        if (scrollerRef.current) {
          scrollerRef.current.style.transform = `translate3d(-${xRef.current}px, 0, 0)`;
        }
      }
      // Vertical scroll is completely ignored so page scrolling continues uninterrupted
    },
    [pauseAutoScroll]
  );

  // Pointer / Mouse Drag Handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.clientX;
      startPosRef.current = xRef.current;
      pauseAutoScroll();
    },
    [pauseAutoScroll]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - startXRef.current;
      if (Math.abs(dx) > 4) {
        hasDraggedRef.current = true;
      }
      xRef.current = startPosRef.current - dx;

      const setW = setWidthRef.current;
      if (setW > 0) {
        if (xRef.current >= setW * 2) {
          xRef.current -= setW;
          startPosRef.current -= setW;
        } else if (xRef.current < setW) {
          xRef.current += setW;
          startPosRef.current += setW;
        }
      }

      if (scrollerRef.current) {
        scrollerRef.current.style.transform = `translate3d(-${xRef.current}px, 0, 0)`;
      }
      pauseAutoScroll();
    },
    [pauseAutoScroll]
  );

  const handlePointerUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      pauseAutoScroll(); // Starts the 3-second countdown from release
    }
  }, [pauseAutoScroll]);

  // Touch handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
      touchStartPosRef.current = xRef.current;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const dx = currentX - touchStartXRef.current;
      const dy = currentY - touchStartYRef.current;

      // Only handle intentional horizontal swipe
      if (Math.abs(dx) > Math.abs(dy) * 1.3 && Math.abs(dx) > 5) {
        pauseAutoScroll();
        xRef.current = touchStartPosRef.current - dx;

        const setW = setWidthRef.current;
        if (setW > 0) {
          if (xRef.current >= setW * 2) {
            xRef.current -= setW;
            touchStartPosRef.current -= setW;
          } else if (xRef.current < setW) {
            xRef.current += setW;
            touchStartPosRef.current += setW;
          }
        }

        if (scrollerRef.current) {
          scrollerRef.current.style.transform = `translate3d(-${xRef.current}px, 0, 0)`;
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (isUserInteractingRef.current) {
      pauseAutoScroll();
    }
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)] select-none py-4 cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {/* Soft gradient edge fade overlays pinned to outer boundaries */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-16 sm:w-28 bg-gradient-to-r from-white via-white/85 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-16 sm:w-28 bg-gradient-to-l from-white via-white/85 to-transparent" />

      {/* Hardware GPU-accelerated scroller list */}
      <ul
        ref={scrollerRef}
        className="flex min-w-max shrink-0 gap-6 px-4 flex-nowrap relative will-change-transform"
        style={{
          transform: "translate3d(0, 0, 0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
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
  );
};
