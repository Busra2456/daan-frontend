"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Heart,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/requests", label: "Explore Requests" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Daan home"
          onClick={() => setIsMenuOpen(false)}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-100 transition duration-300 group-hover:scale-105 group-hover:bg-emerald-100 sm:h-14 sm:w-14">
            <Image
              src="/daanlogo.png"
              alt="Daan logo"
              width={52}
              height={52}
              priority
              className="h-11 w-11 object-contain sm:h-12 sm:w-12"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[25px] font-extrabold leading-none tracking-tight text-slate-900">
              Daan<span className="text-emerald-600">.</span>
            </span>
            <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-[10px]">
              Donate with Trust
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-1.5 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-white hover:text-emerald-700 hover:shadow-sm lg:px-5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-700/20"
          >
            <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Start Giving
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-xl md:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-1.5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-100" />

            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-center text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Log in
            </Link>

            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-700/15 transition-colors hover:bg-emerald-700"
            >
              <Heart className="h-4 w-4" />
              Start Giving
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-3 text-xs font-medium text-emerald-800">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              Compassion with transparency
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
