import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await requireAdmin();

  let projectCount = 0;
  let newInquiries = 0;
  let recentProjects: { id: string; title: string; updatedAt: Date; published: boolean }[] = [];
  let recentInquiries: { id: string; name: string; createdAt: Date; status: string }[] = [];

  try {
    [projectCount, newInquiries, recentProjects, recentInquiries] =
      await Promise.all([
        prisma.project.count(),
        prisma.inquiry.count({ where: { status: "NEW" } }),
        prisma.project.findMany({
          orderBy: { updatedAt: "desc" },
          take: 5,
          select: { id: true, title: true, updatedAt: true, published: true },
        }),
        prisma.inquiry.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: { id: true, name: true, createdAt: true, status: true },
        }),
      ]);
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface border border-border p-6">
          <p className="text-sm text-text-secondary">Total Projects</p>
          <p className="text-3xl font-display mt-2">{projectCount}</p>
        </div>
        <div className="bg-surface border border-border p-6">
          <p className="text-sm text-text-secondary">New Inquiries</p>
          <p className="text-3xl font-display mt-2">{newInquiries}</p>
        </div>
        <Link
          href="/admin/settings"
          className="bg-surface border border-border p-6 hover:border-accent transition-colors"
        >
          <p className="text-sm text-text-secondary">Quick Action</p>
          <p className="text-lg mt-2">Edit Site Settings →</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-xl mb-4">Recent Projects</h2>
          <ul className="bg-surface border border-border divide-y divide-border">
            {recentProjects.map((p) => (
              <li key={p.id} className="px-4 py-3 flex justify-between items-center">
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="hover:text-accent"
                >
                  {p.title}
                </Link>
                <span className="text-xs text-text-secondary">
                  {p.published ? "Published" : "Draft"}
                </span>
              </li>
            ))}
            {recentProjects.length === 0 && (
              <li className="px-4 py-6 text-text-secondary text-sm">
                No projects yet.{" "}
                <Link href="/admin/projects/new" className="text-accent">
                  Create one
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-xl mb-4">Recent Inquiries</h2>
          <ul className="bg-surface border border-border divide-y divide-border">
            {recentInquiries.map((i) => (
              <li key={i.id} className="px-4 py-3 flex justify-between items-center">
                <Link
                  href={`/admin/inquiries/${i.id}`}
                  className="hover:text-accent"
                >
                  {i.name}
                </Link>
                <span className="text-xs text-text-secondary">{i.status}</span>
              </li>
            ))}
            {recentInquiries.length === 0 && (
              <li className="px-4 py-6 text-text-secondary text-sm">
                No inquiries yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
