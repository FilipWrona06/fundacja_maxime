import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  src: "../fonts/the-youngest-script.woff2", // upewnij się, że ta ścieżka nadal działa, jeśli nie, zmień na "@/fonts/..."
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
        className={` ${montserrat.variable} ${fontYoungest.variable} bg-raisinBlack font-montserrat selection:bg-arylideYellow selection:text-raisinBlack text-white antialiased`}
      >
        {/* Usunęliśmy stąd Navbar i Footer! Tutaj wpadają wszystkie strony (i strona, i Sanity) */}
        {children}
      </body>
    </html>
  );
}
