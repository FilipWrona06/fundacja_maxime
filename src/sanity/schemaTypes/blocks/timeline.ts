import { History } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const timeline = defineType({
  name: "timeline",
  title: "Oś Czasu (Timeline)",
  type: "object",
  icon: History,
  fields: [
    defineField({
      name: "items",
      title: "Wydarzenia na osi czasu",
      type: "array",
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
              validation: (Rule) => Rule.required(),
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Zdjęcie",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "year",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Bez tytułu",
                subtitle: subtitle || "????",
                media,
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.min(2).warning("Oś czasu powinna mieć minimum 2 punkty."),
    }),

    // Opcje zaawansowane dla "Mega Personalizacji"
    defineField({
      name: "settings",
      title: "Ustawienia sekcji",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "height",
          title: "Wysokość scrolla (np. 300vh)",
          description:
            "Im wyższa wartość, tym dłużej trwa przewijanie sekcji. Domyślnie 300vh.",
          type: "string",
          initialValue: "300vh",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      return {
        title: "Sekcja Oś Czasu",
        subtitle: `${items ? items.length : 0} wydarzeń`,
      };
    },
  },
});
