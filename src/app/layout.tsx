import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// --- KONFIGURACJA CZCIONEK ---
const montserrat = Montserrat({
  subsets: ["latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const fontYoungest = localFont({
  src: "../fonts/the-youngest-script.woff2",
  variable: "--font-youngest",
  display: "swap",
});

// --- METADATA & VIEWPORT (Globalne) ---
export const viewport: Viewport = {
  themeColor: "#262626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fundacjamaxime.pl"),
  title: {
    default: "Fundacja Maxime - Z pasji do muzyki",
    template: "%s | Fundacja Maxime",
  },
  description:
    "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.",
  icons: {
    icon: "/favicon.ico",
  },
};

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
