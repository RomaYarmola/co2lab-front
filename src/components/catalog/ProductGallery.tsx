"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "@/i18n/I18nProvider";
import { cn } from "@/utils/cn";
import type { GalleryImage } from "@/lib/sanity/adapters";

const PREVIEW_MAX = 5;

/**
 * Галерея товару: на мобільному — свайп-слайдер, на десктопі — сітка
 * з 1–5 прев'ю, у лайтбоксі — повний перегляд зі стрічкою мініатюр.
 * Структура перенесена з your-house-albania й перекладена в дизайн CO₂Lab.
 */
export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showThumbs, setShowThumbs] = useState(true);
  const mobileScrollerRef = useRef<HTMLDivElement>(null);

  const previewImages = images.slice(0, PREVIEW_MAX);
  const count = previewImages.length;
  const hasMoreImages = images.length > PREVIEW_MAX;

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    // На вузьких екранах мініатюри корисніші, ніж зайвий простір
    setShowThumbs(window.innerWidth < 1024);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  useEffect(() => {
    const element = mobileScrollerRef.current;
    if (!element || images.length <= 1) return;
    const onScroll = () => {
      const width = element.clientWidth;
      if (width <= 0) return;
      const index = Math.round(element.scrollLeft / width);
      setMobileSlideIndex(Math.min(index, images.length - 1));
    };
    element.addEventListener("scroll", onScroll);
    onScroll();
    return () => element.removeEventListener("scroll", onScroll);
  }, [images.length]);

  const scrollMobile = useCallback((direction: -1 | 1) => {
    const element = mobileScrollerRef.current;
    if (!element) return;
    const width = element.clientWidth;
    if (width <= 0) return;
    element.scrollBy({ left: direction * width, behavior: "smooth" });
  }, []);

  const handleTouchStart = (event: React.TouchEvent) =>
    setTouchStartX(event.touches[0].clientX);

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX == null) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) goPrev();
      else goNext();
    }
    setTouchStartX(null);
  };

  if (images.length === 0) return null;

  const tile = (
    image: GalleryImage,
    index: number,
    priority = false,
    sizes = "(max-width: 1023px) 100vw, 33vw",
  ) => (
    <button
      type="button"
      onClick={() => openLightbox(index)}
      className="relative block h-full w-full cursor-pointer overflow-hidden rounded-[12px] text-left transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black xl:hover:opacity-95"
      aria-label={`${t("openGallery")} — ${index + 1}`}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        priority={priority}
        className="object-cover object-center"
        sizes={sizes}
      />
    </button>
  );

  return (
    <>
      <div className="mt-6 lg:mt-8">
        {/* Мобільний слайдер */}
        <div className="relative lg:hidden">
          {images.length === 1 ? (
            <div className="relative h-[280px] overflow-hidden rounded-[18px] bg-black/5 xs:h-[340px]">
              {tile(images[0], 0, true, "100vw")}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[18px] bg-black/5">
              <div
                ref={mobileScrollerRef}
                className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((image, index) => (
                  <button
                    key={`${image.url}-${index}`}
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative h-[280px] w-full min-w-full shrink-0 cursor-pointer snap-start xs:h-[340px]"
                    aria-label={`${t("openGallery")} — ${index + 1}`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </button>
                ))}
              </div>

              <span className="pointer-events-none absolute bottom-3 right-3 z-[1] rounded-full bg-black/60 px-2.5 py-1 text-[12px] font-medium text-white">
                {t("imageCounter", {
                  current: mobileSlideIndex + 1,
                  total: images.length,
                })}
              </span>

              <button
                type="button"
                onClick={() => scrollMobile(-1)}
                disabled={mobileSlideIndex <= 0}
                className={cn(
                  "absolute left-2 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white",
                  mobileSlideIndex <= 0 ? "cursor-not-allowed opacity-40" : "cursor-pointer",
                )}
                aria-label={t("previousImage")}
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollMobile(1)}
                disabled={mobileSlideIndex >= images.length - 1}
                className={cn(
                  "absolute right-2 top-1/2 z-[2] -translate-y-1/2 rounded-full bg-black/50 p-2 text-white",
                  mobileSlideIndex >= images.length - 1
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer",
                )}
                aria-label={t("nextImage")}
              >
                <Chevron dir="right" />
              </button>
            </div>
          )}

          {images.length > 1 && (
            <button
              type="button"
              onClick={() => openLightbox(mobileSlideIndex)}
              className="mt-3 w-full cursor-pointer rounded-full bg-black py-3 text-[12px] font-medium text-white transition duration-300 xl:hover:brightness-125"
            >
              {t("checkAllPhotos")} ({images.length})
            </button>
          )}
        </div>

        {/* Десктопна сітка */}
        <div
          className={cn(
            "relative hidden gap-2 lg:grid lg:grid-cols-12",
            count >= 2 && "lg:grid-rows-2",
          )}
        >
          {count === 1 && (
            <div className="relative col-span-12 h-[400px] overflow-hidden rounded-[18px] bg-black/5 xl:h-[540px]">
              {tile(previewImages[0], 0, true, "100vw")}
            </div>
          )}

          {count === 2 && (
            <>
              <div className="relative col-span-8 row-span-2 h-[400px] overflow-hidden rounded-[18px] bg-black/5 xl:h-[540px]">
                {tile(previewImages[0], 0, true, "66vw")}
              </div>
              <div className="relative col-span-4 row-span-2 overflow-hidden rounded-[18px] bg-black/5">
                {tile(previewImages[1], 1)}
              </div>
            </>
          )}

          {count === 3 && (
            <>
              <div className="relative col-span-8 row-span-2 h-[400px] overflow-hidden rounded-[18px] bg-black/5 xl:h-[540px]">
                {tile(previewImages[0], 0, true, "66vw")}
              </div>
              <div className="col-span-4 row-span-2 flex flex-col gap-2">
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-[18px] bg-black/5">
                  {tile(previewImages[1], 1)}
                </div>
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-[18px] bg-black/5">
                  {tile(previewImages[2], 2)}
                </div>
              </div>
            </>
          )}

          {count === 4 && (
            <>
              <div className="relative col-span-8 row-span-2 h-[400px] overflow-hidden rounded-[18px] bg-black/5 xl:h-[540px]">
                {tile(previewImages[0], 0, true, "66vw")}
              </div>
              <div className="col-span-4 row-span-2 grid grid-rows-[1fr_1fr] gap-2">
                <div className="relative min-h-0 overflow-hidden rounded-[18px] bg-black/5">
                  {tile(previewImages[1], 1)}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative min-h-0 overflow-hidden rounded-[18px] bg-black/5">
                    {tile(previewImages[2], 2)}
                  </div>
                  <div className="relative min-h-0 overflow-hidden rounded-[18px] bg-black/5">
                    {tile(previewImages[3], 3)}
                  </div>
                </div>
              </div>
            </>
          )}

          {count >= 5 && (
            <>
              <div className="relative col-span-8 row-span-2 h-[400px] overflow-hidden rounded-[18px] bg-black/5 xl:h-[540px]">
                {tile(previewImages[0], 0, true, "66vw")}
              </div>
              <div className="col-span-4 row-span-2 grid grid-cols-2 grid-rows-2 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="relative min-h-0 overflow-hidden rounded-[18px] bg-black/5"
                  >
                    {tile(previewImages[index], index)}
                  </div>
                ))}
              </div>
            </>
          )}

          {hasMoreImages && (
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="absolute bottom-3 right-3 z-10 cursor-pointer rounded-full bg-black/75 px-6 py-3 text-[14px] font-medium text-white backdrop-blur-[2px] transition duration-300 xl:hover:bg-black"
            >
              {t("checkAllPhotos")} ({images.length})
            </button>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="group fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery")}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute inset-0 z-0 cursor-default"
            aria-label={tCommon("close")}
            tabIndex={-1}
          />

          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-4 py-3">
            <span className="rounded-full bg-black/50 px-3 py-1.5 text-[14px] font-medium text-white">
              {t("imageCounter", {
                current: currentIndex + 1,
                total: images.length,
              })}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="cursor-pointer rounded-full p-2 text-white/90 transition-colors duration-200 hover:bg-white/10"
              aria-label={tCommon("close")}
            >
              <CloseIcon />
            </button>
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full p-2 text-white/90 transition-colors duration-200 hover:bg-white/10"
                aria-label={t("previousImage")}
              >
                <Chevron dir="left" size={32} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full p-2 text-white/90 transition-colors duration-200 hover:bg-white/10"
                aria-label={t("nextImage")}
              >
                <Chevron dir="right" size={32} />
              </button>
            </>
          )}

          <div
            className="absolute inset-0 z-10 flex items-center justify-center p-2 sm:p-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="presentation"
          >
            <Image
              src={images[currentIndex]?.url ?? images[0].url}
              alt={images[currentIndex]?.alt ?? images[0].alt}
              fill
              className="object-contain object-center"
              sizes="100vw"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setShowThumbs((value) => !value)}
                className="absolute bottom-8 right-8 z-30 cursor-pointer rounded-full bg-black/60 p-2.5 text-white/90 transition-colors duration-200 hover:bg-black/80"
                aria-label={showThumbs ? t("hideThumbnails") : t("showThumbnails")}
              >
                <Chevron
                  dir="down"
                  size={22}
                  className={cn(
                    "transition-transform duration-200",
                    !showThumbs && "rotate-180",
                  )}
                />
              </button>

              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 z-20 overflow-hidden bg-gradient-to-t from-black/85 to-transparent transition-all duration-300 ease-out",
                  showThumbs ? "max-h-[220px] opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {images[currentIndex]?.caption && (
                  <p className="truncate px-4 pt-3 text-[14px] text-white/90">
                    {images[currentIndex].caption}
                  </p>
                )}
                <div className="overflow-x-auto px-4 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex min-w-max items-center gap-3 px-1 py-2">
                    {images.map((image, index) => (
                      <button
                        key={`${image.url}-thumb-${index}`}
                        type="button"
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                          "relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-[8px] transition-opacity duration-200 lg:size-24",
                          currentIndex === index
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black/60"
                            : "opacity-60 hover:opacity-100",
                        )}
                        aria-label={`${t("openGallery")} — ${index + 1}`}
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1023px) 64px, 96px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function Chevron({
  dir,
  size = 24,
  className,
}: {
  dir: "left" | "right" | "down";
  size?: number;
  className?: string;
}) {
  const path =
    dir === "left" ? "M15 18L9 12L15 6" : dir === "right" ? "M9 6L15 12L9 18" : "M6 9L12 15L18 9";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
