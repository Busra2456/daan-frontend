import { createDonation, createPayment, getReceivedDonations, getVerifiedDonationRequests } from "@/api";
import { getMyDonation } from "@/app/(dashboardGroup)/donor-dashboard/_actions/donationActions";
import { MyDonationsResponse, VerifiedDonationRequestsResponse } from "@/types/donation-request.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useVerifiedDonationRequests() {
  return useQuery<VerifiedDonationRequestsResponse>({
    queryKey: ["verified-donation-requests"],
    queryFn: getVerifiedDonationRequests,
  });
}



export function useCreateDonation() {
  return useMutation({
     mutationFn: createDonation
     });
}

export function useCreatePayment() {
  return useMutation({
     mutationFn: createPayment
     });
}

export function useReceivedDonations() {
  return useQuery({
    queryKey: ["received-donations"],
    queryFn: getReceivedDonations,
  });
}

export function useGetMyDonations() {
  return useQuery<MyDonationsResponse>({
    queryKey: ["my-donations"],
    queryFn: getMyDonation,
  });
}