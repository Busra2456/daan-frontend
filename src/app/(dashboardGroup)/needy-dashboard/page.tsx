"use client";

import { getMyDonationRequests } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function NeedyDashboardPage() {
  const { data, isLoading, isError } = useQuery<MyDonationRequestsResponse>({
    queryKey: ["my-donation-requests"],
    queryFn: getMyDonationRequests,
  });

  

  const requests = data?.data ?? [];

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING",
  ).length;

  const verifiedRequests = requests.filter(
    (request) => request.status === "VERIFIED",
  ).length;

  return (
    <main className="mx-auto max-w-7xl p-6">
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

      {isLoading && (
        <div className="rounded-lg border p-6">
          <p className="text-muted-foreground">Loading your requests...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-destructive/30 p-6">
          <p className="text-destructive">
            Failed to load your donation requests.
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">Total Requests</p>
              <p className="mt-2 text-3xl font-bold">{totalRequests}</p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="mt-2 text-3xl font-bold">{pendingRequests}</p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="mt-2 text-3xl font-bold">{verifiedRequests}</p>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <p className="text-sm text-muted-foreground">Received</p>
              <p className="mt-2 text-3xl font-bold">৳0</p>
            </div>
          </section>

          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Recent Requests</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest donation requests will appear here.
              </p>
            </div>

            {requests.length === 0 ? (
              <div className="rounded-xl border p-8 text-center">
                <p className="font-medium">No requests yet</p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Create your first request and let donors know how they can
                  help.
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

                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <p className="font-semibold">
                        ৳{Number(request.requiredAmount).toLocaleString()}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
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