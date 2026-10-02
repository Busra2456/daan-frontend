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

export interface CreateDonationPayload {
  amount: number;
  requestId: string;
}

export interface DonorRequestDetailsPageProps {
  params: Promise<{
    requestId: string;
  }>;
}
export interface DonationFormProps {
  requestId: string;
  requiredAmount: string;
}

export interface ReceivedDonation {
  id: string;
  amount: string;
  status: "COMPLETED";
  paymentId: string | null;
  paymentStatus: string;
  donorId: string;
  requestId: string;
  createdAt: string;
  updatedAt: string;
  request: {
    id: string;
    title: string;
  };
  donor: {
    id: string;
    name: string;
    imageUrl: string | null;
  };
}

export interface ReceivedDonationsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    totalReceived: number;
    donations: ReceivedDonation[];
  };
}


export interface MyDonation {
	id: string;
	amount: string;
	status: string;
	paymentId: string | null;
	paymentStatus: string;
	donorId: string;
	requestId: string;
	createdAt: string;
	updatedAt: string;

	request: {
		id: string;
		title: string;
		description: string;
		requiredAmount: string;
		status: string;
		situationVideo: string | null;
		situationAudio: string | null;
	};
}

export interface MyDonationsResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: MyDonation[];
}
