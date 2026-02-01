import { clsx } from "clsx";
import { PortableText } from "next-sanity";
import type { EventItem } from "../Shared";

interface EventDescriptionProps {
  event: EventItem;
  isEnded: boolean;
}

export const EventDescription = ({ event, isEnded }: EventDescriptionProps) => {
  return (
    <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
      <h2 className="text-philippineSilver text-2xl md:text-3xl leading-relaxed font-light mb-8 max-w-3xl">
        {event.subtitle}
      </h2>
      <div
        className={clsx(
          "w-24 h-1 mb-10",
          isEnded ? "bg-white/20" : "bg-arylideYellow",
        )}
      />
      <div className="text-white/80 leading-loose text-lg font-light space-y-6 max-w-4xl prose prose-invert prose-headings:font-youngest prose-headings:font-normal prose-strong:text-arylideYellow prose-a:text-arylideYellow prose-blockquote:border-l-arylideYellow">
        {event.description ? (
          <PortableText value={event.description} />
        ) : (
          <p className="text-white/40 italic">Brak opisu wydarzenia.</p>
        )}
      </div>
    </section>
  );
};
