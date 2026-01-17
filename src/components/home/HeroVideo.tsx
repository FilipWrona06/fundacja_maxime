"use client";

import Image from "next/image";
import BackgroundVideo from "next-video/background-video";
// Import wideo
import backgroundVideo from "../../../videos/background-video.mp4";

// Typy zgodne z tym, co przekazuje Hero.tsx (z Sanity)
interface HeroVideoProps {
  poster?: {
    asset: {
      url: string;
      metadata: {
        lqip: string;
      };
    };
  };
}

export const HeroVideo = ({ poster }: HeroVideoProps) => {
  // LOGIKA WYBORU OBRAZKA:
  // 1. Jeśli w CMS jest ustawiony obrazek -> użyj URL z CMS.
  // 2. Jeśli nie ma -> użyj lokalnego pliku "/video-poster.webp".
  const posterUrl = poster?.asset?.url || "/video-poster.webp";

  // Dane do efektu rozmycia (tylko dla obrazków z Sanity)
  const blurData = poster?.asset?.metadata?.lqip;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. POSTER (Warstwa spodnia) */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={posterUrl}
          alt="Hero background"
          fill
          className="object-cover"
          priority // Kluczowe dla LCP (ładuje się natychmiast)
          // Jeśli mamy dane LQIP, włączamy efekt blur
          placeholder={blurData ? "blur" : "empty"}
          blurDataURL={blurData}
        />
      </div>

      {/* 2. WIDEO (Warstwa wierzchnia) */}
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo
          src={backgroundVideo}
          className="w-full h-full object-cover"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          disablePictureInPicture
        />
      </div>
    </div>
  );
};
