import { defineQuery } from "next-sanity";

// Importy komponentów
import { About } from "@/components/home/About";
import { Events } from "@/components/home/Events";
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";
import { Support } from "@/components/home/Support";
import { Timeline } from "@/components/home/Timeline";
import { sanityFetch } from "@/sanity/lib/live";

// --- GROQ QUERY ---
// Jedno zapytanie pobierające całą strukturę strony Home
const HOME_QUERY = defineQuery(`
  *[_type == "page" && slug.current == "home"][0]{
    content[]{
      _type,
      _key,
      
      // 1. DANE DLA HERO
      _type == "hero" => {
        badge,
        headingLine1,
        headingLine2,
        description,
        buttons[]{
          _key,
          title,
          link,
          style
        }
      },

      // 2. DANE DLA PARTNERS (z pobieraniem logo)
      _type == "partners" => {
        eyebrow,
        title,
        settings,
        items[]{
          _key,
          name,
          logo {
            asset->,
            hotspot,
            crop
          }
        }
      },

      // 3. DANE DLA ABOUT (z pobieraniem zdjęcia i ikon)
      _type == "about" => {
        eyebrow,
        headingLine1,
        headingLine2,
        description,
        image {
          asset->,
          hotspot,
          crop
        },
        ctaLink,
        ctaText,
        values[]{
          _key,
          title,
          description,
          icon
        }
      },

      // 4. DANE DLA TIMELINE (z pobieraniem zdjęć)
      _type == "timeline" => {
        settings,
        items[]{
          _key,
          year,
          title,
          description,
          image {
            asset->,
            hotspot,
            crop
          }
        }
      }
    }
  }
`);

export default async function Home() {
  // Pobieramy dane z Sanity (z obsługą Live Content dla podglądu na żywo)
  const { data } = await sanityFetch({ query: HOME_QUERY });

  // --- FILTROWANIE BLOKÓW ---
  // Używamy typu { _type: string } aby uniknąć błędu 'no-explicit-any' w linterze

  // 1. Hero
  const heroData = data?.content?.find(
    (block: { _type: string }) => block._type === "hero",
  );

  // 2. Partners
  const partnersData = data?.content?.find(
    (block: { _type: string }) => block._type === "partners",
  );

  // 3. About
  const aboutData = data?.content?.find(
    (block: { _type: string }) => block._type === "about",
  );

  // 4. Timeline
  const timelineData = data?.content?.find(
    (block: { _type: string }) => block._type === "timeline",
  );

  return (
    <main className="bg-raisinBlack min-h-screen">
      {/* Sekcja Hero (Dynamiczna) */}
      <Hero data={heroData} />

      {/* Sekcja Partnerzy (Dynamiczna) */}
      <Partners data={partnersData} />

      {/* Sekcja O Nas (Dynamiczna) */}
      <About data={aboutData} />

      {/* Sekcja Oś Czasu (Dynamiczna) */}
      <Timeline data={timelineData} />

      {/* --- PONIŻSZE SEKCJE SĄ JESZCZE STATYCZNE (HARDCODED) --- */}
      {/* Będziemy je przenosić do Sanity w kolejnych krokach */}
      <Events />
      <Support />
    </main>
  );
}
