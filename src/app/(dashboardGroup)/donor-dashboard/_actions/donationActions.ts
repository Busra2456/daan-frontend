import { api } from "@/lib/api/client";
import { CreateDonationPayload, MyDonationsResponse } from "@/types/donation-request.type";



export async function createDonation(
  payload: CreateDonationPayload,
) {
  return api("/api/donations", {
    method: "POST",
    body: payload,
  });
}

export async function createPayment(donationId: string) {
  return api(`/api/payments/${donationId}/create`, {
    method: "POST",
  });
}


export async function getMyDonation(): Promise<MyDonationsResponse> {
	return api("/api/donations/my-donations", {
		method: "GET",
	});
}