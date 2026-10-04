import DonationRequestStatusList from "../../_components/DonationRequestStatusList";

export default function VerifiedDonationRequestsPage() {
	return (
		<DonationRequestStatusList
			title="Verified Donation Requests"
			description="All donation requests verified by admin."
			status="VERIFIED"
		/>
	);
}