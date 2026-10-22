"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Menu, ShieldCheck } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Find a Cause", href: "/requests" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-[88px] w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Daan home"
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex size-14 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/daanlogo.png"
              alt="Daan logo"
              width={56}
              height={56}
              priority
              className="size-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-3xl font-extrabold tracking-tight text-emerald-950">
              Daan<span className="text-emerald-600">.</span>
            </span>
            <span className="mt-0.5 text-xs font-semibold tracking-[0.12em] text-slate-500">
              DONATE WITH TRUST
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-0.5 xl:flex"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-3 text-[15px] font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link
            href="/login"
            className="whitespace-nowrap px-2 py-3 text-[15px] font-semibold text-slate-700 transition-colors hover:text-emerald-700"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-emerald-800 px-5 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-emerald-900"
          >
            <Heart className="mr-2 size-5" />
            Start Giving
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </div>

        {/* Mobile / Tablet Navigation */}
        <Sheet>
          <SheetTrigger
            className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:bg-emerald-50 md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="size-6" />
          </SheetTrigger>

          <SheetContent side="right" className="w-[320px] sm:w-[380px]">
            <SheetHeader className="border-b pb-5 text-left">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/daanlogo.png"
                  alt="Daan logo"
                  width={48}
                  height={48}
                  className="rounded-xl"
                />
                <span className="text-3xl font-extrabold text-emerald-950">
                  Daan<span className="text-emerald-600">.</span>
                </span>
              </Link>

              <SheetTitle className="text-sm font-normal leading-6 text-slate-500">
                Small acts of kindness can change someone&apos;s life.
              </SheetTitle>
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="mt-6 flex flex-col gap-1.5"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="flex h-12 items-center justify-center rounded-xl border border-slate-200 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Log in to your account
              </Link>

              <Link
                href="/register"
                className="flex h-12 items-center justify-center rounded-xl bg-emerald-800 text-base font-bold text-white transition-colors hover:bg-emerald-900"
              >
                <Heart className="mr-2 size-5" />
                Start Giving
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <ShieldCheck className="mb-3 size-7 text-emerald-800" />
              <p className="text-base font-bold text-emerald-950">
                Giving with confidence
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Discover real needs and support people through Daan&apos;s
                mission of trusted giving.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}