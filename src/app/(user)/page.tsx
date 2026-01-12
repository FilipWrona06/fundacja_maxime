import { defineQuery } from "next-sanity";
// Importy komponentów
import { About } from "@/components/home/About";
import { Events } from "@/components/home/Events";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Support } from "@/components/home/Support";
import { Timeline } from "@/components/home/Timeline";
import { sanityFetch } from "@/sanity/lib/live";

// Query: Pobieramy Hero ORAZ Partners
// Używamy składni GROQ, aby wyciągnąć konkretne bloki z tablicy content
const HOME_QUERY = defineQuery(`
  *[_type == "page" && slug.current == "home"][0]{
    content[]{
      _type == "hero" => { ... },
      _type == "partners" => { ... }
    }
  }
`);

export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  // Wyciągamy dane dla konkretnych sekcji z tablicy content.
  // Zamiast 'any', definiujemy minimalny typ obiektu, którego szukamy: { _type: string }
  const heroData = data?.content?.find(
    (block: { _type: string }) => block._type === "hero",
  );

  const partnersData = data?.content?.find(
    (block: { _type: string }) => block._type === "partners",
  );

  return (
    <main className="bg-raisinBlack min-h-screen">
      {/* Przekazujemy dane do komponentów */}
      <Hero data={heroData} />
      <Partners data={partnersData} />

      {/* Reszta komponentów (jeszcze hardcoded) */}
      <About />
      <Timeline />
      <Events />
      <Support />
    </main>
  );
}
