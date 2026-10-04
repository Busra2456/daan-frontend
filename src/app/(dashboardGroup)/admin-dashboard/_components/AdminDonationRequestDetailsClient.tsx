"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

import {
  useAdminDonationRequestDetails,
  useRejectDonationRequest,
  useVerifyDonationRequest,
} from "@/hooks";
import { useRouter } from "next/navigation";
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

  if (!reason) {
    return;
  }

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

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-40 rounded bg-muted" />
          <div className="h-12 w-2/3 rounded bg-muted" />
          <div className="h-40 rounded-xl bg-muted" />
          <div className="h-48 rounded-xl bg-muted" />
        </div>
      </main>
    );
  }

  if (isError || !request) {
    return (
      <main className="mx-auto max-w-5xl p-6 sm:p-8">
        <Link
          href="/admin-dashboard/donation-requests"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to All Requests
        </Link>

        <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <h1 className="text-lg font-semibold">
            Unable to load donation request
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The donation request could not be found or something went wrong.
          </p>
        </div>
      </main>
    );
  }

  const statusClass =
    request.status === "VERIFIED"
      ? "bg-green-100 text-green-700"
      : request.status === "REJECTED"
        ? "bg-red-100 text-red-700"
        : request.status === "COMPLETED"
          ? "bg-blue-100 text-blue-700"
          : request.status === "DONATIONS"
            ? "bg-purple-100 text-purple-700"
            : "bg-yellow-100 text-yellow-700";

  const canReview = request.status === "PENDING";

  return (
    <main className="mx-auto max-w-5xl p-6 sm:p-8">
      <Link
        href="/admin-dashboard/donation-requests"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to All Requests
      </Link>

      <div className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Admin Request Review
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {request.title}
            </h1>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-1.5 text-sm font-semibold ${statusClass}`}
          >
            {request.status}
          </span>
        </div>
      </div>

      {canReview && (
        <section className="mt-8 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Review Request</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Review the information and evidence above before approving or
            rejecting this donation request.
          </p>

          {!isRejecting ? (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleVerify}
                disabled={
                  verifyMutation.isPending ||
                  rejectMutation.isPending
                }
                className="flex-1 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
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
                  verifyMutation.isPending ||
                  rejectMutation.isPending
                }
                className="flex-1 rounded-xl border border-destructive/30 bg-background px-5 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reject Request
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="rejectionReason"
                  className="text-sm font-medium"
                >
                  Rejection Reason
                </label>

                <textarea
                  id="rejectionReason"
                  value={rejectionReason}
                  onChange={(event) =>
                    setRejectionReason(event.target.value)
                  }
                  placeholder="Explain why this request is being rejected..."
                  rows={4}
                  disabled={rejectMutation.isPending}
                  className="mt-2 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={
                    rejectMutation.isPending ||
                    !rejectionReason.trim()
                  }
                  className="flex-1 rounded-xl bg-destructive px-5 py-3 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {rejectMutation.isPending
                    ? "Rejecting..."
                    : "Confirm Rejection"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsRejecting(false);
                    setRejectionReason("");
                  }}
                  disabled={rejectMutation.isPending}
                  className="rounded-xl border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Donation Request</h2>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
              {request.description}
            </p>

            <div className="mt-6 rounded-xl bg-muted/50 p-5">
              <p className="text-sm text-muted-foreground">
                Required Amount
              </p>

              <div className="mt-1 flex items-center gap-1">
                <TbCurrencyTaka className="text-3xl" />

                <span className="text-3xl font-bold">
                  {Number(request.requiredAmount).toLocaleString()}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              Situation Evidence
            </h2>

            {request.situationVideo ? (
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium">
                  Situation Video
                </p>

                <a
                  href={request.situationVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  View Situation Video
                  <ExternalLink className="size-4" />
                </a>
              </div>
            ) : null}

            {request.situationAudio ? (
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium">
                  Situation Audio
                </p>

                <audio
                  controls
                  className="w-full"
                  src={request.situationAudio}
                >
                  Your browser does not support audio playback.
                </audio>
              </div>
            ) : null}

            {!request.situationVideo &&
              !request.situationAudio && (
                <p className="mt-4 text-sm text-muted-foreground">
                  No video or audio evidence was provided.
                </p>
              )}
          </section>

          {request.rejectionReason && (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <h2 className="font-semibold text-red-700">
                Rejection Reason
              </h2>

              <p className="mt-2 text-sm leading-6 text-red-600">
                {request.rejectionReason}
              </p>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Needy User</h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="font-semibold">{request.needy.name}</p>

                <p className="text-sm text-muted-foreground">
                  {request.needy.email}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                {request.needy.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span>{request.needy.phone}</span>
                  </div>
                )}

                {request.needy.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span>{request.needy.address}</span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <span>{request.needy.email}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              Review Information
            </h2>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Submitted</p>

                <p className="mt-1 font-medium">
                  {new Date(request.createdAt).toLocaleString()}
                </p>
              </div>

              {request.reviewedAt && (
                <div>
                  <p className="text-muted-foreground">Reviewed</p>

                  <p className="mt-1 font-medium">
                    {new Date(request.reviewedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

