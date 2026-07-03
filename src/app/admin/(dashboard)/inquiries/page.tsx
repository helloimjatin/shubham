import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminInquiriesPage({
  searchParams,
}: PageProps) {
  await requireAdmin();
  const { status } = await searchParams;

  let inquiries: {
    id: string;
    name: string;
    email: string;
    status: string;
    createdAt: Date;
  }[] = [];

  try {
    inquiries = await prisma.inquiry.findMany({
      where: status ? { status: status as "NEW" | "RESPONDED" | "ARCHIVED" } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
      },
    });
  } catch {
    // DB not connected
  }

  const filters = ["ALL", "NEW", "RESPONDED", "ARCHIVED"];

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Inquiries</h1>

      <div className="flex gap-2 mb-6">
        {filters.map((f) => {
          const isActive =
            f === "ALL" ? !status : status === f;
          const href = f === "ALL" ? "/admin/inquiries" : `/admin/inquiries?status=${f}`;
          return (
            <Link
              key={f}
              href={href}
              className={cn(
                "px-4 py-2 text-xs tracking-widest uppercase border",
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-border hover:border-accent"
              )}
            >
              {f}
            </Link>
          );
        })}
      </div>

      <div className="border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-b border-border hover:bg-surface/50">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    className="hover:text-accent"
                  >
                    {inquiry.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text-secondary">{inquiry.email}</td>
                <td className="px-4 py-3 text-text-secondary">{inquiry.status}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {formatDate(inquiry.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {inquiries.length === 0 && (
          <p className="px-4 py-8 text-text-secondary text-sm text-center">
            No inquiries found.
          </p>
        )}
      </div>
    </div>
  );
}
