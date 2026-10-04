import DonationRequestStatusList from "../../_components/DonationRequestStatusList";

export default function CompletedDonationRequestsPage() {
	return (
		<DonationRequestStatusList
			title="Completed Donation Requests"
			description="Donation requests that have been fully completed."
			status="COMPLETED"
		/>
	);
}