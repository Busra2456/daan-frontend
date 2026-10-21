
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

  const { data, isLoading, isError } = usePendingDonationRequests();

  const verifyMutation = useVerifyDonationRequest();
  const rejectMutation = useRejectDonationRequest();

  const [rejectingRequestId, setRejectingRequestId] =
    useState<string | null>(null);

  const [rejectionReason, setRejectionReason] = useState("");

  const requests = data?.data ?? [];

  function handleVerify(requestId: string) {
    verifyMutation.mutate(requestId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["pending-donation-requests"],
        });

        queryClient.invalidateQueries({
          queryKey: ["admin-all-donation-requests"],
        });
      },
    });
  }

  function handleReject(requestId: string) {
    const reason = rejectionReason.trim();

    if (!reason) return;

    rejectMutation.mutate(
      {
        requestId,
        rejectionReason: reason,
      },
      {
        onSuccess: () => {
          setRejectingRequestId(null);
          setRejectionReason("");

          queryClient.invalidateQueries({
            queryKey: ["pending-donation-requests"],
          });

          queryClient.invalidateQueries({
            queryKey: ["admin-all-donation-requests"],
          });
        },
      },
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 space-y-3">
            <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-full max-w-md animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
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

  // Error state
  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-rose-200 bg-white p-6 dark:border-rose-900 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Unable to load donation requests
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Something went wrong while loading pending requests. Please try
            refreshing the page.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
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
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <FaCheckCircle />
                ADMIN CONTROL
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
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
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                View All Requests
              </Link>

              <Link
                href="/admin-dashboard/users"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <FaUsers />
                Manage Users
              </Link>
            </div>
          </div>
        </header>

        {/* Pending summary */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              <FaMinus />
            </div>

            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Pending Requests
              </p>
              <p className="mt-1 text-3xl font-bold">{requests.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
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

        {/* Request section heading */}
        <div className="mb-5">
          <h2 className="text-xl font-bold sm:text-2xl">
            Donation Requests
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Review the information before verifying or rejecting a request.
          </p>
        </div>

        {/* Empty state */}
        {requests.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
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
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              View All Requests
            </Link>
          </section>
        ) : (
          /* Pending request cards */
          <section className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {requests.map((request) => {
              const isRejecting = rejectingRequestId === request.id;

              return (
                <article
                  key={request.id}
                  className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {request.situationImage ? (
                      <Image
                        src={request.situationImage}
                        alt={request.title || "Donation request"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                        No situation image
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Pending
                    </span>
                  </div>

                  {/* Request information */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="line-clamp-2 text-xl font-bold leading-7">
                      {request.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {request.description}
                    </p>

                    {/* Amount */}
                    <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/50">
                      <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        Required Amount
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                        <TbCurrencyTaka className="text-2xl" />
                        <span>
                          {Number(request.requiredAmount || 0).toLocaleString(
                            "en-BD",
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Needy user */}
                    <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Requested by
                      </p>

                      <p className="mt-1 break-words font-semibold">
                        {request.needy?.name || "Name not available"}
                      </p>

                      {request.needy?.address && (
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {request.needy.address}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto pt-5">
                      {isRejecting ? (
                        <div className="space-y-3 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/30">
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
                            className="w-full resize-y rounded-xl border border-rose-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-900 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-rose-900"
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
                                !rejectionReason.trim()
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
                            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
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
                              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
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
                              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
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
