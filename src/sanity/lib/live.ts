// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
// src/sanity/lib/live.ts
import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false,
  browserToken: false,
  // KRYTYCZNA ZMIANA: Wymuszamy cache (ISR).
  // Dane z Sanity będą buforowane i odświeżane maksymalnie raz na 60 sekund.
  // To wyeliminuje 5-sekundowe oczekiwanie na API przy każdym załadowaniu strony.
  fetchOptions: {
    revalidate: 60,
  },
});
