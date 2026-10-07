import Link from "next/link";
import {
  ArrowLeft,
  Home,
  RotateCcw,
  CircleOff,
} from "lucide-react";

export default function PaymentCancelledPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/40">
          <CircleOff
            className="h-12 w-12 text-amber-600"
            strokeWidth={2}
          />
        </div>

        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-amber-600">
          Payment Cancelled
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Payment Was Cancelled
        </h1>

        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Your payment process was cancelled before completion. No donation
          amount was successfully processed. You can try again whenever you
          are ready.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/donor-dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-muted"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        <Link
          href="/donor-dashboard"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Donor Dashboard
        </Link>

        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Your donation has not been completed. You can safely return to
            your dashboard and start the payment process again.
          </p>
        </div>
      </div>
    </main>
  );
}