import { ListMusic } from "lucide-react";
import { defineField, defineType } from "sanity";

export const programItem = defineType({
  name: "programItem",
  title: "Utwór",
  type: "object",
  icon: ListMusic,
  fields: [
    defineField({
      name: "composer",
      title: "Kompozytor / Autor",
      description: "Np. Fryderyk Chopin (lub wpisz 'PRZERWA' dla przerwy)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Tytuł utworu",
      type: "string",
      hidden: ({ parent }) =>
        parent?.composer?.toLowerCase().includes("przerwa"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "composer",
    },
    prepare({ title, subtitle }) {
      const isBreak = subtitle?.toLowerCase().includes("przerwa");
      return {
        title: isBreak ? "--- PRZERWA ---" : title,
        subtitle: isBreak ? "" : subtitle,
        media: ListMusic,
      };
    },
  },
});
