//src/data/navbar.ts

// Opcjonalny interfejs dla linków nawigacyjnych
export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'O nas' },
  { href: '/gallery', label: 'Galeria' },
  { href: '/news', label: 'Aktualności' },
  { href: '/events', label: 'Wydarzenia' },
  { href: '/contact', label: 'Kontakt' },
];