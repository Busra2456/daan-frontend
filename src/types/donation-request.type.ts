
interface DonationRequest {
  id: string;
  title: string;
  description: string;
  requiredAmount: string;
  status: "PENDING" | "VERIFIED" | "DONATIONS" | "COMPLETED";
  createdAt: string;
}

interface MyDonationRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DonationRequest[];
}