// src/app/(user)/wydarzenia/page.tsx
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import EventsClient, { type EventProps } from "./EventsClient";

// USUNIĘTO: category z zapytania
const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date asc) {
    "id": slug.current,
    title,
    date,
    location,
    "image": image.asset->url
  }
`);

const monthsPl = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

function formatEventData(rawEvent: any): EventProps {
  const d = rawEvent.date ? new Date(rawEvent.date) : new Date();

  return {
    id: rawEvent.id,
    title: rawEvent.title || "Bez tytułu",
    location: rawEvent.location || "Miejsce do ustalenia",
    // USUNIĘTO: category
    image: rawEvent.image || "/video-poster.webp",
    day: String(d.getDate()).padStart(2, "0"),
    month: monthsPl[d.getMonth()],
    year: String(d.getFullYear()),
    time: `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`,
  };
}

export default async function EventsPage() {
  const { data } = await sanityFetch({ query: EVENTS_QUERY });
  const formattedEvents = data.map(formatEventData);
  return <EventsClient eventsData={formattedEvents} />;
}
