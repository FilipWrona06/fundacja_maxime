// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
// Importy Vercel Analytics i Speed Insights
import { SpeedInsights } from "@vercel/speed-insights/next";
import { defineQuery } from "next-sanity";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";

const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    contact { address, email, phone },
    socials[] { platform, url },
    author { name, url }
  }
`);

export const metadata: Metadata = {
  title: "Stowarzyszenie Maxime | Z pasji do muzyki",
  description:
    "Odkryj z nami piękno dźwięków. Talent, ambicja i profesjonalizm, które tworzą niezapomniane emocje.",
};

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

const fontYoungest = localFont({
  src: "../fonts/the-youngest-script.woff2",
  variable: "--font-youngest",
  display: "swap",
});

// Zapasowe dane
const fallbackSettings = {
  contact: {
    address: "ul. Muzyczna 12/4\n00-001 Warszawa, Polska",
    email: "kontakt@stowarzyszeniemaxime.pl",
    phone: "+48 000 000 000",
  },
  socials: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/stowarzyszeniemaxime/",
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/maxime.orchestra/",
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@stowarzyszeniemaxime",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/stowarzyszenie-maxime/",
    },
    { platform: "Patronite", url: "https://patronite.pl/stowarzyszeniemaxime" },
  ],
  author: {
    name: "Filip Wrona",
    url: "https://www.instagram.com/filip_wrona/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY });

  const finalSettings = {
    contact: data?.contact || fallbackSettings.contact,
    socials:
      data?.socials && data.socials.length > 0
        ? data.socials
        : fallbackSettings.socials,
    author: data?.author?.name ? data.author : fallbackSettings.author,
  };

  return (
    <html lang="pl">
      <body
        className={`${montserrat.variable} ${fontYoungest.variable} bg-raisinBlack font-montserrat selection:bg-arylideYellow selection:text-raisinBlack text-white antialiased`}
      >
        <SettingsProvider settings={finalSettings}>{children}</SettingsProvider>
        <SanityLive />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
