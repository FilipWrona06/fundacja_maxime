// src/app/(user)/layout.tsx
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import NewsletterPopup from "@/components/ui/NewsletterPopup"; // <-- DODANY IMPORT

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      {/* Tu będzie renderowana treść stron takich jak strona główna, kontakt itp. */}
      <main>{children}</main>

      <Footer />

      {/* DODANY KOMPONENT POPUPU (z najwyższym z-indexem) */}
      <NewsletterPopup />
    </>
  );
}
