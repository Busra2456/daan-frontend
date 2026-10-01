"use client";

import { getDonationRequestById } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TbCurrencyTaka } from "react-icons/tb";


export default function DonationRequestDetailsPage() {
  const params = useParams<{ requestId: string }>();

  const { data, isLoading, isError } = useQuery<DonationRequestResponse>({
    queryKey: ["donation-request", params.requestId],
    queryFn: () => getDonationRequestById(params.requestId),
    enabled: Boolean(params.requestId),
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <div className="rounded-xl border bg-card p-6">
          <p className="text-muted-foreground">
            Loading request details...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !data?.success) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <div className="rounded-xl border border-destructive/30 bg-card p-6">
          <h1 className="text-xl font-semibold">Request Not Found</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            We could not load this donation request.
          </p>

          <Link
            href="/needy-dashboard"
            className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const request = data.data;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <Link
          href="/needy-dashboard"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
           Back to Dashboard
        </Link>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h1 className="text-3xl font-bold">{request.title}</h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Created on{" "}
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span className="w-fit rounded-full bg-muted px-3 py-1 text-sm font-medium">
              {request.status}
            </span>
          </div>
        </div>

        <div className="space-y-8 p-6">
          <section>
            <h2 className="text-lg font-semibold">About Your Situation</h2>

            <p className="mt-3 whitespace-pre-wrap leading-7 text-muted-foreground">
              {request.description}
            </p>
          </section>

         <section className="rounded-lg border p-5">
  <p className="text-sm text-muted-foreground">
    Required Amount
  </p>

  <div className="mt-2 flex items-center">
    <TbCurrencyTaka className="text-4xl font-bold" />

    <p className="text-3xl font-bold">
      {Number(request.requiredAmount).toLocaleString()}
    </p>
  </div>
</section>
          {request.status === "PENDING" && (
            <section className="rounded-lg border p-5">
              <h2 className="font-semibold">Verification Status</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Your request has been submitted and is waiting for admin
                verification.
              </p>
            </section>
          )}

          {request.status === "VERIFIED" && (
            <section className="rounded-lg border p-5">
              <h2 className="font-semibold">Verified</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Your request has been verified and is now visible to donors.
              </p>
            </section>
          )}

          {request.status === "DONATIONS" && (
            <section className="rounded-lg border p-5">
              <h2 className="font-semibold">Donations Started</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Donors can now contribute to your request.
              </p>
            </section>
          )}

          {request.status === "COMPLETED" && (
            <section className="rounded-lg border p-5">
              <h2 className="font-semibold">Request Completed</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                This donation request has been completed successfully.
              </p>
            </section>
          )}

          {request.rejectionReason && (
            <section className="rounded-lg border border-destructive/30 p-5">
              <h2 className="font-semibold text-destructive">
                Rejection Reason
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {request.rejectionReason}
              </p>
            </section>
          )}

          {(request.situationVideo || request.situationAudio) && (
            <section>
              <h2 className="text-lg font-semibold">
                Supporting Media
              </h2>

              <div className="mt-4 space-y-3">
                {request.situationVideo && (
                  <a
                    href={request.situationVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border p-4 text-sm font-medium hover:bg-muted"
                  >
                     View Situation Video
                  </a>
                )}

                {request.situationAudio && (
                  <a
                    href={request.situationAudio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border p-4 text-sm font-medium hover:bg-muted"
                  >
                     Listen to Situation Audio
                  </a>
                )}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold">Your Information</h2>

            <div className="mt-4 grid gap-4 rounded-lg border p-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="mt-1 font-medium">{request.needy.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="mt-1 font-medium">{request.needy.email}</p>
              </div>

              {request.needy.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="mt-1 font-medium">{request.needy.phone}</p>
                </div>
              )}

              {request.needy.address && (
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="mt-1 font-medium">{request.needy.address}</p>
                </div>
              )}
            </div>
          </section>

          <section className="border-t pt-5">
            <p className="text-xs text-muted-foreground">
              Last updated:{" "}
              {new Date(request.updatedAt).toLocaleString()}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}