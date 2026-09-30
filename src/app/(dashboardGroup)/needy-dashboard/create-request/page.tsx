import CreateRequestForm from "../_components/CreateRequestForm";

export default function CreateRequestPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Donation Request</h1>

        <p className="mt-2 text-muted-foreground">
          Tell donors about your situation and how they can help.
        </p>
      </div>

      <CreateRequestForm />
    </main>
  );
}