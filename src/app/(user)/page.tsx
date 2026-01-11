import { defineQuery } from "next-sanity";
// Importy komponentów
import { About } from "@/components/home/About";
import { Events } from "@/components/home/Events";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Support } from "@/components/home/Support";
import { Timeline } from "@/components/home/Timeline";
import { sanityFetch } from "@/sanity/lib/live";

// Query: Pobierz stronę o slugu "home" i znajdź w niej blok typu "hero"
const HOME_HERO_QUERY = defineQuery(`
  *[_type == "page" && slug.current == "home"][0].content[_type == "hero"][0]
`);

export default async function Home() {
  // 1. Pobieramy dane dla Hero
  const { data: heroData } = await sanityFetch({ query: HOME_HERO_QUERY });

  return (
    <main className="bg-raisinBlack min-h-screen">
      {/* 2. Przekazujemy dane do Hero. Jeśli null, Hero wyświetli swoje defaulty. */}
      <Hero data={heroData} />

      {/* 3. Reszta komponentów po staremu (na sztywno) */}
      <Partners />
      <About />
      <Timeline />
      <Events />
      <Support />
    </main>
  );
}
