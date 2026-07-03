"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import type { ProjectType } from "@prisma/client";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  type: z.enum(["FILM", "PHOTOGRAPHY"]),
  category: z.string().min(1),
  location: z.string().optional(),
  eventDate: z.string().optional(),
  summary: z.string().min(1),
  storyContent: z.string().min(1),
  coverImage: z.string().url(),
  videoUrl: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
  vendorCredits: z.record(z.string()).optional(),
});

export async function checkSlugUnique(slug: string, excludeId?: string) {
  const existing = await prisma.project.findFirst({
    where: {
      slug,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
  });
  return !existing;
}

export async function createProject(data: z.infer<typeof projectSchema>) {
  await requireAdmin();
  const parsed = projectSchema.parse(data);

  const isUnique = await checkSlugUnique(parsed.slug);
  if (!isUnique) throw new Error("Slug already exists");

  const maxOrder = await prisma.project.aggregate({ _max: { order: true } });

  const project = await prisma.project.create({
    data: {
      ...parsed,
      slug: parsed.slug || slugify(parsed.title),
      eventDate: parsed.eventDate ? new Date(parsed.eventDate) : null,
      vendorCredits: parsed.vendorCredits ?? undefined,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });

  revalidatePath("/films");
  revalidatePath("/photography");
  revalidatePath("/");
  return project;
}

export async function updateProject(
  id: string,
  data: z.infer<typeof projectSchema>
) {
  await requireAdmin();
  const parsed = projectSchema.parse(data);

  const isUnique = await checkSlugUnique(parsed.slug, id);
  if (!isUnique) throw new Error("Slug already exists");

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...parsed,
      eventDate: parsed.eventDate ? new Date(parsed.eventDate) : null,
      vendorCredits: parsed.vendorCredits ?? undefined,
    },
  });

  revalidatePath("/films");
  revalidatePath("/photography");
  revalidatePath("/");
  revalidatePath(`/films/${project.slug}`);
  revalidatePath(`/photography/${project.slug}`);
  return project;
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/films");
  revalidatePath("/photography");
  revalidatePath("/");
  return { success: true };
}

export async function reorderProjects(orderedIds: string[]) {
  await requireAdmin();
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.project.update({
        where: { id },
        data: { order: index },
      })
    )
  );
  revalidatePath("/films");
  revalidatePath("/photography");
  revalidatePath("/");
  return { success: true };
}

export async function addProjectImage(
  projectId: string,
  data: { url: string; alt?: string; layoutHint?: string }
) {
  await requireAdmin();
  const maxOrder = await prisma.projectImage.aggregate({
    where: { projectId },
    _max: { order: true },
  });

  return prisma.projectImage.create({
    data: {
      projectId,
      url: data.url,
      alt: data.alt,
      layoutHint: data.layoutHint,
      order: (maxOrder._max.order ?? -1) + 1,
    },
  });
}

export async function updateProjectImage(
  id: string,
  data: { alt?: string; layoutHint?: string; order?: number }
) {
  await requireAdmin();
  return prisma.projectImage.update({ where: { id }, data });
}

export async function deleteProjectImage(id: string) {
  await requireAdmin();
  await prisma.projectImage.delete({ where: { id } });
  return { success: true };
}

export async function reorderProjectImages(
  projectId: string,
  orderedIds: string[]
) {
  await requireAdmin();
  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.projectImage.update({
        where: { id },
        data: { order: index },
      })
    )
  );
  return { success: true };
}

export type { ProjectType };
