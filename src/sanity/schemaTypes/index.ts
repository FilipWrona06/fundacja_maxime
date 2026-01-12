import type { SchemaTypeDefinition } from "sanity";
import { about } from "./blocks/about";
import { hero } from "./blocks/hero";
import { partners } from "./blocks/partners";
import { timeline } from "./blocks/timeline"; // <--- NOWY IMPORT
import { cta } from "./objects/cta";
import { page } from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, partners, about, timeline, cta], // <--- DODAJ timeline
};
