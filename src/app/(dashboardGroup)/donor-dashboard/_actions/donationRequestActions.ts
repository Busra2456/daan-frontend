import { api } from "@/lib/api/client";

export async function getVerifiedDonationRequests() {
	return api("/api/donation-requests/verified", {
		method: "GET",
	});
}

export async function getDonationRequestById(requestId: string) {
  return api(
    `/api/donation-requests/${encodeURIComponent(requestId)}`,
    {
      method: "GET",
    },
  );
}