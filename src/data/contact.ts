// src/data/contact.ts
export interface ContactDetail {
  label: string;
  value: string;
  href: string;
  // ZMIANA: Dodajemy nową właściwość 'type' dla solidniejszego mapowania ikon
  type: 'address' | 'email' | 'phone';
}

export const contactDetails: readonly ContactDetail[] = [
  {
    label: 'Adres',
    value: 'ul. Przykładowa 123, 00-000 Warszawa',
    href: 'https://www.google.com/maps/search/?api=1&query=ul.+Przykładowa+123,+00-000+Warszawa',
    type: 'address', // ZMIANA: Dodano typ
  },
  {
    label: 'Email',
    value: 'kontakt@fundacjamaxime.pl',
    href: 'mailto:kontakt@fundacjamaxime.pl',
    type: 'email', // ZMIANA: Dodano typ
  },
  {
    label: 'Telefon',
    value: '+48 123 456 789',
    href: 'tel:+48123456789',
    type: 'phone', // ZMIANA: Dodano typ
  },
];