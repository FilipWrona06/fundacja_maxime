// src/app/(user)/aktualnosci/NewsClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import FadeIn from "@/components/ui/FadeIn";
import NewsletterForm from "@/components/ui/NewsletterForm"; // <-- IMPORT NASZEGO NOWEGO KOMPONENTU

export interface NewsProps {
  id: string;
  date: string;
  month: string;
  year: string;
  title: string;
  excerpt: string;
  image: string;
}

export default function NewsClient({ newsData }: { newsData: NewsProps[] }) {
  if (!newsData || newsData.length === 0) {
    return (
      <main className="bg-raisinBlack flex min-h-screen items-center justify-center pt-32">
        <h1 className="font-youngest text-4xl text-white">Brak aktualności.</h1>
      </main>
    );
  }

  const featuredPost = newsData[0];
  const regularPosts = newsData.slice(1);

  const archiveRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const displayedPosts = regularPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < regularPosts.length;
  const canCollapse = visibleCount > 5;

  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  const handleCollapse = () => {
    setVisibleCount(5);
    if (archiveRef.current) {
      const yOffset = -100;
      const y =
        archiveRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative z-10 flex min-h-[60vh] w-full flex-col justify-center px-6 pt-32 lg:px-12 lg:pt-40">
        <div className="pointer-events-none absolute top-20 -right-20 z-0 h-150 w-150 opacity-5 lg:-top-20 lg:-right-32 lg:h-225 lg:w-225 xl:h-275 xl:w-275">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
        <div className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 opacity-[0.02] mix-blend-overlay select-none">
          <span className="font-montserrat text-[25vw] leading-none font-black whitespace-nowrap text-white">
            NEWS
          </span>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn delay="100ms">
            <div className="mb-6 flex items-center gap-4">
              <div className="bg-arylideYellow h-px w-12" />
              <span className="font-montserrat text-arylideYellow text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                Aktualności
              </span>
            </div>
          </FadeIn>
          <FadeIn delay="300ms">
            <h1 className="font-montserrat text-5xl leading-[1.05] font-bold tracking-tight text-white md:text-7xl lg:text-[7rem]">
              Pulsujący <br />
              <span className="font-youngest text-arylideYellow relative top-4 inline-block -rotate-2 text-6xl font-normal md:text-8xl lg:top-8 lg:text-[10rem]">
                rytm.
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay="500ms" className="mt-12 max-w-xl lg:mt-24">
            <p className="font-montserrat text-lg leading-relaxed font-light tracking-wide text-white/70">
              Historie zza kulis, zapowiedzi projektów i dźwięki, które
              zmieniają zasady gry. Zanurz się w świecie Maxime i bądź na
              bieżąco z każdym naszym ruchem.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WYRÓŻNIONY ARTYKUŁ */}
      <section className="relative z-20 w-full px-6 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative flex flex-col items-center xl:block">
            <FadeIn className="relative w-full xl:w-[70%]">
              <Link
                href={`/aktualnosci/${featuredPost.id}`}
                className="group relative block aspect-4/3 w-full overflow-hidden bg-[#1a1a1a] xl:aspect-16/10"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover opacity-80 transition-transform duration-2000 ease-out group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="bg-oxfordBlue/20 absolute inset-0 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent" />
                <div className="bg-arylideYellow font-montserrat text-raisinBlack absolute top-6 left-6 px-4 py-2 text-[0.6rem] font-bold tracking-[0.3em] uppercase">
                  Najnowszy wpis
                </div>
              </Link>
            </FadeIn>

            <FadeIn
              delay="300ms"
              className="bg-oxfordBlue/95 relative -mt-20 w-[90%] border border-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-12 xl:absolute xl:right-0 xl:-bottom-12 xl:mt-0 xl:w-[50%] xl:p-16"
            >
              <div className="mb-6 flex items-end gap-6">
                <span className="font-montserrat text-6xl leading-none font-black text-white lg:text-7xl">
                  {featuredPost.date}
                </span>
                <div className="flex flex-col pb-1">
                  <span className="font-youngest text-arylideYellow text-2xl">
                    {featuredPost.month}
                  </span>
                  <span className="font-montserrat text-[0.6rem] font-bold tracking-widest text-white/40 uppercase">
                    {featuredPost.year}
                  </span>
                </div>
              </div>

              <div className="mb-6 h-px w-full bg-white/10" />

              <Link href={`/aktualnosci/${featuredPost.id}`}>
                <h2 className="font-montserrat hover:text-arylideYellow mb-6 text-2xl leading-tight font-bold text-white transition-colors duration-300 lg:text-4xl">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="font-montserrat mb-8 text-sm leading-relaxed font-light text-white/60 lg:text-base lg:leading-loose">
                {featuredPost.excerpt}
              </p>

              <Link
                href={`/aktualnosci/${featuredPost.id}`}
                className="group font-montserrat hover:text-arylideYellow flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition-colors"
              >
                Czytaj artykuł
                <div className="group-hover:border-arylideYellow group-hover:bg-arylideYellow group-hover:text-raisinBlack relative flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-all duration-300">
                  <svg
                    className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* LISTA POSTÓW */}
      <section className="relative z-10 w-full px-6 py-20 lg:px-12 lg:py-32">
        <div className="mx-auto w-full max-w-7xl" ref={archiveRef}>
          <FadeIn>
            <div className="mb-16 flex items-center justify-between lg:mb-24">
              <h3 className="font-youngest text-4xl text-white lg:text-6xl">
                Wcześniejsze wpisy
              </h3>
              <span className="font-montserrat hidden text-[0.65rem] font-bold tracking-[0.3em] text-white/30 uppercase md:block">
                Wyświetlono {displayedPosts.length} z {regularPosts.length}
              </span>
            </div>
          </FadeIn>

          <div className="flex flex-col border-t border-white/10">
            {displayedPosts.map((post) => (
              <FadeIn key={post.id}>
                <Link
                  href={`/aktualnosci/${post.id}`}
                  className="group relative flex flex-col items-start gap-8 border-b border-white/10 px-4 py-12 transition-all duration-500 hover:bg-white/2 md:flex-row md:items-center lg:gap-8 lg:px-10 lg:py-16"
                >
                  <div className="pointer-events-none absolute top-1/2 left-0 z-0 -translate-y-1/2 opacity-0 transition-all duration-700 select-none group-hover:translate-x-10 group-hover:opacity-[0.03] lg:left-[10%]">
                    <span className="font-montserrat text-[15rem] leading-none font-black text-white">
                      {post.date}
                    </span>
                  </div>

                  <div className="relative z-10 flex w-full shrink-0 flex-row items-center gap-6 md:w-32 md:flex-col md:items-start md:gap-1 lg:w-48 xl:w-64">
                    <span className="font-montserrat group-hover:text-arylideYellow text-5xl font-black text-white transition-colors duration-500 lg:text-6xl">
                      {post.date}
                    </span>
                    <div className="flex flex-col md:mt-2">
                      <span className="font-youngest text-philippineSilver text-2xl transition-colors duration-500 group-hover:text-white">
                        {post.month}
                      </span>
                      <span className="font-montserrat text-[0.6rem] font-bold tracking-[0.2em] text-white/30 uppercase">
                        {post.year}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 flex w-full flex-col md:flex-1">
                    <h4 className="font-montserrat mb-4 text-2xl leading-tight font-bold text-white transition-colors duration-300 group-hover:text-white lg:text-3xl">
                      {post.title}
                    </h4>
                    <p className="font-montserrat text-sm leading-relaxed font-light text-white/50 transition-colors duration-300 group-hover:text-white/70 lg:text-base">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="relative z-10 mt-6 flex w-full shrink-0 items-center justify-between gap-6 md:mt-0 md:w-auto md:justify-end lg:gap-8">
                    <div className="bg-raisinBlack hidden h-24 w-36 shrink-0 overflow-hidden rounded-lg lg:block xl:h-32 xl:w-48">
                      <div className="relative h-full w-full scale-110 opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100">
                        <Image
                          src={post.image}
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="group-hover:border-arylideYellow group-hover:bg-arylideYellow group-hover:text-raisinBlack flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-500 lg:h-16 lg:w-16">
                      <svg
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 lg:h-5 lg:w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-16 flex flex-wrap items-center justify-center gap-4 lg:mt-24">
            {hasMorePosts && (
              <button
                type="button"
                onClick={handleLoadMore}
                className="group font-montserrat hover:border-arylideYellow hover:text-arylideYellow relative inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-4 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase transition-all duration-500"
              >
                Załaduj starsze wpisy
                <svg
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}

            {canCollapse && (
              <button
                type="button"
                onClick={handleCollapse}
                className="group font-montserrat relative inline-flex items-center justify-center gap-3 rounded-full border border-transparent bg-white/5 px-8 py-4 text-[0.65rem] font-bold tracking-[0.2em] text-white/60 uppercase transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Zwiń listę
                <svg
                  className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            )}
          </FadeIn>
        </div>
      </section>

      {/* SEKCJA NEWSLETTER */}
      <section className="bg-arylideYellow relative z-10 w-full overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <Image src="/Asset-2.svg" alt="" fill className="object-contain" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <span className="font-youngest text-oxfordBlue text-4xl md:text-5xl">
              Nie przegap żadnego dźwięku.
            </span>
          </FadeIn>
          <FadeIn delay="200ms" className="mt-6">
            <h2 className="font-montserrat text-raisinBlack text-3xl leading-tight font-black md:text-5xl lg:text-6xl">
              Dołącz do naszego <br className="hidden md:block" />
              ekskluzywnego newslettera.
            </h2>
          </FadeIn>
          <FadeIn delay="300ms" className="mx-auto mt-6 max-w-xl">
            <p className="font-montserrat text-raisinBlack/70 text-sm leading-relaxed font-medium md:text-base">
              Zapisz się, aby jako pierwszy otrzymywać informacje o tajnych
              próbach, zakulisowych relacjach i specjalnych zniżkach na
              premiery.
            </p>
          </FadeIn>
          <FadeIn
            delay="500ms"
            className="mt-12 flex flex-col items-center justify-center"
          >
            {/* UŻYCIE USTANDARYZOWANEGO KOMPONENTU (wersja jasna) */}
            <NewsletterForm variant="light" className="max-w-lg" />

            <span className="font-montserrat text-raisinBlack/40 mt-6 block text-[0.55rem] font-bold tracking-widest uppercase">
              * Bez spamu. Tylko czysta sztuka prosto na Twoją skrzynkę.
            </span>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
