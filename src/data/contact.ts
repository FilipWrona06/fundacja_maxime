export interface ContactDetail {
  label: string;
  value: string;
  href: string;
}

export const contactDetails: ContactDetail[] = [
  {
    label: 'Adres',
    value: 'ul. Przykładowa 123, 00-000 Warszawa',
    href: 'https://www.google.com/maps/search/?api=1&query=ul.+Przykładowa+123,+00-000+Warszawa',
  },
  {
    label: 'Email',
    value: 'kontakt@fundacjamaxime.pl',
    href: 'mailto:kontakt@fundacjamaxime.pl',
  },
  {
    label: 'Telefon',
    value: '+48 123 456 789',
    href: 'tel:+48123456789',
  },
];