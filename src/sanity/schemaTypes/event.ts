import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Wydarzenia",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytuł",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (adres URL)",
      type: "slug",
      // ZMIENIONO: Lepsze zabezpieczenie przed powtarzającymi się adresami URL
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subtitle", title: "Podtytuł", type: "string" }),
    defineField({
      name: "date",
      title: "Data i godzina",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Miejsce (np. Teatr Wielki, Poznań)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "address", title: "Dokładny adres", type: "string" }),

    defineField({
      name: "image",
      title: "Plakat",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hasTicketsAvailable",
      title: "Czy są dostępne miejsca?",
      type: "boolean",
      initialValue: true,
    }),

    // --- LOGIKA BILETÓW ---
    defineField({
      name: "ticketType",
      title: "Typ wejściówki",
      type: "string",
      options: {
        list: [
          { title: "Darmowe", value: "darmowe" },
          { title: "Płatne", value: "platne" },
        ],
      },
      initialValue: "platne",
    }),
    defineField({
      name: "ticketPrice",
      title: "Cena biletu (np. 'od 50 PLN', '120 PLN')",
      type: "string",
      hidden: ({ document }) => document?.ticketType !== "platne",
    }),
    defineField({
      name: "hasTicketLink",
      title: "Czy chcesz dodać link do biletów/zapisów?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ticketLink",
      title: "Link do biletów / formularza",
      type: "url",
      // ZMIENIONO: Dodano sprawdzanie poprawności linku
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
      hidden: ({ document }) => !document?.hasTicketLink,
    }),
    // -----------------------

    defineField({
      name: "description",
      title: "Opis",
      type: "array",
      of: [
        {
          type: "block",
          // ZMIENIONO: Dodano wsparcie dla linków w edytorze opisu
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link URL",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Adres URL",
                    validation: (rule) =>
                      rule
                        .required()
                        .uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "program",
      title: "Repertuar",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "guestArtists",
      title: "Gościnni Wykonawcy",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Imię i nazwisko", type: "string" },
            {
              name: "role",
              title: "Rola (np. Wokal, Fortepian)",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
