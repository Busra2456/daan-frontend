
"use client";

import { getMeAction } from "@/api";
import { useLogoutAction } from "@/hooks/auth.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const roleDashboardMap = {
  ADMIN: "/admin-dashboard",
  DONOR: "/donor-dashboard",
  NEEDY: "/needy-dashboard",
} as const;

type UserRole = keyof typeof roleDashboardMap;

interface MeResponse {
  data?: {
    role?: UserRole;
  };
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useLogoutAction();

  const {
    data,
    isLoading,
    isError,
  } = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: getMeAction,
    staleTime: 60 * 1000,
    retry: false,
  });

  const role = data?.data?.role;
  const correctDashboard = role ? roleDashboardMap[role] : null;

  const isCorrectDashboard =
    !!correctDashboard &&
    (pathname === correctDashboard ||
      pathname.startsWith(`${correctDashboard}/`));

  useEffect(() => {
    if (isLoading) return;

    if (isError || !role || !correctDashboard) {
      router.replace("/login");
      return;
    }

    if (!isCorrectDashboard) {
      router.replace(correctDashboard);
    }
  }, [
    isLoading,
    isError,
    role,
    correctDashboard,
    isCorrectDashboard,
    router,
  ]);

  const handleLogout = async () => {
    if (isPending) return;

    try {
      await mutateAsync();

      await queryClient.cancelQueries();
      queryClient.clear();

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Checking authorization...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !role || !correctDashboard || !isCorrectDashboard) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Redirecting...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={correctDashboard}
            className="flex items-center gap-2"
            aria-label="Daan Dashboard Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
              D
            </span>
            <span className="text-xl font-bold tracking-tight">
              Daan
              <span className="ml-1 text-xs font-medium text-muted-foreground">
                Dashboard
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-muted px-3 py-1.5 text-xs font-semibold sm:inline-flex">
              {role}
            </span>

            <Link
              href="/"
              className="hidden rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted sm:inline-flex"
            >
              Visit Website
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
