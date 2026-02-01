// --- FILE: components/events/details/EventHeader.tsx ---
import { ArrowLeft, History, Ticket } from "lucide-react";
import Link from "next/link";
import type { EventItem } from "../Shared";

interface EventHeaderProps {
  event: EventItem;
  isEnded: boolean;
}

export const EventHeader = ({ event, isEnded }: EventHeaderProps) => {
  return (
    <header className="pt-40 pb-16 relative z-10">
      <div className="container mx-auto px-4 max-w-400">
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
          <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
          <h1 className="font-youngest text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-white max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 drop-shadow-2xl">
            {event.title}
          </h1>
        </div>
      </div>
    </header>
  );
};
