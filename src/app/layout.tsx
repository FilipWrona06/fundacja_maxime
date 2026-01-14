import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fundacja Maxime - Z pasji do muzyki",
  description:
    "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.",
};

const montserrat = Montserrat({
  subsets: ["latin-ext"],
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
        // Dodajemy w-full i overflow-x-hidden, aby zapobiec problemom z paskiem przewijania
        className={`${montserrat.variable} ${fontYoungest.variable} bg-raisinBlack text-white antialiased w-full overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
