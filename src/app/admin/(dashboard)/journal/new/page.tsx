import { requireAdmin } from "@/lib/auth";
import { JournalForm } from "@/components/admin/JournalForm";

export default async function NewJournalPage() {
  await requireAdmin();
  return (
    <div>
      <h1 className="font-display text-3xl mb-8">New Journal Post</h1>
      <JournalForm />
    </div>
  );
}
