import type { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { EventsView } from "@/components/events/EventsView";
import type { EventItem } from "@/components/events/Shared";
import { sanityFetch } from "@/sanity/lib/live";

// 1. GROQ QUERY
// Pobieramy dwa obiekty w jednym zapytaniu:
// 'pageSettings': ustawienia singletona eventsArchive
// 'events': lista wydarzeń
const EVENTS_PAGE_QUERY = defineQuery(`{
  "pageSettings": *[_type == "eventsArchive"][0]{
    title,
    seasonLabel,
    seoTitle,
    seoDescription,
    "seoImage": seoImage.asset->url
  },
  "events": *[_type == "event"] | order(date asc) {
    "id": _id,
    title,
    subtitle,
    "slug": slug.current,
    date,
    time,
    doorsOpen,
    "location": locationName,
    "address": locationAddress,
    price,
    ticketUrl,
    isSoldOut,
    "type": eventType,
    "image": mainImage.asset->url,
    artistName
  }
}`);

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 2. DYNAMIC METADATA
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: EVENTS_PAGE_QUERY });
  const settings = data?.pageSettings;

  return {
    title: settings?.seoTitle || "Kalendarium Wydarzeń | Fundacja Maxime",
    description:
      settings?.seoDescription ||
      "Sprawdź nadchodzące koncerty, warsztaty i spotkania.",
    openGraph: {
      images: settings?.seoImage ? [settings.seoImage] : [],
    },
  };
}

// 3. PAGE COMPONENT
export default async function EventsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { data } = await sanityFetch({ query: EVENTS_PAGE_QUERY });

  // Fallbacki jeśli CMS jest pusty
  const events = data?.events || [];
  const settings = data?.pageSettings;

  // Mapowanie danych dla bezpieczeństwa typów
  // biome-ignore lint/suspicious/noExplicitAny: Sanity types
  const mappedEvents: EventItem[] = events.map((e: any) => ({
    ...e,
    image: e.image || "/images/hero-poster.jpg",
  }));

  const viewDateStr = typeof params.view === "string" ? params.view : undefined;
  const selectedDateStr =
    typeof params.date === "string" ? params.date : undefined;

  return (
    <main
      className="min-h-screen bg-raisinBlack pt-52 lg:pt-80 pb-32 relative overflow-hidden"
      aria-label="Kalendarz wydarzeń"
    >
      <div
        className="absolute top-0 right-0 w-150 h-150 bg-arylideYellow/5 rounded-full blur-[130px] pointer-events-none -translate-y-1/2 translate-x-1/3 z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-125 h-125 bg-white/5 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/4 z-0"
        aria-hidden="true"
      />

      <EventsView
        events={mappedEvents}
        viewDateStr={viewDateStr}
        selectedDateStr={selectedDateStr}
        // Przekazujemy dane z CMS
        pageTitle={settings?.title}
        seasonLabel={settings?.seasonLabel}
      />
    </main>
  );
}
