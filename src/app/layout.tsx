import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ['latin-ext'],
  variable: '--font-montserrat',
  display: 'swap',
});

const fontYoungest = localFont({
  src: '../fonts/the-youngest-script.ttf',
  variable: '--font-youngest',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Fundacja Maxime',
  description: 'Strona stworzona z pasji do muzyki',
  // DODANE IKONY Z POPRZEDNIEJ WERSJI
  icons: {
    icon: [
      {
        url: '/favicon_white.svg',
        media: '(prefers-color-scheme: dark)'
      },
      {
        url: '/favicon_black.svg',
        media: '(prefers-color-scheme: light)'
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${montserrat.variable} ${fontYoungest.variable}`}>
        <Navbar />
          <main>
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
