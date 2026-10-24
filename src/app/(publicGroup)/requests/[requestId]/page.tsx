"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Video,
  Volume2,
} from "lucide-react";

import { getDonationRequestById } from "@/app/(dashboardGroup)/donor-dashboard/_actions/donationRequestActions";
import DonationForm from "@/app/(dashboardGroup)/donor-dashboard/_components/DonationForm";

interface RequestDetailsPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

interface DonationRequest {
  id: string;
  title: string;
  description: string;
  requiredAmount: string | number;
  status?: string;
  verificationStatus?: string;
  situationImage?: string | null;
  situationVideo?: string | null;
  situationAudio?: string | null;
  needy?: {
    name?: string | null;
    address?: string | null;
    imageUrl?: string | null;
  } | null;
}

function extractRequest(response: unknown): DonationRequest {
  let result: unknown = response;

  // Handle commonly used API response wrappers.
  for (let index = 0; index < 5; index++) {
    if (
      result &&
      typeof result === "object" &&
      "data" in result
    ) {
      result = (result as { data: unknown }).data;
    } else {
      break;
    }
  }

  if (
    !result ||
    typeof result !== "object" ||
    !("id" in result) ||
    !("title" in result)
  ) {
    throw new Error("Unable to load this donation request.");
  }

  return result as DonationRequest;
}

function formatAmount(amount: string | number) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return String(amount);
  }

  return new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

export default function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  const { requestId } = use(params);

  const {
    data: request,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["public-donation-request", requestId],
    queryFn: async () =>
      extractRequest(await getDonationRequestById(requestId)),
    enabled: Boolean(requestId),
    retry: false,
  });

  if (isPending) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 h-5 w-36 animate-pulse rounded bg-muted" />

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <div className="aspect-video animate-pulse rounded-2xl bg-muted" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-24 animate-pulse rounded-xl bg-muted" />
            </div>

            <div className="h-80 animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !request) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border bg-card p-7 text-center shadow-sm">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10">
            <Heart className="size-7 text-destructive" />
          </div>

          <h1 className="mt-5 text-xl font-bold">
            Unable to load this request
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "This request may be unavailable, or you may not have permission to view it."}
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Try again
            </button>

            <Link
              href="/requests"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Browse requests
            </Link>
          </div>

          <p className="mt-5 text-xs leading-5 text-muted-foreground">
            If this request requires donor access, log in with your donor
            account and open it from your dashboard.
          </p>

          <Link
            href="/login"
            className="mt-2 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Log in to Daan
          </Link>
        </div>
      </main>
    );
  }

  const isVerified =
    request.verificationStatus?.toUpperCase() === "VERIFIED" ||
    request.status?.toUpperCase() === "VERIFIED" ||
    request.status?.toUpperCase() === "DONATIONS";

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/requests"
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to requests
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Request details */}
          <section className="min-w-0">
            {request.situationImage ? (
              <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted">
                <Image
                  src={request.situationImage}
                  alt={`Situation related to ${request.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-2xl border bg-muted/40">
                <div className="px-5 text-center">
                  <Heart className="mx-auto size-10 text-muted-foreground/60" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    No situation image provided
                  </p>
                </div>
              </div>
            )}

            <div className="mt-7">
              <div className="flex flex-wrap items-center gap-2">
                {isVerified ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="size-4" />
                    Verified request
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <CheckCircle2 className="size-4" />
                    Request details
                  </span>
                )}
              </div>

              <h1 className="mt-4 break-words text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {request.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                {request.needy?.name && (
                  <span>
                    Shared by{" "}
                    <span className="font-medium text-foreground">
                      {request.needy.name}
                    </span>
                  </span>
                )}

                {request.needy?.address && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4 shrink-0" />
                    {request.needy.address}
                  </span>
                )}
              </div>

              <div className="mt-7 rounded-2xl border bg-card p-5 sm:p-7">
                <h2 className="text-lg font-bold">About this situation</h2>

                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground sm:text-base">
                  {request.description}
                </p>
              </div>

              {(request.situationVideo || request.situationAudio) && (
                <div className="mt-6 rounded-2xl border bg-card p-5 sm:p-7">
                  <h2 className="text-lg font-bold">
                    Situation media
                  </h2>

                  <div className="mt-4 space-y-5">
                    {request.situationVideo && (
                      <div>
                        <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                          <Video className="size-4" />
                          Situation video
                        </p>

                        <video
                          controls
                          preload="metadata"
                          playsInline
                          className="max-h-[480px] w-full rounded-xl bg-black"
                        >
                          <source
                            src={request.situationVideo}
                            type="video/mp4"
                          />
                          Your browser does not support video playback.
                        </video>
                      </div>
                    )}

                    {request.situationAudio && (
                      <div>
                        <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                          <Volume2 className="size-4" />
                          Voice message
                        </p>

                        <audio
                          controls
                          preload="metadata"
                          className="w-full"
                        >
                          <source src={request.situationAudio} />
                          Your browser does not support audio playback.
                        </audio>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Donation panel */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
              <p className="text-sm font-medium text-muted-foreground">
                Requested support
              </p>

              <p className="mt-2 break-words text-3xl font-bold tracking-tight">
                ৳{formatAmount(request.requiredAmount)}
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your contribution can help address this person&apos;s needs.
                Choose an amount that works for you.
              </p>

              <div className="my-5 border-t" />

              {isVerified ? (
                <>
                  <div className="flex items-start gap-3 rounded-xl bg-emerald-500/10 p-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                    <p className="text-xs leading-5 text-muted-foreground">
                      This request is marked as verified. Please review the
                      details before contributing.
                    </p>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-lg font-bold">
                      Make a donation
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Enter your contribution and select a payment method.
                    </p>

                    <DonationForm
                      requestId={request.id}
                      requiredAmount={String(request.requiredAmount)}
                    />
                  </div>
                </>
              ) : (
                <div className="rounded-xl bg-muted/60 p-4">
                  <p className="text-sm font-semibold">
                    Verification pending
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Donations are available for verified requests. Please
                    check back after the review is complete.
                  </p>
                </div>
              )}

              <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
                Daan encourages thoughtful giving. Verify the request details
                and make sure you are comfortable before paying.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
