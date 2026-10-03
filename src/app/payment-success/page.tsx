
"use client";

import { CheckCircle2, Heart, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-muted/20 px-4 py-12 sm:py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 size-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 size-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-xl">
        {/* Success Card */}
        <div className="overflow-hidden rounded-3xl border bg-background shadow-xl">
          {/* Top success section */}
          <div className="px-6 pb-8 pt-10 text-center sm:px-10 sm:pt-12">
            {/* Icon */}
            <div className="relative mx-auto flex size-20 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-500/10" />

              <div className="relative flex size-20 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
                <CheckCircle2 className="size-10 text-green-600" />
              </div>
            </div>

            <div className="mt-7">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-xs font-semibold text-green-700">
                <CheckCircle2 className="size-3.5" />
                Payment Completed
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                Donation Successful!
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                Thank you for your generous donation. Your payment has been
                completed successfully and your support can make a real
                difference in someone&apos;s life.
              </p>
            </div>
          </div>

          {/* Trust message */}
          <div className="mx-6 rounded-2xl border bg-muted/40 p-5 sm:mx-10">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Heart className="size-5 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold">Thank you for trusting Daan</h2>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Your contribution has been recorded. Together, we can help
                  people who genuinely need support.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-8 pt-6 sm:px-10 sm:pb-10">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/donor-dashboard"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Home className="size-4" />
                Donor Dashboard
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/donor-dashboard"
                className="inline-flex items-center justify-center rounded-xl border bg-background px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                View Donation History
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Thank you for choosing to make a difference with Daan. ❤️
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
