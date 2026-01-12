import { Info } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "Sekcja O Nas (Rotator)",
  type: "object",
  icon: Info,
  fields: [
    // --- LEWA STRONA (ZDJĘCIE) ---
    defineField({
      name: "image",
      title: "Zdjęcie główne",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    // --- PRAWA STRONA (TREŚĆ) ---
    defineField({
      name: "eyebrow",
      title: "Mały napis (Eyebrow)",
      type: "string",
      initialValue: "O fundacji",
    }),
    defineField({
      name: "headingLine1",
      title: "Nagłówek - Linia 1 (Biała)",
      type: "string",
      initialValue: "Tworzymy przestrzeń",
    }),
    defineField({
      name: "headingLine2",
      title: "Nagłówek - Linia 2 (Szara)",
      type: "string",
      initialValue: "dla dźwięków i ludzi",
    }),
    defineField({
      name: "description",
      title: "Główny opis",
      type: "text",
      rows: 3,
      initialValue:
        "Stowarzyszenie Maxime to więcej niż muzyka. To społeczność, która wierzy, że talent wymaga pielęgnacji, a pasja – sceny.",
    }),

    // --- WARTOŚCI (SLIDER) ---
    defineField({
      name: "values",
      title: "Wartości (Rotator)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueItem",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł wartości",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Opis wartości",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Ikona",
              type: "string",
              options: {
                list: [
                  { title: "Nuta (Music)", value: "music" },
                  { title: "Wzrost (Trending)", value: "trending" },
                  { title: "Ludzie (Users)", value: "users" },
                  { title: "Serce (Heart)", value: "heart" },
                  { title: "Gwiazda (Star)", value: "star" },
                  { title: "Światło (Lightbulb)", value: "lightbulb" },
                ],
              },
              initialValue: "music",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Bez tytułu",
                subtitle: subtitle,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // --- CTA ---
    defineField({
      name: "ctaLink",
      title: "Link przycisku 'Poznaj nas'",
      type: "string",
      initialValue: "/o-nas",
    }),
    defineField({
      name: "ctaText",
      title: "Tekst przycisku",
      type: "string",
      initialValue: "POZNAJ NAS BLIŻEJ",
    }),
  ],
  preview: {
    select: {
      title: "headingLine1",
      subtitle: "headingLine2",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: "Sekcja O Nas",
        subtitle: `${title} ${subtitle}`,
        media,
      };
    },
  },
});
