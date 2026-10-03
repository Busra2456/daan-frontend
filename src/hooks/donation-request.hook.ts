import { deleteDonationRequest, getDonationRequestById, getMyDonationRequests, updateDonationRequest } from "@/api";
import { UpdateDonationRequestInput } from "@/types/donation-request.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useMyDonationRequests() {
  return useQuery({
    queryKey: ["my-donation-requests"],
    queryFn: getMyDonationRequests,
  });
}

export function useDonationRequestById(requestId: string) {
  return useQuery({
    queryKey: ["donation-request", requestId],
    queryFn: () => getDonationRequestById(requestId),
    enabled: Boolean(requestId),
  });
}


export function useUpdateDonationRequest() {
  return useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: UpdateDonationRequestInput) =>
      updateDonationRequest(requestId, payload),
  });
}

export function useDeleteDonationRequest() {
  return useMutation({
    mutationFn: (requestId: string) => deleteDonationRequest(requestId),
  });
}