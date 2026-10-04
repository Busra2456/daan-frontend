"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  useAdminUserDetails,
  useUpdateUserStatus,
} from "@/hooks";
import type { UserRole } from "@/types/user.type";
import Image from "next/image";

interface AdminUserDetailsClientProps {
  userId: string;
}

function getRoleStyle(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "bg-purple-100 text-purple-700";
    case "DONOR":
      return "bg-blue-100 text-blue-700";
    case "NEEDY":
      return "bg-green-100 text-green-700";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getStatusStyle(status: "ACTIVE" | "BLOCKED") {
  return status === "ACTIVE"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
}

export default function AdminUserDetailsClient({
  userId,
}: AdminUserDetailsClientProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useAdminUserDetails(userId);

  const updateStatusMutation = useUpdateUserStatus();

  const user = data?.data;

  const handleStatusChange = () => {
    if (!user || user.role === "ADMIN") {
      return;
    }

    const nextStatus =
      user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    updateStatusMutation.mutate(
      {
        userId: user.id,
        status: nextStatus,
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl p-6 sm:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-40 rounded bg-muted" />
          <div className="h-12 w-2/3 rounded bg-muted" />
          <div className="h-48 rounded-2xl bg-muted" />
          <div className="h-64 rounded-2xl bg-muted" />
        </div>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="mx-auto max-w-5xl p-6 sm:p-8">
        <Link
          href="/admin-dashboard/users"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Users
        </Link>

        <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <h1 className="text-lg font-semibold">
            Unable to load user
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The user could not be found or something went wrong.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6 sm:p-8">
      <Link
        href="/admin-dashboard/users"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Users
      </Link>

      {/* Header */}
      <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full bg-muted">
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  className="size-full object-cover"
                />
              ) : (
                <User className="size-8 text-muted-foreground" />
              )}
            </div>

            <div>
              <p className="text-sm font-medium text-primary">
                User Details
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {user.name}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyle(
                user.role,
              )}`}
            >
              {user.role}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                user.status,
              )}`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* User Information */}
        <section className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-2">
            <User className="size-5 text-primary" />

            <h2 className="text-lg font-semibold">
              User Information
            </h2>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Full Name
              </p>

              <p className="mt-1 font-medium">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Email
              </p>

              <div className="mt-1 flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <span className="font-medium break-all">
                  {user.email}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Phone
              </p>

              <div className="mt-1 flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />

                <span className="font-medium">
                  {user.phone || "Not provided"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Address
              </p>

              <div className="mt-1 flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <span className="font-medium">
                  {user.address || "Not provided"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Role
              </p>

              <p className="mt-1 font-medium">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Authentication
              </p>

              <p className="mt-1 font-medium">
                {user.authProvider}
              </p>
            </div>
          </div>
        </section>

        {/* Account Status */}
        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-primary" />

            <h2 className="text-lg font-semibold">
              Account Status
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Current Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                  user.status,
                )}`}
              >
                {user.status}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Email Verification
              </p>

              <div className="mt-2 flex items-center gap-2">
                <CheckCircle2
                  className={`size-4 ${
                    user.emailVerified
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                />

                <span className="text-sm font-medium">
                  {user.emailVerified
                    ? "Verified"
                    : "Not Verified"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Created
              </p>

              <p className="mt-1 text-sm font-medium">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Last Updated
              </p>

              <p className="mt-1 text-sm font-medium">
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Admin Actions */}
      <section className="mt-6 rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Admin Actions
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Manage this user account from the options below.
        </p>

        {user.role === "ADMIN" ? (
          <div className="mt-5 rounded-xl border border-purple-200 bg-purple-50 p-4">
            <p className="text-sm font-medium text-purple-700">
              Admin account protection
            </p>

            <p className="mt-1 text-sm text-purple-600">
              Admin account status cannot be changed.
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <button
              type="button"
              onClick={handleStatusChange}
              disabled={updateStatusMutation.isPending}
              className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                user.status === "ACTIVE"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {updateStatusMutation.isPending
                ? "Updating..."
                : user.status === "ACTIVE"
                  ? "Block User"
                  : "Unblock User"}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}