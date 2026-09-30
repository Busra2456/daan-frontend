"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogoutAction } from "@/hooks/auth.hook";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = useLogoutAction();

  const handleLogout = async () => {
    try {
      await mutateAsync();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl">Daan</span>
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