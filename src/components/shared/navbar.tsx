"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Heart,
  Menu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#fcfdfb]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="flex min-h-[94px] items-center justify-between gap-5">
          {/* Brand */}
          <Link
            href="/"
            aria-label="Daan homepage"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex size-[58px] items-center justify-center rounded-[20px] bg-emerald-50 ring-1 ring-emerald-900/5 transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
              <Image
                src="/daanlogo.png"
                alt="Daan logo"
                width={54}
                height={54}
                priority
                className="size-full object-contain p-0.5"
              />
            </div>

            <div>
              <span className="block text-[32px] font-black leading-none tracking-[-1.5px] text-[#123c2c]">
                daan<span className="text-emerald-600">.</span>
              </span>
              <span className="mt-2 block text-[10px] font-bold tracking-[2px] text-slate-500">
                DONATE WITH TRUST
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 xl:flex"
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-3.5 py-3 text-[14px] font-semibold text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-[#145c40]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <Link
              href="/login"
              className="text-[15px] font-bold text-slate-700 transition-colors hover:text-emerald-700"
            >
              Log in
            </Link>

            <Link
              href="/register"
              className="group flex min-h-[50px] items-center gap-2 rounded-full bg-[#145c40] px-5 text-[14px] font-bold text-white shadow-[0_5px_16px_rgba(20,92,64,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#104a33] hover:shadow-lg"
            >
              <Heart className="size-[17px] transition-transform group-hover:scale-110" />
              <span>Donate Now</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-900/10 bg-white text-[#145c40] shadow-sm transition-colors hover:bg-emerald-50 md:hidden"
            >
              <Menu className="size-6" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(88vw,390px)] border-l border-emerald-900/10 bg-[#fcfdfb] p-6"
            >
              <SheetHeader className="border-b border-emerald-900/10 pb-6 text-left">
                <Link href="/" className="flex items-center gap-3">
                  <Image
                    src="/daanlogo.png"
                    alt="Daan logo"
                    width={48}
                    height={48}
                    className="rounded-xl"
                  />
                  <span className="text-3xl font-black tracking-tight text-[#123c2c]">
                    daan<span className="text-emerald-600">.</span>
                  </span>
                </Link>

                <SheetTitle className="pt-2 text-sm font-normal leading-6 text-slate-500">
                  Every act of kindness brings hope to someone.
                </SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="mt-6 flex flex-col gap-1.5"
              >
                {navLinks.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <span>{item.name}</span>
                    {index === 2 && (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                        Explore
                      </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="flex h-[50px] items-center justify-center rounded-2xl border border-slate-200 bg-white text-[15px] font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Log in to your account
                </Link>

                <Link
                  href="/register"
                  className="flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#145c40] text-[15px] font-bold text-white transition-colors hover:bg-[#104a33]"
                >
                  <Heart className="size-5" />
                  Donate Now
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <div className="mt-8 rounded-[24px] border border-emerald-100 bg-[#f0f7f1] p-5">
                <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-white text-emerald-800 shadow-sm">
                  <ShieldCheck className="size-6" />
                </div>
                <p className="text-[16px] font-bold text-[#123c2c]">
                  Kindness with confidence
                </p>
                <p className="mt-2 text-[13px] leading-6 text-slate-600">
                  Discover people&apos needs and support meaningful causes through
                  Daan&apos mission of trusted giving.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <Sparkles className="size-4" />
                  Small help. Real hope.
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}