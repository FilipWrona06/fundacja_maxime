import type { Metadata } from "next";
import { EventClientView } from "@/components/events/EventClientView";
import { eventsData } from "@/components/events/Shared";

interface Props {
  params: Promise<{ slug: string }>;
}

// Dynamiczne metadane SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);

  if (!event) {
    return { title: "Wydarzenie nie znalezione | Fundacja Maxime" };
  }

  return {
    title: `${event.title} | Fundacja Maxime`,
    description: event.subtitle || event.title,
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug) || null;

  return <EventClientView event={event} slug={slug} />;
}
