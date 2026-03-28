// src/app/aktualnosci/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

// ============================================================================
// MOCK DANYCH - SZCZEGÓŁY ARTYKUŁU
// ============================================================================
const mockArticle = {
  id: "za-kulisami-przygotowania-do-sezonu",
  date: "15 Marca 2026",
  category: "Wywiad / Za kulisami",
  readTime: "6 min czytania",
  author: "Filip Wrona",
  title: "Za kulisami: Przygotowania do najważniejszego sezonu w historii",
  subtitle: "Odkrywamy karty przed nadchodzącą trasą koncertową.",
  image: "/video-poster.webp",
  content: (
    <>
      <p className="lead mb-12 text-xl leading-relaxed font-light text-white/90 md:text-2xl">
        <span className="text-arylideYellow float-left mt-2 mr-6 text-[6rem] leading-[0.8] font-black">
          S
        </span>
        pędziliśmy ostatnie tygodnie na intensywnych próbach w odciętej od
        świata sali akustycznej. Zobacz, jak nasz zespół przygotowuje się do
        serii koncertów, które zdefiniują nowe brzmienie Stowarzyszenia Maxime.
        Rozmawiamy z dyrygentem o wyzwaniach, nieprzespanych nocach i pasji,
        która napędza muzyków do przekraczania własnych granic.
      </p>

      <h2 className="mt-16 mb-6 text-3xl font-bold text-white">
        Wizja staje się rzeczywistością
      </h2>
      <p className="mb-8 leading-loose font-light text-white/70">
        Kiedy po raz pierwszy spojrzeliśmy na partytury przygotowane na ten
        sezon, w sali zapadła kompletna cisza. To nie były po prostu kolejne
        kompozycje – to był manifest. Nasz dyrygent, analizując każdy
        najmniejszy detal, od razu zaznaczył: "Tym razem nie gramy dla
        publiczności. Gramy z nią".
      </p>
      <p className="mb-12 leading-loose font-light text-white/70">
        Każda sekcja orkiestry musiała przemyśleć swoje podejście. Smyczki
        dostały zadanie wyciągnięcia z instrumentów barw, których wcześniej
        unikaliśmy jako "zbyt surowych". Z kolei sekcja dęta musiała połączyć
        klasyczną dynamikę z potężnym uderzeniem, przypominającym wręcz
        nowoczesne, filmowe ścieżki dźwiękowe.
      </p>

      {/* EDYTORIALNY CYTAT (BLOCKQUOTE) */}
      <div className="relative my-20 py-10">
        <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/5" />
        <div className="font-youngest pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] text-white/3">
          "
        </div>
        <blockquote className="relative z-10 px-4 text-center md:px-12">
          <p className="font-youngest text-arylideYellow mb-6 text-4xl leading-tight md:text-5xl lg:text-6xl">
            Nie szukamy perfekcji technicznej.{" "}
            <br className="hidden md:block" />
            Szukamy prawdy w każdym uderzeniu smyczka.
          </p>
          <footer className="font-montserrat text-xs font-bold tracking-[0.3em] text-white/50 uppercase">
            — Główny Dyrygent, Maxime
          </footer>
        </blockquote>
      </div>

      <h2 className="mt-16 mb-6 text-3xl font-bold text-white">
        Próby w całkowitej ciemności
      </h2>
      <p className="mb-8 leading-loose font-light text-white/70">
        Jednym z najbardziej niekonwencjonalnych etapów naszych przygotowań były
        "próby ślepe". Przez trzy dni muzycy ćwiczyli w całkowicie wyciemnionej
        sali. Chodziło o odcięcie zmysłu wzroku i całkowite poleganie na słuchu
        i intuicji.
      </p>

      {/* ASYMETRYCZNE ZDJĘCIE W TEKŚCIE */}
      <div className="my-16 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <div className="bg-raisinBlack relative aspect-video w-full overflow-hidden">
            <Image
              src="/video-poster.webp"
              alt="Próba orkiestry w ciemności"
              fill
              className="object-cover opacity-80 mix-blend-luminosity transition-all duration-1000 hover:mix-blend-normal"
            />
          </div>
        </div>
        <div className="relative z-10 md:col-span-4 md:-ml-12">
          <div className="bg-oxfordBlue p-8 shadow-2xl">
            <span className="font-montserrat text-arylideYellow mb-2 block text-[0.6rem] font-bold tracking-[0.3em] uppercase">
              Notatka z prób
            </span>
            <p className="text-sm leading-relaxed font-light text-white">
              "Kiedy gasną światła, znika ego artysty. Zostaje tylko surowa
              harmonia kolektywu."
            </p>
          </div>
        </div>
      </div>

      <p className="mb-8 leading-loose font-light text-white/70">
        Rezultat przeszedł nasze najśmielsze oczekiwania. Zespół zyskał nową
        świadomość rytmiczną, a zaufanie między poszczególnymi sekcjami
        instrumentów stało się absolutne. Kiedy w końcu zapaliliśmy światła, to
        co usłyszeliśmy, brzmiało zupełnie inaczej. Było żywe.
      </p>

      <p className="mb-16 leading-loose font-light text-white/70">
        Sezon 2026 to dla Stowarzyszenia Maxime podróż w nieznane. Wierzymy, że
        to, co narodziło się podczas tych wyczerpujących, zakulisowych
        przygotowań, poruszy Was tak samo mocno, jak poruszyło nas. Do
        zobaczenia na widowni.
      </p>
    </>
  ),
};

const relatedPosts = [
  {
    id: "relacja-z-wiosennego-przebudzenia",
    category: "Relacja",
    title: "Emocje, które nie milkną. Ostatnia premiera w obiektywie",
    image: "/video-poster.webp",
  },
  {
    id: "nowy-sprzet-nowe-mozliwosci",
    category: "Technologia",
    title: "Mistrzowskie instrumenty z XVIII wieku w naszych rękach",
    image: "/video-poster.webp",
  },
];

// ============================================================================
// GŁÓWNY KOMPONENT
// ============================================================================
export default function NewsArticlePage({
  _params,
}: {
  _params?: Promise<{ slug: string }>;
}) {
  const article = mockArticle;

  return (
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full overflow-x-hidden">
      {/* ============================================================================ */}
      {/* WSKAŹNIK POSTĘPU CZYTANIA (SCROLL PROGRESS BAR) */}
      {/* ============================================================================ */}
      <div className="fixed top-0 left-0 z-120 h-1 w-full bg-white/5">
        <div
          className="bg-arylideYellow h-full w-0 animate-[scroll-progress_linear_both]"
          style={{ animationTimeline: "scroll()" }}
        />
      </div>

      {/* ============================================================================ */}
      {/* KINOWY HERO SECTION ARTYKUŁU */}
      {/* ============================================================================ */}
      <section className="relative flex min-h-[75vh] w-full flex-col justify-end overflow-hidden px-6 pt-40 pb-16 lg:px-12">
        {/* TŁO: Zdjęcie główne z mocnym gradientem */}
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="scale-105 object-cover opacity-50"
          />
          {/* Przejście z czarnego na dole, do przezroczystego na górze */}
          <div className="from-raisinBlack via-raisinBlack/80 absolute inset-0 bg-linear-to-t to-transparent" />
          <div className="from-raisinBlack/90 via-raisinBlack/40 absolute inset-0 bg-linear-to-r to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <FadeIn>
            <Link
              href="/aktualnosci"
              className="group font-montserrat hover:text-arylideYellow mb-12 inline-flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.3em] text-white/50 uppercase transition-colors lg:mb-16"
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
              Powrót do Aktualności
            </Link>
          </FadeIn>

          <FadeIn delay="100ms">
            <div className="font-montserrat text-arylideYellow mb-6 flex flex-wrap items-center gap-4 text-[0.65rem] font-bold tracking-[0.3em] uppercase">
              <span>{article.category}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="text-white/50">{article.readTime}</span>
            </div>
          </FadeIn>

          <FadeIn delay="300ms">
            <h1 className="font-montserrat mb-6 text-4xl leading-[1.05] font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {article.title}
            </h1>
            <p className="font-youngest text-3xl text-white/80 md:text-4xl">
              {article.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay="500ms">
            <div className="mt-12 flex items-center gap-6 border-t border-white/10 pt-8">
              <div className="flex flex-col">
                <span className="font-montserrat mb-1 text-[0.6rem] font-bold tracking-[0.3em] text-white/40 uppercase">
                  Autor
                </span>
                <span className="font-montserrat text-sm font-medium text-white">
                  {article.author}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="font-montserrat mb-1 text-[0.6rem] font-bold tracking-[0.3em] text-white/40 uppercase">
                  Data publikacji
                </span>
                <span className="font-montserrat text-sm font-medium text-white">
                  {article.date}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* TREŚĆ ARTYKUŁU (PROSE) */}
      {/* ============================================================================ */}
      <section className="relative z-20 w-full px-6 py-16 lg:py-24">
        {/* Dekoracyjne, pływające nuty w tle treści */}
        <div className="pointer-events-none absolute top-32 left-0 z-0 h-150 w-150 -translate-x-1/2 opacity-[0.03]">
          <Image
            src="/Asset-1.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
        <div className="pointer-events-none absolute right-0 bottom-32 z-0 h-200 w-200 translate-x-1/3 opacity-[0.02]">
          <Image
            src="/Asset-2.svg"
            alt=""
            fill
            className="object-contain brightness-0 invert"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-3xl">
          <FadeIn delay="200ms">
            <article className="font-montserrat text-white">
              {article.content}
            </article>
          </FadeIn>

          {/* STOPKA ARTYKUŁU (UDOSTĘPNIJ) */}
          <FadeIn delay="300ms">
            <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-b border-white/10 py-8 sm:flex-row">
              <div className="flex items-center gap-4">
                <span className="font-montserrat text-[0.65rem] font-bold tracking-[0.3em] text-white/40 uppercase">
                  Udostępnij artykuł
                </span>
              </div>
              <div className="flex gap-4">
                {["Facebook", "X / Twitter", "LinkedIn"].map((social) => (
                  <button
                    key={social}
                    type="button"
                    className="group hover:bg-arylideYellow hover:border-arylideYellow hover:text-raisinBlack relative rounded-full border border-white/20 px-6 py-3 text-[0.65rem] font-bold tracking-widest text-white uppercase transition-all"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* SEKCJA ZOBACZ TAKŻE (CZYTAJ DALEJ) */}
      {/* ============================================================================ */}
      <section className="relative z-10 w-full bg-[#1c1c1c] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <FadeIn>
            <div className="mb-16 flex items-center gap-6 lg:mb-24">
              <div className="bg-arylideYellow h-px w-16" />
              <h3 className="font-youngest text-4xl text-white lg:text-5xl">
                Czytaj dalej
              </h3>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {relatedPosts.map((post, i) => (
              <FadeIn key={post.id} delay={`${i * 200}ms`}>
                <Link
                  href={`/aktualnosci/${post.id}`}
                  className="group flex flex-col overflow-hidden border border-white/5 bg-[#222222] transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover opacity-70 transition-transform duration-2000 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="bg-oxfordBlue absolute top-4 left-4 px-4 py-2 text-[0.6rem] font-bold tracking-[0.2em] text-white uppercase">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex grow flex-col justify-between p-8 lg:p-10">
                    <h4 className="font-montserrat group-hover:text-arylideYellow mb-8 text-xl leading-tight font-bold text-white transition-colors lg:text-2xl">
                      {post.title}
                    </h4>
                    <span className="font-montserrat flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-white/40 uppercase transition-colors group-hover:text-white">
                      Przejdź do wpisu
                      <svg
                        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <title>Przejdź do wpisu</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
