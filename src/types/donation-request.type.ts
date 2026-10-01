export type DonationRequestStatus =
	| "PENDING"
	| "VERIFIED"
	| "DONATIONS"
	| "COMPLETED";

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

export interface DonationRequestResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: DonationRequest;
}

export interface MyDonationRequestsResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: DonationRequest[];
}

export interface VerifiedDonationRequestsResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: VerifiedDonationRequest[];
}

export interface VerifiedDonationRequest {
  id: string;
  title: string;
  description: string;
  requiredAmount: string;
  situationVideo: string | null;
  situationAudio: string | null;
  status: "VERIFIED";
  createdAt: string;
  updatedAt: string;
  needyId: string;
  needy: {
    id: string;
    name: string;
    imageUrl: string | null;
    address: string | null;
  };
}

export interface PendingDonationRequest {
  id: string;
  title: string;
  description: string;
  requiredAmount: string;
  situationVideo: string | null;
  situationAudio: string | null;
  status: "PENDING";
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

export interface PendingDonationRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: PendingDonationRequest[];
}
