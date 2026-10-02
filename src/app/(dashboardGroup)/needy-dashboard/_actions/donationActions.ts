import { api } from "@/lib/api/client";
import { ReceivedDonationsResponse } from "@/types/donation-request.type";

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