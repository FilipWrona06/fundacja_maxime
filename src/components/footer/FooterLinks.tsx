import Link from "next/link";

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
              <Link
                href={link.href}
                className="text-philippineSilver text-sm hover:text-arylideYellow transition-colors flex items-center gap-2 group w-fit"
              >
                <span
                  className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-arylideYellow transition-colors duration-300"
                  aria-hidden="true"
                />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
