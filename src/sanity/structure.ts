import { FileText, Home } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Panel Zarządzania") // Polski tytuł panelu
    .items([
      // --- 1. SINGLETON: STRONA GŁÓWNA ---
      // Zamiast szukać Home na liście, mamy go przypiętego na górze.
      // Kliknięcie od razu otwiera edytor, zamiast listy.
      S.listItem()
        .title("Strona Główna")
        .icon(Home)
        .child(
          S.document()
            .schemaType("page")
            .documentId("home") // Sztywny ID dla Singletona
            .title("Edycja Home"),
        ),

      // --- 2. SEPARATOR ---
      S.divider(),

      // --- 3. LISTA: POZOSTAŁE STRONY ---
      // Wyświetlamy typ 'page', ale filtrujemy, żeby UKRYĆ stronę 'home' (bo jest wyżej).
      S.listItem()
        .title("Podstrony")
        .icon(FileText)
        .child(
          S.documentList()
            .title("Podstrony")
            .filter('_type == "page" && slug.current != "home"'),
        ),

      // --- 4. PRZYSZŁOŚĆ: USTAWIENIA / MENU ---
      // Tu w przyszłości dodasz np. "Nawigacja", "Stopka", "Ustawienia SEO Globalne"
      // S.divider(),
      // S.listItem().title("Ustawienia").icon(Settings).child(...)

      // --- 5. AUTOMATYCZNA RESZTA ---
      // To "łapie" wszystkie nowe typy dokumentów, których nie zdefiniowałeś wyżej ręcznie.
      // Dzięki temu, jak dodasz np. typ "event", pojawi się on automatycznie na dole.
      ...S.documentTypeListItems().filter(
        (listItem) => !["page"].includes(listItem.getId() || ""),
      ),
    ]);