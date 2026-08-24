import Link from "next/link";
import { callLink, navLinks, whatsappLink, type SiteConfig } from "@/lib/site-config";

export default function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <span className="text-lg font-extrabold text-white">{siteConfig.name}</span>
            <p className="mt-3 text-sm text-neutral-400">{siteConfig.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-orange-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li>{siteConfig.address}</li>
              <li>
                <a href={callLink(siteConfig)} className="hover:text-orange-500">
                  {siteConfig.callNumber}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(siteConfig)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Follow Us
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-400">
              <li>
                <a
                  href={`https://instagram.com/${siteConfig.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-500">
            <Link href="/terms" className="hover:text-orange-500">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-orange-500">
              Privacy Policy
            </Link>
            <Link href="/admin/login" className="hover:text-orange-500">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
