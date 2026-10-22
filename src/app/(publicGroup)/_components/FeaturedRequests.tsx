"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Heart,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Video,
  Volume2,
  ImageOff,
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
  status: string;
  createdAt?: string;
  needy?: {
    name?: string;
    imageUrl?: string | null;
    address?: string | null;
  };
};

function extractRequests(response: unknown): RequestItem[] {
  let current: unknown = response;

  for (let i = 0; i < 4; i++) {
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

export default function FeaturedRequests() {
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

      // Show the newest requests first when createdAt is available.
      return [...items].sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;
        const dateB = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      });
    },
    refetchInterval: SIX_HOURS,
    refetchIntervalInBackground: true,
    staleTime: SIX_HOURS,
  });

  const featuredRequests = requests.slice(0, 3);

  return (
    <section className="bg-slate-50 px-4 py-16 dark:bg-background sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <ShieldCheck className="size-4" />
              Admin-Verified Requests
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-foreground sm:text-4xl">
              Real Needs. Meaningful Support.
            </h2>

            <p className="mt-4 leading-7 text-slate-600 dark:text-muted-foreground">
              Discover verified requests, understand real situations,
              and choose how you want to make a difference.
            </p>

            <p className="mt-3 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Request list refreshes every 6 hours.
            </p>
          </div>

          <Link
            href="/requests"
            className="inline-flex shrink-0 items-center gap-2 font-bold text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Explore All Requests
            <ArrowRight className="size-5" />
          </Link>
        </div>

        {/* Loading skeleton */}
        {isPending && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-card"
              >
                <div className="aspect-[16/10] animate-pulse bg-slate-200 dark:bg-slate-800" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-10 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center dark:border-red-900 dark:bg-card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-foreground">
              We couldn&apos;t load requests.
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-muted-foreground">
              Please check your connection and try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Refreshing..." : "Try Again"}
            </button>

            {error instanceof Error && (
              <p className="mt-3 break-words text-xs text-red-600 dark:text-red-400">
                {error.message}
              </p>
            )}
          </div>
        )}

        {/* Empty state */}
        {!isPending && !isError && featuredRequests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center dark:border-slate-700 dark:bg-card">
            <Heart className="mx-auto size-10 text-emerald-600" />

            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-foreground">
              No verified requests yet
            </h3>

            <p className="mt-2 text-slate-600 dark:text-muted-foreground">
              New requests will appear here after administrator verification.
            </p>
          </div>
        )}

        {/* Exactly three cards maximum */}
        {!isPending && !isError && featuredRequests.length > 0 && (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRequests.map((request) => {
              // Prefer the request's situation image, then profile image.
              const imageUrl =
                request.situationImage || request.needy?.imageUrl;

              return (
                <article
                  key={request.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-800 dark:bg-card dark:hover:border-emerald-800"
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
                        <ImageOff className="size-10" />
                        <span className="text-xs font-medium">
                          No image available
                        </span>
                      </div>
                    )}

                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm dark:border-emerald-900 dark:bg-slate-950/90 dark:text-emerald-300">
                      <ShieldCheck className="size-4" />
                      Verified
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 text-xl font-bold text-slate-900 dark:text-foreground">
                      {request.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-muted-foreground">
                      {request.description}
                    </p>

                    <div className="mt-5 flex items-start justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 dark:text-muted-foreground">
                          Requested support
                        </p>

                        <p className="mt-1 text-lg font-extrabold text-emerald-700 dark:text-emerald-400">
                          ৳
                          {Number(request.requiredAmount).toLocaleString(
                            "en-BD",
                          )}
                        </p>
                      </div>

                      {request.needy?.address && (
                        <span className="flex max-w-[48%] items-start gap-1 text-xs text-slate-500 dark:text-muted-foreground">
                          <MapPin className="mt-0.5 size-4 shrink-0" />
                          <span className="line-clamp-2 break-words">
                            {request.needy.address}
                          </span>
                        </span>
                      )}
                    </div>

                    {(request.situationVideo || request.situationAudio) && (
                      <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-slate-500 dark:text-muted-foreground">
                        {request.situationVideo && (
                          <span className="inline-flex items-center gap-1">
                            <Video className="size-4 text-emerald-700 dark:text-emerald-400" />
                            Video story
                          </span>
                        )}

                        {request.situationAudio && (
                          <span className="inline-flex items-center gap-1">
                            <Volume2 className="size-4 text-emerald-700 dark:text-emerald-400" />
                            Audio story
                          </span>
                        )}
                      </div>
                    )}

                    <Link
                      href={`/requests/${request.id}`}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                    >
                      View Request
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Refresh indicator */}
        {!isPending && !isError && isFetching && (
          <p
            className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground"
            role="status"
          >
            <RefreshCw className="size-3 animate-spin" />
            Checking for updated requests...
          </p>
        )}
      </div>
    </section>
  );
}
