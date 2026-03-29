// src/components/providers/SettingsProvider.tsx
"use client";

import { createContext, type ReactNode, useContext } from "react";

export type SocialLink = {
  platform: string;
  url: string;
};

export type SiteSettings = {
  contact: {
    address: string;
    email: string;
    phone: string;
  };
  socials: SocialLink[];
  // DODANE:
  author: {
    name: string;
    url: string;
  };
};

const SettingsContext = createContext<SiteSettings | null>(null);

export function SettingsProvider({
  children,
  settings,
}: {
  children: ReactNode;
  settings: SiteSettings;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SettingsProvider");
  }
  return context;
}
