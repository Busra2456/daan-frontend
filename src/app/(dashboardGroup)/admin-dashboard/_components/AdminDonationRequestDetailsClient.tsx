
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  FileText,
  CalendarDays,
  CircleAlert,
  CheckCircle2,
  XCircle,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { useRouter } from "next/navigation";

import {
  useAdminDonationRequestDetails,
  useRejectDonationRequest,
  useVerifyDonationRequest,
} from "@/hooks";
import { AdminDonationRequestDetailsClientProps } from "@/types/admin.type";

export default function AdminDonationRequestDetailsClient({
  requestId,
}: AdminDonationRequestDetailsClientProps) {
  const router = useRouter();

  const { data, isLoading, isError } =
    useAdminDonationRequestDetails(requestId);

  const verifyMutation = useVerifyDonationRequest();
  const rejectMutation = useRejectDonationRequest();

  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const request = data?.data;

  const handleVerify = () => {
    verifyMutation.mutate(requestId, {
      onSuccess: () => {
        router.push("/admin-dashboard");
        router.refresh();
      },
    });
  };

  const handleReject = () => {
    const reason = rejectionReason.trim();

    if (!reason) return;

    rejectMutation.mutate(
      {
        requestId,
        rejectionReason: reason,
      },
      {
        onSuccess: () => {
          setIsRejecting(false);
          setRejectionReason("");
          router.push("/admin-dashboard");
          router.refresh();
        },
      },
    );
  };

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-5 w-44 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-40 rounded-2xl bg-white dark:bg-slate-900" />
          <div className="h-64 rounded-2xl bg-white dark:bg-slate-900" />
        </div>
      </main>
    );
  }

  if (isError || !request) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/admin-dashboard/donation-requests"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" />
            Back to All Requests
          </Link>

          <section className="mt-8 rounded-2xl border border-rose-200 bg-white p-6 shadow-sm dark:border-rose-900/60 dark:bg-slate-900 sm:p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
              <CircleAlert className="size-6" />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-slate-100">
              Unable to load donation request
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              The donation request could not be found or something went wrong.
              Please try again.
            </p>

            <button
              type="button"
              onClick={() => router.refresh()}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Try Again
            </button>
          </section>
        </div>
      </main>
    );
  }

  const status = request.status;

  const statusClass =
    status === "VERIFIED"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
      : status === "REJECTED"
        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300"
        : status === "COMPLETED"
          ? "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-300"
          : status === "DONATIONS"
            ? "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300"
            : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300";

  const canReview = status === "PENDING";

  const cardClass =
    "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-6";

  const sectionTitleClass =
    "flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100";

  const mutedTextClass = "text-sm text-slate-600 dark:text-slate-400";

  const needy = request.needy;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back navigation */}
        <Link
          href="/admin-dashboard/donation-requests"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to All Requests
        </Link>

        {/* Page heading */}
        <header className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                <ShieldCheck className="size-4" />
                Admin Request Review
              </div>

              <h1 className="mt-4 break-words text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
                {request.title}
              </h1>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Review the submitted information and supporting evidence.
              </p>
            </div>

            <span
              className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-wide ${statusClass}`}
            >
              <span className="size-2 rounded-full bg-current" />
              {status}
            </span>
          </div>
        </header>

        {/* Review actions */}
        {canReview && (
          <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-900/70 dark:bg-emerald-950/20 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                <ShieldCheck className="size-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Review this request
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Check the needy person&apos;s information and evidence before
                  making a decision.
                </p>
              </div>
            </div>

            {!isRejecting ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={
                    verifyMutation.isPending || rejectMutation.isPending
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCircle2 className="size-4" />
                  {verifyMutation.isPending
                    ? "Verifying..."
                    : "Verify Request"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsRejecting(true);
                    setRejectionReason("");
                  }}
                  disabled={
                    verifyMutation.isPending || rejectMutation.isPending
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-5 py-3 text-sm font-bold text-rose-700 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-900 dark:bg-slate-900 dark:text-rose-300 dark:hover:bg-rose-950/40"
                >
                  <XCircle className="size-4" />
                  Reject Request
                </button>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-rose-200 bg-white p-4 dark:border-rose-900 dark:bg-slate-900 sm:p-5">
                <label
                  htmlFor="rejectionReason"
                  className="text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  Rejection Reason
                </label>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Provide a clear reason so the request can be understood.
                </p>

                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(event) => setRejectionReason(event.target.value)}
                  placeholder="Explain why this request is being rejected..."
                  rows={4}
                  maxLength={1000}
                  disabled={rejectMutation.isPending}
                  className="mt-3 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
                />

                <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">
                  {rejectionReason.length}/1000
                </p>

                <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRejecting(false);
                      setRejectionReason("");
                    }}
                    disabled={rejectMutation.isPending}
                    className="min-h-11 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleReject}
                    disabled={
                      rejectMutation.isPending || !rejectionReason.trim()
                    }
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XCircle className="size-4" />
                    {rejectMutation.isPending
                      ? "Rejecting..."
                      : "Confirm Rejection"}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Main content */}
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-3">
          <div className="min-w-0 space-y-6 lg:col-span-2">
            {/* Request description */}
            <section className={cardClass}>
              <h2 className={sectionTitleClass}>
                <FileText className="size-5 text-emerald-600 dark:text-emerald-400" />
                Donation Request
              </h2>

              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-slate-300">
                {request.description}
              </p>

              <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/70 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Required Donation Amount
                </p>

                <div className="mt-2 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <TbCurrencyTaka className="size-8 shrink-0" />
                  <span className="break-all text-3xl font-extrabold tracking-tight">
                    {Number(request.requiredAmount).toLocaleString("en-BD")}
                  </span>
                </div>
              </div>
            </section>

            {/* Evidence */}
            <section className={cardClass}>
              <h2 className={sectionTitleClass}>
                <ExternalLink className="size-5 text-emerald-600 dark:text-emerald-400" />
                Situation Evidence
              </h2>

              {request.situationVideo ? (
                <div className="mt-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Situation Video
                  </p>

                  <a
                    href={request.situationVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    View Situation Video
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              ) : null}

              {request.situationAudio ? (
                <div className="mt-5 rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Situation Audio
                  </p>

                  <audio
                    controls
                    preload="metadata"
                    className="w-full"
                    src={request.situationAudio}
                  >
                    Your browser does not support audio playback.
                  </audio>
                </div>
              ) : null}

              {!request.situationVideo && !request.situationAudio && (
                <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <CircleAlert className="mt-0.5 size-5 shrink-0 text-slate-500 dark:text-slate-400" />
                  <p className={mutedTextClass}>
                    No video or audio evidence was provided for this request.
                  </p>
                </div>
              )}
            </section>

            {/* Rejection information */}
            {request.rejectionReason && (
              <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 dark:border-rose-900/60 dark:bg-rose-950/20 sm:p-6">
                <h2 className="flex items-center gap-2 text-lg font-bold text-rose-700 dark:text-rose-300">
                  <CircleAlert className="size-5" />
                  Rejection Reason
                </h2>

                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-rose-800 dark:text-rose-200">
                  {request.rejectionReason}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-6">
            {/* Needy user */}
            <section className={cardClass}>
              <h2 className={sectionTitleClass}>
                <ShieldCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
                Needy User
              </h2>

              <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                <p className="break-words font-bold text-slate-900 dark:text-slate-100">
                  {needy?.name || "Name not available"}
                </p>

                <p className="mt-1 break-all text-sm text-slate-600 dark:text-slate-400">
                  {needy?.email || "Email not available"}
                </p>
              </div>

              <div className="mt-5 space-y-4">
                {needy?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Phone
                      </p>
                      <p className="mt-1 break-words text-sm text-slate-800 dark:text-slate-200">
                        {needy.phone}
                      </p>
                    </div>
                  </div>
                )}

                {needy?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Address
                      </p>
                      <p className="mt-1 break-words text-sm text-slate-800 dark:text-slate-200">
                        {needy.address}
                      </p>
                    </div>
                  </div>
                )}

                {needy?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Email address
                      </p>
                      <p className="mt-1 break-all text-sm text-slate-800 dark:text-slate-200">
                        {needy.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Review information */}
            <section className={cardClass}>
              <h2 className={sectionTitleClass}>
                <CalendarDays className="size-5 text-emerald-600 dark:text-emerald-400" />
                Review Information
              </h2>

              <div className="mt-5 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <CalendarDays className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Submitted
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {formatDate(request.createdAt)}
                    </p>
                  </div>
                </div>

                {request.reviewedAt && (
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <CheckCircle2 className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Reviewed
                      </p>
                      <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {formatDate(request.reviewedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Request status summary */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <Wallet className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Daan Donation Request
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Donate with Trust
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Current status
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}
                >
                  {status}
                </span>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
