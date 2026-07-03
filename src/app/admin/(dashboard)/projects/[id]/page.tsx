import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/ProjectForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;

  let project = null;
  try {
    project = await prisma.project.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    });
  } catch {
    // DB not connected
  }

  if (!project) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
