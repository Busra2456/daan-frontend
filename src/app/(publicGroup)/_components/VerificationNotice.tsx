import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function VerificationNotice() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="group relative overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-emerald-900/70 dark:bg-slate-950">
        {/* Subtle decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10"
        />

        <div className="relative flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-12">
          {/* Information */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
              <ShieldCheck size={17} aria-hidden="true" />
              A Careful Process
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-slate-50">
              Verification Helps Donors Make{" "}
              <span className="text-emerald-700 dark:text-emerald-400">
                Informed Choices.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">
              A verified status means a request has passed through Daan&apos;s
              review process. It does not guarantee that every claim is
              accurate or that a particular outcome is assured. Review the
              available information carefully before deciding to contribute.
            </p>

            <div className="mt-6 flex items-start gap-3">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Make thoughtful decisions based on the information available
                for each request.
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
            <Link
              href="/how-it-works"
              className="group/link inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-slate-950"
            >
              How It Works
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/link:translate-x-1"
              />
            </Link>

            <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
              Transparency matters at every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}