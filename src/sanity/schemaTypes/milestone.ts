import { defineField, defineType } from "sanity";

export const milestoneType = defineType({
  name: "milestone",
  title: "Kamienie Milowe",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Kolejność wyświetlania",
      description:
        "Liczba decydująca o pozycji na osi czasu (np. 1 dla najstarszego, 2 dla kolejnego itd.).",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Rok / Okres",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Zdjęcie w tle",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Od najstarszego",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "image",
    },
  },
});
