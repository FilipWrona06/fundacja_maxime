import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Przy edycji na żywo zawsze false

  // Konfiguracja Visual Editing
  stega: {
    studioUrl: "/studio", // Adres Twojego studia
    // Ważne: Włączamy stegę tylko jeśli aplikacja działa w iframe (wewnątrz Studio)
    // lub jeśli wymusimy to zmienną środowiskową (opcjonalne)
  },
});
