// USUWAMY import Link z next/link
import { FooterLink } from "@/components/ui/FooterLink"; // <--- IMPORT

const LINKS = [
  { name: "Strona główna", href: "/" },
  { name: "Wydarzenia", href: "/wydarzenia" },
  { name: "O nas", href: "/o-nas" },
  { name: "Aktualności", href: "/aktualnosci" },
  { name: "Wsparcie", href: "/wsparcie" },
  { name: "Kontakt", href: "/kontakt" },
];

export const FooterLinks = () => {
  return (
    <div>
      <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6 border-l-2 border-arylideYellow pl-3">
        Menu
      </h4>
      <nav aria-label="Menu stopki">
        <ul className="space-y-3">
          {LINKS.map((link) => (
            <li key={link.name}>
              {/* UŻYCIE NOWEGO KOMPONENTU */}
              <FooterLink href={link.href}>{link.name}</FooterLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
