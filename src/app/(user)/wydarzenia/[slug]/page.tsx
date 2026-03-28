// src/app/wydarzenia/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

// ============================================================================
// MOCK DANYCH - SZCZEGÓŁY WYDARZENIA
// ============================================================================
const mockEventDetails = {
  id: "1",
  day: "12",
  month: "Kwiecień",
  year: "2026",
  title: "Wiosenne Przebudzenie",
  subtitle: "Symfonia na smyczki i światło",
  location: "Teatr Wielki, Poznań",
  address: "ul. Fredry 9, 61-701 Poznań",
  time: "19:00",
  category: "Symfonia",
  image: "/video-poster.webp",

  // --- ZARZĄDZANIE BILETAMI ---
  ticketType: "darmowe", // Wybór: "darmowe" | "platne"
  ticketLink: "#rezerwacja", // Wpisz link "https://..." lub `null` (jeśli jeszcze nie ma linku)
  hasTicketsAvailable: true, // `true` (są miejsca) lub `false` (wyprzedane)

  description: (
    <>
      <p className="mb-6">
        Wiosna to czas odrodzenia, buntu i nowej energii. "Wiosenne
        Przebudzenie" to nie tylko koncert, to wielowymiarowe widowisko, w
        którym klasyczne brzmienia smyczkowe zderzają się z nowoczesną reżyserią
        światła. Przygotowaliśmy dla Państwa repertuar, który przeprowadzi nas
        od mrocznych zimowych nocy aż po eksplozję wiosennych barw.
      </p>
      <p>
        Scena Teatru Wielkiego zamieni się w immersyjną przestrzeń. Każdy dźwięk
        będzie rezonował nie tylko w akustyce sali, ale i w starannie
        zaprojektowanej architekturze oświetlenia. To wydarzenie zdefiniuje na
        nowo sposób, w jaki doświadczasz muzyki klasycznej na żywo.
      </p>
    </>
  ),
  program: [
    "A. Vivaldi – Cztery Pory Roku: Wiosna (aranżacja współczesna)",
    "I. Stravinsky – Święto Wiosny (wybrane fragmenty)",
    "Max Richter – Vivaldi Recomposed",
    "Kompozycja autorska Maxime: Światłoczułość",
  ],

  // --- GOŚCINNI WYKONAWCY ---
  // Jeśli na wydarzeniu występują tylko muzycy Maxime (nikt gościnnie),
  // pozostaw pustą tablicę:[] lub null. Sekcja automatycznie zniknie.
  guestArtists: [
    { name: "Anna Maria Jopek", role: "Wokal" },
    { name: "Krzysztof Herdzin", role: "Fortepian" },
  ],
};

// ============================================================================
// KOMPONENT GŁÓWNY
// ============================================================================
export default function EventDetailPage({
  _params,
}: {
  _params?: Promise<{ id: string }>;
}) {
  const event = mockEventDetails;

  // Renderowanie odpowiedniego przycisku z wbudowaną logiką biletów
  const renderTicketButton = () => {
    // 1. Jeśli wydarzenie jest wyprzedane
    if (!event.hasTicketsAvailable) {
      return (
        <div className="font-montserrat flex w-full cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-4 text-center text-[0.65rem] leading-snug font-bold tracking-widest text-white/30 uppercase sm:px-8 sm:text-xs sm:tracking-[0.2em]">
          Brak miejsc (Wyprzedane)
        </div>
      );
    }

    // 2. Jeśli nie ma jeszcze podanego linku (rezerwacja nie wystartowała)
    if (!event.ticketLink) {
      return (
        <div className="font-montserrat flex w-full cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-4 text-center text-[0.65rem] leading-snug font-bold tracking-widest text-white/30 uppercase sm:px-8 sm:text-xs sm:tracking-[0.2em]">
          Bilety dostępne wkrótce
        </div>
      );
    }

    // 3. Darmowe + Link dostępny
    if (event.ticketType === "darmowe") {
      return (
        <a
          href={event.ticketLink}
          className="group bg-arylideYellow font-montserrat text-raisinBlack relative flex w-full items-center justify-center overflow-hidden rounded-full px-4 py-4 text-center text-[0.65rem] leading-snug font-bold tracking-widest uppercase transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(239,203,111,0.6)] sm:px-8 sm:py-5 sm:text-xs sm:tracking-[0.2em]"
        >
          <span className="relative z-10">Odbierz darmową wejściówkę</span>
          <div className="absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full bg-white/30 transition-transform duration-700 ease-out group-hover:translate-x-0" />
        </a>
      );
    }

    // 4. Płatne + Link dostępny
    return (
      <a
        href={event.ticketLink}
        className="group bg-oxfordBlue font-montserrat relative flex w-full items-center justify-center overflow-hidden rounded-full px-4 py-4 text-center text-[0.65rem] leading-snug font-bold tracking-widest text-white uppercase transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(0,28,72,0.6)] sm:px-8 sm:py-5 sm:text-xs sm:tracking-[0.2em]"
      >
        <span className="group-hover:text-arylideYellow relative z-10 transition-colors">
          Kup bilet na to wydarzenie
        </span>
        <div className="bg-raisinBlack absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full transition-transform duration-700 ease-out group-hover:translate-x-0" />
      </a>
    );
  };

  // Renderowanie małego tekstu pod przyciskiem
  const getTicketSubtext = () => {
    if (!event.hasTicketsAvailable)
      return "Dziękujemy za ogromne zainteresowanie";
    if (!event.ticketLink) return "Śledź nasze kanały, by nie przegapić startu";
    if (event.ticketType === "darmowe")
      return "* Liczba darmowych wejściówek jest ograniczona";
    return "* Bezpieczna płatność u operatora online";
  };

  return (
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full">
      {/* ============================================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================================ */}
      <section className="relative flex min-h-[85vh] w-full flex-col justify-end overflow-hidden pt-32 pb-12 lg:pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src={event.image}
            alt={`Zdjęcie promujące wydarzenie: ${event.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60 transition-transform duration-2000 ease-out hover:scale-105"
          />
          <div className="from-raisinBlack via-raisinBlack/60 absolute inset-0 bg-linear-to-t to-transparent" />
          <div className="from-raisinBlack absolute inset-0 bg-linear-to-r via-transparent to-transparent opacity-80" />
        </div>

        <div className="pointer-events-none absolute bottom-0 -left-10 z-0 opacity-20 mix-blend-overlay select-none">
          <span className="font-montserrat text-[30vw] leading-none font-black text-white lg:text-[25vw]">
            {event.day}
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
          <FadeIn>
            <Link
              href="/wydarzenia"
              aria-label="Wróć do kalendarium"
              className="group font-montserrat hover:text-arylideYellow mb-12 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase transition-colors lg:mb-20"
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
              Wróć do kalendarium
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <FadeIn delay="100ms">
                <div className="mb-4 flex items-center gap-4">
                  <div className="bg-arylideYellow h-px w-8 lg:w-16" />
                  <span className="font-montserrat text-arylideYellow text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                    {event.category}
                  </span>
                </div>
              </FadeIn>
              <FadeIn delay="300ms">
                <h1 className="font-montserrat text-5xl leading-[1.05] font-black tracking-tight text-white md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
                  {event.title}
                </h1>
                {event.subtitle && (
                  <span className="font-youngest mt-4 block text-4xl text-white/80 md:text-5xl lg:mt-6 lg:text-6xl">
                    {event.subtitle}
                  </span>
                )}
              </FadeIn>
            </div>

            <div className="hidden lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-end lg:pb-4">
              <FadeIn delay="500ms" className="text-right">
                <span className="font-montserrat text-6xl font-black text-white xl:text-7xl">
                  {event.day}
                </span>
                <span className="font-youngest text-arylideYellow block text-4xl xl:text-5xl">
                  {event.month}
                </span>
                <span className="font-montserrat mt-1 block text-xs font-bold tracking-[0.3em] text-white/40 uppercase xl:text-sm">
                  {event.year}
                </span>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* TREŚĆ WYDARZENIA I SIDEBAR */}
      {/* ============================================================================ */}
      <section className="bg-raisinBlack relative z-20 w-full py-16 lg:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">
            {/* --- SIDEBAR INFORMACYJNY (STICKY) --- */}
            <div className="relative flex flex-col gap-10 rounded-3xl border border-white/5 bg-white/2 p-8 shadow-2xl backdrop-blur-md lg:sticky lg:top-32 lg:col-span-4 lg:p-10">
              <FadeIn delay="200ms">
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="font-montserrat mb-2 block text-[0.6rem] font-bold tracking-[0.3em] text-white/40 uppercase">
                      Kiedy
                    </span>
                    <p className="font-montserrat text-xl font-medium text-white">
                      {event.day} {event.month} {event.year}
                    </p>
                    <p className="font-youngest text-arylideYellow text-2xl">
                      Godz. {event.time}
                    </p>
                  </div>

                  <div>
                    <span className="font-montserrat mb-2 block text-[0.6rem] font-bold tracking-[0.3em] text-white/40 uppercase">
                      Gdzie
                    </span>
                    <p className="font-montserrat text-xl font-medium text-white">
                      {event.location}
                    </p>
                    <p className="font-montserrat mt-1 text-sm font-light text-white/60">
                      {event.address}
                    </p>
                  </div>

                  <div className="my-2 h-px w-full bg-white/10" />

                  <div className="flex flex-col gap-3">
                    {renderTicketButton()}
                    <span className="font-montserrat text-center text-[0.55rem] tracking-widest text-white/30 uppercase">
                      {getTicketSubtext()}
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* --- GŁÓWNA TREŚĆ WYDARZENIA --- */}
            <div className="flex flex-col gap-16 lg:col-span-8 lg:pt-4">
              <FadeIn delay="300ms">
                <div className="prose prose-invert prose-lg font-montserrat marker:text-arylideYellow prose-strong:font-bold prose-strong:text-white max-w-none leading-relaxed font-light tracking-wide text-white/70">
                  {event.description}
                </div>
              </FadeIn>

              {/* REPERTUAR */}
              <FadeIn delay="400ms">
                <h3 className="font-youngest mb-8 text-4xl text-white">
                  Repertuar
                </h3>
                <ul className="flex flex-col">
                  {event.program.map((item, index) => (
                    <li
                      key={item}
                      className="group hover:border-arylideYellow/50 relative border-t border-white/10 py-5 transition-colors"
                    >
                      <div className="absolute top-0 left-0 h-full w-0 bg-linear-to-r from-white/5 to-transparent transition-all duration-500 group-hover:w-full" />
                      <div className="relative z-10 flex items-start gap-4">
                        <span className="font-montserrat text-arylideYellow mt-1 text-xs font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-montserrat text-lg font-medium text-white/90 transition-colors group-hover:text-white">
                          {item}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </FadeIn>

              {/* OPCJONALNA SEKCJA Z GOŚCINNYMI WYKONAWCAMI */}
              {event.guestArtists && event.guestArtists.length > 0 && (
                <FadeIn delay="500ms">
                  <h3 className="font-youngest mb-8 text-4xl text-white">
                    Gościnnie wystąpią
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {event.guestArtists.map((artist) => (
                      <div
                        key={artist.name}
                        className="group flex flex-col rounded-2xl bg-[#1f1f1f] p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-[#2a2a2a]"
                      >
                        <span className="font-montserrat group-hover:text-arylideYellow text-xl font-bold text-white transition-colors">
                          {artist.name}
                        </span>
                        <span className="font-montserrat mt-1 text-xs font-medium tracking-widest text-white/40 uppercase">
                          {artist.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================ */}
      {/* SEKCJA KONTAKTOWA NA DOLE */}
      {/* ============================================================================ */}
      <section className="bg-oxfordBlue relative z-10 w-full overflow-hidden py-24 text-center lg:py-32">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
          <span className="font-youngest text-[20vw] whitespace-nowrap text-white">
            Maxime
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="font-montserrat text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
              Masz pytania dotyczące <br className="hidden sm:block" /> tego
              wydarzenia?
            </h2>
          </FadeIn>
          <FadeIn
            delay="200ms"
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/kontakt"
              className="group bg-arylideYellow font-montserrat text-raisinBlack relative inline-flex items-center justify-center gap-4 rounded-full px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105"
            >
              Napisz do nas
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
