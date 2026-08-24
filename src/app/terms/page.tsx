import { getSiteSettings } from "@/lib/data/site-settings";

export default async function TermsPage() {
  const siteConfig = await getSiteSettings();

  return (
    <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-white">Terms &amp; Conditions</h1>
      <p className="mt-6 text-sm text-neutral-400">
        Placeholder content. Replace with {siteConfig.name}&apos;s actual terms and
        conditions before launch.
      </p>
    </main>
  );
}
