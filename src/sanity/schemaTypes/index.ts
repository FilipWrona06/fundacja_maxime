import type { SchemaTypeDefinition } from "sanity";
import { about } from "./blocks/about"; // <--- NOWY IMPORT
import { hero } from "./blocks/hero";
import { partners } from "./blocks/partners";
import { cta } from "./objects/cta";
import { page } from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, partners, about, cta], // <--- DODAJ about
};
