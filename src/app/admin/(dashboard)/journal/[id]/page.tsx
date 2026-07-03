import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { JournalForm } from "@/components/admin/JournalForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJournalPage({ params }: PageProps) {
  await requireAdmin();
  const { id } = await params;

  let post = null;
  try {
    post = await prisma.journalPost.findUnique({ where: { id } });
  } catch {
    // DB not connected
  }

  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Edit Journal Post</h1>
      <JournalForm post={post} />
    </div>
  );
}
