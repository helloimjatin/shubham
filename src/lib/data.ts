import { cache } from "react";
import { prisma } from "./prisma";
import { isDatabaseAvailable } from "./db";
import {
  mockProjects,
  mockJournalPosts,
  mockSiteSettings,
  type MockProject,
  type MockJournalPost,
  type MockSiteSettings,
  type MockProjectImage,
} from "@/data/mock";
import type { ProjectType } from "@prisma/client";

function mapProject(project: {
  id: string;
  slug: string;
  title: string;
  type: ProjectType;
  category: string;
  location: string | null;
  eventDate: Date | null;
  summary: string;
  storyContent: string;
  coverImage: string;
  videoUrl: string | null;
  featured: boolean;
  published: boolean;
  vendorCredits: unknown;
  order: number;
  images: {
    id: string;
    url: string;
    alt: string | null;
    order: number;
    layoutHint: string | null;
  }[];
}): MockProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    type: project.type,
    category: project.category,
    location: project.location ?? undefined,
    eventDate: project.eventDate?.toISOString(),
    summary: project.summary,
    storyContent: project.storyContent,
    coverImage: project.coverImage,
    videoUrl: project.videoUrl ?? undefined,
    featured: project.featured,
    published: project.published,
    vendorCredits: project.vendorCredits as Record<string, string> | undefined,
    order: project.order,
    images: project.images.map(
      (img): MockProjectImage => ({
        id: img.id,
        url: img.url,
        alt: img.alt ?? undefined,
        order: img.order,
        layoutHint: img.layoutHint as MockProjectImage["layoutHint"],
      })
    ),
  };
}

async function useDatabase(): Promise<boolean> {
  return isDatabaseAvailable(() =>
    prisma.siteSettings.findFirst({ select: { id: true } })
  );
}

export const getSiteSettingsData = cache(async (): Promise<MockSiteSettings> => {
  const hasDb = await isDatabaseAvailable(() =>
    prisma.siteSettings.findFirst({ select: { id: true } })
  );

  if (!hasDb) return mockSiteSettings;

  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    if (settings) {
      return {
        studioName: settings.studioName,
        tagline: settings.tagline ?? undefined,
        heroMediaUrl: settings.heroMediaUrl ?? undefined,
        heroMediaType: settings.heroMediaType as "video" | "image" | undefined,
        aboutContent: settings.aboutContent ?? undefined,
        contactEmail: settings.contactEmail ?? undefined,
        contactPhone: settings.contactPhone ?? undefined,
        instagramUrl: settings.instagramUrl ?? undefined,
        primaryColor: settings.primaryColor ?? undefined,
      };
    }
  } catch {
    // fall through to mock
  }
  return mockSiteSettings;
});

export const getFeaturedProjects = cache(async (): Promise<MockProject[]> => {
  if (await useDatabase()) {
    const projects = await prisma.project.findMany({
      where: { featured: true, published: true },
      orderBy: { order: "asc" },
      include: { images: { orderBy: { order: "asc" } } },
    });
    return projects.map(mapProject);
  }
  return mockProjects
    .filter((p) => p.featured && p.published)
    .sort((a, b) => a.order - b.order);
});

export const getProjectsByType = cache(
  async (type: ProjectType): Promise<MockProject[]> => {
    if (await useDatabase()) {
      const projects = await prisma.project.findMany({
        where: { type, published: true },
        orderBy: { order: "asc" },
        include: { images: { orderBy: { order: "asc" } } },
      });
      return projects.map(mapProject);
    }
    return mockProjects
      .filter((p) => p.type === type && p.published)
      .sort((a, b) => a.order - b.order);
  }
);

export const getProjectCategories = cache(
  async (type: ProjectType): Promise<string[]> => {
    const projects = await getProjectsByType(type);
    return [...new Set(projects.map((p) => p.category))];
  }
);

export const getProjectBySlug = cache(
  async (slug: string, type?: ProjectType): Promise<MockProject | undefined> => {
    if (await useDatabase()) {
      const project = await prisma.project.findFirst({
        where: {
          slug,
          published: true,
          ...(type ? { type } : {}),
        },
        include: { images: { orderBy: { order: "asc" } } },
      });
      return project ? mapProject(project) : undefined;
    }
    const found = mockProjects.find(
      (p) => p.slug === slug && p.published && (!type || p.type === type)
    );
    return found;
  }
);

export const getJournalPosts = cache(async (): Promise<MockJournalPost[]> => {
  if (await useDatabase()) {
    const posts = await prisma.journalPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    return posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      published: post.published,
      publishedAt: post.publishedAt?.toISOString(),
    }));
  }
  return mockJournalPosts.filter((p) => p.published);
});

export const getJournalBySlug = cache(
  async (slug: string): Promise<MockJournalPost | undefined> => {
    if (await useDatabase()) {
      const post = await prisma.journalPost.findFirst({
        where: { slug, published: true },
      });
      if (!post) return undefined;
      return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: post.published,
        publishedAt: post.publishedAt?.toISOString(),
      };
    }
    return mockJournalPosts.find((p) => p.slug === slug && p.published);
  }
);
