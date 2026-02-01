import { Calendar, Music, Search, Settings, Ticket, User } from "lucide-react";
import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Wydarzenie",
  type: "document",
  icon: Calendar,
  groups: [
    { name: "details", title: "Szczegóły", icon: Calendar, default: true },
    { name: "content", title: "Treść", icon: Music },
    { name: "tickets", title: "Bilety & Miejsce", icon: Ticket },
    { name: "artist", title: "Wykonawca", icon: User },
    { name: "seo", title: "SEO & Social", icon: Search },
    { name: "settings", title: "Ustawienia", icon: Settings },
  ],
  fields: [
    // --- GRUPA: SZCZEGÓŁY ---
    defineField({
      name: "title",
      title: "Tytuł wydarzenia",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytuł / Krótki opis",
      description: "Widoczny na liście i pod nagłówkiem.",
      type: "string",
      group: "details",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "eventType",
      title: "Typ wydarzenia",
      type: "string",
      options: {
        list: [
          { title: "Koncert", value: "Koncert" },
          { title: "Recital", value: "Recital" },
          { title: "Gala", value: "Gala" },
          { title: "Edukacja / Warsztaty", value: "Edukacja" },
          { title: "Spotkanie", value: "Spotkanie" },
          { title: "Inne", value: "Inne" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "Koncert",
      group: "details",
    }),
    defineField({
      name: "date",
      title: "Data wydarzenia",
      type: "date", // YYYY-MM-DD
      options: { dateFormat: "YYYY-MM-DD" },
      group: "details",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Godzina rozpoczęcia",
      description: "Format 24h, np. 19:00",
      type: "string",
      group: "details",
      validation: (Rule) =>
        Rule.required().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
          name: "time",
          invert: false,
        }),
    }),
    defineField({
      name: "doorsOpen",
      title: "Otwarcie drzwi",
      description: "O której wpuszczamy publiczność? np. 18:30",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "mainImage",
      title: "Plakat / Zdjęcie główne",
      type: "image",
      options: { hotspot: true },
      group: "details",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Tekst alternatywny (SEO)",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // --- GRUPA: BILETY & MIEJSCE ---
    defineField({
      name: "locationName",
      title: "Nazwa Miejsca",
      description: "Np. Filharmonia Śląska",
      type: "string",
      group: "tickets",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationAddress",
      title: "Adres",
      description: "Np. ul. Sokolska 2, Katowice",
      type: "string",
      group: "tickets",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Cena biletu (Tekst)",
      description: "Np. '30 PLN', 'Wstęp wolny', 'od 80 PLN'",
      type: "string",
      group: "tickets",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ticketUrl",
      title: "Link do biletów",
      type: "url",
      group: "tickets",
    }),
    defineField({
      name: "isSoldOut",
      title: "Wyprzedane?",
      type: "boolean",
      initialValue: false,
      group: "tickets",
    }),

    // --- GRUPA: TREŚĆ ---
    defineField({
      name: "description",
      title: "Opis szczegółowy",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        },
      ],
    }),
    defineField({
      name: "program",
      title: "Repertuar / Program",
      type: "array",
      group: "content",
      of: [{ type: "programItem" }],
    }),

    // --- GRUPA: WYKONAWCA (Uproszczona, bez osobnego typu Artist na razie) ---
    defineField({
      name: "artistName",
      title: "Nazwa Wykonawcy",
      type: "string",
      initialValue: "Orkiestra Maxime",
      group: "artist",
    }),
    defineField({
      name: "artistDescription",
      title: "Krótki opis wykonawcy",
      type: "text",
      rows: 3,
      group: "artist",
    }),
    defineField({
      name: "artistImage",
      title: "Zdjęcie Wykonawcy",
      type: "image",
      options: { hotspot: true },
      group: "artist",
    }),

    // --- GRUPA: SEO ---
    defineField({
      name: "seoTitle",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),

    // --- GRUPA: USTAWIENIA ---
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "mainImage",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
});
