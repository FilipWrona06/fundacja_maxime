import { Cog, Handshake, Type, Users } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const partners = defineType({
  name: "partners",
  title: "Sekcja Partnerzy (Marquee)",
  type: "object",
  icon: Handshake,
  // 1. ZAKŁADKI (Porządek w panelu)
  groups: [
    { name: "content", title: "Treść", icon: Type, default: true },
    { name: "list", title: "Partnerzy", icon: Users },
    { name: "config", title: "Ustawienia", icon: Cog },
  ],
  fields: [
    // --- GRUPA: TREŚĆ ---
    defineField({
      name: "eyebrow",
      title: "Mały napis (Eyebrow)",
      description: "Tekst pomocniczy nad nagłówkiem (np. ZAUFANIE).",
      type: "string",
      initialValue: "Zaufanie",
      group: "content",
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      initialValue: "Współpracowaliśmy z:",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    // --- GRUPA: PARTNERZY ---
    defineField({
      name: "items",
      title: "Lista Partnerów",
      description:
        "Dodaj logotypy lub nazwy firm. Elementy będą przewijane w pętli.",
      type: "array",
      group: "list",
      of: [
        defineArrayMember({
          name: "item",
          type: "object",
          title: "Partner",
          fields: [
            defineField({
              name: "name",
              title: "Nazwa instytucji",
              description:
                "Używana jako tekst (jeśli brak logo) oraz jako ALT tekst dla obrazka (SEO/Dostępność).",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              description:
                "Zalecany format: SVG lub PNG z przezroczystością. Jeśli dodasz logo, tekst zostanie ukryty.",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
            prepare({ title, media }) {
              return {
                title: title || "Bez nazwy",
                subtitle: media ? "Typ: Logo" : "Typ: Tekst",
                media,
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.min(3).warning(
          "Dla płynnego efektu 'nieskończoności' zalecane jest dodanie minimum 3-4 partnerów.",
        ),
    }),

    // --- GRUPA: KONFIGURACJA ---
    // Zostawiamy to jako obiekt 'settings', żeby nie psuć struktury danych na froncie
    defineField({
      name: "settings",
      title: "Konfiguracja Animacji",
      type: "object",
      group: "config",
      fields: [
        defineField({
          name: "speed",
          title: "Czas trwania pętli (s)",
          description:
            "Określa, ile sekund zajmuje pełne przewinięcie listy. Wyższa liczba = wolniejsza animacja.",
          type: "number",
          initialValue: 60,
          validation: (Rule) => Rule.min(10).max(300),
        }),
        defineField({
          name: "direction",
          title: "Kierunek przewijania",
          type: "string",
          options: {
            list: [
              { title: "W lewo (Standard)", value: "left" },
              { title: "W prawo", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "left",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      const count = items ? items.length : 0;
      return {
        title: title || "Sekcja Partnerzy",
        subtitle: `${count} partnerów (Marquee)`,
        media: Handshake,
      };
    },
  },
});
