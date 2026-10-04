"use client";

import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";

import { useAllDonationRequests } from "@/hooks";
import type {
	DonationRequest,
	DonationRequestStatus,
} from "@/types/donation-request.type";

interface DonationRequestStatusListProps {
	title: string;
	description: string;
	status: DonationRequestStatus;
}

function getStatusStyle(status: DonationRequestStatus) {
	switch (status) {
		case "PENDING":
			return "bg-yellow-100 text-yellow-700";

		case "VERIFIED":
			return "bg-green-100 text-green-700";

		case "DONATIONS":
			return "bg-blue-100 text-blue-700";

		case "COMPLETED":
			return "bg-purple-100 text-purple-700";

		case "REJECTED":
			return "bg-red-100 text-red-700";

		default:
			return "bg-muted text-muted-foreground";
	}
}

export default function DonationRequestStatusList({
	title,
	description,
	status,
}: DonationRequestStatusListProps) {
	return (
		<StatusRequestContent
			title={title}
			description={description}
			status={status}
		/>
	);
}

function StatusRequestContent({
	title,
	description,
	status,
}: DonationRequestStatusListProps) {
	const { data, isLoading, isError } = useAllDonationRequests();

	const allRequests: DonationRequest[] = data?.data ?? [];

	const requests = allRequests.filter(
		(request: DonationRequest) => request.status === status,
	);

	if (isLoading) {
		return (
			<main className="mx-auto max-w-7xl p-6 sm:p-8">
				<div className="mb-8">
					<div className="h-9 w-72 animate-pulse rounded-md bg-muted" />

					<div className="mt-3 h-5 w-96 animate-pulse rounded-md bg-muted" />
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className="h-72 animate-pulse rounded-2xl border bg-muted"
						/>
					))}
				</div>
			</main>
		);
	}

	if (isError) {
		return (
			<main className="mx-auto max-w-7xl p-6 sm:p-8">
				<div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
					<h2 className="text-lg font-semibold">
						Unable to load requests
					</h2>

					<p className="mt-2 text-sm text-muted-foreground">
						Something went wrong while loading requests.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-7xl p-6 sm:p-8">
			<div className="mb-8">
				<Link
					href="/admin-dashboard/donation-requests"
					className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
				>
					← Back to All Requests
				</Link>

				<h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
					{title}
				</h1>

				<p className="mt-2 text-muted-foreground">
					{description}
				</p>

				<div className="mt-4">
					<span
						className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
							status,
						)}`}
					>
						{status}
					</span>

					<span className="ml-3 text-sm text-muted-foreground">
						{requests.length} request
						{requests.length !== 1 ? "s" : ""}
					</span>
				</div>
			</div>

			{requests.length === 0 ? (
				<div className="rounded-2xl border bg-card px-6 py-14 text-center">
					<h2 className="text-xl font-semibold">
						No {status.toLowerCase()} requests
					</h2>

					<p className="mt-2 text-sm text-muted-foreground">
						There are currently no requests in this section.
					</p>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{requests.map((request: DonationRequest) => (
						<article
							key={request.id}
							className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
						>
							<div className="flex-1 p-6">
								<div className="flex items-start justify-between gap-4">
									<h2 className="line-clamp-2 text-xl font-semibold tracking-tight">
										{request.title}
									</h2>

									<span
										className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
											request.status,
										)}`}
									>
										{request.status}
									</span>
								</div>

								<p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
									{request.description}
								</p>

								<div className="mt-6 rounded-xl bg-muted/50 p-4">
									<p className="text-xs font-medium text-muted-foreground">
										Required Amount
									</p>

									<div className="mt-1 flex items-center gap-1">
										<TbCurrencyTaka className="text-2xl" />

										<span className="text-2xl font-bold">
											{Number(
												request.requiredAmount,
											).toLocaleString()}
										</span>
									</div>
								</div>

								<div className="mt-5 border-t pt-5">
									<p className="text-xs font-medium text-muted-foreground">
										Requested by
									</p>

									<p className="mt-1 font-semibold">
										{request.needy.name}
									</p>

									<p className="mt-1 text-sm text-muted-foreground">
										{request.needy.email}
									</p>

									{request.status === "REJECTED" &&
										request.rejectionReason && (
											<div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
												<p className="text-xs font-semibold text-red-700">
													Rejection Reason
												</p>

												<p className="mt-1 text-sm text-red-700">
													{request.rejectionReason}
												</p>
											</div>
										)}
								</div>
							</div>

							<div className="border-t bg-muted/20 p-5">
								<Link
									href={`/admin-dashboard/donation-requests/${request.id}`}
									className="block w-full rounded-xl border bg-background px-4 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-muted"
								>
									View Details
								</Link>
							</div>
						</article>
					))}
				</div>
			)}
		</main>
	);
}