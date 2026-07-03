import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ProjectsList } from "@/components/admin/ProjectsList";

export default async function AdminProjectsPage() {
  await requireAdmin();

  let projects: {
    id: string;
    title: string;
    type: string;
    category: string;
    published: boolean;
    featured: boolean;
  }[] = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        type: true,
        category: true,
        published: true,
        featured: true,
      },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-text-primary text-white px-6 py-3 text-sm tracking-widest uppercase"
        >
          New Project
        </Link>
      </div>
      <p className="text-sm text-text-secondary mb-4">
        Drag to reorder projects on the homepage and portfolio feeds.
      </p>
      <ProjectsList projects={projects} />
    </div>
  );
}
