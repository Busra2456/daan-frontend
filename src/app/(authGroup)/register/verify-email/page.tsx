import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, HeartHandshake, ShieldCheck } from "lucide-react";

import VerifyEmailForm from "../../_components/VerifyEmailForm";

function VerifyEmailLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <div className="size-10 animate-spin rounded-full border-4 border-[#dce8df] border-t-[#218052]" />

      <p className="mt-4 text-sm font-medium text-[#64746a]">
        Loading email verification...
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#f7faf7] px-4 py-8 text-[#173d2d] sm:px-6">
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 -z-10 size-80 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 -z-10 size-80 rounded-full bg-emerald-600/10 blur-3xl"
      />

      <div className="w-full max-w-[440px]">
        {/* Brand */}
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            aria-label="Back to Daan homepage"
            className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40] focus-visible:ring-offset-4"
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
        </div>

        {/* Verification Card */}
        <section className="rounded-3xl border border-[#e0e9e2] bg-white p-6 shadow-[0_16px_50px_rgba(18,60,44,0.07)] sm:p-9">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-[#dce8df] bg-[#edf5ef] text-[#145c40]">
              <ShieldCheck className="size-8" aria-hidden="true" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#218052]">
              Account Security
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#123c2c] sm:text-4xl">
              Verify Your Email
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#64746a] sm:text-base">
              One small step to get started. Verify your email address
              to continue your journey with Daan.
            </p>
          </div>

          {/* Existing Verification Form */}
          <Suspense fallback={<VerifyEmailLoading />}>
            <VerifyEmailForm />
          </Suspense>

          {/* Security Note */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#dce8df] bg-[#edf5ef] p-4">
            <HeartHandshake
              className="mt-0.5 size-5 shrink-0 text-[#218052]"
              aria-hidden="true"
            />

            <p className="text-sm leading-6 text-[#52645a]">
              <span className="font-bold text-[#173d2d]">
                Your trust matters.
              </span>{" "}
              Protect your account and help keep the Daan community
              safer for everyone.
            </p>
          </div>
        </section>

        {/* Back to Login */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#52645a] transition-colors hover:text-[#145c40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#145c40]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-6 border-t border-[#dce8df] pt-5 text-center text-xs leading-6 text-[#64746a]">
          © {new Date().getFullYear()} Daan. All rights reserved.
          <p>
            Made with{" "}
            <span className="font-semibold text-[#145c40]">care</span>{" "}
            for a kinder world.
          </p>
        </footer>
      </div>
    </main>
  );
}
