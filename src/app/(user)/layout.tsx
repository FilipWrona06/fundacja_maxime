import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SanityLive } from "@/sanity/lib/live";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    // DODANO: w-full, aby kontener zajmował 100% szerokości
    <div className="flex min-h-screen flex-col w-full relative">
      {/* Navbar */}
      <Navbar />

      {/* Main - treść strony */}
      {/* DODANO: w-full */}
      <main className="grow w-full">{children}</main>

      {/* Footer */}
      <Footer />

      {/* --- NARZĘDZIA SANITY --- */}
      <SanityLive />

      {isDraftMode && (
        <>
          <VisualEditing />
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
