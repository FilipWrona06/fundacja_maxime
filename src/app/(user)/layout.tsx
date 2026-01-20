import dynamic from "next/dynamic"; // <--- Do lazy loadingu
import { draftMode } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { SanityLive } from "@/sanity/lib/live";

// --- LAZY LOADING STOPKI ---
// 1. Dzielimy kod JS (Code Splitting).
// 2. ssr: true zapewnia, że linki SEO są w HTML-u od razu.
const Footer = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.Footer),
  { ssr: true },
);

// --- LAZY LOADING VISUAL EDITING ---
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
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-6 focus:py-3 focus:bg-arylideYellow focus:text-raisinBlack focus:font-bold focus:rounded-sm transition-all"
      >
        Przejdź do treści głównej
      </a>

      {/* NAVBAR - Statyczny (LCP - musi być widoczny od razu) */}
      <Navbar />

      {/* --- 2. GŁÓWNA TREŚĆ --- */}
      <main id="main-content" className="grow w-full flex flex-col">
        {children}
      </main>

      {/* --- 3. STOPKA Z OPTYMALIZACJĄ RENDEROWANIA --- */}
      {/* 
        content-visibility: auto -> Przeglądarka renderuje stopkę dopiero,
        gdy użytkownik zbliży się do niej podczas scrollowania.
        contain-intrinsic-size -> Rezerwuje miejsce, żeby pasek scrolla nie skakał.
      */}
      <div
        style={{
          contentVisibility: "auto",
          containIntrinsicSize: "1px 500px", // Szacowana wysokość stopki
        }}
      >
        <Footer />
      </div>

      {/* --- 4. SANITY LIVE (Real-time updates) --- */}
      <SanityLive />

      {/* --- 5. DRAFT MODE UI (Tylko dla admina) --- */}
      {isDraftMode && (
        <>
          <VisualEditing />
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
