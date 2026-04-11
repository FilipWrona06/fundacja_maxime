import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "Aktualności",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł artykułu",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (adres URL)",
      type: "slug",
      // ZMIENIONO: Zabezpieczenie unikalności sluga i limit długości
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Czas czytania (w minutach)",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "excerpt",
      title: "Zajawka (krótki opis na liście)",
      type: "text",
      rows: 4,
      // ZMIENIONO: Dodano ostrzeżenie przed wpisaniem zbyt długiego tekstu psującego design kart
      validation: (rule) =>
        rule
          .required()
          .max(250)
          .warning("Zajawka powinna być krótka (do 250 znaków)"),
    }),
    defineField({
      name: "image",
      title: "Zdjęcie główne",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Treść artykułu",
      type: "array",
      of: [
        {
          type: "block",
          // ZMIENIONO: Dodano wsparcie dla linków w głównym tekście aktualności
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Adres URL",
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Tekst alternatywny",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "image",
    },
  },
});
