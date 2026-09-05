"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
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

  return (
    <div className="[perspective:1000px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="relative z-10 flex h-[260px] w-[300px] flex-1 flex-col items-center justify-center text-center text-white opacity-100 transition-all duration-300 ease-in-out sm:h-[300px] sm:w-[420px] md:h-[320px] md:w-[460px] mx-2 sm:mx-3 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.96) rotateX(6deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-lg transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 35), calc(var(--y) / 35), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 h-[115%] w-[115%] object-cover transition-opacity duration-500 ease-in-out"
            style={{
              opacity: current === index ? 0.9 : 0.4,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <article
          className={`relative z-20 px-6 py-4 transition-opacity duration-500 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#47c76a]">
            Division 0{index + 1}
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
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative mx-auto h-[260px] w-[300px] sm:h-[300px] sm:w-[420px] md:h-[320px] md:w-[460px]"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-8px] sm:mx-[-12px] transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Control Buttons Centered Below */}
      <div className="absolute top-[calc(100%+1.5rem)] flex w-full items-center justify-center gap-3">
        <CarouselControl
          type="previous"
          title="Previous division"
          handleClick={handlePreviousClick}
        />
        <span className="text-xs font-medium text-neutral-500">
          {current + 1} / {slides.length}
        </span>
        <CarouselControl
          type="next"
          title="Next division"
          handleClick={handleNextClick}
        />
      </div>
    </div>
  );
}
