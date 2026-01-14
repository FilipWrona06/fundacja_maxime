"use client";

import Image from "next/image"; // <--- Używamy Next Image do postera
import BackgroundVideo from "next-video/background-video";
// Import wideo
import backgroundVideo from "../../../videos/background-video.mp4";

export const HeroVideo = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. POSTER (Warstwa spodnia) */}
      {/* Używamy komponentu Image, żeby wymusić 'object-cover' i pełny ekran */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/video-poster.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority // Ładujemy priorytetowo dla LCP
        />
      </div>

      {/* 2. WIDEO (Warstwa wierzchnia) */}
      {/* Biblioteka next-video */}
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo
          src={backgroundVideo}
          // Usuwamy prop 'poster', bo obsłużyliśmy go wyżej
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
