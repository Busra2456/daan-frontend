"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartHandshake,
  LoaderCircle,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Wallet,
} from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

import {
  deleteDonationRequest,
  getMyDonationRequests,
  getReceivedDonations,
} from "@/api";
import type { MyDonationRequestsResponse } from "@/types/donation-request.type";

function getStatusStyles(status: string) {
  switch (status.toUpperCase()) {
    case "VERIFIED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300";

    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300";

    case "REJECTED":
      return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300";

    case "COMPLETED":
      return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-300";

    case "DONATIONS":
      return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300";

    default:
      return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatAmount(amount: string | number) {
  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
    return "0";
  }

  return parsedAmount.toLocaleString("en-BD");
}

export default function NeedyDashboardPage() {
  const queryClient = useQueryClient();

  const [deletingRequestId, setDeletingRequestId] = useState<string | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<MyDonationRequestsResponse>({
    queryKey: ["my-donation-requests"],
    queryFn: getMyDonationRequests,
  });

  const {
    data: receivedData,
    isLoading: isReceivedLoading,
    isError: isReceivedError,
    refetch: refetchReceived,
  } = useQuery({
    queryKey: ["received-donations"],
    queryFn: getReceivedDonations,
  });

  const { mutateAsync: deleteRequest, isPending: isDeleting } = useMutation({
    mutationFn: deleteDonationRequest,
  });

  const requests = data?.data ?? [];

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING",
  ).length;

  const verifiedRequests = requests.filter(
    (request) => request.status === "VERIFIED",
  ).length;

  const rawTotalReceived = receivedData?.data?.totalReceived;
  const totalReceived = Number(rawTotalReceived ?? 0);

  const handleDelete = async (requestId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this donation request?",
    );

    if (!confirmed) return;

    setDeletingRequestId(requestId);
    setDeleteError("");

    try {
      await deleteRequest(requestId);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["my-donation-requests"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["received-donations"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["pending-donation-requests"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["admin-all-donation-requests"],
        }),
      ]);

      window.alert("Donation request deleted successfully.");
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Failed to delete donation request. Please try again.",
      );
    } finally {
      setDeletingRequestId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
              <HeartHandshake className="size-4" />
              Daan — Donate with Trust
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Needy Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Manage your donation requests, track verification status, and
              see the support you have received.
            </p>
          </div>

          <Link
            href="/needy-dashboard/create-request"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
          >
            <Plus className="size-4" />
            Create Request
          </Link>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Requests
              </p>
              <div className="rounded-xl bg-slate-100 p-3 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <FileText className="size-5" />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight">
              {isLoading ? "—" : totalRequests}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              All your submitted requests
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-sm dark:border-amber-900/70 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Pending Review
              </p>
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                <Clock3 className="size-5" />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight">
              {isLoading ? "—" : pendingRequests}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Waiting for admin verification
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm dark:border-emerald-900/70 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Verified
              </p>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <ShieldCheck className="size-5" />
              </div>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight">
              {isLoading ? "—" : verifiedRequests}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Requests approved by the admin
            </p>
          </div>

          <div className="rounded-2xl border border-sky-200 bg-white p-5 shadow-sm dark:border-sky-900/70 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Received Donations
              </p>
              <div className="rounded-xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
                <Wallet className="size-5" />
              </div>
            </div>

            <p className="mt-4 flex items-center text-3xl font-bold tracking-tight">
              <TbCurrencyTaka className="mr-1 size-7 shrink-0" />
              {isReceivedLoading
                ? "—"
                : isReceivedError
                  ? "—"
                  : formatAmount(totalReceived)}
            </p>

            {isReceivedError ? (
              <button
                type="button"
                onClick={() => void refetchReceived()}
                className="mt-1 text-xs font-medium text-rose-600 hover:underline dark:text-rose-400"
              >
                Failed to load. Try again
              </button>
            ) : (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Total donations received
              </p>
            )}
          </div>
        </section>

        {/* Recent Requests */}
        <section>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Recent Requests
              </h2>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Review your requests and follow their progress.
              </p>
            </div>

            {!isLoading && !isError && requests.length > 0 && (
              <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {requests.length}{" "}
                {requests.length === 1 ? "request" : "requests"}
              </span>
            )}
          </div>

          {/* Delete Error */}
          {deleteError && (
            <div
              role="alert"
              className="mb-4 flex flex-col justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300 sm:flex-row sm:items-center"
            >
              <p>{deleteError}</p>
              <button
                type="button"
                onClick={() => setDeleteError("")}
                className="w-fit font-semibold underline underline-offset-4"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Requests Loading */}
          {isLoading && (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <LoaderCircle className="mb-3 size-8 animate-spin text-emerald-600" />
              <p className="font-semibold">Loading your requests...</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Please wait while we fetch your information.
              </p>
            </div>
          )}

          {/* Requests Error */}
          {isError && (
            <div
              role="alert"
              className="rounded-2xl border border-rose-200 bg-white p-8 text-center dark:border-rose-900 dark:bg-slate-900"
            >
              <p className="font-semibold text-rose-700 dark:text-rose-300">
                Unable to load your donation requests.
              </p>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Check your connection or sign in again if your session has
                expired.
              </p>

              <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  className={`size-4 ${isFetching ? "animate-spin" : ""}`}
                />
                {isFetching ? "Retrying..." : "Try Again"}
              </button>
            </div>
          )}

          {/* Requests List */}
          {!isLoading && !isError && (
            <>
              {requests.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <HeartHandshake className="size-7" />
                  </div>

                  <h3 className="mt-4 text-lg font-bold">No requests yet</h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Share your situation by creating a donation request. Once
                    submitted, you can track its verification status here.
                  </p>

                  <Link
                    href="/needy-dashboard/create-request"
                    className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <Plus className="size-4" />
                    Create Your First Request
                  </Link>
                </div>
              ) : (
                <div className="grid gap-5">
                  {requests.map((request) => {
                    const isThisRequestDeleting =
                      isDeleting && deletingRequestId === request.id;

                    return (
                      <article
                        key={request.id}
                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
                      >
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col gap-5 sm:flex-row">
                            {/* Request Image */}
                            {request.situationImage ? (
                              <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 sm:h-40 sm:w-52">
                                <Image
                                  src={request.situationImage}
                                  alt={`Situation image for ${request.title}`}
                                  fill
                                  sizes="(max-width: 640px) 100vw, 208px"
                                  className="object-cover transition duration-300 group-hover:scale-105"
                                />
                              </div>
                            ) : (
                              <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 sm:h-40 sm:w-40">
                                <HeartHandshake className="size-12" />
                              </div>
                            )}

                            {/* Request Information */}
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <h3 className="break-words text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-xl">
                                  {request.title}
                                </h3>

                                <span
                                  className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(request.status)}`}
                                >
                                  {request.status.replaceAll("_", " ")}
                                </span>
                              </div>

                              <p className="mt-3 whitespace-pre-line break-words text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {request.description}
                              </p>

                              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                                <div className="inline-flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                                  <TbCurrencyTaka className="size-5" />
                                  <span>
                                    {formatAmount(request.requiredAmount)}
                                  </span>
                                </div>

                                <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                  <CalendarDays className="size-4" />
                                  {formatDate(request.createdAt)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Request Actions */}
                          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
                            <Link
                              href={`/needy-dashboard/requests/${request.id}`}
                              className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                            >
                              View Details
                              <ArrowRight className="size-4" />
                            </Link>

                            <div className="flex flex-wrap items-center gap-2">
                              {request.status === "PENDING" && (
                                <>
                                  <Link
                                    href={`/needy-dashboard/requests/${request.id}/edit`}
                                    className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                                  >
                                    Edit Request
                                  </Link>

                                  <button
                                    type="button"
                                    onClick={() => void handleDelete(request.id)}
                                    disabled={isDeleting}
                                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/50"
                                  >
                                    {isThisRequestDeleting ? (
                                      <LoaderCircle className="size-4 animate-spin" />
                                    ) : (
                                      <Trash2 className="size-4" />
                                    )}

                                    {isThisRequestDeleting
                                      ? "Deleting..."
                                      : "Delete"}
                                  </button>
                                </>
                              )}

                              {request.status === "VERIFIED" && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                  <CheckCircle2 className="size-4" />
                                  Verified by admin
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 py-5 text-center dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daan — Donate with Trust. Every genuine need deserves a chance.
          </p>
        </footer>
      </div>
    </main>
  );
}