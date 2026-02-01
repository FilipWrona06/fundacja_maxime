// --- FILE: app/wydarzenia/page.tsx ---
import type { Metadata } from "next";
import { EventsView } from "@/components/events/EventsView";
import { eventsData } from "@/components/events/Shared";

export const metadata: Metadata = {
  title: "Kalendarium Wydarzeń | Fundacja Maxime",
  description: "Sprawdź nadchodzące koncerty, warsztaty i spotkania.",
};

// Interfejs dla Next.js 15 (params są Promise) lub Next.js 14 (bez Promise dla searchParams)
// Zakładam najnowszą wersję, gdzie searchParams może być asynchroniczne
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EventsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Pobieranie wartości z URL
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
        events={eventsData}
        viewDateStr={viewDateStr}
        selectedDateStr={selectedDateStr}
      />
    </main>
  );
}
