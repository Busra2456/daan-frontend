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

export default function RegisterPage() {
  return (
    <main className="min-h-svh bg-[#f7faf7] text-[#173d2d] lg:grid lg:grid-cols-2">
      {/* Left Side: Registration */}
      <section className="flex min-h-svh flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 xl:px-20">
        {/* Brand */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            aria-label="Back to Daan homepage"
            className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-4"
          >
            <Image
              src="/daanlogo.png"
              alt="Daan logo"
              width={46}
              height={46}
              priority
              className="size-[46px] object-contain"
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
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-[#52645a] transition-colors hover:text-[#145c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </header>

        {/* Registration Form */}
        <div className="flex flex-1 items-center justify-center py-10 sm:py-14">
          <div className="w-full max-w-[440px]">
            <div className="mb-7">
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl border border-[#dce8df] bg-white text-[#145c40] shadow-sm">
                <HeartHandshake className="size-6" aria-hidden="true" />
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

            <div className="rounded-2xl border border-[#e0e9e2] bg-white p-5 shadow-[0_12px_40px_rgba(18,60,44,0.05)] sm:p-7">
              <RegisterForm />
            </div>

            {/* Trust Message */}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#dce8df] bg-[#edf5ef] p-4">
              <ShieldCheck
                className="mt-0.5 size-5 shrink-0 text-[#218052]"
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
          <p>
            © {new Date().getFullYear()} Daan. All rights reserved.
          </p>

          <p>
            Made with{" "}
            <span className="font-semibold text-[#145c40]">care</span>{" "}
            for a kinder world.
          </p>
        </footer>
      </section>

      {/* Right Side: Brand Experience */}
      <aside className="relative hidden overflow-hidden bg-[#123c2c] lg:flex lg:min-h-svh lg:flex-col lg:justify-between">
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
        <div className="relative z-10 flex justify-end px-10 py-9 xl:px-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-emerald-100">
            <span className="size-2 rounded-full bg-emerald-400" />
            A community built on trust
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-8 pb-12 text-center xl:px-16">
          <div className="relative mb-9 flex size-32 items-center justify-center rounded-[32px] border border-white/15 bg-white/[0.08] shadow-2xl shadow-black/10 backdrop-blur-sm">
            <div className="absolute inset-2 rounded-[25px] border border-emerald-300/15" />

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

          {/* Feature Cards */}
          <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <ShieldCheck
                className="mx-auto size-6 text-emerald-300"
                aria-hidden="true"
              />

              <p className="mt-3 text-sm font-bold text-white">
                Reviewed
              </p>

              <p className="mt-1 text-xs leading-5 text-white/55">
                Requests
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <HeartHandshake
                className="mx-auto size-6 text-emerald-300"
                aria-hidden="true"
              />

              <p className="mt-3 text-sm font-bold text-white">
                Thoughtful
              </p>

              <p className="mt-1 text-xs leading-5 text-white/55">
                Giving
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm">
              <Users
                className="mx-auto size-6 text-emerald-300"
                aria-hidden="true"
              />

              <p className="mt-3 text-sm font-bold text-white">
                Connected
              </p>

              <p className="mt-1 text-xs leading-5 text-white/55">
                Community
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-emerald-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#123c2c]"
          >
            Discover our mission
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Bottom Note */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-10 py-6 xl:px-14">
          <p className="text-xs text-white/50">
            Every person deserves to be heard and helped.
          </p>

          <HeartHandshake
            className="size-5 text-emerald-300"
            aria-hidden="true"
          />
        </div>
      </aside>
    </main>
  );
}
