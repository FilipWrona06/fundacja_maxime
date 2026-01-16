/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 */

import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// 1. WYDAJNOŚĆ (Static Shell)
// Studio to aplikacja SPA (Single Page Application).
// Generujemy statyczny HTML, który potem "ożywa" w przeglądarce. To najszybsza metoda.
export const dynamic = "force-static";

// 2. UX MOBILNY (Tablet/Phone editing)
// Re-eksportujemy ustawienia viewportu z paczki Sanity.
// Są one krytyczne, aby klawiatura ekranowa nie psuła układu edytora.
export { viewport } from "next-sanity/studio";

// 3. BEZPIECZEŃSTWO I BRANDING
export const metadata: Metadata = {
  title: "CMS | Fundacja Maxime",
  description: "Panel zarządzania treścią dla Fundacji Maxime",

  // KLUCZOWE DLA BEZPIECZEŃSTWA:
  // Blokujemy roboty Google. Panel admina ma być niewidoczny w wyszukiwarce.
  robots: {
    index: false,
    follow: false,
  },

  // Opcjonalnie: inna ikonka dla panelu admina (np. kłódka lub logo w innym kolorze)
  // icons: { icon: "/admin-favicon.ico" }
};

export default function StudioPage() {
  return (
    // NextStudio montuje cały interfejs Sanity.
    // Działa w izolacji od reszty stylów strony (dzięki shadow DOM lub iframe w zależności od konfiguracji).
    <NextStudio config={config} />
  );
}
