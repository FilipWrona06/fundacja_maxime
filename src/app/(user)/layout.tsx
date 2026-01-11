// src/app/(site)/layout.tsx

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar na samej górze */}
      <Navbar />

      {/* Treść strony - flex-grow sprawi, że footer będzie zawsze na dole */}
      <main className="grow">
        {children}
      </main>

      {/* Footer na samym dole */}
      <Footer />
    </div>
  );
}