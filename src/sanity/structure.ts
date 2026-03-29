// src/sanity/structure.ts
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // 1. Singleton: Ustawienia Główne
      S.listItem()
        .title("Ustawienia Główne")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings"), // Wymusza zawsze ten sam ID
        ),

      // Kreska oddzielająca
      S.divider(),

      // 2. Reszta dokumentów (odfiltrowujemy siteSettings żeby nie dublować na liście)
      ...S.documentTypeListItems().filter(
        (listItem) => !["siteSettings"].includes(listItem.getId() as string),
      ),
    ]);
