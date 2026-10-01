import { api } from "@/lib/api/client";

export async function getVerifiedDonationRequests() {
	return api("/api/donation-requests/verified", {
		method: "GET",
	});
}