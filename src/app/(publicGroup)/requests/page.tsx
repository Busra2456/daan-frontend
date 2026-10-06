import Link from "next/link";

export default function RequestsPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-10">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Verified Donation Requests
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            Help someone who truly needs it.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Daan connects donors with verified people who need financial
            support. Sign in as a donor to explore verified requests and
            understand each person situation before donating.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              Login as Donor
            </Link>

            <Link
              href="/how-it-works"
              className="rounded-md border px-6 py-3 text-sm font-medium"
            >
              How It Works
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Verified Requests</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Requests are reviewed before becoming available to donors.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Real Information</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Donors can understand the person s situation before choosing to
              help.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-lg font-semibold">Trusted Giving</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Donations are made through the platform after reviewing a
              verified request.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}