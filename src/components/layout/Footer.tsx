// --- START OF FILE src/components/layout/Footer.tsx ---

"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  Check,
  Copy,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

const footerLinks = [
  { name: "Strona główna", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "O nas", href: "/o-nas" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Wsparcie", href: "/wsparcie" },
  { name: "Kontakt", href: "/kontakt" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const bankAccount = "12 3456 0000 0000 1234 5678 9012";

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccount.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-raisinBlack border-t border-white/10 pt-20 pb-8 relative overflow-hidden">
      {/* Dekoracyjne tło */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-arylideYellow/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* KOLUMNA 1: Brand & Socials (4 col) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="mb-6 block">
              <Logo className="h-12 w-auto" />
            </Link>
            <p className="text-philippineSilver text-sm leading-relaxed mb-8 max-w-sm">
              Fundacja Maxime to przestrzeń, gdzie pasja spotyka się z
              profesjonalizmem. Wspieramy młode talenty i promujemy kulturę
              wysoką na Śląsku i w całej Polsce.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon
                    strokeWidth={1.5}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* KOLUMNA 2: Nawigacja (2 col) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-arylideYellow pl-3">
              Menu
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-philippineSilver text-sm hover:text-arylideYellow transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-arylideYellow transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLUMNA 3: Kontakt (3 col) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-arylideYellow pl-3">
              Kontakt
            </h4>
            <ul className="space-y-4 text-sm text-philippineSilver">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-arylideYellow shrink-0 mt-0.5" />
                <span>
                  ul. Muzyczna 14/3
                  <br />
                  40-001 Katowice
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-arylideYellow shrink-0" />
                <a
                  href="mailto:kontakt@fundacjamaxime.pl"
                  className="hover:text-white transition-colors"
                >
                  kontakt@fundacjamaxime.pl
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-arylideYellow shrink-0" />
                <a
                  href="tel:+48123456789"
                  className="hover:text-white transition-colors"
                >
                  +48 123 456 789
                </a>
              </li>
            </ul>
          </div>

          {/* KOLUMNA 4: Dane Fundacji (3 col) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-arylideYellow pl-3">
              Dane Fundacji
            </h4>
            <div className="space-y-3 text-sm text-philippineSilver">
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span>KRS:</span>
                <span className="text-white font-mono">0000123456</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span>NIP:</span>
                <span className="text-white font-mono">123-456-78-90</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-2">
                <span>REGON:</span>
                <span className="text-white font-mono">123456789</span>
              </p>

              {/* Numer konta - POPRAWIONA INTERAKCJA */}
              <div className="mt-6 pt-2">
                <span className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                  Konto do darowizn:
                </span>
                <button
                  type="button"
                  className="relative group cursor-pointer w-full text-left"
                  onClick={handleCopyAccount}
                  title="Kliknij, aby skopiować numer konta"
                >
                  <div className="bg-white/5 border border-white/10 rounded px-3 py-3 font-mono text-xs sm:text-sm text-arylideYellow transition-colors group-hover:bg-white/10 group-hover:border-arylideYellow/30">
                    {bankAccount}
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-arylideYellow transition-colors">
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </div>
                  {/* Tooltip 'Skopiowano' */}
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 right-0 text-[10px] bg-arylideYellow text-raisinBlack font-bold px-2 py-1 rounded"
                    >
                      Skopiowano!
                    </motion.span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Fundacja Maxime. Wszelkie prawa
            zastrzeżone.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/polityka-prywatnosci"
              className="text-white/30 text-xs hover:text-white transition-colors"
            >
              Polityka Prywatności
            </Link>
            <Link
              href="/regulamin"
              className="text-white/30 text-xs hover:text-white transition-colors"
            >
              Regulamin
            </Link>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="group flex items-center gap-2 text-white/20 text-xs uppercase tracking-widest hover:text-arylideYellow transition-colors ml-0 md:ml-8"
          >
            W górę
            <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-arylideYellow group-hover:bg-arylideYellow group-hover:text-raisinBlack transition-all">
              <ArrowUp className="w-3 h-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
