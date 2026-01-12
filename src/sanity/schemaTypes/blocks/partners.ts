import { Handshake } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const partners = defineType({
  name: "partners",
  title: "Sekcja Partnerzy (Marquee)",
  type: "object",
  icon: Handshake,
  fields: [
    // --- KONFIGURACJA NAGŁÓWKA ---
    defineField({
      name: "eyebrow",
      title: "Mały napis (Eyebrow)",
      type: "string",
      initialValue: "Zaufanie",
    }),
    defineField({
      name: "title",
      title: "Tytuł sekcji",
      type: "string",
      initialValue: "Współpracowaliśmy z:",
    }),

    // --- LISTA PARTNERÓW ---
    defineField({
      name: "items",
      title: "Lista Partnerów",
      type: "array",
      of: [
        // ZMIANA TUTAJ: Używamy defineArrayMember zamiast defineType
        defineArrayMember({
          name: "item",
          type: "object",
          title: "Partner",
          fields: [
            defineField({
              name: "name",
              title: "Nazwa instytucji",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo (Opcjonalne)",
              type: "image",
              description:
                "Jeśli dodasz logo, tekst zostanie zastąpiony obrazkiem.",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
            prepare({ title, media }) {
              return {
                title: title || "Bez nazwy",
                subtitle: "Partner",
                media,
              };
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.min(3).warning(
          "Dodaj przynajmniej 3 partnerów, aby efekt pętli wyglądał dobrze.",
        ),
    }),

    // --- KONFIGURACJA ZAAWANSOWANA ---
    defineField({
      name: "settings",
      title: "Ustawienia Animacji",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "speed",
          title: "Szybkość animacji (sekundy)",
          description:
            "Im większa liczba, tym wolniej przesuwa się pasek. Domyślnie 60.",
          type: "number",
          initialValue: 60,
          validation: (Rule) => Rule.min(10).max(200),
        }),
        defineField({
          name: "direction",
          title: "Kierunek",
          type: "string",
          options: {
            list: [
              { title: "W lewo (Standard)", value: "left" },
              { title: "W prawo", value: "right" },
            ],
            layout: "radio",
          },
          initialValue: "left",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title: title || "Sekcja Partnerzy",
        subtitle: `${items ? items.length : 0} elementów`,
      };
    },
  },
});
