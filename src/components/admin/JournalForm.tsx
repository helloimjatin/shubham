"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createJournalPost,
  updateJournalPost,
  deleteJournalPost,
  checkJournalSlugUnique,
} from "@/actions/journal";
import { ImageUploader } from "./ImageUploader";
import { RichTextEditor } from "./RichTextEditor";
import { SlugInput } from "./SlugInput";
import { FormShell } from "./FormShell";
import type { JournalPost } from "@prisma/client";

interface JournalFormProps {
  post?: JournalPost;
}

export function JournalForm({ post }: JournalFormProps) {
  const router = useRouter();
  const isNew = !post;

  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "<p></p>",
    coverImage: post?.coverImage ?? "",
    published: post?.published ?? false,
  });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (isNew) {
        const created = await createJournalPost(form);
        router.push(`/admin/journal/${created.id}`);
      } else {
        await updateJournalPost(post.id, form);
        setDirty(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !confirm("Delete this post?")) return;
    await deleteJournalPost(post.id);
    router.push("/admin/journal");
  };

  return (
    <FormShell isDirty={dirty}>
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Title</label>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              required
              className="w-full border border-border px-4 py-3 text-sm"
            />
          </div>
          <SlugInput
            title={form.title}
            value={form.slug}
            onChange={(slug) => update("slug", slug)}
            checkUnique={(slug) => checkJournalSlugUnique(slug, post?.id)}
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            required
            rows={2}
            className="w-full border border-border px-4 py-3 text-sm resize-none"
          />
        </div>

        <RichTextEditor
          label="Content"
          value={form.content}
          onChange={(html) => update("content", html)}
        />

        <ImageUploader
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => update("coverImage", url)}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
          />
          Published
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-text-primary text-white px-8 py-3 text-sm tracking-widest uppercase disabled:opacity-50"
          >
            {saving ? "Saving..." : isNew ? "Create Post" : "Save Changes"}
          </button>
          {!isNew && (
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600 text-sm"
            >
              Delete Post
            </button>
          )}
        </div>
      </form>
    </FormShell>
  );
}
