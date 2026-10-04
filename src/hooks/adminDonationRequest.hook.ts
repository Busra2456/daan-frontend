import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import {
  getAdminDonationRequestDetails,
  getAllDonationRequests,
  getPendingDonationRequests,
  rejectDonationRequest,
  verifyDonationRequest,
} from "@/app/(dashboardGroup)/admin-dashboard/_actions/donationRequestActions";
import {PendingDonationRequestsResponse } from "@/types/donation-request.type";
import { AllDonationRequestsResponse } from "@/types/admin.type";

export function useAllDonationRequests() {
	return useQuery<AllDonationRequestsResponse>({
		queryKey: ["admin-all-donation-requests"],
		queryFn: getAllDonationRequests,
	});
}

export function useAdminDonationRequestDetails(requestId: string) {
	return useQuery({
		queryKey: ["admin-donation-request", requestId],
		queryFn: () => getAdminDonationRequestDetails(requestId),
		enabled: !!requestId,
	});
}

export function usePendingDonationRequests(
	options?: {
		enabled?: boolean;
	},
) {
	return useQuery<PendingDonationRequestsResponse>({
		queryKey: ["pending-donation-requests"],
		queryFn: getPendingDonationRequests,
		enabled: options?.enabled ?? true,
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


