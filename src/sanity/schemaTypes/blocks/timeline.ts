import { CalendarDays, History, Image as ImageIcon, Type } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const timeline = defineType({
  name: "timeline",
  title: "Oś Czasu (Historia)",
  type: "object",
  icon: History,
  // 1. ZAKŁADKI (Porządek)
  groups: [
    { name: "header", title: "Nagłówek", icon: Type, default: true },
    { name: "items", title: "Wydarzenia", icon: CalendarDays },
  ],
  fields: [
    // --- GRUPA: NAGŁÓWEK SEKCJI (Nowość!) ---
    defineField({
      name: "eyebrow",
      title: "Mały napis (Eyebrow)",
      description: "Np. 'EWOLUCJA' lub 'DZIEDZICTWO'.",
      type: "string",
      initialValue: "Ewolucja",
      group: "header",
    }),
    defineField({
      name: "heading",
      title: "Główny tytuł",
      description: "Np. 'Nasza historia' lub 'Droga do sukcesu'.",
      type: "string",
      initialValue: "Nasza historia",
      group: "header",
      validation: (Rule) => Rule.required(),
    }),

    // --- GRUPA: WYDARZENIA ---
    defineField({
      name: "items",
      title: "Wydarzenia na osi czasu",
      type: "array",
      group: "items",
      of: [
        defineArrayMember({
          type: "object",
          name: "timelineItem",
          title: "Wydarzenie",
          fields: [
            defineField({
              name: "year",
              title: "Rok",
              type: "string",
              validation: (Rule) =>
                Rule.required()
                  .regex(/^\d{4}$/, { name: "year" }) // Walidacja: musi być 4 cyfry
                  .error("Rok musi składać się z 4 cyfr (np. 2023)."),
            }),
            defineField({
              name: "title",
              title: "Tytuł wydarzenia",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Opis",
              type: "text",
              rows: 3,
              validation: (Rule) =>
                Rule.required()
                  .max(200)
                  .warning("Zbyt długi opis może zaburzyć układ graficzny."),
            }),
            defineField({
              name: "image",
              title: "Zdjęcie",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
              // 2. DOSTĘPNOŚĆ (ALT TEXT)
              fields: [
                defineField({
                  name: "alt",
                  title: "Tekst alternatywny (Alt)",
                  description:
                    "Opis zdjęcia dla osób niewidomych. Kluczowe dla SEO.",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          // Lepszy podgląd na liście
          preview: {
            select: {
              title: "title",
              subtitle: "year",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Bez tytułu",
                subtitle: subtitle || "Brak roku",
                media: media || ImageIcon,
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.min(2).warning(
          "Oś czasu wygląda najlepiej z minimum 2 wydarzeniami.",
        ),
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      items: "items",
    },
    prepare({ heading, items }) {
      return {
        title: heading || "Sekcja Oś Czasu",
        subtitle: `${items ? items.length : 0} wydarzeń`,
        media: History,
      };
    },
  },
});
