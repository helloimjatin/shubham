import type { Metadata } from "next";
import { getSiteSettingsData } from "@/lib/data";
import { ContactPageClient } from "./ContactPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsData();
  return {
    title: "Contact",
    description: `Get in touch with ${settings.studioName}`,
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettingsData();

  return (
    <ContactPageClient
      contactEmail={settings.contactEmail}
      contactPhone={settings.contactPhone}
    />
  );
}
