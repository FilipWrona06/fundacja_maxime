// src/app/layout.tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// 1. IMPORTUJEMY KOMPONENT SanityLive
// (Zmień ścieżkę importu, jeśli plik `live.ts` masz w innej lokalizacji, np. "@/sanity/lib/live")
import { SanityLive } from "@/sanity/lib/live";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${montserrat.variable} ${fontYoungest.variable} bg-raisinBlack font-montserrat selection:bg-arylideYellow selection:text-raisinBlack text-white antialiased`}
      >
        {children}

        {/* 2. DODAJEMY KOMPONENT NA SAMYM DOLE BODY */}
        {/* Odpowiada za nasłuchiwanie zmian (Real-time updates) */}
        <SanityLive />
      </body>
    </html>
  );
}
