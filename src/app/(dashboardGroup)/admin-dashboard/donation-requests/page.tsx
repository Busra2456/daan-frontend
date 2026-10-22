"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  HeartHandshake,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useAllDonationRequests } from "@/hooks";
import {
  donationRequestSections,
  donationRequestStatusStyle,
} from "./_constants/donationRequest.constants";

export default function AllDonationRequestsPage() {
  const { data, isLoading, isError, refetch, isFetching } =
    useAllDonationRequests();

  const requests = data?.data ?? [];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 space-y-3">
            <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-72 max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-96 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-rose-200 bg-white p-6 dark:border-rose-900 dark:bg-slate-900 sm:p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 dark:bg-rose-950/40">
              <RefreshCw className="size-6 text-rose-600 dark:text-rose-400" />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
              Unable to load donation requests
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Something went wrong while loading the requests. Please try
              again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  const totalRequests = requests.length;

  const statusCounts = donationRequestSections.map((section) => ({
    ...section,
    total: requests.filter(
      (request) => request.status === section.status,
    ).length,
  }));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back navigation */}
        <Link
          href="/admin-dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to Admin Dashboard
        </Link>

        {/* Page header */}
        <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white shadow-lg sm:p-8">
          <div className="absolute -right-12 -top-12 size-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-28 size-56 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-white/20 bg-white/15">
              <ClipboardList className="size-6" />
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium">
              <HeartHandshake className="size-4" />
              Daan — Donate with Trust
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              All Donation Requests
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
              Monitor requests submitted by people in need, review their
              progress, and keep the donation verification process transparent.
            </p>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Requests
              </p>
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
                <ClipboardList className="size-5 text-emerald-700 dark:text-emerald-400" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums">
              {totalRequests.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              All request statuses
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Awaiting Review
              </p>
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/40">
                <ShieldCheck className="size-5 text-amber-700 dark:text-amber-400" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums">
              {(
                statusCounts.find((section) => section.status === "PENDING")
                  ?.total ?? 0
              ).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Pending verification
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Completed
              </p>
              <div className="flex size-10 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/40">
                <HeartHandshake className="size-5 text-teal-700 dark:text-teal-400" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold tabular-nums">
              {(
                statusCounts.find((section) => section.status === "COMPLETED")
                  ?.total ?? 0
              ).toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Requests marked completed
            </p>
          </div>
        </section>

        {/* Empty state */}
        {totalRequests === 0 ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-slate-700 dark:bg-slate-900 sm:px-8">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40">
              <ClipboardList className="size-7 text-emerald-700 dark:text-emerald-400" />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No donation requests yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              New requests will appear here when people submit their needs
              through Daan.
            </p>

            <Link
              href="/admin-dashboard"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              Return to Dashboard
              <ArrowRight className="size-4" />
            </Link>
          </section>
        ) : (
          /* Requests grouped by status */
          <div className="space-y-12">
            {statusCounts.map((section) => {
              if (section.total === 0) return null;

              const sectionRequests = requests
                .filter((request) => request.status === section.status)
                .slice(0, 3);

              return (
                <section key={section.status}>
                  <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-bold sm:text-2xl">
                          {section.title}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${donationRequestStatusStyle[section.status]}`}
                        >
                          {section.total}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Showing {sectionRequests.length} of {section.total}{" "}
                        requests
                      </p>
                    </div>

                    <Link
                      href={section.showMore}
                      className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                    >
                      Show All
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {sectionRequests.map((request) => (
                      <article
                        key={request.id}
                        className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
                      >
				{/* Request Situation Image */}
<div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
  {request.situationImage ? (
    <Image
      src={request.situationImage}
      alt={`Situation photo for ${request.title}`}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-300 hover:scale-105"
    />
  ) : (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
      <ImageOff className="size-9" />
      <span className="text-xs">
        No situation image uploaded
      </span>
    </div>
  )}
</div>
                        <div className="flex-1 p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="line-clamp-2 min-w-0 text-lg font-semibold leading-7">
                              {request.title}
                            </h3>

                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${donationRequestStatusStyle[request.status]}`}
                            >
                              {request.status}
                            </span>
                          </div>

                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {request.description}
                          </p>

                          <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                              Required Amount
                            </p>

                            <div className="mt-1 flex items-center gap-1 text-emerald-800 dark:text-emerald-300">
                              <TbCurrencyTaka className="size-7 shrink-0" />
                              <span className="text-2xl font-bold tabular-nums">
                                {Number(
                                  request.requiredAmount,
                                ).toLocaleString("en-BD")}
                              </span>
                            </div>
                          </div>

                          <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              Requested by
                            </p>

                            <p className="mt-1 break-words font-semibold text-slate-900 dark:text-slate-100">
                              {request.needy.name}
                            </p>

                            <p className="mt-1 break-all text-sm text-slate-600 dark:text-slate-400">
                              {request.needy.email}
                            </p>

                            {request.status === "REJECTED" &&
                              request.rejectionReason && (
                                <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 dark:border-rose-900 dark:bg-rose-950/30">
                                  <p className="text-xs font-semibold text-rose-800 dark:text-rose-300">
                                    Rejection Reason
                                  </p>
                                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-5 text-rose-700 dark:text-rose-200">
                                    {request.rejectionReason}
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>

                        <div className="border-t border-slate-200 p-5 dark:border-slate-800">
                          <Link
                            href={`/admin-dashboard/donation-requests/${request.id}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:focus-visible:ring-offset-slate-900"
                          >
                            View Details
                            <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <footer className="mt-12 border-t border-slate-200 pt-5 text-center dark:border-slate-800">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            Daan — Donate with Trust. Transparent requests, meaningful support.
          </p>
        </footer>
      </div>
    </main>
  );
}