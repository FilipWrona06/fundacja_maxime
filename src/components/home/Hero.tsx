import { ChevronDown } from "lucide-react";
import Link from "next/link";
// ZMIANA: Importujemy lżejszy komponent dedykowany do tła
import BackgroundVideo from "next-video/background-video";

// Upewnij się, że ścieżka do pliku jest poprawna
import backgroundVideo from "../../../videos/background-video.mp4";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-raisinBlack">
      {/* --- MUX VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        {/* MOCNY OVERLAY: 60% przyciemnienia na środku, 100% na brzegach */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(38,38,38,0.5)_0%,rgba(38,38,38,1)_100%)]" />

        {/* ZMIANA: Używamy BackgroundVideo.
            Nie dodajemy tu controls, autoPlay, muted, loop - ten komponent ma to wbudowane. 
            Jest lżejszy o ~50% kodu JS. */}
        <BackgroundVideo
          src={backgroundVideo}
          className="w-full h-full object-cover"
          // Style wymuszające pozycjonowanie absolutne, aby wideo nie przesuwało treści
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: "none",
            zIndex: -1, // Dla pewności, że jest pod spodem
          }}
        />
      </div>

      {/* --- TREŚĆ --- */}
      <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="animate-fade-up">
          <span className="inline-block py-1 px-4 rounded-full border border-philippineSilver/30 bg-white/5 backdrop-blur-sm text-philippineSilver text-xs md:text-sm font-montserrat tracking-[0.2em] uppercase mb-6">
            Fundacja Maxime
          </span>
        </div>

        {/* Napis */}
        <h1 className="animate-fade-up delay-200 font-youngest text-6xl md:text-8xl lg:text-9xl text-arylideYellow mb-6 drop-shadow-lg leading-tight">
          <span className="block">Z pasji</span>
          <span className="block -mt-2 md:-mt-6">do muzyki</span>
        </h1>

        {/* Opis */}
        <p className="animate-fade-up delay-300 font-montserrat text-sm md:text-lg max-w-2xl leading-relaxed mb-10">
          Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia
          poprzez piękno dźwięku.
        </p>

        {/* --- CTA Buttons --- */}
        <div className="animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          {/* CTA 1: Zobacz wydarzenia */}
          <Link
            href="/wydarzenia"
            // ZMIANA:
            // 1. Usunięte 'w-full' i 'max-w-xs'.
            // 2. Dodane 'w-auto' (automatyczna szerokość).
            // 3. Dodane 'min-w-[220px]' (żeby przycisk był wystarczająco szeroki i symetryczny do drugiego).
            className="group relative px-8 py-3.5 rounded-full bg-arylideYellow text-raisinBlack font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] w-auto min-w-55 text-center"
          >
            <span className="relative z-10">Zobacz wydarzenia</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>

          {/* CTA 2: Skontaktuj się */}
          <Link
            href="/kontakt"
            // TE SAME ZMIANY: w-auto i min-w-[220px]
            className="group px-8 py-3.5 rounded-full border border-white/20 bg-black/20 text-white font-medium text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-raisinBlack hover:border-white w-auto min-w-55 text-center"
          >
            Skontaktuj się
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-10 h-10 text-white/70" strokeWidth={1} />
      </div>
    </section>
  );
};
