import DonationRequestStatusList from "../../_components/DonationRequestStatusList";

export default function DonationRequestsInProgressPage() {
	return (
		<DonationRequestStatusList
			title="Donations in Progress"
			description="Verified requests that are currently receiving donations."
			status="DONATIONS"
		/>
	);
}