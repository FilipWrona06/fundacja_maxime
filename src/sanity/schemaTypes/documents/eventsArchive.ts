import { CalendarRange, Search, Type } from "lucide-react";
import { defineField, defineType } from "sanity";

export const eventsArchive = defineType({
  name: "eventsArchive",
  title: "Ustawienia Kalendarza",
  type: "document",
  icon: CalendarRange,
  groups: [
    { name: "content", title: "Treść", icon: Type, default: true },
    { name: "seo", title: "SEO", icon: Search },
  ],
  fields: [
    // --- GRUPA: TREŚĆ ---
    defineField({
      name: "title",
      title: "Główny Tytuł",
      description: "Nagłówek widoczny na stronie (np. Kalendarium).",
      type: "string",
      initialValue: "Kalendarium",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seasonLabel",
      title: "Etykieta sezonu",
      description:
        "Tekst wyświetlany obok roku (np. 'Sezon' lub 'Rok Artystyczny').",
      type: "string",
      initialValue: "Sezon",
      group: "content",
    }),

    // --- GRUPA: SEO ---
    defineField({
      name: "seoTitle",
      title: "Meta Title (Pasek przeglądarki)",
      type: "string",
      group: "seo",
      initialValue: "Kalendarium Wydarzeń | Fundacja Maxime",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
      initialValue:
        "Sprawdź nadchodzące koncerty, warsztaty i spotkania organizowane przez Fundację Maxime.",
    }),
    defineField({
      name: "seoImage",
      title: "Social Share Image",
      type: "image",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Konfiguracja strony wydarzeń",
        media: CalendarRange,
      };
    },
  },
});
