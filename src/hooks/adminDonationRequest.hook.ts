import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  getPendingDonationRequests,
  rejectDonationRequest,
  verifyDonationRequest,
} from "@/app/(dashboardGroup)/admin-dashboard/_actions/donationRequestActions";
import { PendingDonationRequestsResponse } from "@/types/donation-request.type";

export function usePendingDonationRequests() {
  return useQuery<PendingDonationRequestsResponse>({
    queryKey: ["pending-donation-requests"],
    queryFn: getPendingDonationRequests,
  });
}

export function useVerifyDonationRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyDonationRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending-donation-requests"],
      });
    },
  });
}

export function useRejectDonationRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      rejectionReason,
    }: {
      requestId: string;
      rejectionReason: string;
    }) =>
      rejectDonationRequest(
        requestId,
        rejectionReason,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending-donation-requests"],
      });
    },
  });
}

