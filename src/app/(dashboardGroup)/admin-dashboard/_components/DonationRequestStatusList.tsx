"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CircleAlert,
  ExternalLink,
  Heart,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

import { useAllDonationRequests } from "@/hooks";
import type {
  DonationRequest,
  DonationRequestStatus,
} from "@/types/donation-request.type";

interface DonationRequestStatusListProps {
  title: string;
  description: string;
  status: DonationRequestStatus;
}

function getStatusStyle(status: DonationRequestStatus): string {
  switch (status) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300";

    case "VERIFIED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300";

    case "DONATIONS":
      return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-300";

    case "COMPLETED":
      return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300";

    case "REJECTED":
      return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300";

    default:
      return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

function formatDate(date?: string | Date | null): string | null {
  if (!date) return null;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return null;

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
}

function formatAmount(amount: unknown): string {
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
    return "Amount unavailable";
  }

  return parsedAmount.toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  });
}

function RequestImage({
  src,
  title,
}: {
  src?: string | null;
  title: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
      {src && !imageFailed ? (
        <Image
          src={src}
          alt={`Situation evidence for ${title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
          <Heart className="size-9 stroke-[1.5]" />
          <span className="text-xs font-medium">
            No situation image available
          </span>
        </div>
      )}
    </div>
  );
}

function RequestCard({ request }: { request: DonationRequest }) {
  const createdDate = formatDate(request.createdAt);
  const amount = formatAmount(request.requiredAmount);

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900">
      {/* Situation image */}
      <div className="relative">
        <RequestImage
          src={request.situationImage}
          title={request.title}
        />

        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-extrabold tracking-wide shadow-sm ${getStatusStyle(request.status)}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Title and description */}
        <h2 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 tracking-tight text-slate-900 dark:text-white">
          {request.title}
        </h2>

        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600 dark:text-slate-400">
          {request.description}
        </p>

        {/* Required amount */}
        <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/80 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300/80">
            Required Amount
          </p>

          <div className="mt-1 flex items-center gap-1 text-emerald-800 dark:text-emerald-300">
            {amount !== "Amount unavailable" && (
              <TbCurrencyTaka className="size-7 shrink-0" />
            )}

            <span className="min-w-0 break-words text-2xl font-extrabold tracking-tight">
              {amount}
            </span>
          </div>
        </div>

        {/* Requester details */}
        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <UserRound className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Requested by
              </p>

              <p className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white">
                {request.needy?.name || "Name unavailable"}
              </p>

              <p className="mt-1 break-all text-xs leading-5 text-slate-500 dark:text-slate-400">
                {request.needy?.email || "Email unavailable"}
              </p>
            </div>
          </div>

          {/* Rejection reason */}
          {request.status === "REJECTED" && request.rejectionReason && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 dark:border-rose-900/50 dark:bg-rose-950/30">
              <p className="text-xs font-bold text-rose-700 dark:text-rose-300">
                Rejection Reason
              </p>

              <p className="mt-1 line-clamp-3 text-sm leading-5 text-rose-700 dark:text-rose-300">
                {request.rejectionReason}
              </p>
            </div>
          )}

          {/* Submitted date */}
          {createdDate && (
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <CalendarDays className="size-4 shrink-0" />
              <span>Submitted {createdDate}</span>
            </div>
          )}
        </div>

        {/* Details button */}
        <div className="mt-auto pt-5">
          <Link
            href={`/admin-dashboard/donation-requests/${request.id}`}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            View Details
            <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function RequestsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="aspect-[16/10] animate-pulse bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-4 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-11 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DonationRequestStatusList({
  title,
  description,
  status,
}: DonationRequestStatusListProps) {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAllDonationRequests();

  const allRequests: DonationRequest[] = data?.data ?? [];

  const requests = allRequests.filter(
    (request) => request.status === status,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8">
          <Link
            href="/admin-dashboard/donation-requests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" />
            Back to All Requests
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                <ShieldCheck className="size-4" />
                Daan Administration
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Refreshing..." : "Refresh Requests"}
            </button>
          </div>

          {/* Status summary */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-bold ${getStatusStyle(status)}`}
            >
              {status}
            </span>

            <span className="text-sm text-slate-500 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">
                {requests.length}
              </strong>{" "}
              {requests.length === 1 ? "request" : "requests"} found
            </span>
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <RequestsSkeleton />
        ) : isError ? (
          /* Error state */
          <div className="rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm dark:border-rose-900/50 dark:bg-slate-900 sm:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
              <CircleAlert className="size-7" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              Unable to load requests
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Something went wrong while loading donation requests. Please try
              again.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Retrying..." : "Try Again"}
            </button>
          </div>
        ) : requests.length === 0 ? (
          /* Empty state */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900 sm:px-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Heart className="size-8" />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No {status.toLowerCase()} requests
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              There are currently no donation requests in this section. New
              requests will appear here when available.
            </p>

            <Link
              href="/admin-dashboard/donation-requests"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              View All Requests
              <ExternalLink className="size-4" />
            </Link>
          </div>
        ) : (
          /* Request cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        )}

        {/* Footer note */}
        {!isLoading && !isError && requests.length > 0 && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Review each request carefully and verify the provided information
              before taking moderation action.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
