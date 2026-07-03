import { createClient } from "@supabase/supabase-js";

export type StorageBucket = "films" | "photos" | "thumbnails";

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function uploadToStorage(
  bucket: StorageBucket,
  file: File,
  path?: string
): Promise<string> {
  const supabase = getSupabaseAdmin();
  const fileName = path ?? `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return publicUrl;
}

export async function deleteFromStorage(
  bucket: StorageBucket,
  url: string
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const path = url.split(`/storage/v1/object/public/${bucket}/`)[1];
  if (!path) return;

  await supabase.storage.from(bucket).remove([path]);
}
