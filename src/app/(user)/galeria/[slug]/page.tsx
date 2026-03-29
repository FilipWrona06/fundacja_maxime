import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import AlbumClient from "./AlbumClient";

const ALBUM_QUERY = defineQuery(`
  *[_type == "gallery" && slug.current == $slug][0] {
    "id": slug.current,
    title,
    date,
    location,
    photographer,
    description,
    "coverImage": coverImage.asset->url,
    "photos": photos[].asset->url
  }
`);

// Pobieramy "następny" album do dolnej sekcji CTA
const NEXT_ALBUM_QUERY = defineQuery(`
  *[_type == "gallery" && slug.current != $slug] | order(date desc)[0] {
    "id": slug.current,
    title,
    "image": coverImage.asset->url
  }
`);

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const [albumRes, nextAlbumRes] = await Promise.all([
    sanityFetch({ query: ALBUM_QUERY, params: { slug: resolvedParams.slug } }),
    sanityFetch({
      query: NEXT_ALBUM_QUERY,
      params: { slug: resolvedParams.slug },
    }),
  ]);

  const albumData = albumRes.data;
  const nextAlbumData = nextAlbumRes.data;

  if (!albumData) notFound();

  // Formatowanie daty na polski
  const d = new Date(albumData.date);
  const monthsPl = [
    "Stycznia",
    "Lutego",
    "Marca",
    "Kwietnia",
    "Maja",
    "Czerwca",
    "Lipca",
    "Sierpnia",
    "Września",
    "Października",
    "Listopada",
    "Grudnia",
  ];
  const formattedDate = `${d.getDate()} ${monthsPl[d.getMonth()]} ${d.getFullYear()}`;

  // Zwracamy Client Component, który zawiera logikę Lightboxa
  return (
    <AlbumClient
      album={{ ...albumData, formattedDate }}
      nextAlbum={nextAlbumData}
    />
  );
}
