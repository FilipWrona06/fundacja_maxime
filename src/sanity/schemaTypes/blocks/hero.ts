import { Hand, Image as ImageIcon, Star, Type } from "lucide-react";
import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Sekcja Hero (Wideo)",
  type: "object",
  icon: Star,
  groups: [
    { name: "content", title: "Treść", icon: Type, default: true },
    { name: "media", title: "Media (Tło)", icon: ImageIcon },
    { name: "actions", title: "Przyciski", icon: Hand },
  ],
  fields: [
    // --- 1. TREŚĆ ---
    defineField({
      name: "badge",
      title: "Mały napis (Badge)",
      description: "Tekst w pigułce nad nagłówkiem (np. nazwa fundacji).",
      type: "string",
      group: "content",
      initialValue: "Fundacja Maxime",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "headingLine1",
      title: "Nagłówek - Linia 1",
      description: "Pierwsza linia wielkiego tytułu H1.",
      type: "string",
      group: "content",
      initialValue: "Z pasji",
      validation: (Rule) =>
        Rule.required()
          .max(20)
          .warning("Długie słowa mogą nie zmieścić się na ekranach mobilnych."),
    }),
    defineField({
      name: "headingLine2",
      title: "Nagłówek - Linia 2",
      description: "Druga linia tytułu (dopełnienie).",
      type: "string",
      group: "content",
      initialValue: "do muzyki",
      validation: (Rule) => Rule.required().max(20),
    }),

    // --- 2. MEDIA (Opcjonalny Poster z CMS) ---
    defineField({
      name: "posterImage",
      title: "Obraz zastępczy wideo (Poster)",
      description:
        "Ten obrazek ładuje się natychmiast (LCP), zanim wideo ruszy. Jeśli pusty, użyty zostanie domyślny plik z kodu.",
      type: "image",
      group: "media",
      options: { hotspot: true },
    }),

    // --- 3. AKCJE ---
    defineField({
      name: "buttons",
      title: "Przyciski (CTA)",
      description: "Główne wezwania do działania. Maksymalnie 2.",
      type: "array",
      group: "actions",
      of: [{ type: "cta" }],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "headingLine1",
      subtitle: "headingLine2",
      media: "posterImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: "Sekcja Hero",
        subtitle: `${title || ""} ${subtitle || ""}`,
        media: media || Star,
      };
    },
  },
});
