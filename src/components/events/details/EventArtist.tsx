// --- FILE: components/events/details/EventArtist.tsx ---
import { clsx } from "clsx";
import { User } from "lucide-react";
import Image from "next/image";

interface EventArtistProps {
  isEnded: boolean;
}

export const EventArtist = ({ isEnded }: EventArtistProps) => {
  return (
    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
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
            src="/images/about.jpg"
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
            najzdolniejszych stypendystów oraz profesjonalnych muzyków ze
            Śląska.
          </p>
        </div>
      </div>
    </section>
  );
};
