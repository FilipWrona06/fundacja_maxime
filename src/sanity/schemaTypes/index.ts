import type { SchemaTypeDefinition } from "sanity";
import { eventType } from "./event";
import { newsType } from "./news";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, newsType],
};
