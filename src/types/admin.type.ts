export type DonationRequestStatus =
	| "PENDING"
	| "VERIFIED"
	| "REJECTED"
	| "DONATIONS"
	| "COMPLETED";
      
export interface AdminDonationRequestDetailsPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

export interface AdminDonationRequestDetailsClientProps {
  requestId: string;
}

export interface AllDonationRequestsResponse {
      success: boolean;
      statusCode: number;
      message: string;
      data: DonationRequest[];
}

export interface DonationRequest {
	id: string;
	title: string;
	description: string;
	requiredAmount: string;
	situationVideo: string | null;
	situationAudio: string | null;
	status: DonationRequestStatus;
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


