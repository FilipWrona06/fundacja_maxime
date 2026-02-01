import { clsx } from "clsx";
import { Calendar, Clock, MapPin, Share2, Ticket } from "lucide-react";
import Image from "next/image";
import type { EventItem } from "../Shared";

interface EventSidebarCardProps {
  event: EventItem;
  isEnded: boolean;
  displayDate: string;
}

export const EventSidebarCard = ({
  event,
  isEnded,
  displayDate,
}: EventSidebarCardProps) => {
  // Jeśli jest external link i wydarzenie trwa -> używamy linku
  // Jeśli brak linku -> button nieaktywny (chyba że chcesz link do kontaktu)
  const canBuy = !isEnded && !event.isSoldOut && event.ticketUrl;

  return (
    <>
      <div
        className={clsx(
          "bg-[#161616] border rounded-xl overflow-hidden backdrop-blur-md shadow-2xl relative group transition-all animate-in fade-in slide-in-from-bottom-8 duration-700",
          isEnded
            ? "border-white/5 opacity-80"
            : "border-white/10 hover:border-arylideYellow/30",
        )}
      >
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
          <div className="absolute inset-0 bg-linear-to-t from-[#161616] via-transparent to-transparent opacity-80" />
        </div>
        <div className="p-6 md:p-8 relative">
          <div className="flex flex-col gap-6 mb-8">
            {/* Data, Czas, Miejsce (Bez zmian) */}
            <div className="flex items-start gap-4 group/item">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all border bg-white/5 text-arylideYellow border-white/10">
                <Calendar size={18} />
              </div>
              <div>
                <span className="text-[10px] text-philippineSilver/60 uppercase tracking-widest block mb-1">
                  Data
                </span>
                <time className="font-bold text-lg capitalize block leading-tight text-white">
                  {displayDate}
                </time>
              </div>
            </div>

            <div className="flex items-start gap-4 group/item">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all border bg-white/5 text-arylideYellow border-white/10">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[10px] text-philippineSilver/60 uppercase tracking-widest block mb-1">
                  Godzina
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-lg text-white">
                    {event.time}
                  </span>
                  {event.doorsOpen && (
                    <span className="text-xs text-white/40">
                      (Otwarcie: {event.doorsOpen})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 group/item">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all border bg-white/5 text-arylideYellow border-white/10">
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

          {canBuy ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group/btn z-20 shadow-lg bg-arylideYellow text-raisinBlack hover:bg-white hover:scale-[1.02] hover:shadow-arylideYellow/20"
            >
              <Ticket size={16} /> Kup Bilet Online
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="w-full py-4 px-6 rounded-lg font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group/btn z-20 shadow-lg bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
            >
              {isEnded
                ? "Sprzedaż zakończona"
                : event.isSoldOut
                  ? "Brak Biletów"
                  : "Bilety niedostępne online"}
            </button>
          )}

          <p className="text-center text-[10px] text-white/30 mt-4 font-mono">
            {isEnded
              ? "Wydarzenie archiwalne."
              : "Bezpieczna płatność u operatora"}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center justify-center gap-2 text-xs text-philippineSilver/60 font-bold uppercase tracking-widest hover:text-white transition-colors w-full py-2 group"
      >
        <Share2
          size={14}
          className="group-hover:scale-110 transition-transform"
        />{" "}
        Udostępnij wydarzenie
      </button>
    </>
  );
};
