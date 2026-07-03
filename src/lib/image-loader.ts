import { createClient } from "@supabase/supabase-js";

export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.includes("supabase.co/storage")) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    return supabase.storage.from("photos").getPublicUrl(src, {
      transform: { width, quality: quality ?? 75 },
    }).data.publicUrl;
  }
  return `${src}?w=${width}&q=${quality ?? 75}`;
}
