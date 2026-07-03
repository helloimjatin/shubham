"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { InquiryStatus } from "@prisma/client";

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await requireAdmin();
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
  return { success: true };
}
