"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/actions/settings";
import { ImageUploader } from "./ImageUploader";
import { FormShell } from "./FormShell";
import type { SiteSettings } from "@prisma/client";

interface SiteSettingsFormProps {
  settings: SiteSettings | null;
}

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const [form, setForm] = useState({
    studioName: settings?.studioName ?? "",
    tagline: settings?.tagline ?? "",
    heroMediaUrl: settings?.heroMediaUrl ?? "",
    heroMediaType: settings?.heroMediaType ?? "image",
    aboutContent: settings?.aboutContent ?? "",
    contactEmail: settings?.contactEmail ?? "",
    contactPhone: settings?.contactPhone ?? "",
    instagramUrl: settings?.instagramUrl ?? "",
    logoUrl: settings?.logoUrl ?? "",
    faviconUrl: settings?.faviconUrl ?? "",
    primaryColor: settings?.primaryColor ?? "#C9A87C",
  });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateSiteSettings(form);
      setDirty(false);
      setMessage("Settings saved successfully");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormShell isDirty={dirty}>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="text-sm font-medium block mb-2">Studio Name</label>
          <input
            value={form.studioName}
            onChange={(e) => update("studioName", e.target.value)}
            required
            className="w-full border border-border px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Tagline</label>
          <input
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
            className="w-full border border-border px-4 py-3 text-sm"
          />
        </div>

        <ImageUploader
          label="Hero Media"
          value={form.heroMediaUrl}
          onChange={(url) => update("heroMediaUrl", url)}
          bucket="photos"
        />

        <div>
          <label className="text-sm font-medium block mb-2">Hero Media Type</label>
          <select
            value={form.heroMediaType}
            onChange={(e) => update("heroMediaType", e.target.value)}
            className="w-full border border-border px-4 py-3 text-sm"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">About Content</label>
          <textarea
            value={form.aboutContent}
            onChange={(e) => update("aboutContent", e.target.value)}
            rows={6}
            className="w-full border border-border px-4 py-3 text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-2">Contact Email</label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
              className="w-full border border-border px-4 py-3 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Contact Phone</label>
            <input
              value={form.contactPhone}
              onChange={(e) => update("contactPhone", e.target.value)}
              className="w-full border border-border px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Instagram URL</label>
          <input
            value={form.instagramUrl}
            onChange={(e) => update("instagramUrl", e.target.value)}
            className="w-full border border-border px-4 py-3 text-sm"
          />
        </div>

        <ImageUploader
          label="Logo"
          value={form.logoUrl}
          onChange={(url) => update("logoUrl", url)}
          bucket="thumbnails"
        />

        <div>
          <label className="text-sm font-medium block mb-2">Primary Accent Color</label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={form.primaryColor}
              onChange={(e) => update("primaryColor", e.target.value)}
              className="w-12 h-12 border border-border cursor-pointer"
            />
            <input
              value={form.primaryColor}
              onChange={(e) => update("primaryColor", e.target.value)}
              className="flex-1 border border-border px-4 py-3 text-sm"
            />
          </div>
        </div>

        {message && (
          <p className={message.includes("success") ? "text-green-600" : "text-red-600"}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="bg-text-primary text-white px-8 py-3 text-sm tracking-widest uppercase disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </FormShell>
  );
}
