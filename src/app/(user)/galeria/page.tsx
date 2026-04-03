// src/app/(user)/galeria/page.tsx
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import GalleryClient, { type AlbumProps } from "./GalleryClient";

const GALLERY_QUERY = defineQuery(`
  *[_type == "gallery"] | order(date desc) {
    "id": slug.current,
    title,
    date,
    "image": coverImage.asset->url,
    "count": count(photos)
  }
`);

function formatAlbumData(rawAlbum: any): AlbumProps {
  const d = rawAlbum.date ? new Date(rawAlbum.date) : new Date();

  return {
    id: rawAlbum.id,
    title: rawAlbum.title || "Bez tytułu",
    count: rawAlbum.count || 0,
    year: String(d.getFullYear()),
    image: rawAlbum.image || "/video-poster.webp",
  };
}

export default async function GalleryPage() {
  const { data } = await sanityFetch({ query: GALLERY_QUERY });
  const formattedAlbums = data.map(formatAlbumData);

  return <GalleryClient albumsData={formattedAlbums} />;
}
