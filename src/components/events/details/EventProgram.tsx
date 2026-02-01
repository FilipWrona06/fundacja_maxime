// --- FILE: components/events/details/EventProgram.tsx ---
import { clsx } from "clsx";
import { Music } from "lucide-react";

interface EventProgramProps {
  program?: { composer: string; title: string }[];
  isEnded: boolean;
}

export const EventProgram = ({ program, isEnded }: EventProgramProps) => {
  return (
    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-arylideYellow border border-white/10">
          <Music size={24} className={isEnded ? "opacity-40" : ""} />
        </div>
        <h3 className="text-4xl font-youngest text-white">Repertuar</h3>
      </div>
      <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-8 md:p-10 shadow-xl">
        {program && program.length > 0 ? (
          <ul className="space-y-8">
            {program.map((item, index) => (
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
  );
};
