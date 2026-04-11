// src/app/(user)/galeria/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import PhotoGrid from "@/components/gallery/slug/PhotoGrid";
import FadeIn from "@/components/ui/FadeIn";
import { sanityFetch } from "@/sanity/lib/live";

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

  const album = albumRes.data;
  const nextAlbum = nextAlbumRes.data;

  if (!album) notFound();

  // Formatowanie daty na polski
  const d = new Date(album.date);
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

  return (
    <main className="bg-raisinBlack selection:bg-arylideYellow selection:text-raisinBlack relative min-h-screen w-full overflow-x-hidden">
      {/* KINOWY HERO SECTION ALBUMU (Renderowany na serwerze!) */}
      <section className="relative flex min-h-[85vh] w-full flex-col justify-end overflow-hidden px-6 pt-40 pb-16 lg:px-12">
        <div className="absolute inset-0 z-0">
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            priority
            className="scale-100 object-cover opacity-60 transition-transform duration-3000 ease-out hover:scale-105"
          />
          <div className="from-raisinBlack via-raisinBlack/60 absolute inset-0 bg-linear-to-t to-transparent" />
          <div className="from-raisinBlack absolute inset-0 bg-linear-to-r via-transparent to-transparent opacity-80" />
        </div>

        <div className="pointer-events-none absolute bottom-0 -left-10 z-0 opacity-10 mix-blend-overlay select-none">
          <span className="font-montserrat text-[25vw] leading-none font-black text-white lg:text-[20vw]">
            {album.date.slice(0, 4)}
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <FadeIn>
            <Link
              href="/galeria"
              className="group font-montserrat hover:text-arylideYellow mb-12 inline-flex items-center gap-3 text-[0.65rem] font-bold tracking-[0.3em] text-white/50 uppercase transition-colors lg:mb-20"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Powrót do portfolio
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <FadeIn delay="300ms">
                <h1 className="font-montserrat text-5xl leading-[1.05] font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[6rem]">
                  {album.title}
                </h1>
              </FadeIn>
            </div>

            <div className="text-left lg:col-span-4 lg:flex lg:flex-col lg:items-end lg:justify-end lg:pb-4 lg:text-right">
              <FadeIn delay="500ms">
                <p className="font-youngest text-arylideYellow mb-2 text-3xl md:text-4xl">
                  {formattedDate}
                </p>
                <p className="font-montserrat text-sm font-medium text-white/80">
                  {album.location}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* OPIS ALBUMU I METADANE (Renderowane na serwerze!) */}
      <section className="bg-raisinBlack relative z-20 w-full border-b border-white/5 px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
            <div className="md:col-span-7 lg:col-span-8">
              <FadeIn>
                <p className="font-montserrat text-lg leading-relaxed font-light text-white/70 md:text-xl">
                  {album.description}
                </p>
              </FadeIn>
            </div>
            <div className="flex flex-col gap-8 md:col-span-5 md:pl-12 lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-16">
              <FadeIn delay="200ms">
                <span className="font-montserrat mb-2 block text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">
                  Fotografia
                </span>
                <span className="font-montserrat text-base font-medium text-white">
                  {album.photographer}
                </span>
              </FadeIn>
              <FadeIn delay="400ms">
                <span className="font-montserrat mb-2 block text-[0.6rem] font-bold tracking-[0.3em] text-white/30 uppercase">
                  Liczba kadrów
                </span>
                <span className="font-montserrat text-base font-medium text-white">
                  {album.photos?.length || 0} zdjęć
                </span>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* SIATKA ZDJĘĆ Z LIGHTBOXEM (Komponent Kliencki) */}
      <PhotoGrid photos={album.photos} />

      {/* NASTĘPNY ALBUM CTA (Renderowane na serwerze!) */}
      {nextAlbum && (
        <section className="group relative z-20 block h-[60vh] w-full overflow-hidden lg:h-[70vh]">
          <Link
            href={`/galeria/${nextAlbum.id}`}
            className="absolute inset-0 block h-full w-full"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={nextAlbum.image || "/video-poster.webp"}
                alt={nextAlbum.title}
                fill
                className="scale-100 object-cover opacity-50 transition-transform duration-3000 ease-out group-hover:scale-105"
              />
              <div className="bg-oxfordBlue/60 group-hover:bg-oxfordBlue/80 absolute inset-0 transition-colors duration-700" />
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
              <FadeIn>
                <span className="font-montserrat text-arylideYellow mb-6 block text-[0.65rem] font-bold tracking-[0.4em] uppercase">
                  Zobacz następny album
                </span>
              </FadeIn>
              <FadeIn delay="200ms">
                <h2 className="font-montserrat mb-4 text-4xl leading-tight font-black text-white transition-transform duration-700 group-hover:-translate-y-2 sm:text-5xl md:text-6xl lg:text-7xl">
                  {nextAlbum.title}
                </h2>
              </FadeIn>
            </div>
            <div className="bg-raisinBlack/50 absolute bottom-0 left-0 h-2 w-full">
              <div className="bg-arylideYellow h-full w-0 transition-all duration-1500 ease-out group-hover:w-full" />
            </div>
          </Link>
        </section>
      )}
    </main>
  );
}
