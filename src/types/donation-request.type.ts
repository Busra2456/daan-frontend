
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


interface DonationRequest {
  id: string;
  title: string;
  description: string;
  requiredAmount: string;
  situationVideo: string | null;
  situationAudio: string | null;
  status: "PENDING" | "VERIFIED" | "DONATIONS" | "COMPLETED";
  rejectionReason: string | null;
  reviewedAt: string | null;
  needyId: string;
  reviewedById: string | null;
  createdAt: string;
  updatedAt: string;
  needy: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    imageUrl: string | null;
  };
}

interface DonationRequestResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DonationRequest;
}
