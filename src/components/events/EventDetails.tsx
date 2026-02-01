import { EventArtist } from "./details/EventArtist";
import { EventDescription } from "./details/EventDescription";
import { EventHeader } from "./details/EventHeader";
import { EventLocation } from "./details/EventLocation";
import { EventNotFound } from "./details/EventNotFound";
import { EventProgram } from "./details/EventProgram";
import { EventSidebarCard } from "./details/EventSidebarCard";
import { type EventItem, parseEventDateTime } from "./Shared";

interface EventDetailsProps {
  event: EventItem | null;
  slug: string;
}

export const EventDetails = ({ event, slug }: EventDetailsProps) => {
  if (!event) {
    return <EventNotFound slug={slug} />;
  }

  const now = new Date();
  const eventDateObj = parseEventDateTime(event.date, event.time);
  const isEnded = now > eventDateObj;

  const displayDate = new Date(event.date).toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen bg-raisinBlack text-white selection:bg-arylideYellow selection:text-raisinBlack pb-32">
      <div className="fixed top-0 left-0 w-full h-150 bg-linear-to-b from-[#1a1a1a] to-transparent pointer-events-none z-0" />
      <div className="fixed top-0 right-0 w-125 h-125 bg-arylideYellow/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0" />

      <EventHeader event={event} isEnded={isEnded} />

      <div className="container mx-auto px-4 max-w-400 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-24 items-start">
          <aside className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1 relative">
            <div className="sticky top-32 flex flex-col gap-8">
              <EventSidebarCard
                event={event}
                isEnded={isEnded}
                displayDate={displayDate}
              />
            </div>
          </aside>

          <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2">
            <EventDescription event={event} isEnded={isEnded} />
            {event.program && event.program.length > 0 && (
              <EventProgram program={event.program} isEnded={isEnded} />
            )}
            <EventArtist
              isEnded={isEnded}
              name={event.artistName}
              description={event.artistDescription}
              image={event.artistImage}
            />
            <EventLocation
              location={event.location}
              address={event.address}
              isEnded={isEnded}
            />
          </div>
        </div>
      </div>
    </article>
  );
};
