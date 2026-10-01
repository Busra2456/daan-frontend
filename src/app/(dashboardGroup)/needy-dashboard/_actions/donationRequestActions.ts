import { api } from "@/lib/api/client";

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