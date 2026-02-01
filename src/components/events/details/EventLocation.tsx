// --- FILE: components/events/details/EventLocation.tsx ---
import { clsx } from "clsx";
import { MapPin } from "lucide-react";

interface EventLocationProps {
  location: string;
  address: string;
  isEnded: boolean;
}

export const EventLocation = ({
  location,
  address,
  isEnded,
}: EventLocationProps) => {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow border border-white/10">
          <MapPin size={24} className={isEnded ? "opacity-40" : ""} />
        </div>
        <h3 className="text-4xl font-youngest text-white">Lokalizacja</h3>
      </div>
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-2 shadow-2xl overflow-hidden group">
        <div className="relative w-full h-80 bg-[#222] rounded-lg flex flex-col items-center justify-center text-white/30 gap-4 overflow-hidden group-hover:border-arylideYellow/20 border border-transparent transition-colors">
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
              {location}
            </span>
            <span className="text-sm font-mono text-philippineSilver block">
              {address}
            </span>
          </div>
          <div className="mt-4 px-6 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-raisinBlack transition-all cursor-pointer">
            Otwórz nawigację
          </div>
          <a
            href={`https://maps.google.com/?q=${location} ${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20"
            aria-label="Otwórz w Google Maps"
          >
            <span className="sr-only">Otwórz w Google Maps</span>
          </a>
          <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
      </div>
    </section>
  );
};
