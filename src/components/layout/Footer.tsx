import dynamic from "next/dynamic";
import { FooterBottom } from "@/components/footer/FooterBottom";
import { FooterBrand } from "@/components/footer/FooterBrand";
import { FooterContact } from "@/components/footer/FooterContact";
import { FooterLinks } from "@/components/footer/FooterLinks";

// --- DYNAMIC IMPORTS (Performance) ---

// 1. Formularz Newslettera (Client)
const NewsletterForm = dynamic(
  () =>
    import("@/components/footer/NewsletterForm").then(
      (mod) => mod.NewsletterForm,
    ),
  {
    loading: () => (
      <div className="h-64 w-full bg-white/5 animate-pulse rounded-sm" />
    ),
  },
);

// 2. Scroll Top Button (Client)
const FooterScrollTop = dynamic(
  () => import("@/components/footer/FooterScrollTop"),
);

export const Footer = () => {
  return (
    // ZMIANA: Usunięto role="contentinfo", bo tag <footer> jest wystarczający
    <footer className="bg-raisinBlack border-t border-white/10 pt-20 pb-8 relative overflow-hidden">
      {/* Dekoracyjne tło (CSS only) */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-arylideYellow/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* KOLUMNA 1: Brand (4 col) - Server */}
          <div className="lg:col-span-4">
            <FooterBrand />
          </div>

          {/* KOLUMNA 2: Nawigacja (2 col) - Server */}
          <div className="lg:col-span-2">
            <FooterLinks />
          </div>

          {/* KOLUMNA 3: Kontakt (3 col) - Server */}
          <div className="lg:col-span-3">
            <FooterContact />
          </div>

          {/* KOLUMNA 4: Newsletter (3 col) - Client (Lazy) */}
          <div className="lg:col-span-3">
            <NewsletterForm />
          </div>
        </div>

        {/* BOTTOM BAR - Server (with Client Slot) */}
        <FooterBottom scrollTopSlot={<FooterScrollTop />} />
      </div>
    </footer>
  );
};
