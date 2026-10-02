"use client";

import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";

import { useGetMyDonations, useVerifiedDonationRequests } from "@/hooks";


export default function DonorDashboardPage() {
	const {
		data,
		isLoading,
		isError,
	} = useVerifiedDonationRequests();

	const {
		data: donationsData,
		isLoading: donationsLoading,
	} = useGetMyDonations();

	const requests = data?.data ?? [];
	const donations = donationsData?.data ?? [];

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
							className="h-72 animate-pulse rounded-xl border bg-muted"
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
						Something went wrong while loading verified requests.
						Please try again later.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-7xl p-6">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight">
					Donation Requests
				</h1>

				<p className="mt-2 text-muted-foreground">
					Support verified people who genuinely need your help.
				</p>
			</div>

			{/* Verified Requests */}
			{requests.length === 0 ? (
				<div className="rounded-xl border bg-card p-10 text-center">
					<h2 className="text-xl font-semibold">
						No verified requests yet
					</h2>

					<p className="mt-2 text-muted-foreground">
						New verified donation requests will appear here.
					</p>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{requests.map((request) => (
						<article
							key={request.id}
							className="flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
						>
							<div className="flex-1">
								<div className="flex items-start justify-between gap-4">
									<h2 className="text-xl font-semibold">
										{request.title}
									</h2>

									<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
										Verified
									</span>
								</div>

								<p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
									{request.description}
								</p>

								<div className="mt-5">
									<p className="text-sm text-muted-foreground">
										Requested Amount
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
								<Link
									href={`/donor-dashboard/requests/${request.id}`}
									className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
								>
									View Request
								</Link>
							</div>
						</article>
					))}
				</div>
			)}

			{/* Donation History */}
			<section className="mt-12">
				<div className="mb-5">
					<h2 className="text-2xl font-bold">
						Donation History
					</h2>

					<p className="mt-1 text-sm text-muted-foreground">
						Track the donations you have made to verified requests.
					</p>
				</div>

				{donationsLoading ? (
					<div className="rounded-xl border p-6">
						<p className="text-sm text-muted-foreground">
							Loading donation history...
						</p>
					</div>
				) : donations.length === 0 ? (
					<div className="rounded-xl border bg-card p-8 text-center">
						<h3 className="font-semibold">
							No donations yet
						</h3>

						<p className="mt-2 text-sm text-muted-foreground">
							Your donations will appear here after you make a
							donation.
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{donations.map((donation) => (
							<article
								key={donation.id}
								className="rounded-xl border bg-card p-5"
							>
								<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
									<div>
										<h3 className="font-semibold">
											{donation.request.title}
										</h3>

										<p className="mt-1 text-sm text-muted-foreground">
											{new Date(
												donation.createdAt,
											).toLocaleDateString()}
										</p>
									</div>

									<div className="flex items-center gap-1">
										<TbCurrencyTaka className="text-xl" />

										<span className="text-xl font-bold">
											{Number(
												donation.amount,
											).toLocaleString()}
										</span>
									</div>
								</div>

								<div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
									<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
										{donation.status}
									</span>

									<span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
										Payment: {donation.paymentStatus}
									</span>
								</div>
							</article>
						))}
					</div>
				)}
			</section>
		</main>
	);
}