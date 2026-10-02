"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, UserRound } from "lucide-react";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";


import Image from "next/image";
import { use } from "react";
import { DonorRequestDetailsPageProps } from "@/types/donation-request.type";
import DonationForm from "../../_components/DonationForm";
import { getDonationRequestById } from "@/api";



export default function DonorRequestDetailsPage({
  params,
}: DonorRequestDetailsPageProps) {
  const { requestId } = use(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["donor-donation-request", requestId],
    queryFn: () => getDonationRequestById(requestId),
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <div className="h-8 w-32 animate-pulse rounded-md bg-muted" />

        <div className="mt-6 rounded-2xl border bg-card p-8">
          <div className="h-8 w-2/3 animate-pulse rounded-md bg-muted" />
          <div className="mt-4 h-20 animate-pulse rounded-md bg-muted" />
          <div className="mt-6 h-10 w-48 animate-pulse rounded-md bg-muted" />
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <Link
          href="/donor-dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to requests
        </Link>

        <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-8">
          <h1 className="text-xl font-semibold">
            Unable to load donation request
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This request may not exist or could not be loaded right now.
          </p>
        </div>
      </main>
    );
  }

  const request = data.data;

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link
        href="/donor-dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to requests
      </Link>

      <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="border-b p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Verified Request
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {request.title}
              </h1>
            </div>

            <div className="shrink-0">
              <p className="text-sm text-muted-foreground">
                Required Amount
              </p>

              <div className="mt-1 flex items-center gap-1">
                <TbCurrencyTaka className="text-2xl" />

                <span className="text-2xl font-bold">
                  {Number(request.requiredAmount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_300px]">
          <section>
            <h2 className="text-lg font-semibold">About this request</h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">
              {request.description}
            </p>

            {request.situationVideo && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Situation Video</h2>

                <video
                  controls
                  className="mt-4 aspect-video w-full rounded-xl border bg-black"
                  src={request.situationVideo}
                >
                  Your browser does not support video playback.
                </video>
              </div>
            )}

            {request.situationAudio && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold">Situation Audio</h2>

                <audio
                  controls
                  className="mt-4 w-full"
                  src={request.situationAudio}
                >
                  Your browser does not support audio playback.
                </audio>
              </div>
            )}
          </section>

          <aside className="h-fit rounded-xl border bg-muted/30 p-5">
            <h2 className="text-lg font-semibold">About the person</h2>

            <div className="mt-5 flex items-center gap-3">
              {request.needy.imageUrl ? (
                <Image
                  src={request.needy.imageUrl}
                  alt={request.needy.name}
                  className="size-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                  <UserRound className="size-6 text-muted-foreground" />
                </div>
              )}

              <div>
                <p className="font-medium">{request.needy.name}</p>

                <p className="text-sm text-muted-foreground">
                  Verified requester
                </p>
              </div>
            </div>

            {request.needy.address && (
              <div className="mt-5 flex gap-3 border-t pt-5">
                <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

                <p className="text-sm leading-6 text-muted-foreground">
                  {request.needy.address}
                </p>
              </div>
            )}

            <div className="mt-6 border-t pt-5">
              <DonationForm
  requestId={request.id}
  requiredAmount={request.requiredAmount}
/>
 </div>
          </aside>
        </div>
      </div>
    </main>
  );
}