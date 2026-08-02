"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "@/i18n/I18nProvider";
import { cn } from "@/utils/cn";
import type { GalleryImage } from "@/lib/sanity/adapters";

/**
 * Листалка фото в картці товару: стрілки на десктопі, свайп на тачі,
 * крапки-індикатори. Логіка перенесена з your-house-albania й адаптована
 * під монохромний дизайн CO₂Lab.
 */
export default function ProductCardGallery({
  images,
  name,
  className,
}: {
  images: GalleryImage[];
  name: string;
  className?: string;
}) {
  const t = useTranslations("product");

  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchActive = useRef(false);

  const hasMultiple = images.length > 1;

  const goPrev = useCallback(
    (event?: React.MouseEvent) => {
      event?.preventDefault();
      event?.stopPropagation();
      setIndex((i) => (i - 1 + images.length) % images.length);
    },
    [images.length],
  );

  const goNext = useCallback(
    (event?: React.MouseEvent) => {
      event?.preventDefault();
      event?.stopPropagation();
      setIndex((i) => (i + 1) % images.length);
    },
    [images.length],
  );

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    touchActive.current = true;
    setIsDragging(true);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchActive.current || touchStartX.current === null || touchStartY.current === null) {
      return;
    }
    const touch = event.touches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;

    // Вертикальний рух сильніший — віддаємо жест скролу сторінки
    if (Math.abs(dy) > Math.abs(dx)) {
      touchActive.current = false;
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    setDragOffset(dx);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchActive.current || touchStartX.current === null) {
      touchActive.current = false;
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    touchStartY.current = null;
    touchActive.current = false;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(dx) < 40) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[12px] bg-black/5",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-[12px] bg-black/5", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn(
          "flex h-full w-full",
          isDragging ? "transition-none" : "transition-transform duration-300 ease-out",
        )}
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
        }}
      >
        {images.map((image, i) => (
          <div key={`${image.url}-${i}`} className="relative h-full w-full shrink-0">
            <Image
              src={image.url}
              alt={image.alt || name}
              fill
              sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-center transition-transform duration-700 ease-out xl:group-hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label={t("previousImage")}
            onClick={goPrev}
            className="absolute inset-y-0 left-0 z-20 flex w-1/3 cursor-pointer items-center justify-start px-2"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-[2px] transition duration-200 xl:hover:bg-black/60">
              <ChevronLeft />
            </span>
          </button>
          <button
            type="button"
            aria-label={t("nextImage")}
            onClick={goNext}
            className="absolute inset-y-0 right-0 z-20 flex w-1/3 cursor-pointer items-center justify-end px-2"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-[2px] transition duration-200 xl:hover:bg-black/60">
              <ChevronRight />
            </span>
          </button>

          <div className="pointer-events-none absolute bottom-2.5 left-0 right-0 z-20 flex justify-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-200",
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/60",
                )}
                aria-hidden
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
