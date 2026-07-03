import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadToStorage, type StorageBucket } from "@/lib/supabase/storage";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as StorageBucket) || "photos";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        {
          error:
            "Storage not configured. Set SUPABASE_SERVICE_ROLE_KEY or paste an image URL directly.",
        },
        { status: 503 }
      );
    }

    const url = await uploadToStorage(bucket, file);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
