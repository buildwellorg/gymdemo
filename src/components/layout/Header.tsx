"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/site-config";

export default function Header({ siteName }: { siteName: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-white">
            {siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-300 transition-colors hover:text-orange-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#membership"
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            Join Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-200 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/10 bg-neutral-950 md:hidden">
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-200 hover:bg-white/5 hover:text-orange-500"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#membership"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-orange-500 px-5 py-2 text-center text-sm font-semibold text-white hover:bg-orange-600"
            >
              Join Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
