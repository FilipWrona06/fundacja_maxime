// src/app/(user)/page.tsx
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fundacja Maxime - Z pasji do muzyki',
  description: 'Poznaj Fundację Maxime - orkiestrę symfoniczną dzielącą się pasją do muzyki. Zobacz nasze koncerty i poznaj naszą historię.',
};

export default function Home() {
  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* TŁO WIDEO */}
      <div className="absolute inset-0 z-10">
        {/* Ciemna nakładka dla lepszej czytelności */}
        <div className="absolute inset-0 bg-black/75 z-20" aria-hidden="true" />

        {/* Wideo w tle */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          poster="/video-poster.jpg"
          aria-label="Wideo prezentujące występy Fundacji Maxime"
          className="absolute z-10 w-full h-full object-cover"
        >
          <source src="/wideo_maxime.webm" type="video/webm" />
          <source src="/wideo_maxime.mp4" type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzania wideo HTML5.
        </video>
      </div>
      
      {/* GŁÓWNA TREŚĆ */}
      <div className="relative z-30 px-6 sm:px-8 md:px-12 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-youngest tracking-wide mb-6 leading-tight">
          Z pasji do muzyki
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-montserrat font-bold mb-10 max-w-3xl mx-auto leading-relaxed">
          Poznaj historię i brzmienie naszej orkiestry
        </p>
      </div>

      {/* PRZYCISKI AKCJI */}
      <div className="relative z-30 flex flex-col sm:flex-row items-center justify-center gap-4 px-6">
        <Button 
          asLink 
          href="/events"
          aria-label="Przejdź do strony z nadchodzącymi koncertami"
        >
          Zobacz nadchodzące koncerty
        </Button>
        <Button 
          asLink 
          href="/about"
          aria-label="Przejdź do strony o nas"
        >
          Poznaj nas
        </Button>
      </div>
    </main>
  );
}