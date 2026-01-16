import dynamic from "next/dynamic"; // <--- Do lazy loadingu
import { draftMode } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SanityLive } from "@/sanity/lib/live";

// --- LAZY LOADING ---
// Ładujemy VisualEditing tylko wtedy, gdy jest potrzebny.
// Zwykły użytkownik nie pobierze ani bajta tego kodu.
const VisualEditing = dynamic(() =>
  import("next-sanity/visual-editing").then((mod) => mod.VisualEditing),
);

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <div className="flex min-h-screen flex-col w-full relative">
      {/* --- 1. DOSTĘPNOŚĆ (SKIP LINK) --- */}
      {/* Niewidoczny dla myszki, kluczowy dla klawiatury (Tab) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-6 focus:py-3 focus:bg-arylideYellow focus:text-raisinBlack focus:font-bold focus:rounded-sm transition-all"
      >
        Przejdź do treści głównej
      </a>

      <Navbar />

      {/* --- 2. SEMANTYKA --- */}
      {/* id="main-content" jest celem dla Skip Linka */}
      <main id="main-content" className="grow w-full flex flex-col">
        {children}
      </main>

      <Footer />

      {/* --- 3. SANITY INTEGRATION --- */}
      <SanityLive />

      {/* --- 4. WYDAJNOŚĆ (DRAFT MODE) --- */}
      {/* Ten kod trafi do przeglądarki TYLKO w trybie edycji */}
      {isDraftMode && (
        <>
          <VisualEditing />

          {/* Przycisk wyjścia z trybu edycji */}
          <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <a
              href="/api/draft-mode/disable"
              className="flex items-center gap-2 rounded-full bg-red-600/90 backdrop-blur-sm px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-2xl hover:bg-red-700 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-raisinBlack"
              aria-label="Wyłącz tryb edycji"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Wyłącz edycję
            </a>
          </div>
        </>
      )}
    </div>
  );
}
