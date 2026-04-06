// src/app/(user)/layout.tsx

import CookieBanner from "@/components/cookies/CookieBanner"; // <-- Twój nowy baner
import GoogleConsent from "@/components/cookies/GoogleConsent"; // <-- Twój inicjalizator zgód
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import NewsletterPopup from "@/components/newsletter/NewsletterPopup";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Wstrzykujemy skrypt blokujący cookies zanim załaduje się cokolwiek innego na froncie */}
      <GoogleConsent />

      <Navbar />

      {/* Tu będzie renderowana treść stron takich jak strona główna, kontakt itp. */}
      <main>{children}</main>

      <Footer />

      {/* Wyskakujące okienka umieszczamy na samym dole (z najwyższym z-index) */}
      <NewsletterPopup />
      <CookieBanner />
    </>
  );
}
