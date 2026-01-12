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
// Pobieramy stronę główną i filtrujemy bloki w tablicy content
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

      // 2. DANE DLA PARTNERS (z pobieraniem assetów logo)
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

      // 3. DANE DLA ABOUT (z pobieraniem zdjęcia i wartości)
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
      }
    }
  }
`);

export default async function Home() {
  // Pobieramy dane z Sanity (z obsługą Live Content)
  const { data } = await sanityFetch({ query: HOME_QUERY });

  // --- WYCIĄGANIE DANYCH DLA KONKRETNYCH SEKCJI ---

  // Hero
  const heroData = data?.content?.find(
    (block: { _type: string }) => block._type === "hero",
  );

  // Partners
  const partnersData = data?.content?.find(
    (block: { _type: string }) => block._type === "partners",
  );

  // About
  const aboutData = data?.content?.find(
    (block: { _type: string }) => block._type === "about",
  );

  return (
    <main className="bg-raisinBlack min-h-screen">
      {/* Sekcja Hero (Dynamiczna) */}
      <Hero data={heroData} />

      {/* Sekcja Partnerzy (Dynamiczna) */}
      <Partners data={partnersData} />

      {/* Sekcja O Nas (Dynamiczna) */}
      <About data={aboutData} />

      {/* --- PONIŻSZE SEKCJE SĄ JESZCZE STATYCZNE (HARDCODED) --- */}
      {/* Będziemy je przenosić do Sanity w kolejnych krokach */}
      <Timeline />
      <Events />
      <Support />
    </main>
  );
}
