// src/components/home/Hero.tsx
import Link from "next/link";
// Importujemy klienta Sanity (ścieżka zależy od tego, jak instalator utworzył foldery).
// Zazwyczaj jest to "@/sanity/lib/client"
import { client } from "@/sanity/lib/client";

export default async function Hero() {
  // 1. ZAPYTANIE DO SANITY (GROQ)
  // Szukamy dokumentu typu "homePage" i pobieramy pierwszy z nich [0].
  // revalidate: 10 sprawia, że zmiany pojawią się na stronie max 10 sekund po kliknięciu "Publish" w Sanity.
  const query = `*[_type == "homePage"][0]`;
  const data = await client.fetch(query, {}, { next: { revalidate: 10 } });

  // 2. FALLBACKI (Zabezpieczenia)
  // Jeśli w Sanity są dane, używamy ich. Jeśli nie ma (bo np. redaktor jeszcze nie opublikował), używamy domyślnych.
  const heading = data?.heroHeading || "Z pasji do muzyki";
  const subheading =
    data?.heroSubheading ||
    "Odkryj z nami piękno dźwięków. Talent, ambicja i profesjonalizm, które tworzą niezapomniane emocje.";
  const primaryText = data?.heroButtonPrimaryText || "Zobacz wydarzenia";
  const primaryLink = data?.heroButtonPrimaryLink || "/wydarzenia";
  const secondaryText = data?.heroButtonSecondaryText || "Skontaktuj się";
  const secondaryLink = data?.heroButtonSecondaryLink || "/kontakt";

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-raisinBlack">
      {/* TŁO WIDEO I NAKŁADKI */}
      <div className="absolute inset-0 h-full w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="animate-cinematic-zoom absolute inset-0 h-full w-full object-cover opacity-0"
          src="/bg-video.mp4"
        />
        <div className="absolute inset-0 bg-raisinBlack/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(38,38,38,0.85)_100%)]" />
        <div className="absolute inset-0 bg-linear-to-t from-raisinBlack via-transparent to-transparent opacity-95" />
      </div>

      {/* GŁÓWNA TREŚĆ */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-4 pt-12 pb-28 text-center sm:py-0">
        {/* NAGŁÓWEK (Z SANITY) */}
        <h1
          className="animate-fade-in-up mb-2 py-4 font-youngest text-raisinBlack text-[4.2rem] leading-[0.85] text-white opacity-0 sm:leading-tight sm:text-[5.5rem] md:text-[8rem] lg:mb-4 lg:text-[11.5rem]"
          style={{
            animationDelay: "200ms",
            textShadow:
              "0 10px 40px rgba(0,0,0,0.8), 0 0 120px rgba(255,255,255,0.15)",
          }}
        >
          {heading}
        </h1>

        {/* PODTYTUŁ (Z SANITY) */}
        <p
          className="animate-fade-in-up mb-8 max-w-3xl font-montserrat text-sm font-light whitespace-pre-line leading-relaxed tracking-widest text-white/80 opacity-0 sm:text-base md:mb-10 md:text-xl lg:text-2xl"
          style={{ animationDelay: "500ms" }}
        >
          {subheading}
        </p>

        {/* PRZYCISKI (Z SANITY) */}
        <div
          className="animate-fade-in-up flex w-full max-w-[20rem] flex-col items-center justify-center gap-4 opacity-0 sm:max-w-none sm:w-auto sm:flex-row sm:gap-8"
          style={{ animationDelay: "800ms" }}
        >
          {/* PRZYCISK GŁÓWNY (Żółty) */}
          <Link
            href={primaryLink}
            className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-full bg-arylideYellow px-8 py-4 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-raisinBlack transition-all duration-700 hover:scale-[1.03] hover:shadow-[0_0_30px_-10px_rgba(239,203,111,0.6)] sm:w-auto sm:px-12"
          >
            <span className="relative z-10 flex items-center gap-3">
              {primaryText}
              <svg
                className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <title>Strzałka</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full bg-white/30 transition-transform duration-700 ease-out group-hover:translate-x-0" />
          </Link>

          {/* PRZYCISK POBOCZNY (Przezroczysty) */}
          <Link
            href={secondaryLink}
            className="group flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-700 hover:scale-[1.03] hover:bg-white hover:text-raisinBlack sm:w-auto sm:px-12"
          >
            {secondaryText}
          </Link>
        </div>
      </div>

      {/* WSKAŹNIK SCROLLA */}
      <div
        className="animate-fade-in-up absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0 md:bottom-8 md:gap-3 [@media(max-height:600px)]:hidden md:[@media(max-height:800px)]:hidden lg:[@media(max-height:900px)]:hidden"
        style={{ animationDelay: "1200ms" }}
      >
        <span className="font-montserrat text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-white/50">
          Odkryj
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-white/10 md:h-16">
          <div className="animate-scroll-line absolute left-0 top-0 h-full w-full bg-arylideYellow" />
        </div>
      </div>
    </section>
  );
}
