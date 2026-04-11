import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Opinie",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Imię i nazwisko / Inicjały",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rola (np. Widz, Uczestnik koncertu, Krytyk)",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Ocena (1-5)",
      type: "number",
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "text",
      title: "Treść opinii",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "approved",
      title: "Zatwierdzona (Widoczna na podstronie Opinie)",
      description: "Tylko zatwierdzone opinie są publiczne.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featured",
      title: "Wyróżniona na stronie głównej",
      description:
        "Zaznacz aby opinia pokazała się w głównej sekcji (system pobierze 3 najnowsze wyróżnione).",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      rating: "rating",
      approved: "approved",
      featured: "featured",
    },
    prepare({ title, subtitle, rating, approved, featured }) {
      const status = approved ? "✅ Zatwierdzona" : "⏳ Oczekująca";
      const feat = featured ? " | 🌟 Wyróżniona" : "";
      return {
        title: `${title} (${rating}/5)`,
        subtitle: `${subtitle || "Brak roli"} | ${status}${feat}`,
      };
    },
  },
});
