// src/app/galeria/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FadeIn from "@/components/ui/FadeIn";

// ============================================================================
// MOCK BAZY DANYCH ALBUMÓW
// ============================================================================
const galleryAlbums = [
  {
    id: "gala-jubileuszowa-2026",
    title: "Gala Jubileuszowa: Finał Sezonu",
    category: "Koncerty",
    count: 42,
    year: "2026",
    image: "/video-poster.webp",
  },
  {
    id: "proby-slepe-katowice",
    title: "Próby w całkowitej ciemności",
    category: "Za kulisami",
    count: 18,
    year: "2026",
    image: "/video-poster.webp",
  },
  {
    id: "sesja-promocyjna-vogue",
    title: "Sesja Promocyjna: Nowe Oblicze",
    category: "Sesje",
    count: 12,
    year: "2025",
    image: "/video-poster.webp",
  },
  {
    id: "wiosenne-przebudzenie",
    title: "Wiosenne Przebudzenie",
    category: "Koncerty",
    count: 56,
    year: "2025",
    image: "/video-poster.webp",
  },
  {
    id: "nagrania-studyjne-vol-2",
    title: "Nagrania studyjne Vol. 2",
    category: "Za kulisami",
    count: 24,
    year: "2025",
    image: "/video-poster.webp",
  },
  {
    id: "koncert-plenerowy-kielce",
    title: "Muzyka Nocy Letniej",
    category: "Koncerty",
    count: 84,
    year: "2024",
    image: "/video-poster.webp",
  },
];

const categories = ["Wszystkie", "Koncerty", "Za kulisami", "Sesje"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");

  // Filtrowanie albumów
  const filteredAlbums =
    activeCategory === "Wszystkie"
      ? galleryAlbums
      : galleryAlbums.filter((album) => album.category === activeCategory);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack">
      {/* ============================================================================ */}
      {/* HERO SECTION - KINOWA EKSPOZYCJA */}
      {/* ============================================================================ */}
      <section className="relative z-10 flex min-h-[65vh] w-full flex-col justify-center px-6 pt-32 lg:px-12 lg:pt-40">
        {/* Potężny, lewitujący asset instrumentu z Brandbooka w tle */}
        <div className="pointer-events-none absolute -left-32 top-10 z-0 h-150 w-150 opacity-[0.03] lg:-left-20 lg:-top-10 lg:h-250 lg:w-250">
          <Image
            src="/Asset-2.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        {/* Ogromny, przenikający napis "GALLERY" */}
        <div className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-[10%] select-none opacity-[0.02] mix-blend-overlay">
          <span className="whitespace-nowrap font-montserrat text-[22vw] font-black leading-none text-white">
            GALLERY
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn delay="100ms">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-arylideYellow" />
              <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.4em] text-arylideYellow">
                Nasze portfolio
              </span>
            </div>
          </FadeIn>
          <FadeIn delay="300ms">
            <h1 className="font-montserrat text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[7rem]">
              Zatrzymane <br />
              <span className="relative top-4 inline-block -rotate-2 font-youngest text-6xl font-normal text-arylideYellow md:text-8xl lg:top-8 lg:text-[10rem]">
                w kadrze.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay="500ms" className="mt-12 max-w-xl lg:mt-24">
            <p className="font-montserrat text-lg font-light leading-relaxed tracking-wide text-white/70">
              Muzyka to emocje, które znikają wraz z wyciszeniem ostatniego
              akordu. Fotografia pozwala nam uwiecznić pot, łzy i euforię, które
              towarzyszą nam na scenie i poza nią. Odkryj naszą wizualną podróż.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* FILTRY KATEGORII */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full px-6 py-10 lg:px-12">
        <div className="mx-auto w-full max-w-7xl border-y border-white/10 py-6">
          <FadeIn>
            <ul className="flex flex-wrap items-center gap-6 md:gap-12">
              <li className="font-montserrat text-[0.6rem] font-bold uppercase tracking-[0.3em] text-white/30 hidden md:block">
                Filtruj albumy:
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className="group relative flex flex-col items-center"
                  >
                    <span
                      className={`font-montserrat text-[0.7rem] uppercase tracking-widest transition-colors duration-300 md:text-xs ${
                        activeCategory === category
                          ? "font-bold text-arylideYellow"
                          : "font-medium text-white/50 hover:text-white"
                      }`}
                    >
                      {category}
                    </span>
                    <div
                      className={`absolute -bottom-3 h-0.5 bg-arylideYellow transition-all duration-500 ${
                        activeCategory === category
                          ? "w-full"
                          : "w-0 group-hover:w-1/2"
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* ASYMETRYCZNA SIATKA ALBUMÓW (ZIG-ZAG MASONRY) */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:gap-12">
            {filteredAlbums.map((album, index) => {
              // LOGIKA ZIG-ZAG:
              // Wiersz 1: 8 kolumn (lewa) + 4 kolumny (prawa)
              // Wiersz 2: 4 kolumny (lewa) + 8 kolumn (prawa)
              // i tak w kółko
              const isLarge = index % 4 === 0 || index % 4 === 3;
              const colSpanClass = isLarge ? "md:col-span-8" : "md:col-span-4";

              return (
                <FadeIn
                  key={album.id}
                  delay={`${(index % 2) * 200}ms`}
                  className={`${colSpanClass} relative`}
                >
                  <Link
                    href={`/galeria/${album.id}`} // Przykładowy link do detali albumu
                    className="group relative block w-full overflow-hidden bg-raisinBlack h-100 md:h-125 lg:h-162.5"
                  >
                    {/* ZDJĘCIE Z WOLNYM SCALOWANIEM */}
                    <Image
                      src={album.image}
                      alt={album.title}
                      fill
                      className="object-cover opacity-70 transition-transform duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-100"
                    />

                    {/* CIEMNY GRADIENT Z DOŁU */}
                    <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-raisinBlack/40 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-60" />

                    {/* ZNACZNIK ROKU W ROGU */}
                    <div className="absolute right-6 top-6 overflow-hidden">
                      <span className="block font-montserrat text-xl font-black text-white mix-blend-overlay transition-transform duration-700 group-hover:-translate-y-full">
                        {album.year}
                      </span>
                      <span className="absolute left-0 top-0 block translate-y-full font-montserrat text-xl font-black text-arylideYellow transition-transform duration-700 group-hover:translate-y-0">
                        {album.year}
                      </span>
                    </div>

                    {/* TREŚĆ HOVERUJĄCA Z DOŁU */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:p-12">
                      <div className="translate-y-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                        <div className="mb-4 flex items-center gap-4">
                          <span className="font-montserrat text-[0.55rem] font-bold uppercase tracking-[0.3em] text-arylideYellow">
                            {album.category}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          <span className="font-montserrat text-[0.55rem] font-bold uppercase tracking-[0.3em] text-white/50">
                            Zdjęć: {album.count}
                          </span>
                        </div>

                        <h3 className="mb-6 font-montserrat text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                          {album.title}
                        </h3>

                        {/* PRZYCISK UKRYTY POZA KADREM, WJEŻDŻA NA HOVER */}
                        <div className="flex items-center gap-3 opacity-0 transition-all duration-700 group-hover:opacity-100">
                          <span className="font-montserrat text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white">
                            Otwórz galerię
                          </span>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-arylideYellow text-raisinBlack transition-transform duration-500 group-hover:translate-x-2">
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <title>Otwórz galerię</title>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 5l7 7m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>

          {filteredAlbums.length === 0 && (
            <FadeIn className="py-32 text-center">
              <span className="font-youngest text-4xl text-white/20">
                Brak albumów w tej kategorii.
              </span>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ============================================================================ */}
      {/* CTA PRESS PACK / KONTAKT */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full overflow-hidden bg-oxfordBlue py-24 lg:py-32 text-center">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(239,203,111,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <FadeIn>
            <span className="font-youngest text-4xl text-arylideYellow md:text-5xl">
              Dla prasy i mediów
            </span>
          </FadeIn>
          <FadeIn delay="200ms" className="mt-6">
            <h2 className="font-montserrat text-3xl font-bold leading-tight text-white md:text-5xl">
              Potrzebujesz naszych zdjęć <br className="hidden md:block" />w
              wysokiej rozdzielczości?
            </h2>
          </FadeIn>
          <FadeIn
            delay="400ms"
            className="mt-8 text-white/60 font-light max-w-2xl mx-auto"
          >
            <p>
              Udostępniamy oficjalny Press Pack (materiały prasowe, logotypy,
              zdjęcia z koncertów) dla dziennikarzy, krytyków muzycznych oraz
              partnerów biznesowych.
            </p>
          </FadeIn>
          <FadeIn delay="600ms" className="mt-12 flex justify-center">
            <Link
              href="/kontakt"
              className="group relative inline-flex items-center justify-center gap-4 rounded-full border border-white/20 bg-transparent px-10 py-5 font-montserrat text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-500 hover:border-arylideYellow hover:text-arylideYellow"
            >
              Poproś o materiały
              <svg
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <title>Strzałka</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
