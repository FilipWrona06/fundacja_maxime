import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing"; // <--- ZMIANA TUTAJ

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SanityLive } from "@/sanity/lib/live";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sprawdzamy, czy tryb Draft (edycji) jest włączony
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar na samej górze */}
      <Navbar />

      {/* Treść strony */}
      <main className="grow">{children}</main>

      {/* Footer na samym dole */}
      <Footer />

      {/* --- INTEGRACJA Z SANITY --- */}

      {/* Live Content - odświeżanie danych w czasie rzeczywistym */}
      <SanityLive />

      {/* Visual Editing - widoczny TYLKO dla admina w trybie Draft */}
      {isDraftMode && (
        <>
          <VisualEditing />

          {/* Przycisk pomocniczy do wyjścia z trybu podglądu */}
          <a
            href="/api/draft-mode/disable"
            className="fixed bottom-4 right-4 z-50 rounded bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-red-700 transition-colors"
          >
            Wyłącz tryb edycji
          </a>
        </>
      )}
    </div>
  );
}
