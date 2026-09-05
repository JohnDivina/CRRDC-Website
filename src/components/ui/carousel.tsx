"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useCallback } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  totalOriginal: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({
  slide,
  index,
  current,
  totalOriginal,
  handleSlideClick,
}: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title } = slide;
  const isCurrent = current === index;
  const divisionNum = (index % totalOriginal) + 1;

  return (
    <div className="[perspective:1000px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative z-10 flex h-[260px] w-[300px] flex-1 flex-col items-center justify-center text-center text-white opacity-100 transition-all duration-300 ease-in-out sm:h-[300px] sm:w-[420px] md:h-[320px] md:w-[460px] mx-2 sm:mx-3 cursor-pointer select-none"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: !isCurrent
            ? "scale(0.94) rotateX(5deg)"
            : "scale(1) rotateX(0deg)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-lg transition-all duration-150 ease-out"
          style={{
            transform: isCurrent
              ? "translate3d(calc(var(--x) / 35), calc(var(--y) / 35), 0)"
              : "none",
          }}
        >
          <img
            className="absolute inset-0 h-[115%] w-[115%] object-cover transition-opacity duration-500 ease-in-out"
            style={{
              opacity: isCurrent ? 0.92 : 0.45,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        </div>

        <article
          className={`relative z-20 px-6 py-4 transition-opacity duration-500 ease-in-out ${
            isCurrent ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#47c76a]">
            Division 0{divisionNum}
          </span>
          <h3 className="mt-1 text-base font-semibold leading-snug sm:text-lg md:text-xl text-white">
            {title}
          </h3>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3.5 py-1 text-xs font-semibold text-neutral-900 shadow-sm transition hover:bg-white active:scale-95">
              {button}
            </span>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-xs transition hover:border-neutral-300 hover:text-neutral-900 active:scale-95 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
      aria-label={title}
    >
      <IconArrowNarrowRight className="h-4 w-4" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  autoplayInterval?: number;
}

export default function Carousel({
  slides,
  autoplayInterval = 3200,
}: CarouselProps) {
  const N = slides.length;
  // 3 sets of slides for seamless forward/backward infinite rotation
  const extendedSlides = [...slides, ...slides, ...slides];

  const [virtualIndex, setVirtualIndex] = useState(N); // Start at middle set (index 4)
  const [withTransition, setWithTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const id = useId();

  const handleNextClick = useCallback(() => {
    setWithTransition(true);
    setVirtualIndex((prev) => prev + 1);
  }, []);

  const handlePreviousClick = useCallback(() => {
    setWithTransition(true);
    setVirtualIndex((prev) => prev - 1);
  }, []);

  const handleSlideClick = useCallback(
    (index: number) => {
      setWithTransition(true);
      setVirtualIndex(index);
    },
    [],
  );

  // Silently reset loop boundary on transition end so rotation is 100% infinite and seamless
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLUListElement>) => {
    if (e.target !== e.currentTarget) return;

    if (virtualIndex >= 2 * N) {
      setWithTransition(false);
      setVirtualIndex(virtualIndex - N);
    } else if (virtualIndex < N) {
      setWithTransition(false);
      setVirtualIndex(virtualIndex + N);
    }
  };

  // Re-enable transition on the next frame after boundary reset
  useEffect(() => {
    if (!withTransition) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          setWithTransition(true);
        });
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
  }, [withTransition]);

  // Constantly rotating smoothly: auto-advance timer
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      handleNextClick();
    }, autoplayInterval);

    return () => clearInterval(timer);
  }, [isHovered, autoplayInterval, handleNextClick]);

  const activeDivision = ((virtualIndex % N) + N) % N;

  return (
    <div
      className="relative mx-auto h-[260px] w-[300px] sm:h-[300px] sm:w-[420px] md:h-[320px] md:w-[460px]"
      aria-labelledby={`carousel-heading-${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul
        onTransitionEnd={handleTransitionEnd}
        className="absolute flex mx-[-8px] sm:mx-[-12px]"
        style={{
          transform: `translateX(-${virtualIndex * (100 / extendedSlides.length)}%)`,
          transition: withTransition
            ? "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <Slide
            key={`${slide.title}-${index}`}
            slide={slide}
            index={index}
            current={virtualIndex}
            totalOriginal={N}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Control Buttons & Progress Dots Centered Below */}
      <div className="absolute top-[calc(100%+1.5rem)] flex w-full flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          <CarouselControl
            type="previous"
            title="Previous division"
            handleClick={handlePreviousClick}
          />

          {/* Interactive Division Dots */}
          <div className="flex items-center gap-1.5 px-2">
            {slides.map((_, idx) => {
              const isActive = activeDivision === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setWithTransition(true);
                    setVirtualIndex(N + idx);
                  }}
                  aria-label={`Go to Division 0${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-[#008736]"
                      : "w-2 bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              );
            })}
          </div>

          <CarouselControl
            type="next"
            title="Next division"
            handleClick={handleNextClick}
          />
        </div>

        {/* Live Active Status Indicator */}
        <span className="text-[11px] font-medium text-neutral-400">
          Division 0{activeDivision + 1} of 0{N}
          {isHovered && <span className="ml-1 text-[#008736]">(Paused)</span>}
        </span>
      </div>
    </div>
  );
}
