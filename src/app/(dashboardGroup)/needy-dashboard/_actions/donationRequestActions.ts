import { api } from "@/lib/api/client";

export async function getMyDonationRequests() {
  return api("/api/donation-requests/my-requests", {
    method: "GET",
  });
}