"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const settingsSchema = z.object({
  studioName: z.string().min(1),
  tagline: z.string().optional(),
  heroMediaUrl: z.string().optional(),
  heroMediaType: z.string().optional(),
  aboutContent: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  instagramUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  primaryColor: z.string().optional(),
});

export async function updateSiteSettings(data: z.infer<typeof settingsSchema>) {
  await requireAdmin();
  const parsed = settingsSchema.parse(data);

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      ...parsed,
      contactEmail: parsed.contactEmail || null,
    },
    create: {
      id: "singleton",
      ...parsed,
      contactEmail: parsed.contactEmail || null,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/contact");
  return { success: true };
}
