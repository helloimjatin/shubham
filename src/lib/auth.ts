import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    throw new Error("Unauthorized");
  }

  const admin = await prisma.admin.upsert({
    where: { email: user.email },
    update: { name: user.user_metadata?.name ?? user.email.split("@")[0] },
    create: {
      email: user.email,
      name: user.user_metadata?.name ?? user.email.split("@")[0],
    },
  });

  return { user, admin };
}

export async function getAdminSession() {
  try {
    return await requireAdmin();
  } catch {
    return null;
  }
}
