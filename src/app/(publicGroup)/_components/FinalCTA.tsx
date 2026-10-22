"use client";

import Link from "next/link";
import { ArrowRight, HeartHandshake, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 lg:py-24">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
          <HeartHandshake size={30} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          Take the First Step
        </p>

        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          A Little Kindness Can Mean a Lot.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600 dark:text-slate-400">
          Explore available donation requests, learn about the situations
          people share, and make an informed decision about how you can help.
          Every act of giving begins with understanding.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/requests"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400 dark:focus-visible:ring-offset-slate-950"
          >
            Explore Requests
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/register"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-emerald-600 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-emerald-400 dark:hover:bg-slate-800"
          >
            <Sparkles size={17} />
            Join Daan
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          Give thoughtfully. Help respectfully. Donate with trust.
        </p>
      </div>
    </section>
  );
}