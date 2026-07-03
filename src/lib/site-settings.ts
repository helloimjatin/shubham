import { cache } from "react";
import { prisma } from "./prisma";
import { isDatabaseAvailable } from "./db";
import type { SiteSettings } from "@prisma/client";

const defaultSettings: SiteSettings = {
  id: "singleton",
  studioName: "Shubham Video Graphics",
  tagline: "Modern wedding photography and filmmaking",
  heroMediaUrl:
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
  heroMediaType: "image",
  aboutContent:
    "Considered to be the epitome of modern photography and filmmaking, Shubham Video Graphics has been creating photographs and films that stand the test of time.",
  contactEmail: "hello@shubhamvideographics.com",
  contactPhone: "+91 98765 43210",
  instagramUrl: "https://instagram.com",
  logoUrl: null,
  faviconUrl: null,
  primaryColor: "#3d3d3d",
  updatedAt: new Date(),
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const hasDb = await isDatabaseAvailable(() =>
    prisma.siteSettings.findFirst({ select: { id: true } })
  );

  if (!hasDb) return defaultSettings;

  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    return settings ?? defaultSettings;
  } catch {
    return defaultSettings;
  }
});
