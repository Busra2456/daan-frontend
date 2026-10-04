"use client";

import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

import {
	usePendingDonationRequests,
	useRejectDonationRequest,
	useVerifyDonationRequest,
} from "@/hooks";
import { FaMinus } from "react-icons/fa";

export default function AdminDashboardPage() {
	const queryClient = useQueryClient();

	const { data, isLoading, isError } = usePendingDonationRequests();

	const verifyMutation = useVerifyDonationRequest();
	const rejectMutation = useRejectDonationRequest();

	const [rejectingRequestId, setRejectingRequestId] =
		useState<string | null>(null);

	const [rejectionReason, setRejectionReason] = useState("");

	const requests = data?.data ?? [];

	function handleVerify(requestId: string) {
		verifyMutation.mutate(requestId, {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ["pending-donation-requests"],
				});

				queryClient.invalidateQueries({
					queryKey: ["admin-all-donation-requests"],
				});
			},
		});
	}

	function handleReject(requestId: string) {
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
					setRejectingRequestId(null);
					setRejectionReason("");

					queryClient.invalidateQueries({
						queryKey: ["pending-donation-requests"],
					});

					queryClient.invalidateQueries({
						queryKey: ["admin-all-donation-requests"],
					});
				},
			},
		);
	}

	if (isLoading) {
		return (
			<main className="mx-auto max-w-7xl p-6 sm:p-8">
				<div className="mb-8">
					<div className="h-9 w-64 animate-pulse rounded-md bg-muted" />

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
						Unable to load donation requests
					</h2>

					<p className="mt-2 text-sm text-muted-foreground">
						Something went wrong while loading pending requests.
						Please try again later.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-7xl p-6 sm:p-8">
			{/* Header */}
			<div className="mb-8">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
							Admin Control
						</div>

						<h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
							Admin Dashboard
						</h1>

						<p className="mt-2 max-w-2xl text-muted-foreground">
							Review and verify donation requests before they reach
							donors.
						</p>
					</div>

					{/* Admin Actions */}
					<div className="flex flex-wrap items-center gap-3">
						{/* View All Requests */}
						<Link
							href="/admin-dashboard/donation-requests"
							className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
							
						>
							View All Requests
						</Link>

						{/* Manage Users */}
						<Link
							href="/admin-dashboard/users"
							className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md"
						>
							Manage Users
						</Link>

						{/* Pending Count */}
						<div className="flex items-center justify-between">
	<div className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm">
		<span>Pending Requests</span>

		<FaMinus className="size-3" />

		<span className="rounded-lg bg-primary-foreground/15 px-1 py-1 text-xs font-bold">
			{requests.length}
		</span>
	</div>
</div>
					</div>
				</div>
			</div>

			{/* Empty State */}
			{requests.length === 0 ? (
				<div className="rounded-2xl border bg-card px-6 py-14 text-center shadow-sm">
					<div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-100">
						<span className="text-2xl">✓</span>
					</div>

					<h2 className="mt-5 text-xl font-semibold">
						No pending requests
					</h2>

					<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
						There are currently no donation requests waiting for
						verification.
					</p>
				</div>
			) : (
				/* Request Cards */
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{requests.map((request) => {
						const isRejecting =
							rejectingRequestId === request.id;

						return (
							<article
								key={request.id}
								className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
							>
								{/* Request Information */}
								<div className="flex-1 p-6">
									<div className="flex items-start justify-between gap-4">
										<h2 className="line-clamp-2 text-xl font-semibold tracking-tight">
											{request.title}
										</h2>

										<span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
											Pending
										</span>
									</div>

									<p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
										{request.description}
									</p>

									{/* Required Amount */}
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

									{/* Needy User */}
									<div className="mt-5 border-t pt-5">
										<p className="text-xs font-medium text-muted-foreground">
											Requested by
										</p>

										<p className="mt-1 font-semibold">
											{request.needy.name}
										</p>

										{request.needy.address && (
											<p className="mt-1 text-sm text-muted-foreground">
												{request.needy.address}
											</p>
										)}
									</div>
								</div>

								{/* Actions */}
								<div className="border-t bg-muted/20 p-5">
									{isRejecting ? (
										/* Reject Form */
										<div className="space-y-3">
											<label
												htmlFor={`rejection-${request.id}`}
												className="text-sm font-medium"
											>
												Rejection Reason
											</label>

											<textarea
												id={`rejection-${request.id}`}
												value={rejectionReason}
												onChange={(event) =>
													setRejectionReason(
														event.target.value,
													)
												}
												placeholder="Explain why this request is being rejected..."
												rows={4}
												disabled={
													rejectMutation.isPending
												}
												className="w-full resize-none rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
											/>

											<div className="flex gap-2">
												{/* Confirm Reject */}
												<button
													type="button"
													onClick={() =>
														handleReject(
															request.id,
														)
													}
													disabled={
														rejectMutation.isPending ||
														!rejectionReason.trim()
													}
													className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
												>
													{rejectMutation.isPending
														? "Rejecting..."
														: "Confirm Reject"}
												</button>

												{/* Cancel */}
												<button
													type="button"
													onClick={() => {
														setRejectingRequestId(
															null,
														);
														setRejectionReason("");
													}}
													disabled={
														rejectMutation.isPending
													}
													className="inline-flex items-center justify-center rounded-xl border bg-card px-4 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
												>
													Cancel
												</button>
											</div>
										</div>
									) : (
										/* Normal Actions */
										<div className="space-y-2">
											{/* View Details */}
											<Link
												href={`/admin-dashboard/donation-requests/${request.id}`}
												className="inline-flex w-full items-center justify-center rounded-xl border bg-card px-4 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-md"
											>
												View Details
											</Link>

											<div className="grid grid-cols-2 gap-2">
												{/* Verify */}
												<button
													type="button"
													disabled={
														verifyMutation.isPending ||
														rejectMutation.isPending
													}
													onClick={() =>
														handleVerify(
															request.id,
														)
													}
													className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
												>
													{verifyMutation.isPending
														? "Verifying..."
														: "Verify"}
												</button>

												{/* Reject */}
												<button
													type="button"
													disabled={
														verifyMutation.isPending ||
														rejectMutation.isPending
													}
													onClick={() => {
														setRejectingRequestId(
															request.id,
														);
														setRejectionReason("");
													}}
													className="inline-flex items-center justify-center rounded-xl border bg-card px-4 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
												>
													Reject
												</button>
											</div>
										</div>
									)}
								</div>
							</article>
						);
					})}
				</div>
			)}
		</main>
	);
}