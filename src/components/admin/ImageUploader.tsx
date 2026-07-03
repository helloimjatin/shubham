"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { StorageBucket } from "@/lib/supabase/storage";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: StorageBucket;
  label?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  bucket = "photos",
  label = "Upload Image",
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      setUploading(true);
      setError("");

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", bucket);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error ?? "Upload failed");
        }

        const { url } = await res.json();
        onChange(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [bucket, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile]
  );

  return (
    <div className={className}>
      {label && <p className="text-sm font-medium mb-2">{label}</p>}

      {value && (
        <div className="relative w-full max-w-xs aspect-video mb-4 border border-border">
          <Image src={value} alt="Preview" fill className="object-cover" />
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed p-8 text-center transition-colors",
          dragOver ? "border-accent bg-accent/5" : "border-border"
        )}
      >
        <input
          type="file"
          accept="image/*"
          id={`upload-${label}`}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
          }}
        />
        <label
          htmlFor={`upload-${label}`}
          className="cursor-pointer text-sm text-text-secondary"
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              Drag & drop an image here, or{" "}
              <span className="text-accent underline">browse</span>
            </>
          )}
        </label>
      </div>

      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL"
          className="w-full mt-3 border border-border px-3 py-2 text-xs"
        />
      )}

      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
}
