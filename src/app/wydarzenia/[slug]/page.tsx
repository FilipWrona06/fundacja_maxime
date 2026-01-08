"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
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
import { useEffect, useState } from "react";

// --- IMPORTUJEMY DANE Z PLIKU GŁÓWNEGO ---
import { eventsData } from "../page";

// --- HELPERY CZASU ---
const parseEventDate = (dateStr: string, timeStr: string): Date => {
  if (!dateStr || !timeStr) return new Date();
  const [day, month, year] = dateStr.split(".").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);
  // Miesiące w JS: 0-11
  return new Date(year, month - 1, day, hours, minutes);
};

export default function EventPage() {
  const params = useParams();
  const [isEnded, setIsEnded] = useState(false);

  // Znajdź wydarzenie po ID. Jeśli ID nie istnieje, fallback do pierwszego (lub strony 404 w przyszłości)
  const eventData = eventsData.find((e) => e.id === params.id) || eventsData[0];

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const eventDate = parseEventDate(eventData.date, eventData.time);
      // Sprawdzamy czy teraz >= czas wydarzenia
      setIsEnded(now >= eventDate);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Odśwież co minutę
    return () => clearInterval(interval);
  }, [eventData]);

  return (
    <main className="min-h-screen bg-raisinBlack text-white selection:bg-arylideYellow selection:text-raisinBlack pb-24">
      {/* --- 1. HEADER --- */}
      <div className="pt-36 pb-12 bg-linear-to-b from-raisinBlack via-raisinBlack to-transparent relative z-10">
        <div className="container mx-auto px-4">
          <Link
            href="/wydarzenia"
            className="inline-flex items-center gap-2 text-philippineSilver text-xs font-bold uppercase tracking-widest hover:text-arylideYellow transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Powrót do kalendarza
          </Link>

          <div className="flex flex-col gap-4">
            {/* BADGE STATUSU */}
            <div className="flex gap-3 animate-fade-up">
              {isEnded ? (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-philippineSilver text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  <History size={12} /> Archiwum
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-arylideYellow/10 text-arylideYellow text-[10px] font-bold uppercase tracking-widest border border-arylideYellow/20">
                  <Ticket size={12} /> W sprzedaży
                </span>
              )}
            </div>

            <h1 className="font-youngest text-5xl md:text-7xl lg:text-8xl leading-[0.85] text-white max-w-5xl animate-fade-up [animation-delay:100ms]">
              {eventData.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-24 relative items-start">
          {/* --- 2. LEWA KOLUMNA (BILET) --- */}
          <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1 relative">
            <div className="sticky top-32 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={clsx(
                  "bg-white/5 border rounded-sm overflow-hidden backdrop-blur-md shadow-2xl relative group transition-colors duration-500",
                  isEnded ? "border-white/5" : "border-white/10",
                )}
              >
                {/* Plakat */}
                <div className="relative aspect-3/4 w-full overflow-hidden border-b border-white/10">
                  <Image
                    src={eventData.image}
                    alt={eventData.title}
                    fill
                    className={clsx(
                      "object-cover transition-all duration-700",
                      isEnded ? "grayscale opacity-50 scale-100" : "group-hover:scale-105"
                    )}
                  />
                  {(isEnded || eventData.isSoldOut) && (
                    <div className="absolute inset-0 bg-raisinBlack/60 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="font-youngest text-5xl text-philippineSilver/80 -rotate-12 border-4 border-philippineSilver/50 px-6 py-2 rounded-sm uppercase">
                        {isEnded ? "Zakończone" : "Wyprzedane"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Szczegóły */}
                <div className="p-6 md:p-8 relative">
                  {isEnded && <div className="absolute inset-0 bg-raisinBlack/20 z-10 pointer-events-none" />}
                  <div className="flex flex-col gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors", isEnded ? "bg-white/5 text-white/20" : "bg-white/5 text-arylideYellow")}>
                        <Calendar size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver uppercase tracking-widest block">Data</span>
                        <span className={clsx("font-bold text-lg", isEnded ? "text-philippineSilver line-through decoration-white/30" : "text-white")}>{eventData.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors", isEnded ? "bg-white/5 text-white/20" : "bg-white/5 text-arylideYellow")}>
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver uppercase tracking-widest block">Godzina</span>
                        <span className={clsx("font-bold text-lg", isEnded ? "text-philippineSilver" : "text-white")}>{eventData.time}</span>
                        <span className="text-xs text-white/40 ml-2">(Otwarcie: {eventData.doorsOpen})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors", isEnded ? "bg-white/5 text-white/20" : "bg-white/5 text-arylideYellow")}>
                        <MapPin size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver uppercase tracking-widest block">Lokalizacja</span>
                        <span className="text-white font-bold text-lg leading-tight">{eventData.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6 pt-6 border-t border-white/10 border-dashed relative z-20">
                    <span className="text-philippineSilver text-sm">Cena biletu:</span>
                    <span className={clsx("text-2xl font-youngest", isEnded ? "text-white/30" : "text-white")}>{eventData.price}</span>
                  </div>

                  <button
                    type="button"
                    disabled={isEnded || eventData.isSoldOut}
                    className={clsx(
                      "w-full py-4 px-6 rounded-sm font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group/btn z-20",
                      isEnded || eventData.isSoldOut
                        ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
                        : "bg-arylideYellow text-raisinBlack hover:bg-white hover:shadow-[0_0_20px_rgba(239,203,111,0.4)]"
                    )}
                  >
                    {isEnded ? "Wydarzenie zakończone" : eventData.isSoldOut ? "Brak Biletów" : <><Ticket size={18} /> Kup Bilet Online</>}
                  </button>
                  <p className="text-center text-[10px] text-white/30 mt-4">{isEnded ? "Sprzedaż biletów została zamknięta." : "Bezpieczna płatność przez PayU / BLIK"}</p>
                </div>
              </motion.div>

              <button type="button" className="flex items-center justify-center gap-2 text-xs text-philippineSilver uppercase tracking-widest hover:text-white transition-colors w-full py-2">
                <Share2 size={14} /> Udostępnij wydarzenie
              </button>
            </div>
          </div>

          {/* --- 3. PRAWA KOLUMNA --- */}
          <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
            <section className="mb-16 animate-fade-up [animation-delay:200ms]">
              <h2 className="text-philippineSilver text-xl md:text-2xl leading-relaxed font-light mb-8">{eventData.subtitle}</h2>
              <div className={clsx("w-16 h-1 mb-8", isEnded ? "bg-white/20" : "bg-arylideYellow")} />
              <p className="text-white/80 leading-loose text-lg">{eventData.description}</p>
            </section>

            <section className="mb-16 animate-fade-up [animation-delay:300ms]">
              <div className="flex items-center gap-3 mb-8">
                <Music className={isEnded ? "text-white/30" : "text-arylideYellow"} />
                <h3 className="text-3xl font-youngest text-white">Repertuar</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-sm p-8">
                {eventData.program.length > 0 ? (
                  <ul className="space-y-6">
                    {eventData.program.map((item, index) => (
                      <li key={`${index}-${item.title}`} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-white/5 last:border-0 pb-4 last:pb-0">
                        {item.composer.includes("Przerwa") ? (
                          <span className="text-white/40 italic mx-auto text-sm">{item.composer}</span>
                        ) : (
                          <>
                            <span className={clsx("font-bold text-lg md:w-1/3", isEnded ? "text-white/60" : "text-arylideYellow")}>{item.composer}</span>
                            <span className="text-white text-lg font-light md:w-2/3 md:text-right">{item.title}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-philippineSilver text-sm italic">Program zostanie ogłoszony wkrótce.</p>
                )}
              </div>
            </section>

            <section className="mb-16 animate-fade-up [animation-delay:400ms]">
              <div className="flex items-center gap-3 mb-8">
                <User className={isEnded ? "text-white/30" : "text-arylideYellow"} />
                <h3 className="text-3xl font-youngest text-white">Wykonawca</h3>
              </div>
              <div className={clsx("group relative overflow-hidden rounded-sm border p-8 flex flex-col md:flex-row gap-8 items-center transition-colors", isEnded ? "border-white/5 bg-white/5" : "border-white/10 bg-white/5 hover:border-arylideYellow/30")}>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-white/10 shadow-2xl">
                  <Image src="/images/about.jpg" alt="Orkiestra Maxime" fill className={clsx("object-cover transition-all duration-700", isEnded ? "grayscale" : "grayscale group-hover:grayscale-0")} />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h4 className={clsx("text-2xl md:text-3xl font-bold mb-3 transition-colors", isEnded ? "text-white/70" : "text-white group-hover:text-arylideYellow")}>Orkiestra Maxime</h4>
                  <p className="text-philippineSilver text-sm leading-relaxed max-w-lg mx-auto md:mx-0">
                    Główny zespół artystyczny Fundacji. Orkiestra zrzesza najzdolniejszych stypendystów oraz profesjonalnych muzyków ze Śląska.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16 animate-fade-up [animation-delay:500ms]">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className={isEnded ? "text-white/30" : "text-arylideYellow"} />
                <h3 className="text-3xl font-youngest text-white">Lokalizacja</h3>
              </div>
              <div className="bg-[#1a1a1a] border border-white/10 rounded-sm p-1">
                <div className="relative w-full h-64 bg-white/5 flex flex-col items-center justify-center text-white/20 gap-2 overflow-hidden">
                  <MapPin size={48} className={isEnded ? "opacity-30" : ""} />
                  <span className="text-sm font-mono">{eventData.address}</span>
                  <span className="text-xs">Kliknij, aby otworzyć mapę</span>
                  <a href={`https://maps.google.com/?q=${eventData.location}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label="Otwórz w Google Maps"><span className="sr-only">Otwórz w Google Maps</span></a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}