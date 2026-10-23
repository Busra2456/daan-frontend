import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

import { RegisterForm } from "../_components/RegisterForm";

const communityFeatures = [
  {
    title: "Reviewed",
    subtitle: "Requests",
    description:
      "Learn how Daan reviews donation requests before marking them as verified.",
    href: "/about",
    icon: ShieldCheck,
  },
  {
    title: "Thoughtful",
    subtitle: "Giving",
    description:
      "Sign in to explore donation opportunities and available request information.",
    href: "/login",
    icon: HeartHandshake,
  },
  {
    title: "Connected",
    subtitle: "Community",
    description:
      "Discover how Daan connects people who need support with people willing to give.",
    href: "/about",
    icon: Users,
  },
];

export default function RegisterPage() {
  return (
    <main className="min-h-svh bg-[#f7faf7] text-[#173d2d] lg:grid lg:grid-cols-2">
      {/* Registration section */}
      <section className="flex min-h-svh flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-20">
        {/* Brand header */}
        <header className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="Daan homepage"
            className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-4"
          >
            <Image
              src="/daanlogo.png"
              alt="Daan"
              width={46}
              height={46}
              priority
              className="size-[46px] shrink-0 object-contain"
            />

            <span className="flex flex-col">
              <span className="text-2xl font-black leading-none tracking-tight text-[#123c2c]">
                daan<span className="text-emerald-600">.</span>
              </span>

              <span className="mt-1.5 text-xs font-medium tracking-wide text-[#64746a]">
                Donate with Trust
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-[#52645a] transition-colors hover:text-[#145c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </header>

        {/* Registration content */}
        <div className="flex flex-1 items-center justify-center py-10 sm:py-14">
          <div className="w-full max-w-[440px]">
            <div className="mb-7">
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-[#dce8df] bg-white text-[#145c40] shadow-sm">
                <HeartHandshake size={25} aria-hidden="true" />
              </div>

              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#218052]">
                Join Our Community
              </p>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-[#123c2c] sm:text-4xl">
                Create your Daan account.
              </h1>

              <p className="mt-3 text-base leading-7 text-[#64746a]">
                Join a community where people can seek support, give
                generously, and make a meaningful difference.
              </p>
            </div>

            {/* Registration form */}
            <div className="rounded-2xl border border-[#e0e9e2] bg-white p-5 shadow-[0_12px_40px_rgba(18,60,44,0.05)] sm:p-7">
              <RegisterForm />
            </div>

            {/* Trust message */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#dce8df] bg-[#edf5ef] p-4">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-[#218052]"
                aria-hidden="true"
              />

              <p className="text-sm leading-6 text-[#52645a]">
                <span className="font-bold text-[#173d2d]">
                  Built on trust and compassion.
                </span>{" "}
                Daan aims to connect people through reviewed requests
                and thoughtful support.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-2 border-t border-[#dce8df] pt-5 text-center text-xs text-[#64746a] sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Daan. All rights reserved.</p>

          <p>
            Made with{" "}
            <span className="font-semibold text-[#145c40]">care</span>{" "}
            for a kinder world.
          </p>
        </footer>
      </section>

      {/* Desktop brand panel */}
      <aside className="relative hidden overflow-hidden bg-[#123c2c] lg:flex lg:min-h-svh lg:flex-col lg:justify-between">
        {/* Decorative background */}
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

        {/* Top label */}
        <div className="relative z-10 flex justify-end px-10 py-9 xl:px-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-emerald-100">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-emerald-400"
            />
            A community built on trust
          </span>
        </div>

        {/* Main brand content */}
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-8 pb-12 text-center xl:px-16">
          <div className="relative mb-9 flex size-32 items-center justify-center rounded-[32px] border border-white/15 bg-white/[0.08] shadow-2xl shadow-black/10 backdrop-blur-sm">
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
            Be part of something
            <span className="mt-2 block text-emerald-300">
              truly meaningful.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-base leading-8 text-white/70 xl:text-lg">
            Every person has a story worth hearing. Daan brings together
            those seeking support and those willing to help, with dignity
            and compassion at the heart of every connection.
          </p>

          {/* Clickable community feature cards */}
          <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-3">
            {communityFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  title={feature.description}
                  aria-label={`${feature.title} ${feature.subtitle}: ${feature.description}`}
                  className="group flex min-w-0 flex-col items-center rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/[0.12] hover:shadow-lg hover:shadow-emerald-950/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#123c2c] sm:p-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/10 transition-colors duration-300 group-hover:bg-emerald-400/20">
                    <Icon
                      size={24}
                      className="text-emerald-300 transition-transform duration-300 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  </span>

                  <span className="mt-3 text-sm font-bold text-white">
                    {feature.title}
                  </span>

                  <span className="mt-1 text-xs leading-5 text-white/60">
                    {feature.subtitle}
                  </span>

                  <ArrowRight
                    size={14}
                    className="mt-2 text-emerald-300 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          {/* Mission link */}
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-emerald-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#123c2c]"
          >
            Discover our mission
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Bottom note */}
        <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 px-8 py-6 xl:px-14">
          <p className="text-xs leading-5 text-white/50">
            Every person deserves to be heard and helped.
          </p>

          <HeartHandshake
            size={20}
            className="shrink-0 text-emerald-300"
            aria-hidden="true"
          />
        </div>
      </aside>
    </main>
  );
}
