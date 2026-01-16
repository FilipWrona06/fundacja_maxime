import { MousePointerClick } from "lucide-react";
import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Przycisk (Smart CTA)",
  type: "object",
  icon: MousePointerClick,
  validation: (Rule) =>
    Rule.custom((fields) => {
      // Walidacja krzyżowa: Przycisk musi mieć link (wewnętrzny LUB zewnętrzny)
      const internal = fields?.internalLink;
      const external = fields?.externalLink;
      if (!internal && !external) {
        return "Przycisk musi prowadzić do strony wewnętrznej lub adresu URL.";
      }
      return true;
    }),
  fieldsets: [
    {
      name: "linkConfig",
      title: "Konfiguracja Linku",
      options: { collapsible: false },
    },
  ],
  fields: [
    // 1. TEKST
    defineField({
      name: "title",
      title: "Tekst przycisku",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    // 2. WYBÓR TYPU LINKU
    defineField({
      name: "linkType",
      title: "Rodzaj linku",
      type: "string",
      options: {
        list: [
          { title: "Wewnętrzny (Strona w serwisie)", value: "internal" },
          {
            title: "Zewnętrzny (Inna strona, np. Patronite)",
            value: "external",
          },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "internal",
      fieldset: "linkConfig",
    }),

    // 3. LINK WEWNĘTRZNY (Reference - Super ważne dla SEO!)
    defineField({
      name: "internalLink",
      title: "Wybierz stronę",
      type: "reference",
      to: [{ type: "page" }], // Tu możesz dodać inne typy, np. { type: 'event' }
      hidden: ({ parent }) => parent?.linkType !== "internal",
      fieldset: "linkConfig",
    }),

    // 4. LINK ZEWNĘTRZNY (URL Validation)
    defineField({
      name: "externalLink",
      title: "Adres URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
      hidden: ({ parent }) => parent?.linkType !== "external",
      fieldset: "linkConfig",
    }),

    // 5. OPCJE DODATKOWE
    defineField({
      name: "openInNewTab",
      title: "Otwórz w nowym oknie?",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.linkType === "internal", // Linki wewnętrzne rzadko otwiera się w nowym oknie
    }),

    // 6. STYL
    defineField({
      name: "style",
      title: "Styl wizualny",
      type: "string",
      options: {
        list: [
          { title: "Primary (Żółty - Główne akcje)", value: "primary" },
          {
            title: "Secondary (Przezroczysty - Informacyjne)",
            value: "secondary",
          },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),

    // 7. DOSTĘPNOŚĆ (WCAG Level AAA)
    defineField({
      name: "ariaLabel",
      title: "Opis dla czytników ekranu (Aria Label)",
      description:
        "Wypełnij tylko, jeśli tekst przycisku jest niejasny (np. 'Kliknij tutaj'). W przeciwnym razie zostaw puste.",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      linkType: "linkType",
      internalSlug: "internalLink.slug.current",
      externalUrl: "externalLink",
      style: "style",
    },
    prepare({ title, linkType, internalSlug, externalUrl, style }) {
      const target =
        linkType === "internal"
          ? internalSlug
            ? `/${internalSlug}`
            : "(Brak linku)"
          : externalUrl || "(Brak linku)";

      return {
        title: title || "Bez tytułu",
        subtitle: `${target} [${style}]`,
        media: MousePointerClick,
      };
    },
  },
});
