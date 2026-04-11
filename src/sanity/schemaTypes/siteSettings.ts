import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Ustawienia Główne",
  type: "document",
  fields: [
    defineField({
      name: "contact",
      title: "Dane kontaktowe",
      type: "object",
      fields: [
        defineField({
          name: "address",
          title: "Adres fizyczny",
          type: "text",
          rows: 3,
        }),
        defineField({ name: "email", title: "Adres e-mail", type: "string" }),
        defineField({ name: "phone", title: "Numer telefonu", type: "string" }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Media społecznościowe",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platforma",
              type: "string",
              options: {
                list: [
                  "Facebook",
                  "Instagram",
                  "YouTube",
                  "LinkedIn",
                  "Patronite",
                  "TikTok",
                  "X (Twitter)",
                  "Inne",
                ],
              },
            }),
            defineField({ name: "url", title: "Link URL", type: "url" }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    // DODANE: Pole autora
    defineField({
      name: "author",
      title: "Wykonanie strony",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Imię i nazwisko / Nazwa firmy",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "Link do portfolio / social mediów",
          type: "url",
        }),
      ],
    }),
  ],
});
