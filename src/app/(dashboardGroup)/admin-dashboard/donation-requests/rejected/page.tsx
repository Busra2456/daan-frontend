import DonationRequestStatusList from "../../_components/DonationRequestStatusList";

export default function RejectedDonationRequestsPage() {
	return (
		<DonationRequestStatusList
			title="Rejected Donation Requests"
			description="All donation requests rejected by admin."
			status="REJECTED"
		/>
	);
}