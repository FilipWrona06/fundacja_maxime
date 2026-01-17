import {
  Image as ImageIcon,
  Info,
  Layers,
  LayoutList,
  MousePointerClick,
} from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "Sekcja O Nas (Rotator)",
  type: "object",
  icon: Info,
  // 1. ORGANIZACJA W ZAKŁADKI
  groups: [
    { name: "content", title: "Treść", icon: Layers, default: true },
    { name: "media", title: "Zdjęcie", icon: ImageIcon },
    { name: "slider", title: "Wartości (Slider)", icon: LayoutList },
    { name: "cta", title: "Przycisk", icon: MousePointerClick },
  ],
  fields: [
    // --- GRUPA: MEDIA ---
    defineField({
      name: "image",
      title: "Zdjęcie główne",
      description:
        "Pionowe zdjęcie (portret) najlepiej prezentuje się w tym układzie.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      // DODANO: Pole ALT dla dostępności (WCAG)
      fields: [
        defineField({
          name: "alt",
          title: "Tekst alternatywny (Alt Text)",
          description: "Opisz zdjęcie dla osób niewidomych i dla Google (SEO).",
          type: "string",
          validation: (Rule) =>
            Rule.required().warning(
              "Brak tekstu alternatywnego negatywnie wpływa na SEO.",
            ),
        }),
      ],
    }),

    // --- GRUPA: TREŚĆ ---
    defineField({
      name: "eyebrow",
      title: "Mały napis (Eyebrow)",
      type: "string",
      initialValue: "O fundacji",
      group: "content",
    }),
    defineField({
      name: "headingLine1",
      title: "Nagłówek - Linia 1 (Biała)",
      description: "Główna część hasła.",
      type: "string",
      initialValue: "Tworzymy przestrzeń",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingLine2",
      title: "Nagłówek - Linia 2 (Szara)",
      description:
        "Dopełnienie hasła, wyświetlane w kolorze szarym/transparentnym.",
      type: "string",
      initialValue: "dla dźwięków i ludzi",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Główny opis",
      type: "text",
      rows: 4,
      initialValue:
        "Stowarzyszenie Maxime to więcej niż muzyka. To społeczność, która wierzy, że talent wymaga pielęgnacji, a pasja – sceny.",
      group: "content",
    }),

    // --- GRUPA: SLIDER (WARTOŚCI) ---
    defineField({
      name: "values",
      title: "Kafelki wartości",
      description:
        "Elementy, które będą się automatycznie zmieniać co 5 sekund.",
      type: "array",
      group: "slider",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueItem",
          title: "Wartość",
          fields: [
            defineField({
              name: "title",
              title: "Tytuł wartości",
              type: "string",
              validation: (Rule) => Rule.required().max(20),
            }),
            defineField({
              name: "description",
              title: "Opis wartości",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(120),
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
                // ZMIANA: 'grid' nie istnieje dla stringów w Sanity. Używamy 'radio'.
                layout: "radio",
              },
              initialValue: "music",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              iconName: "icon",
            },
            prepare({ title, subtitle, iconName }) {
              return {
                title: title || "Bez tytułu",
                subtitle: `[${iconName}] ${subtitle || ""}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.min(1)
          .max(5)
          .warning(
            "Zalecane 3-4 wartości dla optymalnego czasu uwagi użytkownika.",
          ),
    }),

    // --- GRUPA: CTA ---
    defineField({
      name: "ctaText",
      title: "Tekst przycisku",
      type: "string",
      initialValue: "POZNAJ NAS BLIŻEJ",
      group: "cta",
    }),
    defineField({
      name: "ctaLink",
      title: "Link przycisku",
      description: "Względny (np. /o-nas) lub absolutny (https://...).",
      type: "string",
      initialValue: "/o-nas",
      group: "cta",
      validation: (Rule) =>
        Rule.custom((link) => {
          if (typeof link === "undefined") return true;
          const pattern = /^(\/|https?:\/\/)/;
          return pattern.test(link)
            ? true
            : "Link musi zaczynać się od '/' (wewnętrzny) lub 'http' (zewnętrzny).";
        }),
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
        subtitle: `${title || ""} ${subtitle || ""}`,
        media,
      };
    },
  },
});
