import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SanityLive } from "@/sanity/lib/live";

// Zdefiniuj kolor motywu dla urządzeń mobilnych
export const viewport: Viewport = {
  themeColor: "#212121", // Odpowiednik bg-raisinBlack
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.twojadomena.pl"), // ⚠️ ZMIEŃ NA SWOJĄ DOCELOWĄ DOMENĘ
  title: {
    default: "Stowarzyszenie Maxime | Z pasji do muzyki",
    template: "%s | Stowarzyszenie Maxime", // Generuje np. "O nas | Stowarzyszenie Maxime" na podstronach
  },
  description:
    "Odkryj z nami piękno dźwięków. Talent, ambicja i profesjonalizm, które tworzą niezapomniane emocje. Jesteśmy orkiestrą i Fundacją Maxime.",
  keywords: [
    "stowarzyszenie muzyczne",
    "Maxime",
    "Stowarzyszenie Maxime",
    "Fundacja Maxime",
    "orkiestra",
    "muzyka",
    "koncerty",
    "pasja do muzyki",
    "wydarzenia muzyczne",
  ],
  authors: [{ name: "Fundacja Maxime" }],
  creator: "Fundacja Maxime",
  publisher: "Fundacja Maxime",
  alternates: {
    canonical: "/", // Wskazuje Google'owi główny, oryginalny adres strony
  },
  robots: {
    index: true, // Zezwala Google na indeksowanie strony
    follow: true, // Zezwala Google na podążanie za linkami
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://www.twojadomena.pl", // ⚠️ ZMIEŃ NA SWOJĄ DOMENĘ
    siteName: "Stowarzyszenie Maxime",
    title: "Stowarzyszenie Maxime | Z pasji do muzyki",
    description:
      "Odkryj z nami piękno dźwięków. Talent, ambicja i profesjonalizm, które tworzą niezapomniane emocje.",
    images: [
      {
        url: "/video-poster.webp", // ⚠️ DODAJ ZDJĘCIE o nazwie og-image.webp do folderu public/
        width: 1200,
        height: 630,
        alt: "Fundacja Maxime - Z pasji do muzyki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundacja Maxime | Z pasji do muzyki",
    description:
      "Odkryj z nami piękno dźwięków. Talent, ambicja i profesjonalizm, które tworzą niezapomniane emocje.",
    images: ["/video-poster.webp"], // ⚠️ DODAJ ZDJĘCIE jw.
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Dane strukturalne dla Google (Schema.org) - pomaga wygenerować ładniejszą wizytówkę w wyszukiwarce
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup", // Typ "MusicGroup" jest idealny dla orkiestry/stowarzyszenia muzycznego
    name: "Fundacja Maxime",
    url: "https://www.twojadomena.pl",
    description:
      "Odkryj z nami piękno dźwięków. Talent, ambicja i profesjonalizm, które tworzą niezapomniane emocje.",
    sameAs: [
      "https://www.facebook.com/TwójFanpage", // ⚠️ Dodaj linki do social mediów, jeśli masz
      "https://www.instagram.com/TwójInstagram",
    ],
  };

  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${fontYoungest.variable} bg-raisinBlack font-montserrat selection:bg-arylideYellow selection:text-raisinBlack text-white antialiased`}
      >
        {children}
        <SanityLive />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
