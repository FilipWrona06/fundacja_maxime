import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Przycisk (Call to Action)",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Tekst przycisku",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link wewnętrzny",
      type: "string", // Możesz tu użyć reference do innych stron, ale string jest prostszy na start
      description: "Np. /kontakt lub /wydarzenia",
    }),
    defineField({
      name: "style",
      title: "Styl przycisku",
      type: "string",
      options: {
        list: [
          { title: "Główny (Żółty)", value: "primary" },
          { title: "Drugorzędny (Przezroczysty)", value: "secondary" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
});
