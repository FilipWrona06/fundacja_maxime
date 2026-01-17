import {
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { FooterScrollTop } from "../footer/FooterScrollTop";
import { NewsletterForm } from "../footer/NewsletterForm";

// --- DANE ---
const FOOTER_LINKS = [
  { name: "Strona główna", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "O nas", href: "/o-nas" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Wsparcie", href: "/wsparcie" },
  { name: "Kontakt", href: "/kontakt" },
];

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: "https://facebook.com",
    label: "Odwiedź nas na Facebooku",
  },
  {
    icon: Instagram,
    href: "https://instagram.com",
    label: "Odwiedź nas na Instagramie",
  },
  {
    icon: Youtube,
    href: "https://youtube.com",
    label: "Subskrybuj nasz kanał YouTube",
  },
  {
    icon: Heart,
    href: "https://patronite.pl",
    label: "Wspieraj nas na Patronite",
  },
];

const CONTACT_INFO = {
  address: {
    text: "ul. Muzyczna 14/3, 40-001 Katowice",
    href: "https://maps.google.com/?q=ul.Muzyczna+14/3+Katowice",
  },
  email: {
    text: "kontakt@fundacjamaxime.pl",
    href: "mailto:kontakt@fundacjamaxime.pl",
  },
  phone: { text: "+48 123 456 789", href: "tel:+48123456789" },
};

const COMPANY_DATA = [
  { label: "KRS", value: "0000123456" },
  { label: "NIP", value: "123-456-78-90" },
  { label: "REGON", value: "123456789" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-raisinBlack border-t border-white/10 pt-20 pb-8 relative overflow-hidden">
      {/* Dekoracyjne tło */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-arylideYellow/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* KOLUMNA 1: Brand & Socials (4 col) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="mb-6 block"
              aria-label="Strona główna Fundacji Maxime"
            >
              <Logo className="h-12 w-auto" />
            </Link>
            <p className="text-philippineSilver text-sm leading-relaxed mb-8 max-w-sm">
              Fundacja Maxime to przestrzeń, gdzie pasja spotyka się z
              profesjonalizmem. Wspieramy młode talenty i promujemy kulturę
              wysoką na Śląsku i w całej Polsce.
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all duration-300 group"
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon
                    strokeWidth={1.5}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                    aria-hidden="true"
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
              {FOOTER_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-philippineSilver text-sm hover:text-arylideYellow transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-arylideYellow transition-colors"
                      aria-hidden="true"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLUMNA 3: Kontakt + Dane (3 col) */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            {/* Sekcja: Kontakt */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-arylideYellow pl-3">
                Kontakt
              </h4>
              <ul className="space-y-4 text-sm text-philippineSilver">
                <li className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-arylideYellow shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <a
                    href={CONTACT_INFO.address.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    ul. Muzyczna 14/3
                    <br />
                    40-001 Katowice
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    className="w-5 h-5 text-arylideYellow shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={CONTACT_INFO.email.href}
                    className="hover:text-white transition-colors"
                  >
                    {CONTACT_INFO.email.text}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    className="w-5 h-5 text-arylideYellow shrink-0"
                    aria-hidden="true"
                  />
                  <a
                    href={CONTACT_INFO.phone.href}
                    className="hover:text-white transition-colors"
                  >
                    {CONTACT_INFO.phone.text}
                  </a>
                </li>
              </ul>
            </div>

            {/* Sekcja: Dane Fundacji */}
            <div>
              <h4 className="text-white/60 font-bold uppercase tracking-widest text-xs mb-4 border-l-2 border-white/20 pl-3">
                Dane rejestrowe
              </h4>
              <dl className="space-y-2 text-sm text-philippineSilver">
                {COMPANY_DATA.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between border-b border-white/5 pb-2"
                  >
                    <dt>{item.label}:</dt>
                    <dd className="text-white font-mono select-all">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* KOLUMNA 4: Newsletter (3 col) */}
          <div className="lg:col-span-3">
            <NewsletterForm />
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs text-center md:text-left">
            &copy; {currentYear} Fundacja Maxime. Wszelkie prawa zastrzeżone.
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

          {/* Back to top button - Wyspa Kliencka */}
          <FooterScrollTop />
        </div>
      </div>
    </footer>
  );
};
