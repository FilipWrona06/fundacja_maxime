import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Sekcja Hero (Główna)",
  type: "object",
  icon: Star,
  fields: [
    defineField({
      name: "badge",
      title: "Mały napis (Badge)",
      type: "string",
      initialValue: "Fundacja Maxime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingLine1",
      title: "Nagłówek - Linia 1",
      type: "string",
      initialValue: "Z pasji",
    }),
    defineField({
      name: "headingLine2",
      title: "Nagłówek - Linia 2",
      type: "string",
      initialValue: "do muzyki",
    }),
    defineField({
      name: "description",
      title: "Opis pod nagłówkiem",
      type: "text",
      rows: 3,
      initialValue:
        "Wspieramy młode talenty, organizujemy koncerty i łączymy pokolenia poprzez piękno dźwięku.",
    }),
    defineField({
      name: "buttons",
      title: "Przyciski",
      type: "array",
      of: [{ type: "cta" }], // Zakładam, że stworzyłeś obiekt cta z poprzedniego kroku
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "headingLine1",
      subtitle: "headingLine2",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Hero: ${title || ""} ${subtitle || ""}`,
      };
    },
  },
});
