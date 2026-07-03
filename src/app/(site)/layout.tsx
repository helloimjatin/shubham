import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { getSiteSettings } from "@/lib/site-settings";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>
      <Header studioName={settings.studioName} />
      <main id="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer
        studioName={settings.studioName}
        contactEmail={settings.contactEmail}
        contactPhone={settings.contactPhone}
        instagramUrl={settings.instagramUrl}
      />
    </>
  );
}
