import { About } from "@/components/home/About";
import { Events } from "@/components/home/Events";
import { Hero } from "@/components/home/Hero";
import { Timeline } from "@/components/home/Timeline";

export default function Home() {
  return (
    <main className="bg-raisinBlack min-h-screen">
      {/* 1. HERO - Wideo na pełny ekran */}
      <Hero />

      {/* 2. ABOUT - Sekcja o nas ze zdjęciem */}
      <About />

      {/* 3. Timeline - oś czasu fundacji / stowarzyszenia */}
      <Timeline />

      <Events />
    </main>
  );
}
