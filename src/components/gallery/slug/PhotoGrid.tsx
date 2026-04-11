// src/app/(user)/galeria/[slug]/PhotoGrid.tsx
"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

const SPAN_PATTERN = [
  "lg:col-span-2 lg:row-span-2 md:col-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1 md:col-span-2",
  "lg:col-span-1 lg:row-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-2 lg:row-span-2 md:col-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1 md:col-span-2",
  "lg:col-span-1 lg:row-span-1",
];

export default function PhotoGrid({ photos }: { photos: string[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      <section className="relative z-10 w-full bg-[#1c1c1c] px-4 py-16 md:px-6 lg:px-12 lg:py-32">
        <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-200 w-200 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-350">
          <div className="grid auto-rows-[300px] grid-cols-1 gap-4 md:auto-rows-[400px] md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {photos.map((photoSrc: string, index: number) => {
              const spanClass = SPAN_PATTERN[index % SPAN_PATTERN.length];

              return (
                <FadeIn
                  key={index}
                  delay={`${(index % 3) * 150}ms`}
                  className={`relative ${spanClass}`}
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="group bg-raisinBlack relative block h-full w-full cursor-pointer appearance-none overflow-hidden border-none p-0 text-left outline-none"
                  >
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={photoSrc}
                        alt={`Zdjęcie ${index + 1}`}
                        fill
                        className="object-cover opacity-80 transition-all duration-2000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                    <div className="bg-oxfordBlue/40 absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="border-arylideYellow/0 group-hover:border-arylideYellow/50 pointer-events-none absolute inset-4 scale-[1.05] border transition-all duration-500 group-hover:scale-100" />
                    <div className="pointer-events-none absolute inset-0 flex scale-50 items-center justify-center opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100">
                      <div className="bg-arylideYellow/90 text-raisinBlack flex h-16 w-16 items-center justify-center rounded-full backdrop-blur-sm">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX OVERLAY */}
      {lightboxOpen && (
        <div className="bg-raisinBlack/95 fixed inset-0 z-100 flex items-center justify-center backdrop-blur-md transition-opacity">
          <button
            type="button"
            className="absolute inset-0 m-0 h-full w-full cursor-default appearance-none border-none bg-transparent p-0 outline-none"
            onClick={closeLightbox}
            tabIndex={-1}
          />
          <button
            type="button"
            onClick={closeLightbox}
            className="hover:bg-arylideYellow hover:text-raisinBlack absolute top-6 right-6 z-110 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="font-montserrat absolute top-8 left-6 z-110 text-[0.7rem] font-bold tracking-[0.3em] text-white/50 uppercase">
            {currentIndex + 1} <span className="mx-2 text-white/20">/</span>{" "}
            {photos.length}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="hover:bg-arylideYellow hover:text-raisinBlack absolute top-1/2 left-4 z-110 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-white transition-all md:flex"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="hover:bg-arylideYellow hover:text-raisinBlack absolute top-1/2 right-4 z-110 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-white transition-all md:flex"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="pointer-events-none relative z-10 flex h-full max-h-[85vh] w-full max-w-[90vw] items-center justify-center">
            <Image
              src={photos[currentIndex]}
              alt={`Powiększenie ${currentIndex + 1}`}
              fill
              className="pointer-events-auto object-contain select-none"
              sizes="100vw"
              priority
            />
          </div>

          <div className="absolute right-0 bottom-6 left-0 z-110 flex justify-center gap-6 md:hidden">
            <button
              type="button"
              onClick={prevImage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
