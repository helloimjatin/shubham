"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
  checkSlugUnique,
  addProjectImage,
  deleteProjectImage,
} from "@/actions/projects";
import { ImageUploader } from "./ImageUploader";
import { RichTextEditor } from "./RichTextEditor";
import { SlugInput } from "./SlugInput";
import { VendorCreditsEditor } from "./VendorCreditsEditor";
import { FormShell } from "./FormShell";
import type { Project, ProjectImage, ProjectType } from "@prisma/client";

type ProjectWithImages = Project & { images: ProjectImage[] };

interface ProjectFormProps {
  project?: ProjectWithImages;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const isNew = !project;

  const [form, setForm] = useState({
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    type: (project?.type ?? "FILM") as ProjectType,
    category: project?.category ?? "Wedding",
    location: project?.location ?? "",
    eventDate: project?.eventDate
      ? new Date(project.eventDate).toISOString().split("T")[0]
      : "",
    summary: project?.summary ?? "",
    storyContent: project?.storyContent ?? "<p></p>",
    coverImage: project?.coverImage ?? "",
    videoUrl: project?.videoUrl ?? "",
    featured: project?.featured ?? false,
    published: project?.published ?? false,
    vendorCredits: (project?.vendorCredits as Record<string, string>) ?? {},
  });
  const [images, setImages] = useState(project?.images ?? []);
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
        const created = await createProject(form);
        router.push(`/admin/projects/${created.id}`);
      } else {
        await updateProject(project.id, form);
        setDirty(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !confirm("Delete this project?")) return;
    await deleteProject(project.id);
    router.push("/admin/projects");
  };

  const handleAddImage = async (url: string) => {
    if (!project) return;
    const img = await addProjectImage(project.id, { url });
    setImages((prev) => [...prev, img]);
  };

  const handleDeleteImage = async (id: string) => {
    await deleteProjectImage(id);
    setImages((prev) => prev.filter((i) => i.id !== id));
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
            checkUnique={(slug) => checkSlugUnique(slug, project?.id)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Type</label>
            <select
              value={form.type}
              onChange={(e) => update("type", e.target.value as ProjectType)}
              className="w-full border border-border px-4 py-3 text-sm"
            >
              <option value="FILM">Film</option>
              <option value="PHOTOGRAPHY">Photography</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Category</label>
            <input
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              required
              className="w-full border border-border px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Event Date</label>
            <input
              type="date"
              value={form.eventDate}
              onChange={(e) => update("eventDate", e.target.value)}
              className="w-full border border-border px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Location</label>
          <input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className="w-full border border-border px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Summary</label>
          <textarea
            value={form.summary}
            onChange={(e) => update("summary", e.target.value)}
            required
            rows={2}
            className="w-full border border-border px-4 py-3 text-sm resize-none"
          />
        </div>

        <RichTextEditor
          label="Story Content"
          value={form.storyContent}
          onChange={(html) => update("storyContent", html)}
        />

        <ImageUploader
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => update("coverImage", url)}
        />

        {form.type === "FILM" && (
          <div>
            <label className="text-sm font-medium block mb-2">Video Embed URL</label>
            <input
              value={form.videoUrl}
              onChange={(e) => update("videoUrl", e.target.value)}
              placeholder="https://player.vimeo.com/video/..."
              className="w-full border border-border px-4 py-3 text-sm"
            />
          </div>
        )}

        <VendorCreditsEditor
          value={form.vendorCredits}
          onChange={(credits) => update("vendorCredits", credits)}
        />

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update("featured", e.target.checked)}
            />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => update("published", e.target.checked)}
            />
            Published
          </label>
        </div>

        {!isNew && (
          <div className="border-t border-border pt-6">
            <h3 className="font-display text-xl mb-4">Gallery Images</h3>
            <ImageUploader
              label="Add Gallery Image"
              onChange={handleAddImage}
            />
            <ul className="mt-4 space-y-3">
              {images
                .sort((a, b) => a.order - b.order)
                .map((img) => (
                  <li
                    key={img.id}
                    className="flex items-center gap-4 border border-border p-3"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt ?? ""}
                      className="w-20 h-14 object-cover"
                    />
                    <input
                      type="text"
                      value={img.alt ?? ""}
                      placeholder="Alt text"
                      onChange={async (e) => {
                        const { updateProjectImage } = await import(
                          "@/actions/projects"
                        );
                        await updateProjectImage(img.id, { alt: e.target.value });
                      }}
                      className="flex-1 border border-border px-3 py-2 text-sm"
                    />
                    <select
                      value={img.layoutHint ?? "full"}
                      onChange={async (e) => {
                        const { updateProjectImage } = await import(
                          "@/actions/projects"
                        );
                        await updateProjectImage(img.id, {
                          layoutHint: e.target.value,
                        });
                      }}
                      className="border border-border px-2 py-2 text-sm"
                    >
                      <option value="full">Full</option>
                      <option value="half">Half</option>
                      <option value="third">Third</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(img.id)}
                      className="text-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-text-primary text-white px-8 py-3 text-sm tracking-widest uppercase disabled:opacity-50"
          >
            {saving ? "Saving..." : isNew ? "Create Project" : "Save Changes"}
          </button>
          {!isNew && (
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600 text-sm"
            >
              Delete Project
            </button>
          )}
        </div>
      </form>
    </FormShell>
  );
}
