import DonationRequestStatusList from "../../_components/DonationRequestStatusList";

export default function PendingDonationRequestsPage() {
	return (
		<DonationRequestStatusList
			title="Pending Donation Requests"
			description="All donation requests waiting for admin verification."
			status="PENDING"
		/>
	);
}