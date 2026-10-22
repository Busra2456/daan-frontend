"use client";

import { getDonationRequestById } from "@/api";
import type { DonationRequestResponse } from "@/types/donation-request.type";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartHandshake,
  LoaderCircle,
  MapPin,
  Phone,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  Video,
  Volume2,
} from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

function getStatusStyles(status: string) {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300";

    case "VERIFIED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300";

    case "DONATIONS":
      return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300";

    case "COMPLETED":
      return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-300";

    case "REJECTED":
      return "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300";

    default:
      return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

function formatDate(value: string, includeTime = false) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(includeTime
      ? { hour: "2-digit", minute: "2-digit" }
      : {}),
  });
}

function formatAmount(value: string | number) {
  const amount = Number(value);

  if (!Number.isFinite(amount) || amount < 0) {
    return "0";
  }

  return amount.toLocaleString("en-BD");
}

function getStatusMessage(status: string) {
  switch (status.toUpperCase()) {
    case "PENDING":
      return {
        title: "Awaiting Verification",
        description:
          "Your request has been submitted and is waiting for the admin team to review the information.",
        icon: Clock3,
        styles:
          "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30",
        iconStyles: "text-amber-600 dark:text-amber-400",
      };

    case "VERIFIED":
      return {
        title: "Request Verified",
        description:
          "Your request has been verified by the admin and is available for donors to review.",
        icon: ShieldCheck,
        styles:
          "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30",
        iconStyles: "text-emerald-600 dark:text-emerald-400",
      };

    case "DONATIONS":
      return {
        title: "Donations in Progress",
        description:
          "Your request has entered the donation stage. You can follow its progress through your dashboard.",
        icon: HeartHandshake,
        styles:
          "border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30",
        iconStyles: "text-violet-600 dark:text-violet-400",
      };

    case "COMPLETED":
      return {
        title: "Request Completed",
        description:
          "This donation request has been marked as completed.",
        icon: CheckCircle2,
        styles:
          "border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30",
        iconStyles: "text-sky-600 dark:text-sky-400",
      };

    case "REJECTED":
      return {
        title: "Request Not Approved",
        description:
          "The admin did not approve this request. Please review the reason below for more information.",
        icon: ShieldAlert,
        styles:
          "border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30",
        iconStyles: "text-rose-600 dark:text-rose-400",
      };

    default:
      return {
        title: "Request Status",
        description: "Check your dashboard for the latest request updates.",
        icon: FileText,
        styles:
          "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900",
        iconStyles: "text-slate-600 dark:text-slate-400",
      };
  }
}

export default function DonationRequestDetailsPage() {
  const params = useParams<{ requestId: string }>();
  const requestId = params?.requestId;

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<DonationRequestResponse>({
    queryKey: ["donation-request", requestId],
    queryFn: () => getDonationRequestById(requestId),
    enabled: Boolean(requestId),
  });

  const pageClass =
    "min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8";

  const panelClass =
    "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900";

  const labelClass = "text-sm text-slate-500 dark:text-slate-400";

  if (isLoading) {
    return (
      <main className={pageClass}>
        <div className="mx-auto max-w-4xl">
          <div className={`${panelClass} flex min-h-64 flex-col items-center justify-center p-8 text-center`}>
            <LoaderCircle className="mb-4 size-9 animate-spin text-emerald-600" />
            <h1 className="text-lg font-semibold">Loading request details...</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Please wait while we retrieve your information.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !data?.success || !data.data) {
    return (
      <main className={pageClass}>
        <div className="mx-auto max-w-4xl">
          <div className={`${panelClass} p-6 sm:p-8`}>
            <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300">
              <ShieldAlert className="size-6" />
            </div>

            <h1 className="mt-4 text-xl font-bold">Request Not Found</h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              We could not load this donation request. It may not exist, or
              you may not have permission to view it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void refetch()}
                disabled={isFetching}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
              >
                <RefreshCw
                  className={`size-4 ${isFetching ? "animate-spin" : ""}`}
                />
                Try Again
              </button>

              <Link
                href="/needy-dashboard"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="size-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const request = data.data;
  const statusInfo = getStatusMessage(request.status);
  const StatusIcon = statusInfo.icon;

  return (
    <main className={pageClass}>
      <div className="mx-auto max-w-4xl">
        {/* Brand and Navigation */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            <HeartHandshake className="size-5" />
            Daan — Donate with Trust
          </div>

          <Link
            href="/needy-dashboard"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-emerald-700 dark:text-slate-300 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Main Request Card */}
        <article className={panelClass}>
          {/* Request Header */}
          <header className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <FileText className="size-3.5" />
                  Donation Request Details
                </div>

                <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
                  {request.title}
                </h1>

                <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <CalendarDays className="size-4 shrink-0" />
                  Created on {formatDate(request.createdAt)}
                </p>
              </div>

              <span
                className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyles(request.status)}`}
              >
                {request.status.replaceAll("_", " ")}
              </span>
            </div>
          </header>

          <div className="space-y-8 p-5 sm:p-8">
            {/* Status Information */}
            <section
              className={`rounded-xl border p-5 ${statusInfo.styles}`}
            >
              <div className="flex items-start gap-3">
                <StatusIcon
                  className={`mt-0.5 size-6 shrink-0 ${statusInfo.iconStyles}`}
                />

                <div>
                  <h2 className="font-bold">{statusInfo.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {statusInfo.description}
                  </p>
                </div>
              </div>
            </section>

            {/* Required Amount */}
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-6">
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Required Amount
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <TbCurrencyTaka className="size-9 shrink-0" />
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {formatAmount(request.requiredAmount)}
                </p>
              </div>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                Requested support amount in Bangladeshi Taka (BDT).
              </p>
            </section>

            {/* Situation Description */}
            <section>
              <h2 className="text-lg font-bold">About Your Situation</h2>

              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {request.description}
              </p>
            </section>

            {/* Rejection Reason */}
            {request.rejectionReason && (
              <section className="rounded-xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900 dark:bg-rose-950/30">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 size-5 shrink-0 text-rose-600 dark:text-rose-400" />

                  <div>
                    <h2 className="font-bold text-rose-700 dark:text-rose-300">
                      Rejection Reason
                    </h2>

                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-rose-800 dark:text-rose-200">
                      {request.rejectionReason}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Supporting Media */}
            {(request.situationImage ||
              request.situationVideo ||
              request.situationAudio) && (
              <section>
                <h2 className="text-lg font-bold">Supporting Media</h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Media submitted with your donation request.
                </p>

                {request.situationImage && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="relative max-h-[480px] min-h-48 w-full bg-slate-100 dark:bg-slate-800">
                      <img
                        src={request.situationImage}
                        alt={`Situation supporting image for ${request.title}`}
                        className="max-h-[480px] w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {request.situationVideo && (
                    <a
                      href={request.situationVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/30"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <Video className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">Situation Video</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Open submitted video
                        </p>
                      </div>
                    </a>
                  )}

                  {request.situationAudio && (
                    <a
                      href={request.situationAudio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-700 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/30"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <Volume2 className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">Situation Audio</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Listen to submitted audio
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Needy Information */}
            <section>
              <h2 className="text-lg font-bold">Your Information</h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Contact details associated with this request.
              </p>

              <div className="mt-4 grid gap-4 rounded-xl border border-slate-200 p-5 dark:border-slate-800 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <UserRound className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div className="min-w-0">
                    <p className={labelClass}>Name</p>
                    <p className="mt-1 break-words font-semibold">
                      {request.needy?.name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <span className="text-base">@</span>
                  </div>
                  <div className="min-w-0">
                    <p className={labelClass}>Email</p>
                    <p className="mt-1 break-all font-semibold">
                      {request.needy?.email || "Not provided"}
                    </p>
                  </div>
                </div>

                {request.needy?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0">
                      <p className={labelClass}>Phone</p>
                      <p className="mt-1 break-words font-semibold">
                        {request.needy.phone}
                      </p>
                    </div>
                  </div>
                )}

                {request.needy?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0">
                      <p className={labelClass}>Address</p>
                      <p className="mt-1 break-words font-semibold">
                        {request.needy.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Last Updated */}
            <section className="border-t border-slate-200 pt-5 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last updated: {formatDate(request.updatedAt, true)}
              </p>
            </section>
          </div>
        </article>

        {/* Bottom Navigation */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/needy-dashboard"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <ArrowLeft className="size-4" />
            Back to Dashboard
          </Link>
        </div>

        <footer className="mt-8 border-t border-slate-200 py-5 text-center dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daan — Donate with Trust. Every genuine need deserves a chance.
          </p>
        </footer>
      </div>
    </main>
  );
}