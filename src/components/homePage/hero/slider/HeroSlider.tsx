"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { heroSlides, HERO_SLIDE_DURATION_MS } from "@/constants/heroSlides";
import slideOne from "../../../../../public/images/homePage/hero/slideOne.webp";
import slideTwo from "../../../../../public/images/homePage/hero/slideTwo.webp";
import slideThree from "../../../../../public/images/homePage/hero/slideThree.webp";
import slideFour from "../../../../../public/images/homePage/hero/slideFour.webp";

const slideImages = [slideOne, slideTwo, slideThree, slideFour] as const;

const TOTAL = heroSlides.length;
const TRANSITION_MS = 500;
const STRIP_POSITIONS = TOTAL + 1;
const CLONES_COUNT = 3; // перший, другий, третій слайди після останнього для превʼю на широких екранах

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % STRIP_POSITIONS);
    }, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (activeIndex !== STRIP_POSITIONS - 1) return;
    resetTimeoutRef.current = setTimeout(() => {
      setTransitionEnabled(false);
      setActiveIndex(0);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }, TRANSITION_MS);
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [activeIndex]);

  const displayIndex = Math.min(activeIndex, TOTAL - 1);

  return (
    <div className="flex h-full min-h-full flex-col justify-end rounded-[18px] py-3 lg:py-7 pl-3 lg:pl-7">
      {/* Top row: номер завжди 01, progress bar, total */}
      <div className="mb-2.5 lg:mb-3 flex items-center gap-3 w-[250px] lg:w-[311px]">
        <span className="text-[16px] lg:text-[20px] font-semibold leading-[120%] text-white">
          01
        </span>
        <div className="flex flex-1 overflow-hidden rounded-full bg-white/20 lg:h-1.5">
          <div
            className="h-1 rounded-full bg-white transition-all duration-300 ease-out lg:h-1.5"
            style={{
              width: `${((displayIndex + 1) / TOTAL) * 100}%`,
            }}
          />
        </div>
        <span className="text-[16px] lg:text-[20px] font-semibold leading-[120%] text-white">
          {String(TOTAL).padStart(2, "0")}
        </span>
      </div>

      {/* Cards strip: основний слайд 250px/310px, gap 12px, решта — превʼю */}
      <div className="overflow-hidden rounded-[18px]">
        <div
          className="flex w-[1822px] gap-3 ease-out [--step:262px] lg:w-[2242px] lg:[--step:322px]"
          style={{
            ["--active" as string]: activeIndex,
            transform: "translateX(calc(-1 * var(--active) * var(--step)))",
            transition: transitionEnabled
              ? `transform ${TRANSITION_MS}ms ease-out`
              : "none",
          }}
        >
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className="flex w-[250px] shrink-0 items-center gap-2 rounded-[18px] p-2.5 shadow-[inset_0_4px_12.6px_0_rgba(255,255,255,0.25)] backdrop-blur-[10px] lg:w-[310px] lg:gap-3.5"
            >
              <div className="relative h-[77px] lg:h-[107px] w-[84px] lg:w-[98px] shrink-0 overflow-hidden rounded-[10px]">
                <Image quality={90}
                  src={slideImages[idx]}
                  alt=""
                  fill
                  placeholder="blur"
                  priority
                  fetchPriority="high"
                  className="object-cover"
                  sizes="140px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="max-w-[171px] mb-2 lg:mb-3 text-[14px] lg:text-[16px] font-medium uppercase leading-[120%] text-white">
                  {slide.title}
                </h2>
                <p className="text-[10px] lg:text-[12px] font-light leading-[120%] text-white">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
          {/* Клони 1–3 слайдів для превʼю на широких екранах */}
          {heroSlides.slice(0, CLONES_COUNT).map((slide, cloneIndex) => (
            <div
              key={`clone-${cloneIndex}`}
              className="flex w-[250px] shrink-0 items-center gap-2 rounded-[18px] p-2.5 shadow-[inset_0_4px_12.6px_0_rgba(255,255,255,0.25)] backdrop-blur-[10px] lg:w-[310px] lg:gap-3.5"
              aria-hidden
            >
              <div className="relative h-[77px] lg:h-[107px] w-[84px] lg:w-[98px] shrink-0 overflow-hidden rounded-[10px]">
                <Image quality={90}
                  src={slideImages[cloneIndex]}
                  alt=""
                  fill
                  placeholder="blur"
                  className="object-cover"
                  sizes="140px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="max-w-[171px] mb-2 lg:mb-3 text-[14px] lg:text-[16px] font-medium uppercase leading-[120%] text-white">
                  {slide.title}
                </h2>
                <p className="text-[10px] lg:text-[12px] font-light leading-[120%] text-white">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
