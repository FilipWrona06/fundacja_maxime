"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure"; // <--- 1. IMPORT STRUKTURY

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,

  plugins: [
    // --- 1. PANEL ZARZĄDZANIA (DESK) ---
    // Przekazujemy naszą strukturę (Singleton Home + Grupy)
    structureTool({ structure }),

    // --- 2. NARZĘDZIA DEWELOPERSKIE (GROQ) ---
    visionTool({ defaultApiVersion: apiVersion }),

    // --- 3. VISUAL EDITING (PRESENTATION) ---
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      // PRO TIP: Konfiguracja lokalizacji
      // Mówimy Sanity, gdzie na froncie znajdują się poszczególne dokumenty.
      resolve: {
        locations: {
          page: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Bez tytułu",
                  // Jeśli slug to 'home', kieruj na '/', w przeciwnym razie na '/slug'
                  href: doc?.slug === "home" ? "/" : `/${doc?.slug}`,
                },
              ],
            }),
          }),
        },
      },
    }),
  ],
});
