import type { SchemaTypeDefinition } from "sanity";
import { eventType } from "./event";
import { galleryType } from "./gallery";
import { newsType } from "./news";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, newsType, galleryType],
};
