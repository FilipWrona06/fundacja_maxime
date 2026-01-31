import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { defineQuery } from "next-sanity";

// --- IMPORTY KOMPONENTÓW ---
import { Hero } from "@/components/home/Hero";
import { Partners } from "@/components/home/Partners";

// Lazy Loading
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

// --- GROQ QUERY ---
const HOME_QUERY = defineQuery(`
  *[_type == "page" && slug.current == "home"][0]{
    // 1. SEO
    title,
    seoTitle,
    seoDescription,
    "seoImage": ogImage.asset->url,

    content[]{
      _type,
      _key,
      
      // HERO
      _type == "hero" => {
        badge,
        headingLine1,
        headingLine2,
        posterImage { 
          asset->{ _id, url, metadata { lqip, dimensions } } 
        },
        buttons[]{ 
          _key, title, style, linkType, externalLink,
          "internalLink": internalLink->slug.current,
          openInNewTab, ariaLabel
        }
      },

      // PARTNERS
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

      // ABOUT
      _type == "about" => {
        eyebrow,
        headingLine1,
        headingLine2,
        description,
        image { 
          asset->{ _id, url, metadata { lqip, dimensions } }, 
          hotspot, crop, alt 
        },
        ctaLink,
        ctaText,
        values[]{ _key, title, description, icon }
      },

      // TIMELINE
      _type == "timeline" => {
        eyebrow,
        heading,
        items[]{
          _key,
          year,
          title,
          description,
          image { 
            asset->{ _id, url, metadata { lqip, dimensions } }, 
            hotspot, crop, alt
          }
        }
      },

      // SUPPORT (Wsparcie)
      _type == "support" => {
        eyebrow,
        heading, // Portable Text
        description,
        mainImage { 
          asset->{ _id, url, metadata { lqip, dimensions } }, 
          hotspot, crop, alt 
        },
        accentImage { 
          asset->{ _id, url, metadata { lqip, dimensions } }, 
          hotspot, crop, alt 
        },
        options[]{
          _key,
          number,
          title, // Portable Text
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

  const title = data?.seoTitle || data?.title || "Fundacja Maxime";
  const description =
    data?.seoDescription ||
    "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.";
  const ogImage = data?.seoImage || "/video-poster.webp";

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      locale: "pl_PL",
      url: "https://fundacja-maxime.vercel.app/",
      siteName: "Fundacja Maxime",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
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
    url: "https://fundacja-maxime.vercel.app/",
    logo: "https://fundacja-maxime.vercel.app/logo.svg",
    description: "Wspieramy młode talenty i organizujemy koncerty.",
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
    },
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD standard
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-raisinBlack min-h-screen w-full">
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
