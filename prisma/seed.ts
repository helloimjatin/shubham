import { PrismaClient } from "@prisma/client";
import { mockProjects, mockJournalPosts, mockSiteSettings } from "../src/data/mock";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      studioName: mockSiteSettings.studioName,
      tagline: mockSiteSettings.tagline,
      heroMediaUrl: mockSiteSettings.heroMediaUrl,
      heroMediaType: mockSiteSettings.heroMediaType,
      aboutContent: mockSiteSettings.aboutContent,
      contactEmail: mockSiteSettings.contactEmail,
      contactPhone: mockSiteSettings.contactPhone,
      instagramUrl: mockSiteSettings.instagramUrl,
      primaryColor: mockSiteSettings.primaryColor,
    },
  });

  for (const project of mockProjects) {
    const { images, eventDate, vendorCredits, ...data } = project;

    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        ...data,
        eventDate: eventDate ? new Date(eventDate) : null,
        vendorCredits: vendorCredits ?? undefined,
        images: {
          create: images.map((img) => ({
            url: img.url,
            alt: img.alt,
            order: img.order,
            layoutHint: img.layoutHint,
          })),
        },
      },
    });
  }

  for (const post of mockJournalPosts) {
    await prisma.journalPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: post.published,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
