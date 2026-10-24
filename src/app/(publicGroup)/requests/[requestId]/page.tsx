import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  LockKeyhole,
  FileSearch,
} from "lucide-react";

interface RequestDetailsPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

export default async function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  const { requestId } = await params;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to donation requests
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-800 dark:text-emerald-300">
            <HeartHandshake className="size-4" aria-hidden="true" />
            Daan • Donate with Trust
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Donation request details
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            Every person deserves dignity, compassion, and a fair chance to
            receive support.
          </p>
        </div>

        {/* Request card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="h-2 bg-gradient-to-r from-emerald-900 via-emerald-600 to-lime-400" />

          <div className="p-6 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <FileSearch className="size-7" aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Request reference
                  </p>

                  <h2 className="mt-2 break-all text-xl font-bold text-foreground sm:text-2xl">
                    #{requestId}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Sign in to check whether this request is available to you.
                  </p>
                </div>
              </div>

              <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <LockKeyhole className="size-4" aria-hidden="true" />
                Donor access required
              </div>
            </div>

            <div className="my-8 border-t border-dashed border-border" />

            {/* Privacy notice */}
            <div className="rounded-2xl border border-emerald-600/20 bg-emerald-500/5 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 size-6 shrink-0 text-emerald-700 dark:text-emerald-400"
                  aria-hidden="true"
                />

                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Verified giving matters
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Daan is designed to help donors review verified requests
                    before making a donation. Request details should only be
                    displayed after the backend confirms the request&apos;s
                    verification status and the viewer&apos;s permissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-800 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-card"
              >
                Log in as a donor
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>

              <Link
                href="/requests"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-emerald-600/40 hover:bg-emerald-500/5"
              >
                Explore requests
              </Link>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
              Please verify the request information before deciding to donate.
            </p>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <ShieldCheck
            className="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-400"
            aria-hidden="true"
          />

          <p className="text-sm leading-6 text-muted-foreground">
            Protecting the privacy of people seeking assistance is an important
            part of trusted giving. Personal details should only be shared when
            authorized.
          </p>
        </div>
      </section>
    </main>
  );
}
