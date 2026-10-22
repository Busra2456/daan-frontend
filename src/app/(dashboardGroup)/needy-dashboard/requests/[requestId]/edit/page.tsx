import Link from "next/link";
import {
  ArrowLeft,
  HeartHandshake,
  ShieldCheck,
  FilePenLine,
} from "lucide-react";

import EditRequestForm from "@/app/(dashboardGroup)/needy-dashboard/_components/EditRequestForm";

interface EditRequestPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

export default async function EditRequestPage({
  params,
}: EditRequestPageProps) {
  const { requestId } = await params;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Navigation */}
        <Link
          href={`/needy-dashboard/requests/${requestId}`}
          className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to Request Details
        </Link>

        {/* Page Header */}
        <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white shadow-lg sm:p-8">
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 right-24 size-48 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-white/20 bg-white/15">
              <FilePenLine className="size-6" />
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
              <HeartHandshake className="size-4" />
              Daan — Donate with Trust
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Edit Donation Request
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
              Update your situation details so donors can better understand
              your needs and how they can support you.
            </p>
          </div>
        </section>

        {/* Verification Notice */}
        <div className="mb-6 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-400" />

          <div>
            <h2 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
              Keep your information accurate
            </h2>

            <p className="mt-1 text-sm leading-6 text-emerald-800 dark:text-emerald-200/80">
              Please provide clear and truthful information. Only requests
              with a PENDING status can be edited.
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 border-b border-slate-200 pb-5 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Request Information
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Review your details and save the changes when you are finished.
            </p>
          </div>

          <EditRequestForm requestId={requestId} />
        </section>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
          Daan connects people in need with people willing to help. Your
          honest information helps build trust.
        </p>
      </div>
    </main>
  );
}