// src/app/api/draft-mode/enable/route.ts
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

// Pobieramy token, aby móc zweryfikować uprawnienia
const token = process.env.SANITY_API_READ_TOKEN;

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
});
