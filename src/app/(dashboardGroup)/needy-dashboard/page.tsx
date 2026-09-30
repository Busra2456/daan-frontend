import {
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function NeedyDashboardPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Daan</p>
            <h1 className="text-3xl font-bold tracking-tight">
              Needy Dashboard
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your requests and connect with trusted donors.
            </p>
          </div>

          <Link
            href="/needy-dashboard/create-request"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Plus className="size-4" />
            Create Request
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Requests
              </p>
              <HeartHandshake className="size-5 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Pending
              </p>
              <Clock3 className="size-5 text-yellow-600" />
            </div>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Verified
              </p>
              <CheckCircle2 className="size-5 text-green-600" />
            </div>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Received
              </p>
              <HeartHandshake className="size-5 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-bold">৳0</p>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="mt-8 rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-lg font-semibold">Recent Requests</h2>
            <p className="text-sm text-muted-foreground">
              Your latest donation requests will appear here.
            </p>
          </div>

          <div className="flex min-h-48 items-center justify-center p-6">
            <div className="text-center">
              <HeartHandshake className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-3 font-medium">No requests yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first request and let donors know how they can
                help.
              </p>

              <Link
                href="/needy-dashboard/create-request"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Plus className="size-4" />
                Create your first request
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}