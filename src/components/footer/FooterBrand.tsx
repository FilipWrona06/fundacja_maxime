import { Facebook, Heart, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Heart, href: "https://patronite.pl", label: "Patronite" },
];

export const FooterBrand = () => {
  return (
    <div className="flex flex-col items-start">
      <Link href="/" className="mb-6 block group" aria-label="Strona główna">
        <Logo className="h-12 w-auto" />
      </Link>

      <p className="text-philippineSilver text-sm leading-relaxed mb-8 max-w-sm">
        Fundacja Maxime to przestrzeń, gdzie pasja spotyka się z
        profesjonalizmem. Wspieramy młode talenty i promujemy kulturę wysoką na
        Śląsku.
      </p>

      <div className="flex gap-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-arylideYellow hover:text-raisinBlack hover:border-arylideYellow transition-all duration-300 group"
            aria-label={`Odwiedź nas na ${social.label}`}
          >
            <social.icon
              strokeWidth={1.5}
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        ))}
      </div>
    </div>
  );
};
