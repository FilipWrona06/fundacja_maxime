// sanity/schemaTypes/homePage.ts
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Strona Główna",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nazwa w panelu (nie wyświetla się na stronie)",
      type: "string",
      initialValue: "Ustawienia Strony Głównej (Sekcja Hero)",
      readOnly: true, // Zabezpiecza przed zmianą nazwy systemowej
    }),
    defineField({
      name: "heroHeading",
      title: "Główny Nagłówek (Hero)",
      type: "string", // Zwykły tekst (jedna linijka)
      description: 'Np. "Z pasji do muzyki"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Podtytuł (Hero)",
      type: "text", // Zwykły tekst (bez pogrubień i kolorów), ale pozwala na Entyry (wiele linijek)
      rows: 3,
      description: "Tekst pojawiający się pod głównym nagłówkiem.",
      validation: (Rule) => Rule.required(),
    }),
    // -- PRZYCISKI --
    defineField({
      name: "heroButtonPrimaryText",
      title: "Tekst głównego przycisku (Żółtego)",
      type: "string",
      initialValue: "Zobacz wydarzenia",
    }),
    defineField({
      name: "heroButtonPrimaryLink",
      title: "Link głównego przycisku",
      type: "string",
      initialValue: "/wydarzenia",
      description:
        'Gdzie ma przenieść? Np. "/wydarzenia" lub "https://google.com"',
    }),
    defineField({
      name: "heroButtonSecondaryText",
      title: "Tekst drugiego przycisku (Przezroczystego)",
      type: "string",
      initialValue: "Skontaktuj się",
    }),
    defineField({
      name: "heroButtonSecondaryLink",
      title: "Link drugiego przycisku",
      type: "string",
      initialValue: "/kontakt",
    }),
  ],
});
