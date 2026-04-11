"use client"; // Tylko ten mały komponent jest wywoływany po stronie klienta

import { useState, useEffect } from "react";

export default function BackgroundVideo() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setVideoSrc("/bg-video-mobile.mp4");
    } else {
      setVideoSrc("/bg-video.mp4");
    }
  }, []);

  // Dopóki nie wiemy, jaki jest ekran (lub jesteśmy na serwerze SSR), nie renderujemy wideo
  if (!videoSrc) return null;

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="animate-cinematic-zoom absolute inset-0 h-full w-full object-cover"
      src={videoSrc}
    />
  );
}
