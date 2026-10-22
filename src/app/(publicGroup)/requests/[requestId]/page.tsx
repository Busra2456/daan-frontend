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
    <main className="min-h-screen bg-[#f7faf7]">
      {/* Breadcrumb */}
      <div className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-800"
          >
            <ArrowLeft className="size-4" />
            Back to donation requests
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">
            <HeartHandshake className="size-4" />
            Daan • Donate with Trust
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Donation request details
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Every person deserves dignity, compassion, and a fair chance to
            receive support.
          </p>
        </div>

        {/* Request card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-2 bg-gradient-to-r from-emerald-900 via-emerald-600 to-lime-400" />

          <div className="p-6 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                  <FileSearch className="size-7" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Request reference
                  </p>

                  <h2 className="mt-2 break-all text-xl font-bold text-slate-900 sm:text-2xl">
                    #{requestId}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sign in to check whether this request is available to you.
                  </p>
                </div>
              </div>

              <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800">
                <LockKeyhole className="size-4" />
                Donor access required
              </div>
            </div>

            <div className="my-8 border-t border-dashed border-slate-200" />

            {/* Privacy notice */}
            <div className="rounded-2xl border border-emerald-100 bg-[#f3f8f3] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-6 shrink-0 text-emerald-800" />

                <div>
                  <h3 className="text-base font-bold text-emerald-950">
                    Verified giving matters
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Daan is designed to help donors review verified requests
                    before making a donation. Request details should only be
                    displayed after the backend confirms the request&apos
                    verification status and the viewer&apos permissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-900 hover:shadow-md"
              >
                Log in as a donor
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/requests"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900"
              >
                Explore requests
              </Link>
            </div>

            <p className="mt-6 text-center text-xs leading-5 text-slate-500">
              Please verify the request information before deciding to donate.
            </p>
          </div>
        </div>

        {/* Trust note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-700" />
          <p className="text-sm leading-6 text-slate-600">
            Protecting the privacy of people seeking assistance is an important
            part of trusted giving. Personal details should only be shared when
            authorized.
          </p>
        </div>
      </section>
    </main>
  );
}