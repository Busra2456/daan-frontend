import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

import { ResetPasswordForm } from "../../_components/ResetPasswordForm";

function ResetPasswordLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-10 text-center"
    >
      <div className="size-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 dark:border-emerald-950 dark:border-t-emerald-400" />

      <p className="mt-4 text-sm font-medium text-muted-foreground">
        Loading password reset...
      </p>
    </div>
  );
}

export default function VerifyResetPasswordPage() {
  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6">
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
            className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
              <span className="text-2xl font-black leading-none tracking-tight text-foreground">
                daan
                <span className="text-emerald-600 dark:text-emerald-400">
                  .
                </span>
              </span>

              <span className="mt-1.5 text-xs font-medium tracking-wide text-muted-foreground">
                Donate with Trust
              </span>
            </span>
          </Link>
        </div>

        {/* Reset Password Card */}
        <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-[0_16px_50px_rgba(18,60,44,0.07)] dark:shadow-black/20 sm:p-9">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
              <ShieldCheck className="size-8" aria-hidden="true" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Account Recovery
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Reset Your Password
            </h1>

            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
              Create a new password to regain access to your Daan
              account and continue your journey with our community.
            </p>
          </div>

          {/* Existing Reset Form */}
          <Suspense fallback={<ResetPasswordLoading />}>
            <ResetPasswordForm />
          </Suspense>

          {/* Security Message */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
            <HeartHandshake
              className="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-400"
              aria-hidden="true"
            />

            <p className="text-sm leading-6 text-muted-foreground">
              <span className="font-bold text-foreground">
                Keep your account secure.
              </span>{" "}
              Choose a strong password and never share it with anyone.
            </p>
          </div>
        </section>

        {/* Back to Login */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-6 border-t border-border pt-5 text-center text-xs leading-6 text-muted-foreground">
          <p>© {new Date().getFullYear()} Daan. All rights reserved.</p>

          <p>
            Made with{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              care
            </span>{" "}
            for a kinder world.
          </p>

          <Link
            href="/about"
            className="mt-1 inline-flex items-center gap-1 rounded-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Learn more about Daan
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
