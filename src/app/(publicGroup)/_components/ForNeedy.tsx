import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function ForNeedy() {
  return (
    <section className="border-y border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center lg:px-12 lg:py-24">
        {/* Left: Request Information Card */}
        <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-lg sm:p-10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-500/10"
          />

          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-transform duration-300 group-hover:scale-105 dark:bg-emerald-950 dark:text-emerald-300">
              <HeartHandshake size={28} aria-hidden="true" />
            </div>

            <p className="mt-6 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              Your Story Deserves to Be Heard
            </p>

            <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
              Explain What You Need.
            </h3>

            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              Share relevant details about your circumstances and the
              support you are seeking. Your request will follow Daan&apos;s
              review process before it can be presented as verified.
            </p>

            <div className="mt-7 space-y-4 border-t border-slate-200 pt-6 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <FileText
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    Describe Your Situation
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Provide clear, accurate information about your needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-700 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    Follow the Review Process
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Check your request status as it moves through review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Call to Action */}
        <div className="md:pl-2">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
            For People Seeking Help
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-slate-50">
            Ask for Support{" "}
            <span className="text-emerald-700 dark:text-emerald-400">
              with Dignity.
            </span>
          </h2>

          <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
            Everyone deserves the opportunity to explain their circumstances
            with dignity. Create an account to submit a request, provide
            relevant information, and follow its progress through Daan.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Share accurate information and upload only photos, videos, or
            other media you have permission to share. Avoid publishing
            sensitive personal information unnecessarily.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-slate-950"
            >
              Create an Account
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-800 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
            >
              Learn About Daan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}