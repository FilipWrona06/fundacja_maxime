import type { Metadata } from "next";
import dynamic from "next/dynamic"; // <--- 1. IMPORT DYNAMICZNY
import Script from "next/script";
import { defineQuery } from "next-sanity";

// --- IMPORTY KOMPONENTÓW ---

// 1. KRYTYCZNE (Above the Fold) - Importujemy normalnie, żeby były natychmiast
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners"; // Partners są zaraz pod Hero, warto je mieć od razu

// 2. NIEKRYTYCZNE (Below the Fold) - Importujemy dynamicznie (Lazy Load)
// Next.js podzieli te komponenty na osobne pliki JS i załaduje je dopiero, gdy będą potrzebne
const About = dynamic(() =>
  import("@/components/home/About").then((mod) => mod.About),
);
const Timeline = dynamic(() =>
  import("@/components/home/Timeline").then((mod) => mod.Timeline),
);
const Events = dynamic(() =>
  import("@/components/home/Events").then((mod) => mod.Events),
);
const Support = dynamic(() =>
  import("@/components/home/Support").then((mod) => mod.Support),
);

import { sanityFetch } from "@/sanity/lib/live";

// --- TYPY ---
interface SanityBlock {
  _type: string;
  _key: string;
  // biome-ignore lint/suspicious/noExplicitAny: Dane z CMS są dynamiczne
  [key: string]: any;
}

// --- GROQ QUERY (Bez zmian - jest już perfekcyjne) ---
const HOME_QUERY = defineQuery(`
  *[_type == "page" && slug.current == "home"][0]{
    title,
    "description": description,
    "ogImage": content[_type == "about"][0].image.asset->url,

    content[]{
      _type,
      _key,
      
      _type == "hero" => {
        badge,
        headingLine1,
        headingLine2,
        description,
        buttons[]{ _key, title, link, style }
      },

      _type == "partners" => {
        eyebrow,
        title,
        settings,
        items[]{
          _key,
          name,
          logo { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop }
        }
      },

      _type == "about" => {
        eyebrow,
        headingLine1,
        headingLine2,
        description,
        image { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
        ctaLink,
        ctaText,
        values[]{ _key, title, description, icon }
      },

      _type == "timeline" => {
        settings,
        items[]{
          _key,
          year,
          title,
          description,
          image { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop }
        }
      },

      _type == "supportSection" => {
        eyebrow,
        heading,
        description,
        mainImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
        accentImage { asset->{ _id, url, metadata { lqip, dimensions } }, hotspot, crop },
        options[]{
          _key,
          number,
          title,
          text,
          actionType,
          copyValue,
          copyLabel,
          linkUrl,
          linkLabel
        }
      }
    }
  }
`);

// --- METADATA ---
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  const title = data?.title || "Fundacja Maxime - Z pasji do muzyki";
  const description =
    data?.description ||
    "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku. Dołącz do nas!";
  const ogImage = data?.ogImage || "/wideo-poster.webp";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      locale: "pl_PL",
      url: "https://fundacjamaxime.pl",
      siteName: "Fundacja Maxime",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
    },
  };
}

// --- GŁÓWNY KOMPONENT ---
export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  if (!data?.content) {
    return <main className="bg-raisinBlack min-h-screen" />;
  }

  // Mapa sekcji (O(n))
  const sections = data.content.reduce(
    (acc: Record<string, SanityBlock>, block: SanityBlock) => {
      acc[block._type] = block;
      return acc;
    },
    {},
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Fundacja Maxime",
    url: "https://fundacjamaxime.pl",
    logo: "https://fundacjamaxime.pl/logo.png",
    description:
      "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Muzyczna 14/3",
      addressLocality: "Katowice",
      postalCode: "40-001",
      addressCountry: "PL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+48 123 456 789",
      contactType: "customer service",
      areaServed: "PL",
      availableLanguage: "Polish",
    },
    sameAs: [
      "https://facebook.com/fundacjamaxime",
      "https://instagram.com/fundacjamaxime",
    ],
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD standard
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-raisinBlack min-h-screen">
        {/* HERO i PARTNERS są ładowane natychmiast (Critical CSS/JS) */}
        {sections.hero && <Hero data={sections.hero} />}
        {sections.partners && <Partners data={sections.partners} />}
        {/* Reszta sekcji ładuje się asynchronicznie (Lazy Loading) */}
        {sections.about && <About data={sections.about} />}
        {sections.timeline && <Timeline data={sections.timeline} />}
        <Events /> {/* Statyczne */}
        {sections.supportSection && <Support data={sections.supportSection} />}
      </main>
    </>
  );
}
