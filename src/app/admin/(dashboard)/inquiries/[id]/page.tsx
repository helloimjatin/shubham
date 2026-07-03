import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { InquiryDetail } from "@/components/admin/InquiryDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InquiryDetailPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;

  let inquiry = null;
  try {
    inquiry = await prisma.inquiry.findUnique({ where: { id } });
  } catch {
    // DB not connected
  }

  if (!inquiry) notFound();

  return (
    <div>
      <Link
        href="/admin/inquiries"
        className="text-sm text-text-secondary hover:text-accent mb-6 inline-block"
      >
        ← Back to Inquiries
      </Link>
      <InquiryDetail inquiry={inquiry} />
    </div>
  );
}
