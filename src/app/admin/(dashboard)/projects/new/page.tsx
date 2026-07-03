import { requireAdmin } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">New Project</h1>
      <ProjectForm />
    </div>
  );
}
