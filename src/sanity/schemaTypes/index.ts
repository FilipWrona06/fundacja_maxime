import type { SchemaTypeDefinition } from "sanity";
import { hero } from "./blocks/hero";
import { partners } from "./blocks/partners"; // <--- NOWY IMPORT
import { cta } from "./objects/cta";
import { page } from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, partners, cta], // <--- DODAJ TUTAJ
};
