import { AdminDonationRequestDetailsPageProps } from "@/types/admin.type";
import AdminDonationRequestDetailsClient from "../../_components/AdminDonationRequestDetailsClient";



export default async function AdminDonationRequestDetailsPage({
  params,
}: AdminDonationRequestDetailsPageProps) {
  const { requestId } = await params;

  return <AdminDonationRequestDetailsClient requestId={requestId} />;
}