"use client";

import { getMeAction } from "@/api";
import { useLogoutAction } from "@/hooks/auth.hook";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

type MeResponse = {
  data?: {
    role?: UserRole;
  };
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useLogoutAction();

  const { data, isLoading, isError } = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: getMeAction,
    staleTime: 60 * 1000,
  });

  const role = data?.data?.role;

  const correctDashboard = role ? roleDashboardMap[role] : null;

  const isCorrectDashboard =
    !!correctDashboard &&
    (pathname === correctDashboard ||
      pathname.startsWith(`${correctDashboard}/`));

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError || !role) {
      router.replace("/login");
      return;
    }

    if (!isCorrectDashboard && correctDashboard) {
      router.replace(correctDashboard);
    }
  }, [
    isLoading,
    isError,
    role,
    isCorrectDashboard,
    correctDashboard,
    router,
  ]);

  const handleLogout = async () => {
    try {
      await mutateAsync();

      queryClient.removeQueries({
        queryKey: ["me"],
      });

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />

          <p className="mt-4 text-sm text-muted-foreground">
            Checking authorization...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !role) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Redirecting to login...
        </p>
      </main>
    );
  }

  if (!isCorrectDashboard) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Redirecting...
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Daan</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isPending}
            className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      {children}
    </div>
  );
}