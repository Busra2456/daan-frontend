"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  MapPin,
  ImageIcon,
  Video,
  Volume2,
  AlertCircle,
  RefreshCw,
  LockKeyhole,
} from "lucide-react";

import { getDonationRequestById } from "@/app/(dashboardGroup)/donor-dashboard/_actions/donationRequestActions";
import { use } from "react";

interface NeedyUser {
  name?: string;
  imageUrl?: string | null;
  address?: string | null;
}

interface DonationRequest {
  id: string;
  title: string;
  description: string;
  requiredAmount: number | string;
  status?: string;
  situationImage?: string | null;
  situationVideo?: string | null;
  situationAudio?: string | null;
  createdAt?: string;
  needy?: NeedyUser;
}

function extractRequest(response: unknown): DonationRequest {
  let result: unknown = response;

  for (let i = 0; i < 5; i++) {
    if (
      typeof result === "object" &&
      result !== null &&
      "data" in result
    ) {
      result = (result as { data: unknown }).data;
      continue;
    }

    break;
  }

  if (
    typeof result !== "object" ||
    result === null ||
    !("id" in result) ||
    !("title" in result)
  ) {
    throw new Error("The server returned an unexpected request response.");
  }

  return result as DonationRequest;
}

function formatAmount(amount: number | string) {
  const value = Number(amount);

  if (!Number.isFinite(value)) return String(amount);

  return `৳${value.toLocaleString("en-BD")}`;
}

function LoadingState() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-5 w-48 rounded bg-muted" />
      <div className="mt-8 h-10 max-w-md rounded bg-muted" />
      <div className="mt-4 h-5 max-w-2xl rounded bg-muted" />
      <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-10">
        <div className="h-8 max-w-sm rounded bg-muted" />
        <div className="mt-5 h-32 rounded-xl bg-muted" />
        <div className="mt-5 h-6 max-w-xs rounded bg-muted" />
      </div>
    </div>
  );
}

export default function RequestDetailsPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = use(params);

  const { data, isPending, isError, error, refetch, isFetching } =
    useQuery({
      queryKey: ["donation-request", requestId],
      queryFn: async () =>
        extractRequest(await getDonationRequestById(requestId)),
      enabled: Boolean(requestId),
      retry: false,
    });

  if (isPending) return <LoadingState />;

  if (isError) {
    const message =
      error instanceof Error ? error.message : "Unable to load this request.";

    return (
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" />
            Back to requests
          </Link>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <AlertCircle className="size-10 text-destructive" />
            <h1 className="mt-4 text-2xl font-bold">
              Unable to load request
            </h1>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {message}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Please sign in with an authorized account or check whether this
              request is still available.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
              >
                <RefreshCw
                  className={`size-4 ${isFetching ? "animate-spin" : ""}`}
                />
                Try again
              </button>

              <Link
                href="/login"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold hover:bg-muted"
              >
                <LockKeyhole className="size-4" />
                Log in
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/requests"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" />
            Back to donation requests
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            <HeartHandshake className="size-4" />
            Daan • Donate with Trust
          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {data.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="size-4" />
              Verified request
            </span>

            {data.needy?.address && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {data.needy.address}
              </span>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="h-2 bg-gradient-to-r from-emerald-900 via-emerald-600 to-lime-400" />

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              <div className="min-w-0">
                <h2 className="text-xl font-bold">About this request</h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-8 text-muted-foreground sm:text-base">
                  {data.description}
                </p>

                {data.situationImage && (
                  <div className="mt-7">
                    <h3 className="mb-3 flex items-center gap-2 font-bold">
                      <ImageIcon className="size-5 text-emerald-700 dark:text-emerald-400" />
                      Situation photo
                    </h3>

                    <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
                      <Image
                        src={data.situationImage}
                        alt={`Situation related to ${data.title}`}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 700px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {data.situationVideo && (
                  <div className="mt-7">
                    <h3 className="mb-3 flex items-center gap-2 font-bold">
                      <Video className="size-5 text-emerald-700 dark:text-emerald-400" />
                      Situation video
                    </h3>

                    <video
                      controls
                      preload="metadata"
                      className="w-full rounded-2xl border border-border"
                    >
                      <source src={data.situationVideo} />
                      Your browser does not support video playback.
                    </video>
                  </div>
                )}

                {data.situationAudio && (
                  <div className="mt-7">
                    <h3 className="mb-3 flex items-center gap-2 font-bold">
                      <Volume2 className="size-5 text-emerald-700 dark:text-emerald-400" />
                      Audio message
                    </h3>

                    <audio
                      controls
                      preload="metadata"
                      className="w-full"
                    >
                      <source src={data.situationAudio} />
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                )}

                {!data.situationImage &&
                  !data.situationVideo &&
                  !data.situationAudio && (
                    <p className="mt-6 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                      No situation photo, video, or audio is available for this
                      request.
                    </p>
                  )}
              </div>

              <aside className="h-fit rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Amount requested
                </p>

                <p className="mt-2 text-3xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {formatAmount(data.requiredAmount)}
                </p>

                <div className="my-5 border-t border-border" />

                {data.needy?.name && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Request submitted by
                    </p>
                    <p className="mt-2 font-bold">{data.needy.name}</p>
                  </div>
                )}

                <div className="mt-6 flex items-start gap-2 text-xs leading-6 text-muted-foreground">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                  Review the available information carefully before deciding
                  to contribute.
                </div>

                <Link
                  href="/login"
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-800"
                >
                  Continue to donate
                  <ArrowRight className="size-4" />
                </Link>
              </aside>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
          <p className="text-sm leading-7 text-muted-foreground">
            Daan respects the privacy of people seeking assistance. Personal
            details should only be shared with authorized viewers.
          </p>
        </div>
      </section>
    </main>
  );
}

function requireRequestId(
  params: Promise<{ requestId: string }>,
): { requestId: string } {
  // This helper is replaced below by using React's use() to unwrap params.
  throw new Error("Use the corrected params implementation below.");
}
