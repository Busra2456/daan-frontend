import AdminUserDetailsClient from "../../_components/AdminUserDetailsClient";

interface AdminUserDetailsPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function AdminUserDetailsPage({
  params,
}: AdminUserDetailsPageProps) {
  const { userId } = await params;

  return <AdminUserDetailsClient userId={userId} />;
}