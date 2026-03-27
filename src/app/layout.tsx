import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/components/layout/Footer";
// Importujemy nasz Navbar (przyjmuję, że używasz aliasu @/ dla głównego folderu)
import Navbar from "@/components/layout/Navbar";

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
        className={`
          ${montserrat.variable} 
          ${fontYoungest.variable} 
          bg-raisinBlack 
          font-montserrat 
          text-white 
          antialiased 
          selection:bg-arylideYellow 
          selection:text-raisinBlack
        `}
      >
        {/* Nawigacja przypięta globalnie na górze każdej strony */}
        <Navbar />

        {/* Główna treść strony (np. strona główna z Hero) */}
        {children}

        <Footer />
      </body>
    </html>
  );
}
