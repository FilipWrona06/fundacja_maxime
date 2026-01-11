import type { SchemaTypeDefinition } from "sanity";
import { hero } from "./blocks/hero"; // NOWE
import { cta } from "./objects/cta"; // NOWE

// Jeśli jeszcze nie masz Page Buildera, zróbmy prosty typ "page"
import { page } from "./page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, cta],
};
