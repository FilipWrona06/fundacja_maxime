import { FileText, Globe, Layers, Search, Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Strona",
  type: "document",
  icon: FileText,
  // 1. ZAKŁADKI (Groups)
  groups: [
    { name: "content", title: "Treść", icon: Layers, default: true },
    { name: "seo", title: "SEO & Social", icon: Search },
    { name: "settings", title: "Ustawienia", icon: Settings },
  ],
  fields: [
    // --- ZAKŁADKA: TREŚĆ ---
    defineField({
      name: "title",
      title: "Tytuł strony (Wewnętrzny)",
      description: "Nazwa widoczna tylko w panelu CMS (np. Home - Wersja Zima)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "content",
      title: "Konstruktor Strony (Page Builder)",
      description: "Dodawaj, edytuj i zmieniaj kolejność sekcji na stronie.",
      type: "array",
      group: "content",
      of: [
        { type: "hero", title: "Sekcja Hero (Wideo)" },
        { type: "partners", title: "Partnerzy (Logotypy)" },
        { type: "about", title: "O nas (Zdjęcie + Slider)" },
        { type: "timeline", title: "Oś Czasu (Historia)" },
        { type: "support", title: "Wsparcie (KRS / Patronite)" },
      ],
      options: {
        insertMenu: {
          showIcons: true,
          views: [
            { name: "list" }, // ZMIANA: Usunięto 'title'
            { name: "grid" }, // ZMIANA: Usunięto 'title'
          ],
        },
      },
    }),

    // --- ZAKŁADKA: SEO ---
    defineField({
      name: "seoTitle",
      title: "Meta Title (Google)",
      description:
        "Tytuł widoczny w wynikach wyszukiwania. Jeśli pusty, użyty zostanie tytuł wewnętrzny.",
      type: "string",
      group: "seo",
      validation: (Rule) =>
        Rule.max(60).warning("Google ucina tytuły dłuższe niż 60 znaków."),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      description:
        "Krótki opis strony pod linkiem w Google. Zachęć do kliknięcia.",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) =>
        Rule.max(160).warning("Optymalna długość to 150-160 znaków."),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      description:
        "Obrazek widoczny po udostępnieniu linku na Facebooku/LinkedIn (1200x630px).",
      type: "image",
      group: "seo",
      options: { hotspot: true },
    }),

    // --- ZAKŁADKA: USTAWIENIA ---
    defineField({
      name: "slug",
      title: "Adres URL (Slug)",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  // Preview
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      media: "ogImage",
    },
    prepare({ title, slug, media }) {
      return {
        title: title || "Bez tytułu",
        subtitle: slug === "home" ? "/ (Strona Główna)" : `/${slug}`,
        media: media || Globe,
      };
    },
  },
});
