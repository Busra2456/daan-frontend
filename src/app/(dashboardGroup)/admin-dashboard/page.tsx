"use client";

import {
	usePendingDonationRequests,
	useRejectDonationRequest,
	useVerifyDonationRequest,
} from "@/hooks";
import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

export default function AdminDashboardPage() {
	const { data, isLoading, isError } =
		usePendingDonationRequests();

	const verifyMutation = useVerifyDonationRequest();
	const rejectMutation = useRejectDonationRequest();

	const [rejectingRequestId, setRejectingRequestId] =
		useState<string | null>(null);

	const [rejectionReason, setRejectionReason] =
		useState("");

	const requests = data?.data ?? [];

	function handleReject(requestId: string) {
		if (!rejectionReason.trim()) {
			return;
		}

		rejectMutation.mutate(
			{
				requestId,
				rejectionReason: rejectionReason.trim(),
			},
			{
				onSuccess: () => {
					setRejectingRequestId(null);
					setRejectionReason("");
				},
			},
		);
	}

	if (isLoading) {
		return (
			<main className="mx-auto max-w-7xl p-6">
				<div className="mb-8">
					<div className="h-9 w-64 animate-pulse rounded-md bg-muted" />

					<div className="mt-3 h-5 w-96 animate-pulse rounded-md bg-muted" />
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, index) => (
						<div
							key={index}
							className="h-64 animate-pulse rounded-xl border bg-muted"
						/>
					))}
				</div>
			</main>
		);
	}

	if (isError) {
		return (
			<main className="mx-auto max-w-7xl p-6">
				<div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
					<h2 className="text-lg font-semibold">
						Unable to load donation requests
					</h2>

					<p className="mt-2 text-sm text-muted-foreground">
						Something went wrong while loading pending requests.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-7xl p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">
					Admin Dashboard
				</h1>

				<p className="mt-2 text-muted-foreground">
					Review and verify donation requests before they reach
					donors.
				</p>
			</div>

			{requests.length === 0 ? (
				<div className="rounded-xl border bg-card p-10 text-center">
					<h2 className="text-xl font-semibold">
						No pending requests
					</h2>

					<p className="mt-2 text-muted-foreground">
						There are currently no donation requests waiting for
						verification.
					</p>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{requests.map((request) => (
						<article
							key={request.id}
							className="flex flex-col rounded-xl border bg-card p-6 shadow-sm"
						>
							<div className="flex-1">
								<div className="flex items-start justify-between gap-4">
									<h2 className="text-xl font-semibold">
										{request.title}
									</h2>

									<span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
										Pending
									</span>
								</div>

								<p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
									{request.description}
								</p>

								<div className="mt-5">
									<p className="text-sm text-muted-foreground">
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

								<div className="mt-4">
									<p className="text-sm text-muted-foreground">
										Requested by
									</p>

									<p className="mt-1 font-medium">
										{request.needy.name}
									</p>

									{request.needy.address && (
										<p className="text-sm text-muted-foreground">
											{request.needy.address}
										</p>
									)}
								</div>
							</div>

							<div className="mt-6 border-t pt-4">
								{rejectingRequestId === request.id ? (
									<div className="space-y-3">
										<textarea
											value={rejectionReason}
											onChange={(event) =>
												setRejectionReason(
													event.target.value,
												)
											}
											placeholder="Enter rejection reason..."
											rows={3}
											className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
										/>

										<div className="flex gap-2">
											<button
												type="button"
												onClick={() =>
													handleReject(request.id)
												}
												disabled={
													rejectMutation.isPending ||
													!rejectionReason.trim()
												}
												className="flex-1 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground disabled:cursor-not-allowed disabled:opacity-50"
											>
												{rejectMutation.isPending
													? "Rejecting..."
													: "Confirm Reject"}
											</button>

											<button
												type="button"
												onClick={() => {
													setRejectingRequestId(null);
													setRejectionReason("");
												}}
												disabled={
													rejectMutation.isPending
												}
												className="rounded-lg border px-4 py-2.5 text-sm font-medium"
											>
												Cancel
											</button>
										</div>
									</div>
								) : (
									<div className="flex gap-2">
										<button
											type="button"
											disabled={
												verifyMutation.isPending ||
												rejectMutation.isPending
											}
											onClick={() =>
												verifyMutation.mutate(
													request.id,
												)
											}
											className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
										>
											{verifyMutation.isPending
												? "Verifying..."
												: "Verify"}
										</button>

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
											className="flex-1 rounded-lg border border-destructive/30 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 disabled:cursor-not-allowed disabled:opacity-50"
										>
											Reject
										</button>
									</div>
								)}
							</div>
						</article>
					))}
				</div>
			)}
		</main>
	);
}