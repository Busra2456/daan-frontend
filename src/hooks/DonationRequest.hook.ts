import { getVerifiedDonationRequests } from "@/api";
import { VerifiedDonationRequestsResponse } from "@/types/donation-request.type";
import { useQuery } from "@tanstack/react-query";

export function useVerifiedDonationRequests() {
  return useQuery<VerifiedDonationRequestsResponse>({
    queryKey: ["verified-donation-requests"],
    queryFn: getVerifiedDonationRequests,
  });
}