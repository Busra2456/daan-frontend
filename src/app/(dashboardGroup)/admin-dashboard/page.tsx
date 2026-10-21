
"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
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

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-28 animate-pulse rounded-full bg-muted" />
          <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-80 max-w-full animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border bg-card"
            >
              <div className="aspect-[4/3] animate-pulse bg-muted" />
              <div className="space-y-4 p-5">
                <div className="h-5 animate-pulse rounded bg-muted" />
                <div className="h-4 animate-pulse rounded bg-muted" />
                <div className="h-20 animate-pulse rounded-xl bg-muted" />
                <div className="h-10 animate-pulse rounded-xl bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          role="alert"
          className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center"
        >
          <h2 className="text-lg font-semibold">
            Unable to load donation requests
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Something went wrong while loading pending requests. Please refresh
            the page and try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <header className="mb-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <span className="size-2 rounded-full bg-primary" />
              Admin Control
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Review donation requests, verify supporting information, and help
              connect people in need with trusted donors.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border bg-muted/40 px-4 py-3 text-sm font-semibold">
              <FaMinus className="size-3 text-primary" />
              <span>Pending Requests</span>
              <span className="inline-flex min-w-7 items-center justify-center rounded-lg bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">
                {requests.length}
              </span>
            </div>

            <Link
              href="/admin-dashboard/donation-requests"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View All Requests
            </Link>

            <Link
              href="/admin-dashboard/users"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </header>

      {/* Empty State */}
      {requests.length === 0 ? (
        <section className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
            ✓
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            No pending requests
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            There are currently no donation requests waiting for verification.
          </p>

          <Link
            href="/admin-dashboard/donation-requests"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            View All Requests
          </Link>
        </section>
      ) : (
        /* Request Cards */
        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Pending Verification
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Review each request before making a decision.
              </p>
            </div>

            <span className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
              {requests.length}{" "}
              {requests.length === 1 ? "request" : "requests"}
            </span>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {requests.map((request) => {
              const isRejecting = rejectingRequestId === request.id;
              const isProcessing =
                verifyMutation.isPending || rejectMutation.isPending;

              return (
                <article
                  key={request.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Request Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    {request.situationImage ? (
                      <Image
                        src={request.situationImage}
                        alt={`Situation image for ${request.title}`}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
                        No situation image provided
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-800 shadow-sm">
                      Pending
                    </span>
                  </div>

                  {/* Request Information */}
                  <div className="flex flex-1 flex-col p-5 text-center">
                    <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 tracking-tight">
                      {request.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
                      {request.description}
                    </p>

                    {/* Required Amount */}
                    <div className="mt-5 rounded-xl border border-border/70 bg-muted/40 p-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        Required Amount
                      </p>

                      <div className="mt-1 flex items-center justify-center gap-1">
                        <TbCurrencyTaka
                          aria-hidden="true"
                          className="size-6"
                        />
                        <span className="text-2xl font-bold tabular-nums">
                          {Number(request.requiredAmount).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Needy User */}
                    <div className="mt-5 border-t pt-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        Requested by
                      </p>

                      <p className="mt-1 break-words text-sm font-semibold">
                        {request.needy.name}
                      </p>

                      {request.needy.address && (
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {request.needy.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto border-t bg-muted/20 p-4">
                    {isRejecting ? (
                      <form
                        className="space-y-3"
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleReject(request.id);
                        }}
                      >
                        <label
                          htmlFor={`rejection-${request.id}`}
                          className="block text-left text-sm font-semibold"
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
                          required
                          disabled={rejectMutation.isPending}
                          className="w-full resize-y rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />

                        <p className="text-right text-xs text-muted-foreground">
                          {rejectionReason.length}/1000
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="submit"
                            disabled={
                              rejectMutation.isPending ||
                              !rejectionReason.trim()
                            }
                            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-destructive px-3 py-2.5 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
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
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border bg-card px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-2">
                        <Link
                          href={`/admin-dashboard/donation-requests/${request.id}`}
                          className="inline-flex min-h-10 w-full items-center justify-center rounded-xl border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          View Details
                        </Link>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => handleVerify(request.id)}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {verifyMutation.isPending
                              ? "Verifying..."
                              : "Verify"}
                          </button>

                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => {
                              setRejectingRequestId(request.id);
                              setRejectionReason("");
                            }}
                            className="inline-flex min-h-10 items-center justify-center rounded-xl border bg-card px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
