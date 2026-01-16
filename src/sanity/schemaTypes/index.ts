import type { SchemaTypeDefinition } from "sanity";
// --- BLOKI (Page Builder) ---
import { about } from "./blocks/about";
// import { eventsSection } from "./blocks/events"; // Odkomentuj, gdy stworzysz ten plik
import { hero } from "./blocks/hero";
import { partners } from "./blocks/partners";
import { support } from "./blocks/support";
import { timeline } from "./blocks/timeline";
// --- OBIEKTY (Wielokrotnego użytku) ---
import { cta } from "./objects/cta";
// --- DOKUMENTY (Strony, Kolekcje) ---
import { page } from "./page";

// Grupowanie typów dla lepszej czytelności
const documents = [page];
const objects = [cta];
const blocks = [
  about,
  // eventsSection, // Odkomentuj gdy gotowe
  hero,
  partners,
  support,
  timeline,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  // Rozbijamy tablice (Spread Operator) - to wygląda czysto i profesjonalnie
  types: [...documents, ...objects, ...blocks],
};
