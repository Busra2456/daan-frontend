import EditRequestForm from "@/app/(dashboardGroup)/needy-dashboard/_components/EditRequestForm";

interface EditRequestPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

export default async function EditRequestPage({
  params,
}: EditRequestPageProps) {
  const { requestId } = await params;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Donation Request</h1>

        <p className="mt-2 text-muted-foreground">
          Update your donation request information.
        </p>
      </div>

      <EditRequestForm requestId={requestId} />
    </main>
  );
}