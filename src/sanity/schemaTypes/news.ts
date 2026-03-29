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
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł",
      type: "string",
    }),
    // USUNIĘTO: category
    defineField({
      name: "publishedAt",
      title: "Data publikacji",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    // USUNIĘTO: author
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
      validation: (rule) => rule.required(),
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
        { type: "block" },
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
