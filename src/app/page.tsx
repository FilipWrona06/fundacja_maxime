import { About } from "@/components/home/About";
import { Events } from "@/components/home/Events";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Timeline } from "@/components/home/Timeline";

export default function Home() {
  return (
    <main className="bg-raisinBlack min-h-screen">
      {/* 1. HERO - Wideo na pełny ekran */}
      <Hero />

      {/* 2. ABOUT - Sekcja o nas ze zdjęciem */}
      <About />

      {/* 3. Partners - Sekcja partnerów */}
      <Partners />

      {/* 4. Timeline - oś czasu fundacji / stowarzyszenia */}
      <Timeline />

      {/* 5. Events - nadchodzące wydarzenia */}
      <Events />
    </main>
  );
}
