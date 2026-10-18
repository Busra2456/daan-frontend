
"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Heart,
  RefreshCw,
  ShieldCheck,
  Video,
  Volume2,
} from "lucide-react";
import { getVerifiedDonationRequests } from "@/api";
import Image from "next/image";

type RequestItem = {
  id: string;
  title: string;
  description: string;
  requiredAmount: string | number;
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
  let result = response as {
    data?: unknown;
    success?: boolean;
  };

  // Support both { data: [...] } and { data: { data: [...] } }
  for (let i = 0; i < 3; i++) {
    if (Array.isArray(result)) {
      return result as RequestItem[];
    }

    if (
      result &&
      typeof result === "object" &&
      "data" in result
    ) {
      result = result.data as typeof result;
      continue;
    }

    break;
  }

  if (Array.isArray(result)) {
    return result as RequestItem[];
  }

  throw new Error("Unexpected API response format");
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
      return extractRequests(response);
    },
  });

  return (
    <section className="bg-slate-50 px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              <ShieldCheck className="h-4 w-4" />
              Verified Requests
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Real Needs. Meaningful Support.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore requests reviewed by our administrators and learn
              about the people seeking support before deciding whether
              to contribute.
            </p>
          </div>

          <Link
            href="/requests"
            className="inline-flex shrink-0 items-center gap-2 font-bold text-emerald-700 hover:text-emerald-900"
          >
            Explore All Requests
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {isPending && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-52 bg-slate-200" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 rounded bg-slate-100" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                  <div className="h-10 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-12 text-center">
            <p className="text-lg font-bold text-slate-900">
              We couldn&apos;t load requests right now.
            </p>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
              Please check your connection and try again.
            </p>
<p className="mt-3 break-words text-xs text-red-600">
  Error: {error instanceof Error ? error.message : String(error)}
</p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Trying again..." : "Try Again"}
            </button>
          </div>
        )}

        {!isPending && !isError && requests.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <Heart className="mx-auto h-10 w-10 text-emerald-600" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">
              No verified requests yet
            </h3>
            <p className="mt-2 text-slate-600">
              New requests will appear here after administrator verification.
            </p>
          </div>
        )}

        {!isPending && !isError && requests.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {requests.slice(0, 6).map((request) => (
              <article
                key={request.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-emerald-50">
                  {request.needy?.imageUrl ? (
                    <Image
  src={request.needy.imageUrl}
  alt={request.needy.name || "Person seeking support"}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover transition duration-500 group-hover:scale-105"
/>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-emerald-100 to-slate-200">
                      <Heart className="h-14 w-14 text-emerald-700/60" />
                    </div>
                  )}

                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm">
                    <ShieldCheck className="h-4 w-4" />
                    Verified
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-xl font-bold text-slate-900">
                    {request.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                    {request.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-500">
                        Requested support
                      </p>
                      <p className="mt-1 text-lg font-extrabold text-emerald-700">
                        ৳{Number(request.requiredAmount).toLocaleString("en-BD")}
                      </p>
                    </div>

                    {request.needy?.address && (
                      <span className="flex max-w-[48%] items-center gap-1 text-right text-xs text-slate-500">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-2">
                          {request.needy.address}
                        </span>
                      </span>
                    )}
                  </div>

                  {(request.situationVideo || request.situationAudio) && (
                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
                      {request.situationVideo && (
                        <span className="inline-flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          Video story
                        </span>
                      )}
                      {request.situationAudio && (
                        <span className="inline-flex items-center gap-1">
                          <Volume2 className="h-4 w-4" />
                          Audio story
                        </span>
                      )}
                    </div>
                  )}

                  <Link
                    href={`/requests/${request.id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    View Request
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
