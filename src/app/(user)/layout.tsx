import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrolling } from "@/components/ui/SmoothScrolling";
import { SanityLive } from "@/sanity/lib/live";

// --- LAZY LOADING ---
const Footer = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.Footer),
  { ssr: true },
);

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
    // SmoothScrolling owija tylko część użytkownika (nie psuje Studia)
    <SmoothScrolling>
      <div className="flex min-h-screen flex-col w-full relative">
        {/* SKIP LINK */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-6 focus:py-3 focus:bg-arylideYellow focus:text-raisinBlack focus:font-bold focus:rounded-sm transition-all"
        >
          Przejdź do treści głównej
        </a>

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <main id="main-content" className="grow w-full flex flex-col">
          {children}
        </main>

        {/* FOOTER (Zoptymalizowany) */}
        <div
          style={{
            contentVisibility: "auto",
            containIntrinsicSize: "1px 500px",
          }}
        >
          <Footer />
        </div>

        {/* SANITY HELPERS */}
        <SanityLive />

        {isDraftMode && (
          <>
            <VisualEditing />
            <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <a
                href="/api/draft-mode/disable"
                className="flex items-center gap-2 rounded-full bg-red-600/90 backdrop-blur-sm px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-2xl hover:bg-red-700 transition-all hover:scale-105"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Wyłącz edycję
              </a>
            </div>
          </>
        )}
      </div>
    </SmoothScrolling>
  );
}
