import { Calendar, CalendarRange, FileText, Home } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Panel Zarządzania")
    .items([
      // 1. Singleton Home
      S.listItem()
        .title("Strona Główna")
        .icon(Home)
        .child(
          S.document()
            .schemaType("page")
            .documentId("home")
            .title("Edycja Home"),
        ),

      S.divider(),

      // 2. WYDARZENIA (SEKCJA)
      S.listItem()
        .title("Zarządzanie Wydarzeniami")
        .icon(Calendar)
        .child(
          S.list()
            .title("Wydarzenia")
            .items([
              // A. Konfiguracja strony głównej (Singleton)
              S.listItem()
                .title("Konfiguracja Strony (SEO/Nagłówek)")
                .icon(CalendarRange)
                .child(
                  S.document()
                    .schemaType("eventsArchive")
                    .documentId("eventsArchive") // Sztywny ID
                    .title("Konfiguracja Kalendarza"),
                ),

              // B. Lista wydarzeń
              S.documentTypeListItem("event").title("Wszystkie Wydarzenia"),
            ]),
        ),

      S.divider(),

      // 3. Pozostałe strony
      S.listItem()
        .title("Podstrony")
        .icon(FileText)
        .child(
          S.documentList()
            .title("Podstrony")
            .filter('_type == "page" && slug.current != "home"'),
        ),

      // 4. Reszta (Automatyczne)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["page", "event", "eventsArchive"].includes(listItem.getId() || ""),
      ),
    ]);
