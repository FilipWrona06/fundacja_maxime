import { defineField, defineType } from "sanity";

export const galleryType = defineType({
  name: "gallery",
  title: "Galeria",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł albumu",
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
      name: "date",
      title: "Data wydarzenia",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Miejsce",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    // ZOSTAWIONY FOTOGRAF
    defineField({
      name: "photographer",
      title: "Fotograf / Autor zdjęć",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis albumu",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "coverImage",
      title: "Zdjęcie okładkowe",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Zdjęcia w galerii",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "coverImage",
    },
  },
});
