
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  ImageOff,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

import {
  useGetMyDonations,
  useVerifiedDonationRequests,
} from "@/hooks";

export default function DonorDashboardPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useVerifiedDonationRequests();

  const {
    data: donationsData,
    isLoading: donationsLoading,
    isError: donationsError,
    refetch: refetchDonations,
    isFetching: donationsFetching,
  } = useGetMyDonations();

  const requests = data?.data ?? [];
  const donations = donationsData?.data ?? [];

  const totalDonated = donations.reduce(
    (total, donation) => total + Number(donation.amount || 0),
    0,
  );

  if (isLoading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-full max-w-md animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-2xl border bg-muted/50"
            />
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-2xl border bg-muted/50"
            />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-lg rounded-2xl border border-rose-200 bg-card p-8 text-center dark:border-rose-900">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            <RefreshCw className="size-6" />
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Unable to load donation requests
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We could not load verified requests. Please check your connection
            and try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            <RefreshCw
              className={`size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Dashboard heading */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-200/70 bg-white p-6 shadow-sm dark:border-emerald-900/60 dark:bg-card sm:p-8">
          <div className="absolute -right-12 -top-16 size-48 rounded-full bg-emerald-100/70 blur-3xl dark:bg-emerald-900/20" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <ShieldCheck className="size-4" />
                Trusted giving starts here
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-foreground sm:text-4xl">
                Donor Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-muted-foreground sm:text-base">
                Explore verified requests, learn about people who need help,
                and follow the impact of your donations.
              </p>
            </div>

            <div className="flex size-16 shrink-0 items-center justify-center self-start rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 sm:size-20 sm:self-center">
              <HeartHandshake className="size-9" />
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                Verified Requests
              </p>
              <ShieldCheck className="size-5 text-emerald-600" />
            </div>
            <p className="mt-3 text-3xl font-bold">{requests.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Requests available to support
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                Your Donations
              </p>
              <HeartHandshake className="size-5 text-emerald-600" />
            </div>
            <p className="mt-3 text-3xl font-bold">{donations.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Recorded donation transactions
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">
                Total Donated
              </p>
              <TbCurrencyTaka className="size-6 text-emerald-600" />
            </div>
            <p className="mt-3 flex items-center text-3xl font-bold">
              <TbCurrencyTaka className="size-7" />
              {totalDonated.toLocaleString("en-BD")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Based on your recorded donations
            </p>
          </div>
        </section>

        {/* Verified donation requests */}
        <section>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-6 text-emerald-600" />
                <h2 className="text-2xl font-bold tracking-tight">
                  Verified Requests
                </h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Every request shown here has passed the verification process.
              </p>
            </div>

            <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
              {requests.length} available
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-card px-5 py-14 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <HeartHandshake className="size-7" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                No verified requests yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Verified requests will appear here after the admin completes
                the review process.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => {
                // Confirm this property matches your DonationRequest type/API.
                const imageUrl = request.situationImage;

                return (
                  <article
                    key={request.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:hover:border-emerald-800"
                  >
                    {/* Request situation image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={`Situation related to ${request.title}`}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                          <ImageOff className="size-8" />
                          <span className="text-xs">
                            No situation image available
                          </span>
                        </div>
                      )}

                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm dark:border-emerald-900 dark:bg-slate-950/90 dark:text-emerald-300">
                        <ShieldCheck className="size-3.5" />
                        Verified
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="line-clamp-2 text-lg font-bold leading-7 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {request.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {request.description}
                      </p>

                      <div className="mt-5 rounded-xl bg-emerald-50/80 p-4 dark:bg-emerald-950/30">
                        <p className="text-xs font-medium text-emerald-800/80 dark:text-emerald-300/80">
                          Requested Amount
                        </p>

                        <p className="mt-1 flex items-center text-2xl font-bold text-emerald-800 dark:text-emerald-300">
                          <TbCurrencyTaka className="size-7 shrink-0" />
                          {Number(request.requiredAmount).toLocaleString(
                            "en-BD",
                          )}
                        </p>
                      </div>

                      <div className="mt-5 border-t pt-4">
                        <p className="text-xs font-medium text-muted-foreground">
                          Requested by
                        </p>

                        <p className="mt-1 font-semibold">
                          {request.needy?.name || "Verified requester"}
                        </p>

                        {request.needy?.address && (
                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {request.needy.address}
                          </p>
                        )}
                      </div>

                      <div className="mt-auto pt-5">
                        <Link
                          href={`/donor-dashboard/requests/${request.id}`}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                        >
                          View Request
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Donation history */}
        <section className="mt-12 border-t pt-10">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="size-6 text-emerald-600" />
                <h2 className="text-2xl font-bold tracking-tight">
                  Donation History
                </h2>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Review the donations recorded under your account.
              </p>
            </div>

            {!donationsLoading && donations.length > 0 && (
              <button
                type="button"
                onClick={() => refetchDonations()}
                disabled={donationsFetching}
                className="inline-flex w-fit items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-60"
              >
                <RefreshCw
                  className={`size-4 ${donationsFetching ? "animate-spin" : ""}`}
                />
                Refresh history
              </button>
            )}
          </div>

          {donationsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-2xl border bg-muted/50"
                />
              ))}
            </div>
          ) : donationsError ? (
            <div className="rounded-2xl border border-rose-200 bg-card p-6 dark:border-rose-900">
              <p className="font-semibold">Unable to load donation history</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your donation history could not be retrieved.
              </p>

              <button
                type="button"
                onClick={() => refetchDonations()}
                disabled={donationsFetching}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-60"
              >
                <RefreshCw
                  className={`size-4 ${donationsFetching ? "animate-spin" : ""}`}
                />
                Try again
              </button>
            </div>
          ) : donations.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-card px-5 py-12 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                <HeartHandshake className="size-6 text-muted-foreground" />
              </div>

              <h3 className="mt-4 font-semibold">No donations yet</h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                When you make a donation, its recorded details will appear here.
              </p>

              {requests.length > 0 && (
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    document
                      .querySelector("section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  Explore verified requests
                  <ArrowRight className="size-4" />
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((donation) => (
                <article
                  key={donation.id}
                  className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-semibold">
                        {donation.request?.title || "Donation request"}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {new Date(donation.createdAt).toLocaleDateString(
                          "en-BD",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 text-emerald-700 dark:text-emerald-400">
                      <TbCurrencyTaka className="size-6" />
                      <span className="text-xl font-bold">
                        {Number(donation.amount).toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                      {donation.status}
                    </span>

                    <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium">
                      Payment: {donation.paymentStatus}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-10 border-t py-5 text-center text-xs text-muted-foreground">
          Daan — Donate with Trust
        </footer>
      </div>
    </main>
  );
}
