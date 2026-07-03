import { Libre_Bodoni } from "next/font/google";
import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import "./globals.css";

const bodoni = Libre_Bodoni({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.studioName,
      template: `%s — ${settings.studioName}`,
    },
    description: settings.tagline ?? "Premium wedding films and photography",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={bodoni.variable}>
      <body>{children}</body>
    </html>
  );
}
