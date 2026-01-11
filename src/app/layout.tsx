// --- START OF FILE src/app/layout.tsx ---

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fundacja Maxime - Z pasji do muzyki",
  description:
    "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.",
};

// Konfiguracja fontu Google
const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
});

// Konfiguracja fontu lokalnego
const fontYoungest = localFont({
  src: "../fonts/the-youngest-script.woff2", // Upewnij się, że ścieżka do pliku jest poprawna
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
        className={`${montserrat.variable} ${fontYoungest.variable} bg-raisinBlack text-white antialiased`}
      >
        {/* 
          Tutaj renderujemy {children}. 
          
          Jeśli wejdziesz na stronę główną: 
          Next.js wstawi tu Layout z folderu (user), który ma Navbar i Footer.
          
          Jeśli wejdziesz do Sanity Studio:
          Next.js wstawi tu stronę Studia, bez Navbara i Footera.
        */}
        {children}
      </body>
    </html>
  );
}
