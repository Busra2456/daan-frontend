"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const donorGuidelines = [
  "Read the request details carefully",
  "Check the request verification status",
  "Understand the intended use of support",
  "Use the available secure payment process",
];

export default function ForDonors() {
  return (
    <section className="border-y bg-muted/20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-center lg:px-12 lg:py-24">
        {/* Donor Introduction */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
            For Donors
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Find a Cause That Matters to You.
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            Explore available requests, review their details and current
            status, and decide whether you want to contribute. Choose
            thoughtfully and use the information available to you.
          </p>

          <Link
            href="/requests"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            Browse Requests
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        {/* Donor Guidelines */}
        <div className="rounded-2xl border bg-background p-7 shadow-sm sm:p-10">
          <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck size={26} aria-hidden="true" />
          </div>

          <h3 className="mt-5 text-xl font-bold">
            Before You Contribute
          </h3>

          <div className="mt-6 space-y-5">
            {donorGuidelines.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-300"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium leading-6">{item}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 border-t pt-5 text-xs leading-6 text-muted-foreground">
            Review the information carefully. Verification indicates that
            a request has been reviewed; it does not guarantee every detail
            or outcome.
          </p>
        </div>
      </div>
    </section>
  );
}