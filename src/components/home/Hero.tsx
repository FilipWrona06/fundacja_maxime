import Link from "next/link";
import Video from "next-video";
import { ChevronDown } from "lucide-react";

// Pamiętaj o sprawdzeniu ścieżki do importu
import backgroundVideo from "../../../videos/background-video.mp4";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-raisinBlack">
      
      {/* --- MUX VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        
        {/* ZMIANA: Okrągły gradient (Vignette / Spotlight effect) */}
        <div 
  className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(38,38,38,0.5)_0%,rgba(38,38,38,1)_100%)]" 
/>
        
        <Video
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          className="w-full h-full object-cover"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            border: "none",
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
        <p className="animate-fade-up delay-300 font-montserrat  text-sm md:text-lg max-w-2xl leading-relaxed mb-10">
          Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez 
          piękno dźwięku. Dołącz do świata, gdzie muzyka jest najważniejsza.
        </p>

        {/* CTA */}
        <div className="animate-fade-up delay-500 flex flex-col md:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/wydarzenia"
            className="group relative px-8 py-3.5 rounded-full bg-arylideYellow text-raisinBlack font-bold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,203,111,0.4)] w-full md:w-auto"
          >
            <span className="relative z-10">Zobacz wydarzenia</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>

          <Link
            href="/kontakt"
            className="group px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-raisinBlack hover:border-white w-full md:w-auto"
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