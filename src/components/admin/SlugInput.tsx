"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";

interface SlugInputProps {
  title: string;
  value: string;
  onChange: (slug: string) => void;
  checkUnique?: (slug: string) => Promise<boolean>;
  excludeId?: string;
}

export function SlugInput({
  title,
  value,
  onChange,
  checkUnique,
}: SlugInputProps) {
  const [manual, setManual] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!manual && title) {
      onChange(slugify(title));
    }
  }, [title, manual, onChange]);

  useEffect(() => {
    if (!checkUnique || !value) return;

    const timer = setTimeout(async () => {
      const unique = await checkUnique(value);
      setError(unique ? "" : "This slug is already in use");
    }, 400);

    return () => clearTimeout(timer);
  }, [value, checkUnique]);

  return (
    <div>
      <label htmlFor="slug" className="text-sm font-medium block mb-2">
        Slug
      </label>
      <input
        id="slug"
        type="text"
        value={value}
        onChange={(e) => {
          setManual(true);
          onChange(slugify(e.target.value));
        }}
        className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent"
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}
