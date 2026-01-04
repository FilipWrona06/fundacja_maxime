"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Music,
  Share2,
  Ticket,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- MOCK DANE ---
const eventData = {
  id: "1",
  title: "Symfonia Jesienna: Inauguracja Sezonu",
  subtitle:
    "Wieczór pełen emocji z dziełami mistrzów romantyzmu w wykonaniu Orkiestry Maxime.",
  date: "12.10.2025",
  time: "19:00",
  doorsOpen: "18:30",
  location: "Filharmonia Śląska, Katowice",
  address: "ul. Sokolska 2",
  price: "od 45 PLN",
  image: "/images/hero-poster.jpg",
  isSoldOut: false,
  description:
    "Zapraszamy na uroczystą inaugurację sezonu artystycznego 2025/2026. Będzie to wieczór, w którym tradycja spotka się z młodzieńczą energią. Usłyszymy monumentalne dzieła, które wymagają od orkiestry nie tylko technicznej perfekcji, ale przede wszystkim głębokiej wrażliwości.",
  program: [
    { composer: "Ludwig van Beethoven", title: "Uwertura 'Egmont' op. 84" },
    {
      composer: "Fryderyk Chopin",
      title: "Koncert fortepianowy e-moll op. 11",
    },
    { composer: "--- Przerwa (20 min) ---", title: "" },
    { composer: "Johannes Brahms", title: "IV Symfonia e-moll op. 98" },
  ],
  artists: [
    { name: "Jan Kowalski", role: "Dyrygent", image: "/images/about.jpg" },
    {
      name: "Anna Nowak",
      role: "Fortepian",
      image: "/images/timeline/2024.jpg",
    },
    {
      name: "Orkiestra Maxime",
      role: "Zespół",
      image: "/images/timeline/2023.jpg",
    },
  ],
};

export default function EventPage() {
  // Usunięto nieużywany stan isHoveringTicket

  return (
    <main className="min-h-screen bg-raisinBlack text-white selection:bg-arylideYellow selection:text-raisinBlack pb-24">
      {/* --- 1. HEADER (Breadcrumbs & Title) --- */}
      <div className="pt-32 pb-12 bg-linear-to-b from-raisinBlack via-raisinBlack to-transparent relative z-10">
        <div className="container mx-auto px-4">
          <Link
            href="/wydarzenia"
            className="inline-flex items-center gap-2 text-philippineSilver text-xs font-bold uppercase tracking-widest hover:text-arylideYellow transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Powrót do kalendarza
          </Link>

          <h1 className="font-youngest text-5xl md:text-7xl lg:text-8xl leading-[0.85] text-white max-w-5xl animate-fade-up">
            {eventData.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-24 relative items-start">
          {/* --- 2. LEWA KOLUMNA (STICKY SIDEBAR / BILET) --- */}
          <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1 relative">
            <div className="sticky top-32 flex flex-col gap-6">
              {/* Karta Wydarzenia */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-sm overflow-hidden backdrop-blur-md shadow-2xl relative group"
              >
                {/* Plakat */}
                {/* POPRAWIONO: aspect-3/4 */}
                <div className="relative aspect-3/4 w-full overflow-hidden border-b border-white/10">
                  <Image
                    src={eventData.image}
                    alt={eventData.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Sold Out Overlay */}
                  {eventData.isSoldOut && (
                    <div className="absolute inset-0 bg-raisinBlack/80 flex items-center justify-center backdrop-blur-sm">
                      <span className="font-youngest text-5xl text-philippineSilver -rotate-12 border-4 border-philippineSilver px-4 py-2 rounded-sm">
                        Wyprzedane
                      </span>
                    </div>
                  )}
                </div>

                {/* Szczegóły Biletu */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-4 mb-8">
                    {/* Data */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow shrink-0">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver uppercase tracking-widest block">
                          Data
                        </span>
                        <span className="text-white font-bold text-lg">
                          {eventData.date}
                        </span>
                      </div>
                    </div>

                    {/* Godzina */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow shrink-0">
                        <Clock size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver uppercase tracking-widest block">
                          Godzina
                        </span>
                        <span className="text-white font-bold text-lg">
                          {eventData.time}
                        </span>
                        <span className="text-xs text-white/40 ml-2">
                          (Otwarcie: {eventData.doorsOpen})
                        </span>
                      </div>
                    </div>

                    {/* Miejsce */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] text-philippineSilver uppercase tracking-widest block">
                          Lokalizacja
                        </span>
                        <span className="text-white font-bold text-lg leading-tight">
                          {eventData.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cena i CTA */}
                  <div className="flex items-center justify-between mb-6 pt-6 border-t border-white/10 border-dashed">
                    <span className="text-philippineSilver text-sm">
                      Cena biletu:
                    </span>
                    <span className="text-2xl font-youngest text-white">
                      {eventData.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={eventData.isSoldOut}
                    className={clsx(
                      "w-full py-4 px-6 rounded-sm font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group/btn",
                      eventData.isSoldOut
                        ? "bg-white/10 text-white/30 cursor-not-allowed"
                        : "bg-arylideYellow text-raisinBlack hover:bg-white hover:shadow-[0_0_20px_rgba(239,203,111,0.4)]",
                    )}
                  >
                    {eventData.isSoldOut ? (
                      "Brak Biletów"
                    ) : (
                      <>
                        <Ticket size={18} />
                        Kup Bilet Online
                      </>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-white/30 mt-4">
                    Bezpieczna płatność przez PayU / BLIK
                  </p>
                </div>
              </motion.div>

              {/* Share Button (Mały pod spodem) */}
              <button
                type="button" // POPRAWIONO: Dodano explicit type
                className="flex items-center justify-center gap-2 text-xs text-philippineSilver uppercase tracking-widest hover:text-white transition-colors w-full py-2"
              >
                <Share2 size={14} /> Udostępnij wydarzenie
              </button>
            </div>
          </div>

          {/* --- 3. PRAWA KOLUMNA (PROGRAM & INFO) --- */}
          <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
            {/* Opis */}
            <section className="mb-16 animate-fade-up [animation-delay:200ms]">
              <h2 className="text-philippineSilver text-xl md:text-2xl leading-relaxed font-light mb-8">
                {eventData.subtitle}
              </h2>
              <div className="w-16 h-1 bg-arylideYellow mb-8" />
              <p className="text-white/80 leading-loose text-lg">
                {eventData.description}
              </p>
            </section>

            {/* Program */}
            <section className="mb-16 animate-fade-up [animation-delay:300ms]">
              <div className="flex items-center gap-3 mb-8">
                <Music className="text-arylideYellow" />
                <h3 className="text-3xl font-youngest text-white">Repertuar</h3>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-sm p-8">
                <ul className="space-y-6">
                  {eventData.program.map((item, index) => (
                    // POPRAWIONO: Unikalny klucz
                    <li
                      key={`${index}-${item.title}`}
                      className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-white/5 last:border-0 pb-4 last:pb-0"
                    >
                      {item.composer.includes("Przerwa") ? (
                        <span className="text-white/40 italic mx-auto text-sm">
                          {item.composer}
                        </span>
                      ) : (
                        <>
                          <span className="text-arylideYellow font-bold text-lg md:w-1/3">
                            {item.composer}
                          </span>
                          <span className="text-white text-lg font-light md:w-2/3 md:text-right">
                            {item.title}
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Artyści */}
            <section className="mb-16 animate-fade-up [animation-delay:400ms]">
              <div className="flex items-center gap-3 mb-8">
                <User className="text-arylideYellow" />
                <h3 className="text-3xl font-youngest text-white">Artyści</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventData.artists.map((artist, index) => (
                  // POPRAWIONO: Unikalny klucz
                  <div
                    key={`${index}-${artist.name}`}
                    className="group flex items-center gap-4 bg-transparent border border-white/10 hover:border-arylideYellow/50 p-4 rounded-sm transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/10 shrink-0">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg group-hover:text-arylideYellow transition-colors">
                        {artist.name}
                      </h4>
                      <p className="text-philippineSilver text-xs uppercase tracking-widest">
                        {artist.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Mapa / Lokalizacja */}
            <section className="mb-16 animate-fade-up [animation-delay:500ms]">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-arylideYellow" />
                <h3 className="text-3xl font-youngest text-white">
                  Lokalizacja
                </h3>
              </div>

              <div className="bg-[#1a1a1a] border border-white/10 rounded-sm p-1">
                {/* Placeholder Mapy */}
                <div className="relative w-full h-64 bg-white/5 flex flex-col items-center justify-center text-white/20 gap-2">
                  <MapPin size={48} />
                  <span className="text-sm font-mono">{eventData.address}</span>
                  <span className="text-xs">Kliknij, aby otworzyć mapę</span>

                  {/* Symulacja przycisku */}
                  {/* POPRAWIONO: Dodano sr-only dla dostępności */}
                  <a
                    href={`https://maps.google.com/?q=${eventData.location}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label="Otwórz w Google Maps"
                  >
                    <span className="sr-only">Otwórz w Google Maps</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
