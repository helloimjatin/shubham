import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";

export default async function AdminSettingsPage() {
  await requireAdmin();

  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
  } catch {
    // DB not connected
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Site Settings</h1>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
