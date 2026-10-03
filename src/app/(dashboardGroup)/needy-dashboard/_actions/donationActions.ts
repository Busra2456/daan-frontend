import { api } from "@/lib/api/client";
import { ReceivedDonationsResponse, UpdateDonationRequestPayload } from "@/types/donation-request.type";

export async function getMyDonationRequests() {
  return api("/api/donation-requests/my-requests", {
    method: "GET",
  });
}


export async function getDonationRequestById(requestId: string) {
  return api(`/api/donation-requests/${requestId}`, {
    method: "GET",
  });
}

export async function getReceivedDonations(): Promise<ReceivedDonationsResponse> {
  return api("/api/donations/received", {
    method: "GET",
  });
}


export async function updateDonationRequest(
  requestId: string,
  payload: UpdateDonationRequestPayload,
) {
  return api(`/api/donation-requests/${requestId}`, {
    method: "PATCH",
    body: payload,
  });
}

export async function deleteDonationRequest(requestId: string) {
  return api(`/api/donation-requests/${requestId}`, {
    method: "DELETE",
  });
}