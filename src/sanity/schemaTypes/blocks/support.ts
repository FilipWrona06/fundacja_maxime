import { Heart, Image as ImageIcon, Link, Star, Type } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

// --- TYPY POMOCNICZE (Dla walidacji i preview) ---

// Typ rodzica w walidacji (do odczytu actionType)
interface SupportParent {
  actionType?: string;
}

// Typ bloku tekstu dla funkcji preview
interface PortableTextItem {
  children: { text: string }[];
}

export const support = defineType({
  name: "support",
  title: "Sekcja Wsparcie (Split Sticky)",
  type: "object",
  icon: Heart,
  groups: [
    { name: "content", title: "Treść Lewa", icon: Type },
    { name: "visuals", title: "Zdjęcia Lewa", icon: ImageIcon },
    { name: "list", title: "Lista Opcji (Prawa)", icon: Link },
  ],
  fields: [
    // --- GRUPA: TREŚĆ ---
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
        "Główne hasło sekcji. Zaznacz wybrane słowo i użyj 'Highlight' (gwiazdka), aby nadać mu złoty styl.",
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
      validation: (Rule) =>
        Rule.required()
          .max(1)
          .error("Nagłówek powinien być jedną linią tekstu."),
    }),
    defineField({
      name: "description",
      title: "Opis pod nagłówkiem",
      type: "text",
      rows: 3,
      group: "content",
    }),

    // --- GRUPA: WIZUALIA (Z ALT TEXT) ---
    defineField({
      name: "mainImage",
      title: "Zdjęcie Główne (Duże)",
      description: "Dominujące zdjęcie w lewej kolumnie.",
      type: "image",
      options: { hotspot: true },
      group: "visuals",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Tekst alternatywny (Alt)",
          description: "Opis zdjęcia dla osób niewidomych i SEO. Wymagane.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "accentImage",
      title: "Zdjęcie Akcentowe (Małe)",
      description: "Mniejsze zdjęcie nakładające się na główne.",
      type: "image",
      options: { hotspot: true },
      group: "visuals",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Tekst alternatywny (Alt)",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // --- GRUPA: LISTA OPCJI ---
    defineField({
      name: "options",
      title: "Opcje Wsparcia",
      description: "Lista kafelków/wierszy po prawej stronie.",
      type: "array",
      group: "list",
      of: [
        defineArrayMember({
          type: "object",
          name: "supportOption",
          title: "Opcja",
          icon: Link,
          fields: [
            defineField({
              name: "number",
              title: "Numer",
              description: "Np. '01', '02'.",
              type: "string",
              initialValue: "01",
              validation: (Rule) => Rule.required().max(3),
            }),
            defineField({
              name: "title",
              title: "Nagłówek Opcji",
              type: "array",
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
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Opis",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            // LOGIKA AKCJI
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
            // POLA WARUNKOWE
            defineField({
              name: "copyValue",
              title: "Wartość do skopiowania",
              description: "Np. numer konta lub KRS.",
              type: "string",
              hidden: ({ parent }) => parent?.actionType !== "copy",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  // POPRAWKA: Rzutowanie typu zamiast @ts-expect-error
                  const parent = context.parent as SupportParent;
                  if (parent?.actionType === "copy" && !value) {
                    return "Wartość do skopiowania jest wymagana.";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "copyLabel",
              title: "Etykieta (Label)",
              description: "Np. 'Numer KRS'",
              type: "string",
              hidden: ({ parent }) => parent?.actionType !== "copy",
            }),
            defineField({
              name: "linkUrl",
              title: "Adres URL",
              type: "string",
              hidden: ({ parent }) => parent?.actionType === "copy",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  // POPRAWKA: Rzutowanie typu zamiast @ts-expect-error
                  const parent = context.parent as SupportParent;
                  const type = parent?.actionType;

                  if ((type === "external" || type === "internal") && !value) {
                    return "Link jest wymagany.";
                  }
                  if (
                    type === "external" &&
                    value &&
                    !value.startsWith("http")
                  ) {
                    return "Linki zewnętrzne muszą zaczynać się od http:// lub https://";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "linkLabel",
              title: "Tekst linku",
              description: "Np. 'Zobacz progi' lub 'Napisz do nas'",
              type: "string",
              hidden: ({ parent }) => parent?.actionType === "copy",
            }),
          ],
          preview: {
            select: {
              num: "number",
              title: "title",
              subtitle: "actionType",
            },
            prepare({ num, title, subtitle }) {
              // POPRAWKA: Typowanie dla Portable Text
              const titleText = Array.isArray(title)
                ? title
                    .map((block: PortableTextItem) =>
                      block.children.map((child) => child.text).join(""),
                    )
                    .join(" ")
                : "Bez tytułu";

              return {
                title: `${num}. ${titleText}`,
                subtitle: `Typ: ${subtitle}`,
                media: Link,
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.min(1).warning("Sekcja powinna mieć przynajmniej jedną opcję."),
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      media: "mainImage",
    },
    prepare({ heading, media }) {
      // POPRAWKA: Typowanie dla Portable Text
      const titleText = Array.isArray(heading)
        ? heading
            .map((block: PortableTextItem) =>
              block.children.map((child) => child.text).join(""),
            )
            .join(" ")
        : "Sekcja Wsparcie";

      return {
        title: titleText,
        subtitle: "Sticky Split Layout",
        media: media,
      };
    },
  },
});
