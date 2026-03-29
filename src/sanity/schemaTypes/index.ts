import type { SchemaTypeDefinition } from "sanity";
import { eventType } from "./event";
import { galleryType } from "./gallery";
import { newsType } from "./news";
import { reviewType } from "./review";
import { siteSettingsType } from "./siteSettings";
import { milestoneType } from "./milestone";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, newsType, galleryType, reviewType, siteSettingsType, milestoneType],
};
