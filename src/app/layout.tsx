import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// --- 1. KONFIGURACJA CZCIONEK ---
// Definiujemy wagi, aby zoptymalizować ładowanie (tylko te używane)
const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"], // Optymalizacja: ładujemy tylko potrzebne wagi
});

const fontYoungest = localFont({
  src: "../fonts/the-youngest-script.woff2",
  variable: "--font-youngest",
  display: "swap",
  // Opcjonalnie: deklaracja weight/style jeśli font tego wymaga, np. weight: '400'
});

// --- 2. VIEWPORT & THEME (UX Mobile) ---
export const viewport: Viewport = {
  themeColor: "#262626", // Kolor paska adresu w przeglądarce mobilnej (zgodny z bg-raisinBlack)
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Dostępność: pozwalamy użytkownikom zoomować (blokowanie zoomu to błąd WCAG)
};

// --- 3. METADATA (SEO & SOCIAL) ---
export const metadata: Metadata = {
  // Ważne: Zmień to na swoją domenę produkcyjną, aby obrazki w social mediach działały
  metadataBase: new URL("https://fundacjamaxime.pl"),

  title: {
    default: "Fundacja Maxime - Z pasji do muzyki",
    template: "%s | Fundacja Maxime", // Dzięki temu na podstronach będzie np. "Kontakt | Fundacja Maxime"
  },
  description:
    "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku. Dołącz do naszej muzycznej społeczności w Katowicach.",

  keywords: [
    "fundacja muzyczna",
    "katowice",
    "muzyka klasyczna",
    "stypendia artystyczne",
    "koncerty śląsk",
  ],

  authors: [{ name: "Fundacja Maxime" }],
  creator: "Fundacja Maxime",
  publisher: "Fundacja Maxime",

  // Konfiguracja dla Facebooka / LinkedIn / Discorda
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://fundacjamaxime.pl",
    siteName: "Fundacja Maxime",
    title: "Fundacja Maxime - Z pasji do muzyki",
    description:
      "Wspieramy młode talenty i promujemy kulturę wysoką na Śląsku.",
    images: [
      {
        url: "/og-image.jpg", // Warto dodać plik og-image.jpg (1200x630px) do folderu public
        width: 1200,
        height: 630,
        alt: "Fundacja Maxime - Koncert",
      },
    ],
  },

  // Konfiguracja dla Twittera / X
  twitter: {
    card: "summary_large_image",
    title: "Fundacja Maxime",
    description: "Wspieramy młode talenty i promujemy kulturę wysoką.",
    images: ["/og-image.jpg"],
  },

  // Ikony (Favicon)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Warto dodać ikonę dla iPhone'a
  },

  // Roboty indeksujące
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // scroll-smooth: Płynne przewijanie przy linkach kotwicach (np. #kontakt)
    <html lang="pl" className="scroll-smooth">
      <body
        className={`
          ${montserrat.variable} 
          ${fontYoungest.variable} 
          bg-raisinBlack 
          text-white 
          antialiased 
          w-full 
          overflow-x-hidden
          selection:bg-arylideYellow selection:text-raisinBlack
        `}
      >
        {children}
      </body>
    </html>
  );
}
