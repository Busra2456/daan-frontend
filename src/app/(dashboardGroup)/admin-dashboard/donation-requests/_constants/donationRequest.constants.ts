import type { DonationRequestStatus } from "@/types/donation-request.type";

export const donationRequestSections: {
	status: DonationRequestStatus;
	title: string;
	showMore: string;
}[] = [
	{
		status: "PENDING",
		title: "Pending Requests",
		showMore: "/admin-dashboard/donation-requests/pending",
	},
	{
		status: "VERIFIED",
		title: "Verified Requests",
		showMore: "/admin-dashboard/donation-requests/verified",
	},
	{
		status: "DONATIONS",
		title: "Donations in Progress",
		showMore: "/admin-dashboard/donation-requests/donations",
	},
	{
		status: "COMPLETED",
		title: "Completed Requests",
		showMore: "/admin-dashboard/donation-requests/completed",
	},
	{
		status: "REJECTED",
		title: "Rejected Requests",
		showMore: "/admin-dashboard/donation-requests/rejected",
	},
];

export const donationRequestStatusStyle: Record<
	DonationRequestStatus,
	string
> = {
	PENDING: "bg-yellow-100 text-yellow-700",
	VERIFIED: "bg-green-100 text-green-700",
	DONATIONS: "bg-blue-100 text-blue-700",
	COMPLETED: "bg-purple-100 text-purple-700",
	REJECTED: "bg-red-100 text-red-700",
};