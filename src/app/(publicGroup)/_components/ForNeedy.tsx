import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  FileText,
  ShieldCheck,
} from "lucide-react";

export default function ForNeedy() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center lg:px-12 lg:py-24">
        {/* Left: Request Information Card */}
        <div className="relative rounded-3xl border border-border/70 bg-muted/20 p-7 shadow-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-emerald-500/10 blur-3xl"
          />

          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <HeartHandshake size={28} aria-hidden="true" />
            </div>

            <p className="mt-6 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Your Story Deserves to Be Heard
            </p>

            <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Explain What You Need.
            </h3>

            <p className="mt-4 leading-7 text-muted-foreground">
              Share relevant details about your circumstances and the
              support you are seeking. Your request will follow Daan&apos;s
              review process before it can be presented as verified.
            </p>

            <div className="mt-7 space-y-4 border-t border-border/70 pt-6">
              <div className="flex items-start gap-3">
                <FileText
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">Describe Your Situation</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Provide clear, accurate information about your needs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold">Follow the Review Process</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Check your request status as it moves through review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Call to Action */}
        <div className="md:pl-2">
          <span className="inline-flex rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            For People Seeking Help
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ask for Support{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              with Dignity.
            </span>
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            Everyone deserves the opportunity to explain their circumstances
            with dignity. Create an account to submit a request, provide
            relevant information, and follow its progress through Daan.
          </p>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Share accurate information and upload only photos, videos, or
            other media you have permission to share. Avoid publishing
            sensitive personal information unnecessarily.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              Create an Account
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3.5 font-semibold transition hover:bg-muted"
            >
              Learn About Daan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}