
import { ArrowLeft, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";

import CreateRequestForm from "../_components/CreateRequestForm";

export default function CreateRequestPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Navigation */}
        <Link
          href="/needy-dashboard"
          className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-emerald-600 px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <HeartHandshake className="h-8 w-8" />
            </div>

            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-100">
              Daan — Donate with Trust
            </p>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Create a Donation Request
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
              Share your situation honestly so donors can understand your
              needs and decide how they can help.
            </p>
          </div>

          {/* Trust Information */}
          <div className="flex items-start gap-3 px-6 py-5 sm:px-8">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Your request will be reviewed
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Provide accurate information and supporting media if
                available. Your request must be verified by the Daan admin
                before it becomes visible to donors.
              </p>
            </div>
          </div>
        </section>

        {/* Request Form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 border-b border-slate-100 pb-5 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Request Details
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Explain your circumstances and the amount of support you need.
            </p>
          </div>

          <CreateRequestForm />
        </section>

        {/* Privacy Reminder */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
          Please share only information you are comfortable making available
          to reviewers and potential donors. Do not include passwords or
          sensitive account details.
        </p>
      </div>
    </main>
  );
}
