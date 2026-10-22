import { Suspense } from "react";
import AdminUserDetailsClient from "../../_components/AdminUserDetailsClient";

interface AdminUserDetailsPageProps {
  params: Promise<{
    userId: string;
  }>;
}

function UserDetailsFallback() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl animate-pulse space-y-6">
        <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="size-20 shrink-0 rounded-2xl bg-slate-200 dark:bg-slate-800" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-56 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-64 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 lg:col-span-2" />
          <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </main>
  );
}

export default async function AdminUserDetailsPage({
  params,
}: AdminUserDetailsPageProps) {
  const { userId } = await params;

  return (
    <Suspense fallback={<UserDetailsFallback />}>
      <AdminUserDetailsClient userId={userId} />
    </Suspense>
  );
}