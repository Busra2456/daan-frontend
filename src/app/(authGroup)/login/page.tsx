import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

import { LoginForm } from "../_components/LoginForm";

const features = [
  {
    title: "Reviewed",
    subtitle: "Requests",
    description:
      "Learn how Daan reviews donation requests before marking them as verified.",
    href: "/about",
    icon: ShieldCheck,
  },
  {
    title: "Trusted",
    subtitle: "Giving",
    description:
      "Sign in as a donor to explore donation opportunities and available request information.",
    href: "/login",
    icon: HeartHandshake,
  },
  {
    title: "Together",
    subtitle: "Community",
    description:
      "Discover how Daan connects people who need support with people willing to help.",
    href: "/about",
    icon: Users,
  },
];

export default function LoginPage() {
  return (
    <main className="min-h-svh bg-background text-foreground lg:grid lg:grid-cols-2">
      {/* Left Side: Login */}
      <section className="flex min-h-svh flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-20">
        {/* Brand Header */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Back to Daan homepage"
            className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <Image
              src="/daanlogo.png"
              alt="Daan logo"
              width={46}
              height={46}
              priority
              className="size-[46px] object-contain transition-transform duration-300 group-hover:scale-105"
            />

            <span className="flex flex-col">
              <span className="text-2xl font-black leading-none tracking-tight text-foreground">
                daan<span className="text-emerald-600 dark:text-emerald-400">.</span>
              </span>

              <span className="mt-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                Donate with Trust
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </header>

        {/* Login Content */}
        <div className="flex flex-1 items-center justify-center py-12 sm:py-14">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-800 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                <HeartHandshake className="size-6" aria-hidden="true" />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                Welcome Back
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Good to see you again.
              </h1>

              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Sign in to continue your journey of giving and receiving
                support through Daan.
              </p>
            </div>

            {/* Login Form */}
            <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-[0_12px_40px_rgba(18,60,44,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_45px_rgba(18,60,44,0.10)] dark:shadow-black/10 dark:hover:shadow-black/20 sm:p-7">
              <LoginForm />
            </div>

            {/* Trust Message */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-400"
                aria-hidden="true"
              />

              <p className="text-sm leading-6 text-muted-foreground">
                <span className="font-bold text-foreground">
                  Your trust matters.
                </span>{" "}
                Daan aims to connect people through reviewed requests
                and thoughtful support.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-2 border-t border-border pt-5 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Daan. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            Made with
            <Heart
              className="size-3.5 fill-emerald-600 text-emerald-600 dark:fill-emerald-400 dark:text-emerald-400"
              aria-hidden="true"
            />
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              care
            </span>
            for a kinder world.
          </p>
        </footer>
      </section>

      {/* Right Side: Brand Experience */}
      <aside className="relative hidden overflow-hidden bg-emerald-950 lg:flex lg:min-h-svh lg:flex-col lg:justify-between dark:bg-[#071d15]">
        {/* Decorative Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-emerald-400/10 blur-[90px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-32 size-[440px] rounded-full bg-emerald-500/10 blur-[100px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_65%)]"
        />

        {/* Top Label */}
        <div className="relative z-10 flex items-center justify-end px-10 py-9 xl:px-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-emerald-100">
            <span
              aria-hidden="true"
              className="size-2 animate-pulse rounded-full bg-emerald-400"
            />
            A community built on trust
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-8 pb-12 text-center xl:px-16">
          {/* Logo */}
          <div className="relative mb-9 flex size-32 items-center justify-center rounded-[32px] border border-white/15 bg-white/[0.08] shadow-2xl shadow-black/10 backdrop-blur-sm transition-transform duration-500 hover:scale-105">
            <div
              aria-hidden="true"
              className="absolute inset-2 rounded-[25px] border border-emerald-300/15"
            />

            <Image
              src="/daanlogo.png"
              alt="Daan logo"
              width={94}
              height={94}
              priority
              className="relative z-10 size-[94px] object-contain"
            />
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-300">
            Donate with Trust
          </p>

          <h2 className="mt-5 max-w-lg text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl">
            A little kindness.
            <span className="mt-2 block text-emerald-300">
              A meaningful difference.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-8 text-white/80 xl:text-lg">
            Behind every request is a real person with a story. Daan
            helps connect people seeking support with those willing to
            make a difference.
          </p>

          {/* Feature Cards */}
          <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  aria-label={`${feature.title} ${feature.subtitle}. ${feature.description}`}
                  title={feature.description}
                  className="group flex min-w-0 flex-col items-center rounded-2xl border border-white/15 bg-white/[0.06] p-3 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/[0.12] hover:shadow-lg hover:shadow-emerald-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950 sm:p-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/15 transition-colors duration-300 group-hover:bg-emerald-400/25">
                    <Icon
                      className="size-5 text-emerald-300 transition-transform duration-300 group-hover:scale-110 sm:size-6"
                      aria-hidden="true"
                    />
                  </span>

                  <span className="mt-3 text-sm font-bold text-white">
                    {feature.title}
                  </span>

                  <span className="mt-1 text-xs leading-5 text-white/75">
                    {feature.subtitle}
                  </span>

                  <ArrowRight
                    className="mt-2 size-3.5 text-emerald-300/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-300"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          {/* Learn More */}
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-emerald-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-emerald-950"
          >
            Learn more about Daan
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Bottom Note */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/15 px-8 py-6 xl:px-14">
          <p className="text-xs text-white/70">
            Every person deserves to be heard and helped.
          </p>

          <Heart
            aria-hidden="true"
            className="size-5 fill-emerald-400/20 text-emerald-300"
          />
        </div>
      </aside>
    </main>
  );
}
