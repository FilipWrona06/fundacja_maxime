"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

// Automatyczny pattern dla siatki zdjęć (powtarza się co 10 zdjęć)
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

export default function AlbumClient({
  album,
  nextAlbum,
}: {
  album: any;
  nextAlbum: any;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % album.photos.length);
  }, [album.photos.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? album.photos.length - 1 : prev - 1,
    );
  }, [album.photos.length]);

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

  return (
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full overflow-x-hidden">
      {/* KINOWY HERO SECTION ALBUMU */}
      <section className="relative flex min-h-[85vh] w-full flex-col justify-end overflow-hidden px-6 pt-40 pb-16 lg:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            priority
            className="scale-100 object-cover opacity-60 transition-transform duration-3000 ease-out hover:scale-105"
          />
          <div className="from-raisinBlack via-raisinBlack/60 absolute inset-0 bg-linear-to-t to-transparent" />
          <div className="from-raisinBlack absolute inset-0 bg-linear-to-r via-transparent to-transparent opacity-80" />
        </div>

        <div className="pointer-events-none absolute bottom-0 -left-10 z-0 opacity-10 mix-blend-overlay select-none">
          <span className="font-montserrat text-[25vw] leading-none font-black text-white lg:text-[20vw]">
            {album.date.slice(0, 4)}
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn>
            <Link
              href="/galeria"
              className="group font-montserrat hover:text-arylideYellow mb-12 inline-flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.3em] text-white/50 uppercase transition-colors lg:mb-20"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Powrót do portfolio
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <FadeIn delay="300ms">
                <h1 className="font-montserrat text-5xl leading-[1.05] font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[6rem]">
                  {album.title}
                </h1>
              </FadeIn>
            </div>

            <div className="text-left lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-end lg:pb-4 lg:text-right">
              <FadeIn delay="500ms">
                <p className="font-youngest text-arylideYellow mb-2 text-3xl md:text-4xl">
                  {album.formattedDate}
                </p>
                <p className="font-montserrat text-sm font-medium text-white/80">
                  {album.location}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* OPIS ALBUMU I METADANE */}
      <section className="bg-raisinBlack relative z-20 w-full border-b border-white/5 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-8">
              <FadeIn>
                <p className="font-montserrat text-lg leading-relaxed font-light text-white/70 md:text-xl">
                  {album.description}
                </p>
              </FadeIn>
            </div>
            <div className="flex flex-col gap-8 md:col-span-5 md:pl-12 lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-16">
              <FadeIn delay="200ms">
                <span className="font-montserrat mb-2 block text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">
                  Fotografia
                </span>
                <span className="font-montserrat text-base font-medium text-white">
                  {album.photographer}
                </span>
              </FadeIn>
              <FadeIn delay="400ms">
                <span className="font-montserrat mb-2 block text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">
                  Liczba kadrów
                </span>
                <span className="font-montserrat text-base font-medium text-white">
                  {album.photos?.length || 0} zdjęć
                </span>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SIATKA ZDJĘĆ */}
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
            {album.photos?.map((photoSrc: string, index: number) => {
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

      {/* NASTĘPNY ALBUM */}
      {nextAlbum && (
        <section className="group relative z-20 block h-[60vh] w-full overflow-hidden lg:h-[70vh]">
          <Link
            href={`/galeria/${nextAlbum.id}`}
            className="absolute inset-0 block h-full w-full"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={nextAlbum.image || "/video-poster.webp"}
                alt={nextAlbum.title}
                fill
                className="scale-100 object-cover opacity-50 transition-transform duration-3000 ease-out group-hover:scale-105"
              />
              <div className="bg-oxfordBlue/60 group-hover:bg-oxfordBlue/80 absolute inset-0 transition-colors duration-700" />
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
              <FadeIn>
                <span className="font-montserrat text-arylideYellow mb-6 block text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                  Zobacz następny album
                </span>
              </FadeIn>
              <FadeIn delay="200ms">
                <h2 className="font-montserrat mb-4 text-4xl leading-tight font-black text-white transition-transform duration-700 group-hover:-translate-y-2 sm:text-5xl md:text-6xl lg:text-7xl">
                  {nextAlbum.title}
                </h2>
              </FadeIn>
            </div>
            <div className="bg-raisinBlack/50 absolute bottom-0 left-0 h-2 w-full">
              <div className="bg-arylideYellow h-full w-0 transition-all duration-1500 ease-out group-hover:w-full" />
            </div>
          </Link>
        </section>
      )}

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
            {album.photos.length}
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
              src={album.photos[currentIndex]}
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
    </main>
  );
}
