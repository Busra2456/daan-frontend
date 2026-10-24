"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  HeartHandshake,
  HandHeart,
  ImageOff,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getVerifiedDonationRequests } from "@/api";

const SIX_HOURS = 6 * 60 * 60 * 1000;

type RequestItem = {
  id: string;
  title: string;
  description: string;
  requiredAmount: string | number;
  situationImage?: string | null;
  situationVideo?: string | null;
  situationAudio?: string | null;
  status?: string;
  createdAt?: string;
  needy?: {
    name?: string;
    imageUrl?: string | null;
    address?: string | null;
  };
};

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "Verified Requests",
    description:
      "Every request goes through an admin review before being shared with donors.",
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
  },
  {
    icon: Users,
    title: "Understand Their Story",
    description:
      "Learn about a person's circumstances and needs before deciding how to help.",
    color:
      "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300",
  },
  {
    icon: HeartHandshake,
    title: "Give With Confidence",
    description:
      "Make thoughtful giving decisions based on the verified information available.",
    color:
      "bg-green-100 text-green-800 dark:bg-green-400/15 dark:text-green-300",
  },
];

function extractRequests(response: unknown): RequestItem[] {
  let current: unknown = response;

  for (let i = 0; i < 5; i++) {
    if (Array.isArray(current)) {
      return current as RequestItem[];
    }

    if (
      current !== null &&
      typeof current === "object" &&
      "data" in current
    ) {
      current = current.data;
      continue;
    }

    break;
  }

  if (Array.isArray(current)) {
    return current as RequestItem[];
  }

  throw new Error("Unexpected verified requests API response.");
}

function RequestCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="aspect-[16/10] animate-pulse bg-muted" />
      <div className="space-y-4 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-10 animate-pulse rounded-xl bg-muted" />
      </div>
    </div>
  );
}

function formatAmount(amount: string | number) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "Amount unavailable";
  }

  return `৳${value.toLocaleString("en-BD")}`;
}

export default function RequestsPage() {
  const {
    data: requests = [],
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["verified-donation-requests"],
    queryFn: async () => {
      const response = await getVerifiedDonationRequests();
      const items = extractRequests(response);

      // Newest requests first, when creation dates are available.
      return [...items]
        .filter(
          (item) =>
            item &&
            typeof item.id === "string" &&
            typeof item.title === "string",
        )
        .sort((a, b) => {
          const dateA = a.createdAt
            ? new Date(a.createdAt).getTime()
            : 0;
          const dateB = b.createdAt
            ? new Date(b.createdAt).getTime()
            : 0;

          return dateB - dateA;
        });
    },
    staleTime: SIX_HOURS,
    refetchInterval: SIX_HOURS,
    refetchIntervalInBackground: true,
  });

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-20 -z-10 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-28 -z-10 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300 lg:mx-0">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Verified Donation Requests
              </div>

              <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:mx-0 lg:text-6xl">
                Your kindness can{" "}
                <span className="relative inline-block text-emerald-700 dark:text-emerald-400">
                  change a life.
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-amber-400/70"
                  />
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
                Behind every request is a person, a family, and a story that
                deserves to be heard. Daan helps connect people in need with
                donors who want to make a meaningful difference.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/login"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-emerald-950/10 transition duration-300 hover:-translate-y-1 hover:opacity-90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  Login as Donor
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-4 text-sm font-bold text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Discover How It Works
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-muted-foreground lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  Admin-reviewed requests
                </span>

                <span className="inline-flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  Informed giving
                </span>
              </div>
            </div>

            {/* Daan brand illustration */}
            <div className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute -right-3 top-8 h-24 w-24 rounded-full bg-amber-400/25 blur-2xl sm:-right-6"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -left-3 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 p-7 text-white shadow-2xl shadow-emerald-950/15 dark:from-[#071f17] dark:via-emerald-950 dark:to-emerald-800 sm:p-10">
                <div
                  aria-hidden="true"
                  className="absolute -right-14 -top-14 h-48 w-48 rounded-full border border-white/10"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-5 -top-5 h-32 w-32 rounded-full border border-white/10"
                />

                <div className="relative flex min-h-[310px] flex-col justify-between sm:min-h-[340px]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-amber-300 ring-1 ring-white/20">
                      <HandHeart className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-center text-xs font-semibold tracking-wide text-white">
                      THE DAAN PROMISE
                    </span>
                  </div>

                  <div className="py-8">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-300 text-emerald-950">
                        <Heart
                          className="h-6 w-6 fill-current"
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-emerald-100">
                          A little help
                        </p>
                        <p className="text-lg font-bold text-white">
                          Can mean everything.
                        </p>
                      </div>
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                      Give with trust.
                      <br />
                      <span className="text-amber-300">
                        Help with heart.
                      </span>
                    </h2>

                    <p className="mt-4 max-w-xs text-sm leading-7 text-emerald-50">
                      Every person deserves dignity, compassion, and the chance
                      to be heard.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-white/20 pt-5">
                    <div className="flex -space-x-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-800 bg-amber-200 text-emerald-950 dark:border-emerald-950">
                        <Heart className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-800 bg-emerald-100 text-emerald-900 dark:border-emerald-950">
                        <HandHeart className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-emerald-800 bg-white text-emerald-900 dark:border-emerald-950">
                        <Users className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>

                    <p className="text-xs leading-5 text-emerald-50">
                      <span className="block font-bold text-white">
                        People helping people
                      </span>
                      A community built on compassion
                    </p>

                    <Sparkles
                      className="ml-auto h-5 w-5 shrink-0 text-amber-300"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust features */}
      <section className="border-y border-border bg-card px-5 py-16 text-card-foreground transition-colors duration-300 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-300">
              Why Daan?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Giving starts with trust.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Helping someone is a meaningful decision. We want you to make it
              with care, clarity, and confidence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-background p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-950/5 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>

                    <span className="text-4xl font-black text-muted-foreground/40">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-1 w-12 rounded-full bg-emerald-600 transition-all duration-300 group-hover:w-20 dark:bg-emerald-400" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* All verified requests */}
      <section
        id="verified-requests"
        className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <ShieldCheck className="size-4" aria-hidden="true" />
                Admin-Verified Requests
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Real Needs. Meaningful Support.
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                Explore the requests returned by Daan and take time to
                understand each person&apos;s circumstances before deciding how to
                help.
              </p>

              <p className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                Requests refresh automatically every 6 hours.
              </p>
            </div>

            {!isPending && !isError && requests.length > 0 && (
              <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground">
                <Heart className="size-4 text-emerald-600 dark:text-emerald-400" />
                {requests.length}{" "}
                {requests.length === 1 ? "request" : "requests"}
              </span>
            )}
          </div>

          {/* Loading */}
          {isPending && (
            <div
              className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Loading verified requests"
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <RequestCardSkeleton key={item} />
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="rounded-2xl border border-red-200 bg-card px-6 py-12 text-center dark:border-red-900">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400">
                <RefreshCw className="size-7" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-foreground">
                We couldn&apos;t load verified requests.
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Please check your connection and try again.
              </p>

              {error instanceof Error && (
                <p className="mx-auto mt-3 max-w-xl break-words text-xs text-red-600 dark:text-red-400">
                  {error.message}
                </p>
              )}

              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                <RefreshCw
                  className={`size-4 ${isFetching ? "animate-spin" : ""}`}
                  aria-hidden="true"
                />
                {isFetching ? "Refreshing..." : "Try Again"}
              </button>
            </div>
          )}

          {/* Empty */}
          {!isPending && !isError && requests.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
              <Heart className="mx-auto size-10 text-emerald-600 dark:text-emerald-400" />

              <h3 className="mt-4 text-xl font-bold text-foreground">
                No verified requests yet
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
                There are no verified donation requests available right now.
                Please check back later.
              </p>
            </div>
          )}

          {/* Every request returned by the API */}
          {!isPending && !isError && requests.length > 0 && (
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {requests.map((request) => {
                const imageUrl =
                  request.situationImage || request.needy?.imageUrl;

                return (
                  <article
                    key={request.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl"
                  >
                    {/* Request image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-emerald-50 dark:bg-emerald-950/30">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={`Situation for ${request.title}`}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-100 to-slate-200 text-emerald-800 dark:from-emerald-950 dark:to-slate-900 dark:text-emerald-300">
                          <ImageOff className="size-10" aria-hidden="true" />
                          <span className="text-xs font-medium">
                            No image available
                          </span>
                        </div>
                      )}

                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm dark:border-emerald-900 dark:bg-slate-950/90 dark:text-emerald-300">
                        <ShieldCheck className="size-4" aria-hidden="true" />
                        Verified
                      </span>
                    </div>

                    {/* Request details */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="line-clamp-2 text-xl font-bold text-foreground">
                        {request.title}
                      </h3>

                      <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-muted-foreground">
                        {request.description}
                      </p>

                      <div className="mt-5 flex items-start justify-between gap-3 border-t border-border pt-4">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Requested support
                          </p>
                          <p className="mt-1 break-words text-lg font-extrabold text-emerald-700 dark:text-emerald-400">
                            {formatAmount(request.requiredAmount)}
                          </p>
                        </div>

                        {request.needy?.address && (
                          <span className="flex max-w-[48%] items-start gap-1 text-xs text-muted-foreground">
                            <MapPin
                              className="mt-0.5 size-4 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="line-clamp-2 break-words">
                              {request.needy.address}
                            </span>
                          </span>
                        )}
                      </div>

                      {(request.situationVideo || request.situationAudio) && (
                        <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground">
                          {request.situationVideo && (
                            <span className="inline-flex items-center gap-1">
                              <Video
                                className="size-4 text-emerald-700 dark:text-emerald-400"
                                aria-hidden="true"
                              />
                              Video story
                            </span>
                          )}

                          {request.situationAudio && (
                            <span className="inline-flex items-center gap-1">
                              <Volume2
                                className="size-4 text-emerald-700 dark:text-emerald-400"
                                aria-hidden="true"
                              />
                              Audio story
                            </span>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/requests/${encodeURIComponent(request.id)}`}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-emerald-600 dark:hover:bg-emerald-500"
                      >
                        View Request
                        <ArrowRight
                          className="size-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Refresh status */}
          {!isPending && !isError && isFetching && (
            <p
              className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground"
              role="status"
            >
              <RefreshCw className="size-3 animate-spin" aria-hidden="true" />
              Checking for updated requests...
            </p>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-emerald-950 px-6 py-12 text-center text-white shadow-xl shadow-emerald-950/10 dark:border-emerald-400/15 dark:bg-[#061a13] sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-emerald-950 shadow-lg shadow-black/10">
              <HeartHandshake className="h-7 w-7" aria-hidden="true" />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Ready to make a difference?
            </h2>

            <p className="mt-4 leading-7 text-emerald-50">
              Sign in to explore the verified donation requests available to
              donors. Take time to understand each story and choose how you
              would like to help.
            </p>

            <Link
              href="/login"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-7 py-4 text-sm font-extrabold text-emerald-950 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
            >
              Continue as a Donor
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
