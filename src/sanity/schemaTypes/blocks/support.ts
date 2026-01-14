import { Heart, Star } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const support = defineType({
  name: "support",
  title: "Sekcja Wsparcie (Split Sticky)",
  type: "object",
  icon: Heart,
  groups: [
    { name: "content", title: "Treść Lewa" },
    { name: "visuals", title: "Zdjęcia Lewa" },
    { name: "list", title: "Lista Opcji (Prawa)" },
  ],
  fields: [
    // --- LEWA STRONA: TREŚĆ ---
    defineField({
      name: "eyebrow",
      title: "Mały napis (Eyebrow)",
      type: "string",
      initialValue: "Zaangażowanie",
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Główny Nagłówek (Rich Text)",
      description:
        "Zaznacz słowo i użyj ikony Gwiazdy, aby nadać mu styl (Złoty + Italic).",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              {
                title: "Highlight (Złoty)",
                value: "highlight",
                icon: Star,
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Opis pod nagłówkiem",
      type: "text",
      rows: 3,
      group: "content",
    }),

    // --- LEWA STRONA: WIZUALIA ---
    defineField({
      name: "mainImage",
      title: "Zdjęcie Główne (Duże)",
      type: "image",
      options: { hotspot: true },
      group: "visuals",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentImage",
      title: "Zdjęcie Akcentowe (Małe)",
      type: "image",
      options: { hotspot: true },
      group: "visuals",
      validation: (Rule) => Rule.required(),
    }),

    // --- PRAWA STRONA: LISTA OPCJI ---
    defineField({
      name: "options",
      title: "Opcje Wsparcia",
      type: "array",
      group: "list",
      of: [
        defineArrayMember({
          type: "object",
          name: "supportOption",
          title: "Opcja",
          fields: [
            defineField({
              name: "number",
              title: "Numer (np. 01)",
              type: "string",
              initialValue: "01",
            }),
            defineField({
              name: "title",
              title: "Nagłówek Opcji",
              description: "Zaznacz słowo i użyj 'Highlight', aby pokolorować.",
              type: "array", // Też Rich Text dla spójności
              of: [
                {
                  type: "block",
                  styles: [{ title: "Normal", value: "normal" }],
                  lists: [],
                  marks: {
                    decorators: [
                      {
                        title: "Highlight (Złoty)",
                        value: "highlight",
                        icon: Star,
                      },
                    ],
                  },
                },
              ],
            }),
            defineField({
              name: "text",
              title: "Opis",
              type: "text",
              rows: 2,
            }),
            // LOGIKA AKCJI: Co ma się stać po kliknięciu?
            defineField({
              name: "actionType",
              title: "Typ Akcji",
              type: "string",
              options: {
                list: [
                  { title: "Kopiuj do schowka (np. KRS)", value: "copy" },
                  {
                    title: "Link Zewnętrzny (np. Patronite)",
                    value: "external",
                  },
                  { title: "Link Wewnętrzny (np. Kontakt)", value: "internal" },
                ],
                layout: "radio",
              },
              initialValue: "internal",
            }),
            // Pola warunkowe (pojawiają się zależnie od actionType - logika w Studio)
            defineField({
              name: "copyValue",
              title: "Wartość do skopiowania (np. 0000123456)",
              type: "string",
              hidden: ({ parent }) => parent?.actionType !== "copy",
            }),
            defineField({
              name: "copyLabel",
              title: "Etykieta przycisku (np. Numer KRS)",
              type: "string",
              hidden: ({ parent }) => parent?.actionType !== "copy",
            }),
            defineField({
              name: "linkUrl",
              title: "Adres URL",
              type: "string",
              hidden: ({ parent }) => parent?.actionType === "copy",
            }),
            defineField({
              name: "linkLabel",
              title: "Tekst linku (np. Zobacz progi)",
              type: "string",
              hidden: ({ parent }) => parent?.actionType === "copy",
            }),
          ],
          preview: {
            select: {
              title: "number",
              subtitle: "actionType",
            },
            prepare({ title, subtitle }) {
              return {
                title: `Krok ${title}`,
                subtitle: `Typ: ${subtitle}`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare() {
      return {
        title: "Sekcja Wsparcie",
        subtitle: "Sticky Split Layout",
      };
    },
  },
});
