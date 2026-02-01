import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { EventDetails } from "@/components/events/EventDetails";
import type { EventItem } from "@/components/events/Shared";
import { sanityFetch } from "@/sanity/lib/live";

interface Props {
  params: Promise<{ slug: string }>;
}

const EVENT_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
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
    
    description,
    program,
    
    artistName,
    artistDescription,
    "artistImage": artistImage.asset->url,

    seoTitle,
    seoDescription
  }
`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug },
  });

  if (!event) {
    return { title: "Wydarzenie nie znalezione | Fundacja Maxime" };
  }

  return {
    title: event.seoTitle || `${event.title} | Fundacja Maxime`,
    description: event.seoDescription || event.subtitle,
    openGraph: {
      images: [event.image],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const { data: event } = await sanityFetch({
    query: EVENT_QUERY,
    params: { slug },
  });

  if (!event) {
    notFound();
  }

  // Zapewniamy fallbacki dla opcjonalnych pól
  const mappedEvent: EventItem = {
    ...event,
    image: event.image || "/images/hero-poster.jpg",
    artistImage: event.artistImage || "/images/about.jpg",
  };

  return <EventDetails event={mappedEvent} slug={slug} />;
}
