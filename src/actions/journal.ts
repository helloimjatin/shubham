"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const journalSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url(),
  published: z.boolean(),
});

export async function checkJournalSlugUnique(slug: string, excludeId?: string) {
  const existing = await prisma.journalPost.findFirst({
    where: {
      slug,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
  });
  return !existing;
}

export async function createJournalPost(data: z.infer<typeof journalSchema>) {
  await requireAdmin();
  const parsed = journalSchema.parse(data);

  const isUnique = await checkJournalSlugUnique(parsed.slug);
  if (!isUnique) throw new Error("Slug already exists");

  const post = await prisma.journalPost.create({
    data: {
      ...parsed,
      publishedAt: parsed.published ? new Date() : null,
    },
  });

  revalidatePath("/journal");
  return post;
}

export async function updateJournalPost(
  id: string,
  data: z.infer<typeof journalSchema>
) {
  await requireAdmin();
  const parsed = journalSchema.parse(data);

  const isUnique = await checkJournalSlugUnique(parsed.slug, id);
  if (!isUnique) throw new Error("Slug already exists");

  const existing = await prisma.journalPost.findUnique({ where: { id } });

  const post = await prisma.journalPost.update({
    where: { id },
    data: {
      ...parsed,
      publishedAt:
        parsed.published && !existing?.publishedAt
          ? new Date()
          : existing?.publishedAt,
    },
  });

  revalidatePath("/journal");
  revalidatePath(`/journal/${post.slug}`);
  return post;
}

export async function deleteJournalPost(id: string) {
  await requireAdmin();
  await prisma.journalPost.delete({ where: { id } });
  revalidatePath("/journal");
  return { success: true };
}
