
"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaCheckCircle,
  FaMinus,
  FaSpinner,
  FaUsers,
} from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

import {
  usePendingDonationRequests,
  useRejectDonationRequest,
  useVerifyDonationRequest,
} from "@/hooks";

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = usePendingDonationRequests();

  const verifyMutation = useVerifyDonationRequest();
  const rejectMutation = useRejectDonationRequest();

  const [rejectingRequestId, setRejectingRequestId] =
    useState<string | null>(null);

  const [rejectionReason, setRejectionReason] = useState("");
  const requests = data?.data ?? [];

  function invalidateRequestQueries() {
    void queryClient.invalidateQueries({
      queryKey: ["pending-donation-requests"],
    });

    void queryClient.invalidateQueries({
      queryKey: ["admin-all-donation-requests"],
    });
  }

  function handleVerify(requestId: string) {
    verifyMutation.mutate(requestId, {
      onSuccess: invalidateRequestQueries,
    });
  }

  function handleReject(requestId: string) {
    const reason = rejectionReason.trim();

    if (!reason || reason.length > 1000) return;

    rejectMutation.mutate(
      {
        requestId,
        rejectionReason: reason,
      },
      {
        onSuccess: () => {
          setRejectingRequestId(null);
          setRejectionReason("");
          invalidateRequestQueries();
        },
      },
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 space-y-3">
            <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-full max-w-md animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="aspect-[16/9] animate-pulse bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm dark:border-rose-900/50 dark:bg-slate-900 sm:p-12">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
            <FaMinus className="size-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold">
            Unable to load donation requests
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Something went wrong while loading pending requests. Please try
            again.
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Dashboard header */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold tracking-wide text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300">
                <FaCheckCircle />
                DAAN ADMINISTRATION
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Review donation requests, verify genuine needs, and help
                donors make informed decisions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin-dashboard/donation-requests"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
              >
                View All Requests
              </Link>

              <Link
                href="/admin-dashboard/users"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
              >
                <FaUsers />
                Manage Users
              </Link>
            </div>
          </div>
        </header>

        {/* Pending summary */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <FaMinus />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Pending Requests
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">
                {requests.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <FaCheckCircle />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Review Queue
              </p>
              <p className="mt-1 text-sm font-semibold">
                {requests.length > 0
                  ? "Requests awaiting review"
                  : "No requests awaiting review"}
              </p>
            </div>
          </div>
        </section>

        {/* Request heading */}
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Donation Requests
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Review the information before verifying or rejecting a request.
          </p>
        </div>

        {/* Empty state */}
        {requests.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              <FaCheckCircle />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              No pending requests
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
              There are currently no donation requests waiting for
              verification. New requests will appear here when available.
            </p>

            <Link
              href="/admin-dashboard/donation-requests"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              View All Requests
            </Link>
          </section>
        ) : (
          /* Pending request cards */
          <section className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {requests.map((request) => {
              const isRejecting = rejectingRequestId === request.id;
              const requiredAmount = Number(request.requiredAmount);
              const validAmount =
                Number.isFinite(requiredAmount) && requiredAmount >= 0;

              return (
                <article
                  key={request.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
                >
                  {/* Situation image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {request.situationImage ? (
                      <Image
                        src={request.situationImage}
                        alt={`Situation evidence for ${request.title || "donation request"}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                        <FaUsers className="size-8" />
                        <span className="text-xs font-medium">
                          No situation image
                        </span>
                      </div>
                    )}

                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800 shadow-sm dark:border-amber-900/60 dark:bg-amber-950/80 dark:text-amber-300">
                      <span className="size-1.5 rounded-full bg-amber-500" />
                      PENDING
                    </span>
                  </div>

                  {/* Request information */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="line-clamp-2 text-xl font-bold leading-7 tracking-tight text-slate-900 dark:text-white">
                      {request.title || "Untitled donation request"}
                    </h3>

                    <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {request.description || "No description provided."}
                    </p>

                    {/* Required amount */}
                    <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/80 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                      <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300/80">
                        Required Amount
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-2xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-300">
                        <TbCurrencyTaka className="shrink-0 text-2xl" />
                        <span className="break-words">
                          {validAmount
                            ? requiredAmount.toLocaleString("en-BD", {
                                maximumFractionDigits: 2,
                              })
                            : "Amount unavailable"}
                        </span>
                      </div>
                    </div>

                    {/* Requester information */}
                    <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Requested by
                      </p>

                      <p className="mt-1 break-words text-sm font-bold text-slate-900 dark:text-white">
                        {request.needy?.name || "Name unavailable"}
                      </p>

                      {request.needy?.email && (
                        <p className="mt-1 break-all text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {request.needy.email}
                        </p>
                      )}

                      {request.needy?.address && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {request.needy.address}
                        </p>
                      )}
                    </div>

                    {/* Request actions */}
                    <div className="mt-auto pt-5">
                      {isRejecting ? (
                        <div className="space-y-3 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
                          <label
                            htmlFor={`rejection-${request.id}`}
                            className="block text-sm font-semibold text-rose-800 dark:text-rose-300"
                          >
                            Rejection Reason
                          </label>

                          <textarea
                            id={`rejection-${request.id}`}
                            value={rejectionReason}
                            onChange={(event) =>
                              setRejectionReason(event.target.value)
                            }
                            placeholder="Explain why this request is being rejected..."
                            rows={4}
                            maxLength={1000}
                            disabled={rejectMutation.isPending}
                            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                          />

                          <p className="text-right text-xs text-slate-500 dark:text-slate-400">
                            {rejectionReason.length}/1000
                          </p>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleReject(request.id)}
                              disabled={
                                rejectMutation.isPending ||
                                !rejectionReason.trim() ||
                                rejectionReason.trim().length > 1000
                              }
                              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {rejectMutation.isPending && (
                                <FaSpinner className="animate-spin" />
                              )}
                              {rejectMutation.isPending
                                ? "Rejecting..."
                                : "Confirm Reject"}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setRejectingRequestId(null);
                                setRejectionReason("");
                              }}
                              disabled={rejectMutation.isPending}
                              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Link
                            href={`/admin-dashboard/donation-requests/${request.id}`}
                            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                          >
                            View Details
                          </Link>

                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              disabled={
                                verifyMutation.isPending ||
                                rejectMutation.isPending
                              }
                              onClick={() => handleVerify(request.id)}
                              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-900"
                            >
                              {verifyMutation.isPending ? (
                                <FaSpinner className="animate-spin" />
                              ) : (
                                <FaCheckCircle />
                              )}
                              {verifyMutation.isPending
                                ? "Verifying..."
                                : "Verify"}
                            </button>

                            <button
                              type="button"
                              disabled={
                                verifyMutation.isPending ||
                                rejectMutation.isPending
                              }
                              onClick={() => {
                                setRejectingRequestId(request.id);
                                setRejectionReason("");
                              }}
                              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/70 dark:focus-visible:ring-offset-slate-900"
                            >
                              <FaMinus />
                              Reject
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 pt-5 text-center dark:border-slate-800">
          <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
            Daan — Donate with Trust. Review requests carefully and treat every
            person with dignity.
          </p>
        </footer>
      </div>
    </main>
  );
}
