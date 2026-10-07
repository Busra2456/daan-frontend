import Link from "next/link";
import { ArrowLeft, Home, RefreshCcw, XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
          <XCircle className="h-12 w-12 text-red-600" strokeWidth={2} />
        </div>

        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-red-600">
          Payment Failed
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Payment Unsuccessful
        </h1>

        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Unfortunately, your payment could not be completed. No donation
          amount was successfully processed. Please try again or return to
          your dashboard.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/donor-dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <RefreshCcw className="h-4 w-4" />
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
            If money was deducted from your account, please wait a moment and
            check your donation history before trying again.
          </p>
        </div>
      </div>
    </main>
  );
}