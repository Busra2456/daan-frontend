"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="size-9 text-green-600" />
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
          Payment Successful
        </h1>

        <p className="mt-3 text-muted-foreground">
          Thank you for your donation. Your payment has been completed
          successfully.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/donor-dashboard"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Go to Donor Dashboard
          </Link>

          <Link
            href="/donor-dashboard"
            className="rounded-lg border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
          >
            View Donation History
          </Link>
        </div>
      </div>
    </main>
  );
}
