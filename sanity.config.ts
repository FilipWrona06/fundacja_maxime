"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation"; // <--- IMPORT
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,

  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),

    // --- KONFIGURACJA PRESENTATION TOOL ---
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable", // Ścieżka, którą stworzyliśmy w kroku 3
        },
      },
    }),
    // --------------------------------------
  ],
});
