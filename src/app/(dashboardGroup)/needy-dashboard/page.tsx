"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";

import { getMyDonationRequests, getReceivedDonations } from "@/api";
import type {
  MyDonationRequestsResponse,
} from "@/types/donation-request.type";

export default function NeedyDashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery<MyDonationRequestsResponse>({
    queryKey: ["my-donation-requests"],
    queryFn: getMyDonationRequests,
  });

  const { data: receivedData } = useQuery({
    queryKey: ["received-donations"],
    queryFn: getReceivedDonations,
  });

  const requests = data?.data ?? [];

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING",
  ).length;

  const verifiedRequests = requests.filter(
    (request) => request.status === "VERIFIED",
  ).length;

  const totalReceived = receivedData?.data.totalReceived ?? 0;

  return (
    <main className="mx-auto max-w-7xl p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Needy Dashboard</h1>

          <p className="mt-2 text-muted-foreground">
            Manage your requests and connect with trusted donors.
          </p>
        </div>

        <Link
          href="/needy-dashboard/create-request"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Create Request
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground">
            Loading your requests...
          </p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-destructive/30 p-6">
          <p className="text-destructive">
            Failed to load your donation requests.
          </p>
        </div>
      )}

      {/* Dashboard */}
      {!isLoading && !isError && (
        <>
          {/* Statistics */}
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Total Requests
              </p>

              <p className="mt-2 text-3xl font-bold">
                {totalRequests}
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Pending
              </p>

              <p className="mt-2 text-3xl font-bold">
                {pendingRequests}
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Verified
              </p>

              <p className="mt-2 text-3xl font-bold">
                {verifiedRequests}
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Received
              </p>

              <p className="mt-2 flex items-center text-3xl font-bold">
                <TbCurrencyTaka />
                {totalReceived.toLocaleString()}
              </p>
            </div>
          </section>

          {/* Recent Requests */}
          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Recent Requests
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest donation requests will appear here.
              </p>
            </div>

            {/* Empty State */}
            {requests.length === 0 ? (
              <div className="rounded-xl border p-8 text-center">
                <p className="font-medium">No requests yet</p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first request and let donors know how
                  they can help.
                </p>

                <Link
                  href="/needy-dashboard/create-request"
                  className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  Create your first request
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-xl border bg-card p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {request.title}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {request.description}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                          {request.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center">
                        <TbCurrencyTaka className="text-2xl" />

                        <p className="font-semibold">
                          {Number(
                            request.requiredAmount,
                          ).toLocaleString()}
                        </p>

                        <p className="ml-2 text-sm text-muted-foreground">
                          {new Date(
                            request.createdAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      {/* View Details */}
                      <Link
                        href={`/needy-dashboard/requests/${request.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
