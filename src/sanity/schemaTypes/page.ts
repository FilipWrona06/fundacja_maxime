import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Strona",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł strony (np. Home)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug (adres)",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Sekcje strony",
      type: "array",
      of: [
        { type: "hero" }, // Tutaj dodajemy nasz blok Hero
        { type: "partners" },
      ],
    }),
  ],
});
