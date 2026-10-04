"use client";

import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";

import { useAllDonationRequests } from "@/hooks";
import { donationRequestSections, donationRequestStatusStyle } from "./_constants/donationRequest.constants";


export default function AllDonationRequestsPage() {
	const { data, isLoading, isError } = useAllDonationRequests();
	const requests = data?.data ?? [];

	if (isLoading) {
		return (
			<main className="mx-auto max-w-7xl p-6 sm:p-8">
				<div className="mb-8 space-y-3">
					<div className="h-9 w-72 animate-pulse rounded-md bg-muted" />
					<div className="h-5 w-96 animate-pulse rounded-md bg-muted" />
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
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
						Something went wrong while loading donation requests.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-7xl p-6 sm:p-8">
			<div className="mb-10">
				<Link
					href="/admin-dashboard"
					className="text-sm text-muted-foreground hover:text-foreground"
				>
					← Back to Admin Dashboard
				</Link>

				<h1 className="mt-5 text-3xl font-bold sm:text-4xl">
					All Donation Requests
				</h1>

				<p className="mt-2 text-muted-foreground">
					View and monitor all donation requests submitted by needy
					users.
				</p>
			</div>

			<div className="space-y-14">
				{donationRequestSections.map((section) => {
					const sectionRequests = requests
						.filter((request) => request.status === section.status)
						.slice(0, 3);

					const total = requests.filter(
						(request) => request.status === section.status,
					).length;

					// No request = hide entire section
					if (!total) return null;

					return (
						<section key={section.status}>
							<div className="mb-5 flex items-center justify-between">
								<div>
									<h2 className="text-2xl font-bold">
										{section.title}
									</h2>
									<p className="mt-1 text-sm text-muted-foreground">
										Showing {sectionRequests.length} of{" "}
										{total} requests.
									</p>
								</div>

								<Link
									href={section.showMore}
									className="rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-muted"
								>
									Show More →
								</Link>
							</div>

							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{sectionRequests.map((request) => (
									<article
										key={request.id}
										className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm"
									>
										<div className="flex-1 p-6">
											<div className="flex items-start justify-between gap-3">
												<h3 className="line-clamp-2 text-xl font-semibold">
													{request.title}
												</h3>

												<span
													className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${donationRequestStatusStyle[request.status]}`}
												>
													{request.status}
												</span>
											</div>

											<p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
												{request.description}
											</p>

											<div className="mt-6 rounded-xl bg-muted/50 p-4">
												<p className="text-xs text-muted-foreground">
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
												<p className="text-xs text-muted-foreground">
													Requested by
												</p>

												<p className="mt-1 font-semibold">
													{request.needy.name}
												</p>

												<p className="mt-1 text-sm text-muted-foreground">
													{request.needy.email}
												</p>

												{request.status ===
													"REJECTED" &&
													request.rejectionReason && (
														<div className="mt-4 rounded-xl bg-red-50 p-3">
															<p className="text-xs font-semibold text-red-700">
																Rejection Reason
															</p>
															<p className="mt-1 text-sm text-red-700">
																{
																	request.rejectionReason
																}
															</p>
														</div>
													)}
											</div>
										</div>

										<div className="border-t p-5">
											<Link
												href={`/admin-dashboard/donation-requests/${request.id}`}
												className="block w-full rounded-xl border px-4 py-2.5 text-center text-sm font-semibold hover:bg-muted"
											>
												View Details
											</Link>
										</div>
									</article>
								))}
							</div>
						</section>
					);
				})}
			</div>
		</main>
	);
}