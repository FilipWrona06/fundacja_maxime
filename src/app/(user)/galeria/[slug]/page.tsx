// src/app/galeria/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import FadeIn from "@/components/ui/FadeIn";

// ============================================================================
// MOCK DANYCH - SZCZEGÓŁY ALBUMU
// ============================================================================
const mockAlbum = {
  id: "gala-jubileuszowa-2026",
  title: "Gala Jubileuszowa: Finał Sezonu",
  category: "Koncerty",
  date: "24 Maja 2026",
  location: "Filharmonia Narodowa, Warszawa",
  photographer: "Michał Krawczyk / LUKSE",
  description:
    "Podsumowanie najważniejszego sezonu w historii Stowarzyszenia Maxime. Wieczór pełen uniesień, owacji na stojąco i absolutnej synergii między sceną a widownią. Zobaczcie emocje, które zamroziliśmy w kadrach – od ostatnich przygotowań w garderobach, aż po finałowy ukłon w blasku reflektorów.",
  coverImage: "/video-poster.webp",
  photos: [
    {
      id: "1",
      src: "/video-poster.webp",
      span: "lg:col-span-2 lg:row-span-2 md:col-span-2",
    },
    { id: "2", src: "/video-poster.webp", span: "lg:col-span-1 lg:row-span-1" },
    { id: "3", src: "/video-poster.webp", span: "lg:col-span-1 lg:row-span-1" },
    {
      id: "4",
      src: "/video-poster.webp",
      span: "lg:col-span-2 lg:row-span-1 md:col-span-2",
    },
    { id: "5", src: "/video-poster.webp", span: "lg:col-span-1 lg:row-span-2" },
    { id: "6", src: "/video-poster.webp", span: "lg:col-span-1 lg:row-span-1" },
    {
      id: "7",
      src: "/video-poster.webp",
      span: "lg:col-span-2 lg:row-span-2 md:col-span-2",
    },
    { id: "8", src: "/video-poster.webp", span: "lg:col-span-1 lg:row-span-1" },
    {
      id: "9",
      src: "/video-poster.webp",
      span: "lg:col-span-2 lg:row-span-1 md:col-span-2",
    },
    {
      id: "10",
      src: "/video-poster.webp",
      span: "lg:col-span-1 lg:row-span-1",
    },
  ],
};

const nextAlbum = {
  id: "proby-slepe-katowice",
  title: "Próby w całkowitej ciemności",
  category: "Za kulisami",
  image: "/video-poster.webp",
};

export default function GalleryAlbumPage({
  _params,
}: {
  _params?: Promise<{ slug: string }>;
}) {
  const album = mockAlbum;

  // ============================================================================
  // STAN I LOGIKA LIGHTBOXA
  // ============================================================================
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

  // Obsługa klawiatury (ESC, strzałki)
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

  // Blokada przewijania tła (body) gdy lightbox jest włączony
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* ============================================================================ */}
      {/* KINOWY HERO SECTION ALBUMU */}
      {/* ============================================================================ */}
      <section className="relative flex min-h-[85vh] w-full flex-col justify-end overflow-hidden pb-16 pt-40 px-6 lg:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            priority
            className="object-cover opacity-60 transition-transform duration-3000 ease-out scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-raisinBlack via-transparent to-transparent opacity-80" />
        </div>

        <div className="pointer-events-none absolute -left-10 bottom-0 z-0 select-none opacity-10 mix-blend-overlay">
          <span className="font-montserrat text-[25vw] font-black leading-none text-white lg:text-[20vw]">
            {album.date.slice(-4)}
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn>
            <Link
              href="/galeria"
              className="group mb-12 lg:mb-20 inline-flex items-center gap-3 font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/50 transition-colors hover:text-arylideYellow"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <title>Powrót</title>
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
              <FadeIn delay="100ms">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px w-12 bg-arylideYellow" />
                  <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
                    {album.category}
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay="300ms">
                <h1 className="font-montserrat text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-black leading-[1.05] tracking-tight text-white">
                  {album.title}
                </h1>
              </FadeIn>
            </div>

            <div className="lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-end lg:pb-4 text-left lg:text-right">
              <FadeIn delay="500ms">
                <p className="font-youngest text-3xl md:text-4xl text-arylideYellow mb-2">
                  {album.date}
                </p>
                <p className="font-montserrat text-sm font-medium text-white/80">
                  {album.location}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* OPIS ALBUMU I METADANE */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full bg-raisinBlack px-6 py-16 lg:py-24 lg:px-12 border-b border-white/5">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7 lg:col-span-8">
              <FadeIn>
                <p className="font-montserrat text-lg md:text-xl font-light leading-relaxed text-white/70">
                  {album.description}
                </p>
              </FadeIn>
            </div>
            <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-8 md:pl-12 lg:border-l lg:border-white/10 lg:pl-16">
              <FadeIn delay="200ms">
                <span className="font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/30 block mb-2">
                  Fotografia
                </span>
                <span className="font-montserrat text-base font-medium text-white">
                  {album.photographer}
                </span>
              </FadeIn>
              <FadeIn delay="400ms">
                <span className="font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/30 block mb-2">
                  Liczba kadrów
                </span>
                <span className="font-montserrat text-base font-medium text-white">
                  {album.photos.length} zdjęć
                </span>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* EDITORIAL MASONRY GRID (SIATKA ZDJĘĆ) */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full px-4 py-16 md:px-6 lg:py-32 lg:px-12 bg-[#1c1c1c]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-200 w-200 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-350">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] md:auto-rows-[400px] gap-4 md:gap-6">
            {album.photos.map((photo, index) => (
              <FadeIn
                key={photo.id}
                delay={`${(index % 3) * 150}ms`}
                className={`relative ${photo.span}`}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative block w-full h-full cursor-pointer appearance-none overflow-hidden border-none bg-raisinBlack p-0 text-left outline-none"
                >
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={photo.src}
                      alt={`Zdjęcie z galerii ${album.title} - ${index + 1}`}
                      fill
                      className="object-cover opacity-80 transition-all duration-2000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                    />
                  </div>

                  <div className="absolute inset-0 bg-oxfordBlue/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-4 border border-arylideYellow/0 transition-all duration-500 group-hover:border-arylideYellow/50 scale-[1.05] group-hover:scale-100 pointer-events-none" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-arylideYellow/90 text-raisinBlack backdrop-blur-sm">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <title>Powiększ zdjęcie</title>
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
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* NASTĘPNY ALBUM (GIGANTYCZNE CTA NA DOLE STRONY) */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full h-[60vh] lg:h-[70vh] overflow-hidden group block">
        <Link
          href={`/galeria/${nextAlbum.id}`}
          className="absolute inset-0 w-full h-full block"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={nextAlbum.image}
              alt={nextAlbum.title}
              fill
              className="object-cover opacity-50 transition-transform duration-3000 ease-out scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-oxfordBlue/60 transition-colors duration-700 group-hover:bg-oxfordBlue/80" />
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
            <FadeIn>
              <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow mb-6 block">
                Zobacz następny album
              </span>
            </FadeIn>
            <FadeIn delay="200ms">
              <h2 className="font-montserrat text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 transition-transform duration-700 group-hover:-translate-y-2">
                {nextAlbum.title}
              </h2>
              <span className="font-youngest text-3xl md:text-4xl text-white/50 transition-colors duration-700 group-hover:text-arylideYellow">
                {nextAlbum.category}
              </span>
            </FadeIn>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-raisinBlack/50">
            <div className="h-full bg-arylideYellow w-0 transition-all duration-1500 ease-out group-hover:w-full" />
          </div>
        </Link>
      </section>

      {/* ============================================================================ */}
      {/* LIGHTBOX OVERLAY */}
      {/* ============================================================================ */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-raisinBlack/95 backdrop-blur-md transition-opacity">
          {/* Niewidoczne tło służące do zamykania po kliknięciu poza obrazek */}
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default appearance-none border-none bg-transparent m-0 p-0 outline-none"
            onClick={closeLightbox}
            aria-label="Zamknij galerię (kliknięcie w tło)"
            tabIndex={-1}
          />

          {/* Przycisk zamknięcia */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-6 top-6 z-110 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-arylideYellow hover:text-raisinBlack"
            aria-label="Zamknij galerię"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Zamknij powiększenie</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Licznik zdjęć */}
          <div className="absolute left-6 top-8 z-110 font-montserrat text-[0.7rem] font-bold uppercase tracking-[0.3em] text-white/50">
            {currentIndex + 1} <span className="mx-2 text-white/20">/</span>{" "}
            {album.photos.length}
          </div>

          {/* Poprzednie zdjęcie */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 z-110 -translate-y-1/2 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-arylideYellow hover:text-raisinBlack md:flex"
            aria-label="Poprzednie zdjęcie"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Poprzednie zdjęcie</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Następne zdjęcie */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 z-110 -translate-y-1/2 hidden h-14 w-14 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-arylideYellow hover:text-raisinBlack md:flex"
            aria-label="Następne zdjęcie"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Następne zdjęcie</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Główny kontener zdjęcia (Z elementami blokującymi kliknięcia w tło w obrysie obrazka) */}
          <div className="relative z-10 flex h-full w-full max-h-[85vh] max-w-[90vw] items-center justify-center pointer-events-none">
            <Image
              src={album.photos[currentIndex].src}
              alt={`Zdjęcie powiększone ${currentIndex + 1}`}
              fill
              className="object-contain select-none pointer-events-auto"
              sizes="100vw"
              priority
            />
          </div>

          {/* Mobilna nawigacja (widoczna tylko na małych ekranach na dole) */}
          <div className="absolute bottom-6 left-0 right-0 z-110 flex justify-center gap-6 md:hidden">
            <button
              type="button"
              onClick={prevImage}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
              aria-label="Poprzednie zdjęcie na mobile"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <title>Poprzednie</title>
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
              aria-label="Następne zdjęcie na mobile"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <title>Następne</title>
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
