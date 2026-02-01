import type { SchemaTypeDefinition } from "sanity";
// --- BLOKI ---
import { about } from "./blocks/about";
import { hero } from "./blocks/hero";
import { partners } from "./blocks/partners";
import { support } from "./blocks/support";
import { timeline } from "./blocks/timeline";
// --- DOKUMENTY ---
import { event } from "./documents/event";
import { eventsArchive } from "./documents/eventsArchive"; // NOWE
// --- OBIEKTY ---
import { cta } from "./objects/cta";
import { programItem } from "./objects/programItem";
import { page } from "./page";

const documents = [page, event, eventsArchive];
const objects = [cta, programItem];
const blocks = [about, hero, partners, support, timeline];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...objects, ...blocks],
};
