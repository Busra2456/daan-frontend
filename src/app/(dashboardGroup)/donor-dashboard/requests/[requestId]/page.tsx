"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  HeartHandshake,
  ImageOff,
  MapPin,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

import { getDonationRequestById } from "@/api";
import type { DonorRequestDetailsPageProps } from "@/types/donation-request.type";

import DonationForm from "../../_components/DonationForm";

export default function DonorRequestDetailsPage({
  params,
}: DonorRequestDetailsPageProps) {
  const { requestId } = use(params);

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["donor-donation-request", requestId],
    queryFn: () => getDonationRequestById(requestId),
    enabled: Boolean(requestId),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50/70 px-4 py-8 dark:bg-background sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="h-5 w-36 animate-pulse rounded-md bg-muted" />

          <div className="mt-6 overflow-hidden rounded-3xl border bg-card">
            <div className="h-48 animate-pulse bg-muted sm:h-64" />

            <div className="space-y-5 p-6 sm:p-8">
              <div className="h-8 w-2/3 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
              <div className="h-28 animate-pulse rounded-xl bg-muted" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
            <RefreshCw className="size-6" />
          </div>

          <h1 className="mt-4 text-xl font-bold">
            Unable to load donation request
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This request may not exist, or it may be temporarily unavailable.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Try again
            </button>

            <Link
              href="/donor-dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
            >
              <ArrowLeft className="size-4" />
              Back to requests
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const request = data.data;

  return (
    <main className="min-h-screen bg-slate-50/70 dark:bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/donor-dashboard"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-emerald-700 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to requests
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl border bg-card shadow-sm">
          {/* Request situation image */}
          <div className="relative aspect-[16/7] max-h-[440px] min-h-48 overflow-hidden bg-muted">
            {request.situationImage ? (
              <Image
                src={request.situationImage}
                alt={`Situation related to ${request.title}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                <ImageOff className="size-10" />
                <p className="text-sm">No situation image available</p>
              </div>
            )}

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/95 px-3 py-2 text-xs font-semibold text-emerald-800 shadow-sm dark:border-emerald-900 dark:bg-slate-950/90 dark:text-emerald-300">
              <ShieldCheck className="size-4" />
              Verified Request
            </div>
          </div>

          {/* Request header */}
          <header className="border-b p-5 sm:p-8">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
              <div className="min-w-0 flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <ShieldCheck className="size-4" />
                  Admin verified
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground sm:text-3xl lg:text-4xl">
                  {request.title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Read the situation carefully before deciding how you would
                  like to help.
                </p>
              </div>

              <div className="shrink-0 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900 dark:bg-emerald-950/30 md:min-w-52">
                <p className="text-sm font-medium text-emerald-800/80 dark:text-emerald-300/80">
                  Requested Amount
                </p>

                <p className="mt-1 flex items-center text-3xl font-bold text-emerald-800 dark:text-emerald-300">
                  <TbCurrencyTaka className="size-8 shrink-0" />
                  {Number(request.requiredAmount).toLocaleString("en-BD")}
                </p>
              </div>
            </div>
          </header>

          {/* Main content */}
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section className="min-w-0">
              <div className="flex items-center gap-2">
                <HeartHandshake className="size-5 text-emerald-600" />
                <h2 className="text-xl font-bold">About this request</h2>
              </div>

              <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-muted-foreground sm:text-base">
                {request.description}
              </p>

              {/* Situation video */}
              {request.situationVideo && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold">Situation Video</h2>

                  <video
                    controls
                    preload="metadata"
                    playsInline
                    className="mt-4 aspect-video w-full rounded-2xl border bg-black"
                    src={request.situationVideo}
                  >
                    Your browser does not support video playback.
                  </video>
                </div>
              )}

              {/* Situation audio */}
              {request.situationAudio && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold">Situation Audio</h2>

                  <audio
                    controls
                    preload="metadata"
                    className="mt-4 w-full"
                    src={request.situationAudio}
                  >
                    Your browser does not support audio playback.
                  </audio>
                </div>
              )}

              {/* Requester location */}
              {request.needy?.address && (
                <div className="mt-8 flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-emerald-700 dark:text-emerald-400" />

                  <div className="min-w-0">
                    <p className="font-semibold">Requester location</p>
                    <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                      {request.needy.address}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Requester and donation panel */}
            <aside className="h-fit rounded-2xl border bg-slate-50/70 p-5 dark:bg-muted/20 sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-bold">About the person</h2>

              <div className="mt-5 flex items-center gap-3">
                <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted">
                  {request.needy?.imageUrl ? (
                    <Image
                      src={request.needy.imageUrl}
                      alt={request.needy?.name || "Requester profile"}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <UserRound className="size-7 text-muted-foreground" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="break-words font-semibold">
                    {request.needy?.name || "Verified requester"}
                  </p>

                  <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="size-3.5" />
                    Verified requester
                  </p>
                </div>
              </div>

              {request.needy?.address && (
                <div className="mt-5 flex items-start gap-3 border-t pt-5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                  <p className="text-sm leading-6 text-muted-foreground">
                    {request.needy.address}
                  </p>
                </div>
              )}

              <div className="mt-6 border-t pt-5">
                <h3 className="mb-2 font-semibold">Make a donation</h3>

                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  Choose an amount you can contribute toward this request.
                </p>

                <DonationForm
                  requestId={request.id}
                  requiredAmount={request.requiredAmount}
                />
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
                Daan — Donate with Trust
              </p>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
