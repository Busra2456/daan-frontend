import { api } from "@/lib/api/client";
import { PendingDonationRequestsResponse } from "@/types/donation-request.type";

export async function getPendingDonationRequests(): Promise<PendingDonationRequestsResponse> {
  return api("/api/admin/donation-requests/pending", {
    method: "GET",
  });
}

export async function verifyDonationRequest(requestId: string) {
  return api(`/api/admin/donation-requests/${requestId}/verify`, {
    method: "PATCH",
  });
}

export async function rejectDonationRequest(
	requestId: string,
	rejectionReason: string,
) {
	return api(`/api/admin/donation-requests/${requestId}/reject`, {
		method: "PATCH",
		body: {
			rejectionReason,
		},
	});
}