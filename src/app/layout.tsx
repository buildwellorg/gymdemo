import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContactButtons from "@/components/layout/FloatingContactButtons";
import OffersBanner from "@/components/sections/OffersBanner";
import { getSiteSettings } from "@/lib/data/site-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// All CMS-backed content (pricing, site settings, equipment, trainers,
// testimonials, offers) is read from Firestore per request rather than
// baked into a static build, so admin edits show up on the next page load.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteSettings();
  return {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      "A single-location fitness gym offering personal training, group classes, and modern equipment.",
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const siteConfig = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950">
        <OffersBanner />
        <Header siteName={siteConfig.name} />
        {children}
        <Footer siteConfig={siteConfig} />
        <FloatingContactButtons siteConfig={siteConfig} />
      </body>
    </html>
  );
}
