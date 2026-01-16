import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { defineQuery } from "next-sanity";

// --- IMPORTY KOMPONENTÓW ---
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";

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
  // biome-ignore lint/suspicious/noExplicitAny: CMS data is dynamic
  [key: string]: any;
}

// --- GROQ QUERY ---
const HOME_QUERY = defineQuery(`
  *[_type == "page" && slug.current == "home"][0]{
    // 1. DANE SEO (Pobieramy pola z zakładki SEO)
    title,
    seoTitle,
    seoDescription,
    "seoImage": ogImage.asset->url,

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

      _type == "support" => {
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

// --- 1. METADATA (SEO Z SANITY) ---
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  // LOGIKA PRIORYTETÓW:
  // 1. Jeśli wpisałeś coś w zakładce "SEO" w Sanity -> Użyj tego.
  // 2. Jeśli nie, użyj tytułu strony / domyślnego opisu.

  const title = data?.seoTitle || data?.title || "Fundacja Maxime";
  const description =
    data?.seoDescription ||
    "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.";

  // Obrazek: 1. Z zakładki SEO, 2. Plik lokalny
  const ogImage = data?.seoImage || "/video-poster.webp";

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

// --- 2. GŁÓWNY KOMPONENT STRONY ---
export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_QUERY });

  if (!data?.content) {
    return <main className="bg-raisinBlack min-h-screen" />;
  }

  // --- 3. OPTYMALIZACJA (REDUCE) ---
  const sections = data.content.reduce(
    (acc: Record<string, SanityBlock>, block: SanityBlock) => {
      acc[block._type] = block;
      return acc;
    },
    {},
  );

  // --- 4. JSON-LD (DANE STRUKTURALNE) ---
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
        {sections.hero && <Hero data={sections.hero} />}
        {sections.partners && <Partners data={sections.partners} />}
        {sections.about && <About data={sections.about} />}
        {sections.timeline && <Timeline data={sections.timeline} />}

        <Events />

        {sections.support && <Support data={sections.support} />}
      </main>
    </>
  );
}
