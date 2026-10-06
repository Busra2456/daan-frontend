import Link from "next/link";

interface RequestDetailsPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

export default async function RequestDetailsPage({
  params,
}: RequestDetailsPageProps) {
  const { requestId } = await params;

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-10">
        <div className="rounded-xl border p-8">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Donation Request
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Request #{requestId}
          </h1>

          <p className="mt-4 leading-7 text-muted-foreground">
            This request is available to verified donors after signing in.
            Donors can review verified information before choosing to donate.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-md bg-foreground px-5 py-3 text-center text-sm font-medium text-background"
            >
              Login as Donor
            </Link>

            <Link
              href="/requests"
              className="rounded-md border px-5 py-3 text-center text-sm font-medium"
            >
              Back to Requests
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}