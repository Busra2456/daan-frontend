"use client";

import { ChevronDown } from "lucide-react";

const DaanFAQs = () => {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          FAQs
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Questions About Daan?
        </h2>

        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
          Learn how requests, verification and giving work on Daan.
        </p>
      </div>

      <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900 sm:px-6">
        <details className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white">
            What is Daan?
            <ChevronDown
              size={20}
              className="shrink-0 text-emerald-600 transition-transform duration-200 group-open:rotate-180 dark:text-emerald-400"
            />
          </summary>
          <p className="mt-3 pr-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Daan is a platform designed to connect people seeking support with
            people who want to help through donations.
          </p>
        </details>

        <details className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white">
            How can someone request help?
            <ChevronDown
              size={20}
              className="shrink-0 text-emerald-600 transition-transform duration-200 group-open:rotate-180 dark:text-emerald-400"
            />
          </summary>
          <p className="mt-3 pr-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            A person seeking support can register, sign in, and submit a
            donation request with details about their situation. The request
            may then be reviewed by an administrator.
          </p>
        </details>

        <details className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white">
            What does request verification mean?
            <ChevronDown
              size={20}
              className="shrink-0 text-emerald-600 transition-transform duration-200 group-open:rotate-180 dark:text-emerald-400"
            />
          </summary>
          <p className="mt-3 pr-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Verification means an administrator has reviewed a request
            according to the platform&apos review process. It does not guarantee
            that every detail is independently confirmed or that a donation
            will be received.
          </p>
        </details>

        <details className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white">
            How can donors find people to support?
            <ChevronDown
              size={20}
              className="shrink-0 text-emerald-600 transition-transform duration-200 group-open:rotate-180 dark:text-emerald-400"
            />
          </summary>
          <p className="mt-3 pr-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Donors can explore the available donation requests and review the
            information provided before deciding whether to help.
          </p>
        </details>

        <details className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white">
            Does submitting a request guarantee a donation?
            <ChevronDown
              size={20}
              className="shrink-0 text-emerald-600 transition-transform duration-200 group-open:rotate-180 dark:text-emerald-400"
            />
          </summary>
          <p className="mt-3 pr-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            No. Submitting a request does not guarantee approval or financial
            assistance. Donations depend on donor decisions and the platform&apos
            available processes.
          </p>
        </details>
      </div>
    </section>
  );
};

export default DaanFAQs;