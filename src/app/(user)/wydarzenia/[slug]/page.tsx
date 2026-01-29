"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  History,
  MapPin,
  Music,
  Share2,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// --- IMPORT DANYCH Z PLIKU RODZICA ---
// W przyszłości tutaj będzie fetch z Sanity po slug-u
import { type EventItem, eventsData } from "../page";

// --- HELPERY ---

// Rozszerzamy typ EventItem o pola szczegółowe (które normalnie byłyby w Sanity)
// Na potrzeby demo dodajemy je "w locie" lub zakładamy, że są w eventsData
interface FullEventItem extends EventItem {
  description: string;
  program: { composer: string; title: string }[];
}

// Symulacja bogatszych danych dla demo (normalnie to przyjdzie z CMS)
const enrichEventData = (event: EventItem): FullEventItem => ({
  ...event,
  description: event.slug.includes("warsztaty")
    ? "Zapraszamy na wyjątkowe warsztaty mistrzowskie, podczas których zgłębimy tajniki interpretacji muzyki barokowej. Wydarzenie skierowane jest do studentów i absolwentów uczelni muzycznych, którzy chcą poszerzyć swoją wiedzę o historyczne praktyki wykonawcze."
    : "To będzie niezapomniany wieczór pełen emocji. Orkiestra pod batutą naszego głównego dyrygenta zabierze Państwa w podróż przez najpiękniejsze karty literatury muzycznej. Usłyszymy zarówno monumentalne dzieła symfoniczne, jak i subtelne miniatury, które poruszą najczulsze struny duszy.",
  program: [
    {
      composer: "Wolfgang Amadeus Mozart",
      title: "Uwertura do 'Wesela Figara'",
    },
    {
      composer: "Ludwig van Beethoven",
      title: "Koncert fortepianowy nr 5 'Cesarski'",
    },
    { composer: "--- Przerwa (20 min) ---", title: "" },
    { composer: "Johannes Brahms", title: "Symfonia nr 4 e-moll op. 98" },
  ],
});

const parseEventDateTime = (dateStr: string, timeStr: string): Date => {
  if (!dateStr || !timeStr) return new Date();
  const [year, month, day] = dateStr.split("-").map(Number); // YYYY-MM-DD
  const [hours, minutes] = timeStr.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;

  // 1. Znajdź wydarzenie po SLUG-u (Memoizacja dla wydajności)
  const event = useMemo(() => {
    const found = eventsData.find((e) => e.slug === slug);
    return found ? enrichEventData(found) : null;
  }, [slug]);

  // Stan zakończenia wydarzenia
  const [isEnded, setIsEnded] = useState(false);

  // 2. Sprawdź czy wydarzenie minęło
  useEffect(() => {
    if (!event) return;

    const checkTime = () => {
      const now = new Date();
      const eventDate = parseEventDateTime(event.date, event.time);
      setIsEnded(now > eventDate);
    };

    checkTime();
    // Sprawdzaj co minutę (rzadziej niż co sekundę dla wydajności)
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, [event]);

  // 3. Fallback 404 (jeśli nie znaleziono wydarzenia)
  if (!event) {
    return (
      <main className="min-h-screen bg-raisinBlack flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-3xl font-youngest text-white mb-2">
            Nie znaleziono wydarzenia
          </h1>
          <p className="text-philippineSilver mb-8">
            Wydarzenie o adresie{" "}
            <code className="text-arylideYellow">{slug}</code> nie istnieje.
          </p>
          <Link
            href="/wydarzenia"
            className="px-6 py-3 bg-arylideYellow text-raisinBlack font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-colors"
          >
            Wróć do kalendarza
          </Link>
        </div>
      </main>
    );
  }

  // Formatowanie daty do wyświetlenia
  const displayDate = new Date(event.date).toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen bg-raisinBlack text-white selection:bg-arylideYellow selection:text-raisinBlack pb-32">
      {/* TŁO DEKORACYJNE */}
      <div className="fixed top-0 left-0 w-full h-150 bg-linear-to-b from-[#1a1a1a] to-transparent pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-125 h-125 bg-arylideYellow/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0" />

      {/* --- 1. HEADER --- */}
      <header className="pt-40 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-350">
          <Link
            href="/wydarzenia"
            className="inline-flex items-center gap-2 text-philippineSilver/60 text-xs font-bold uppercase tracking-widest hover:text-arylideYellow transition-colors mb-10 group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Powrót do kalendarza
          </Link>

          <div className="flex flex-col gap-6">
            {/* BADGE STATUSU */}
            <div className="flex flex-wrap gap-3 animate-fade-up">
              {isEnded ? (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-philippineSilver text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  <History size={12} /> Wydarzenie Archiwalne
                </span>
              ) : event.isSoldOut ? (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest border border-red-500/20">
                  <Ticket size={12} /> Wyprzedane
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-arylideYellow/10 text-arylideYellow text-[10px] font-bold uppercase tracking-widest border border-arylideYellow/20 shadow-[0_0_15px_rgba(239,203,111,0.1)]">
                  <Ticket size={12} /> W sprzedaży
                </span>
              )}

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                {event.type}
              </span>
            </div>

            <h1 className="font-youngest text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-white max-w-6xl animate-fade-up [animation-delay:100ms] drop-shadow-2xl">
              {event.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-350 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-24 items-start">
          {/* --- 2. LEWA KOLUMNA (BILET / SIDEBAR) --- */}
          <aside className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1 relative">
            <div className="sticky top-32 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={clsx(
                  "bg-[#161616] border rounded-xl overflow-hidden backdrop-blur-md shadow-2xl relative group transition-colors duration-500",
                  isEnded
                    ? "border-white/5 opacity-80"
                    : "border-white/10 hover:border-arylideYellow/30",
                )}
              >
                {/* Plakat */}
                <div className="relative aspect-3/4 w-full overflow-hidden border-b border-white/5 bg-gray-900">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                    className={clsx(
                      "object-cover transition-all duration-700",
                      isEnded
                        ? "grayscale opacity-40 scale-100"
                        : "group-hover:scale-105",
                    )}
                  />
                  {(isEnded || event.isSoldOut) && (
                    <div className="absolute inset-0 bg-raisinBlack/70 flex items-center justify-center backdrop-blur-[3px]">
                      <span className="font-youngest text-4xl md:text-5xl text-white/40 -rotate-12 border-4 border-white/20 px-8 py-4 rounded-sm uppercase tracking-widest">
                        {isEnded ? "Zakończone" : "Wyprzedane"}
                      </span>
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#161616] via-transparent to-transparent opacity-80" />
                </div>

                {/* Szczegóły Biletu */}
                <div className="p-6 md:p-8 relative">
                  <div className="flex flex-col gap-6 mb-8">
                    {/* DATA */}
                    <div className="flex items-start gap-4 group/item">
                      <div
                        className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all border",
                          isEnded
                            ? "bg-white/5 text-white/20 border-white/5"
                            : "bg-white/5 text-arylideYellow border-white/10 group-hover/item:border-arylideYellow/50 group-hover/item:text-white",
                        )}
                      >
                        <Calendar size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver/60 uppercase tracking-widest block mb-1">
                          Data
                        </span>
                        <time
                          dateTime={event.date}
                          className={clsx(
                            "font-bold text-lg capitalize block leading-tight",
                            isEnded
                              ? "text-philippineSilver line-through decoration-white/30"
                              : "text-white",
                          )}
                        >
                          {displayDate}
                        </time>
                      </div>
                    </div>

                    {/* GODZINA */}
                    <div className="flex items-start gap-4 group/item">
                      <div
                        className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all border",
                          isEnded
                            ? "bg-white/5 text-white/20 border-white/5"
                            : "bg-white/5 text-arylideYellow border-white/10 group-hover/item:border-arylideYellow/50 group-hover/item:text-white",
                        )}
                      >
                        <Clock size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver/60 uppercase tracking-widest block mb-1">
                          Godzina
                        </span>
                        <div className="flex items-baseline gap-2">
                          <time
                            dateTime={`${event.date}T${event.time}`}
                            className={clsx(
                              "font-bold text-lg",
                              isEnded ? "text-philippineSilver" : "text-white",
                            )}
                          >
                            {event.time}
                          </time>
                          <span className="text-xs text-white/40">
                            (Otwarcie: {event.doorsOpen})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* LOKALIZACJA */}
                    <div className="flex items-start gap-4 group/item">
                      <div
                        className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all border",
                          isEnded
                            ? "bg-white/5 text-white/20 border-white/5"
                            : "bg-white/5 text-arylideYellow border-white/10 group-hover/item:border-arylideYellow/50 group-hover/item:text-white",
                        )}
                      >
                        <MapPin size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver/60 uppercase tracking-widest block mb-1">
                          Miejsce
                        </span>
                        <span className="text-white font-bold text-lg leading-tight block">
                          {event.location}
                        </span>
                        <span className="text-sm text-philippineSilver mt-1 block">
                          {event.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CENA */}
                  <div className="flex items-center justify-between mb-8 pt-6 border-t border-white/10 border-dashed">
                    <span className="text-philippineSilver text-xs font-bold uppercase tracking-widest">
                      Cena biletu
                    </span>
                    <span
                      className={clsx(
                        "text-2xl font-youngest",
                        isEnded ? "text-white/30" : "text-white",
                      )}
                    >
                      {event.price}
                    </span>
                  </div>

                  {/* BUTTON */}
                  <button
                    type="button"
                    disabled={isEnded || event.isSoldOut}
                    className={clsx(
                      "w-full py-4 px-6 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group/btn z-20 shadow-lg",
                      isEnded || event.isSoldOut
                        ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
                        : "bg-arylideYellow text-raisinBlack hover:bg-white hover:scale-[1.02] hover:shadow-arylideYellow/20",
                    )}
                  >
                    {isEnded ? (
                      "Sprzedaż zakończona"
                    ) : event.isSoldOut ? (
                      "Brak Biletów"
                    ) : (
                      <>
                        <Ticket size={16} /> Kup Bilet Online
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-white/30 mt-4 font-mono">
                    {isEnded
                      ? "Wydarzenie archiwalne."
                      : "Bezpieczna płatność przez PayU / BLIK"}
                  </p>
                </div>
              </motion.div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 text-xs text-philippineSilver/60 font-bold uppercase tracking-widest hover:text-white transition-colors w-full py-2 group"
              >
                <Share2
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                Udostępnij wydarzenie
              </button>
            </div>
          </aside>

          {/* --- 3. PRAWA KOLUMNA (TREŚĆ) --- */}
          <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
            {/* OPIS */}
            <section className="mb-20 animate-fade-up [animation-delay:200ms]">
              <h2 className="text-philippineSilver text-2xl md:text-3xl leading-relaxed font-light mb-8 max-w-3xl">
                {event.subtitle}
              </h2>
              <div
                className={clsx(
                  "w-24 h-1 mb-10",
                  isEnded ? "bg-white/20" : "bg-arylideYellow",
                )}
              />
              <div className="text-white/80 leading-loose text-lg font-light space-y-6 max-w-4xl">
                <p>{event.description}</p>
              </div>
            </section>

            {/* PROGRAM */}
            <section className="mb-20 animate-fade-up [animation-delay:300ms]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow border border-white/10">
                  <Music size={24} className={isEnded ? "opacity-40" : ""} />
                </div>
                <h3 className="text-4xl font-youngest text-white">Repertuar</h3>
              </div>

              <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-8 md:p-10 shadow-xl">
                {event.program.length > 0 ? (
                  <ul className="space-y-8">
                    {event.program.map((item, index) => (
                      <li
                        key={`${index}-${item.title}`}
                        className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-white/5 last:border-0 pb-6 last:pb-0 group"
                      >
                        {item.composer.includes("Przerwa") ? (
                          <span className="text-white/30 font-mono text-xs uppercase tracking-widest mx-auto py-2">
                            {item.composer}
                          </span>
                        ) : (
                          <>
                            <span
                              className={clsx(
                                "font-bold text-lg md:w-1/3 transition-colors",
                                isEnded
                                  ? "text-white/50"
                                  : "text-arylideYellow group-hover:text-white",
                              )}
                            >
                              {item.composer}
                            </span>
                            <span className="text-white text-xl font-light md:w-2/3 md:text-right">
                              {item.title}
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-philippineSilver text-sm italic">
                      Program wydarzenia zostanie ogłoszony wkrótce.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* WYKONAWCA */}
            <section className="mb-20 animate-fade-up [animation-delay:400ms]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow border border-white/10">
                  <User size={24} className={isEnded ? "opacity-40" : ""} />
                </div>
                <h3 className="text-4xl font-youngest text-white">Wykonawca</h3>
              </div>

              <div
                className={clsx(
                  "group relative overflow-hidden rounded-xl border p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center transition-all duration-500",
                  isEnded
                    ? "border-white/5 bg-white/5"
                    : "border-white/10 bg-[#1a1a1a] hover:border-arylideYellow/30 hover:bg-[#222]",
                )}
              >
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border-4 border-white/5 shadow-2xl group-hover:border-white/20 transition-colors">
                  <Image
                    src="/images/about.jpg" // Placeholder dla wykonawcy
                    alt="Orkiestra Maxime"
                    fill
                    className={clsx(
                      "object-cover transition-all duration-700",
                      isEnded
                        ? "grayscale"
                        : "grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110",
                    )}
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h4
                    className={clsx(
                      "text-3xl font-bold mb-4 transition-colors font-montserrat",
                      isEnded
                        ? "text-white/70"
                        : "text-white group-hover:text-arylideYellow",
                    )}
                  >
                    Orkiestra Maxime
                  </h4>
                  <p className="text-philippineSilver text-base leading-relaxed max-w-xl mx-auto md:mx-0 font-light">
                    Główny zespół artystyczny Fundacji. Orkiestra zrzesza
                    najzdolniejszych stypendystów oraz profesjonalnych muzyków
                    ze Śląska, łącząc młodzieńczą energię z mistrzowskim
                    wykonaniem.
                  </p>
                </div>
              </div>
            </section>

            {/* MAPA */}
            <section className="animate-fade-up [animation-delay:500ms]">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow border border-white/10">
                  <MapPin size={24} className={isEnded ? "opacity-40" : ""} />
                </div>
                <h3 className="text-4xl font-youngest text-white">
                  Lokalizacja
                </h3>
              </div>

              <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-2xl overflow-hidden group">
                <div className="relative w-full h-80 bg-[#222] rounded-lg flex flex-col items-center justify-center text-white/30 gap-4 overflow-hidden group-hover:border-arylideYellow/20 border border-transparent transition-colors">
                  {/* Tutaj normalnie byłaby mapa Google Embed */}
                  <MapPin
                    size={64}
                    className={clsx(
                      "transition-transform duration-500",
                      isEnded
                        ? "opacity-30"
                        : "group-hover:scale-110 group-hover:text-arylideYellow",
                    )}
                  />
                  <div className="text-center z-10">
                    <span className="text-lg font-bold text-white block mb-1">
                      {event.location}
                    </span>
                    <span className="text-sm font-mono text-philippineSilver block">
                      {event.address}
                    </span>
                  </div>

                  <div className="mt-4 px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-raisinBlack transition-all cursor-pointer">
                    Otwórz nawigację
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${event.location} ${event.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20"
                    aria-label="Otwórz w Google Maps"
                  >
                    <span className="sr-only">Otwórz w Google Maps</span>
                  </a>

                  {/* Efekt tła */}
                  <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
