"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  useAdminUserDetails,
  useUpdateUserStatus,
} from "@/hooks";
import type { UserRole } from "@/types/user.type";

interface AdminUserDetailsClientProps {
  userId: string;
}

type AccountStatus = "ACTIVE" | "BLOCKED";

function getRoleStyle(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300";

    case "DONOR":
      return "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-300";

    case "NEEDY":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300";

    default:
      return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }
}

function getStatusStyle(status: AccountStatus) {
  return status === "ACTIVE"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
    : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300";
}

function formatDate(value?: string | Date | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getInitial(name?: string | null) {
  return name?.trim().charAt(0).toUpperCase() || "U";
}

function ProfileAvatar({
  name,
  role,
  imageUrl,
}: {
  name: string;
  role: UserRole;
  imageUrl?: string | null;
}) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);

  const showImage = Boolean(imageUrl) && failedImageUrl !== imageUrl;

  const avatarStyle =
    role === "ADMIN"
      ? "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-300"
      : role === "DONOR"
        ? "border-sky-200 bg-sky-100 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300"
        : "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300";

  return (
    <div
      className={`relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 ${avatarStyle}`}
    >
      {showImage ? (
        <Image
          src={imageUrl!}
          alt={`${name}'s profile picture`}
          width={160}
          height={160}
          sizes="80px"
          className="size-full object-cover"
          onError={() => setFailedImageUrl(imageUrl ?? null)}
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center">
          {role === "ADMIN" ? (
            <ShieldCheck className="size-8" />
          ) : role === "DONOR" ? (
            <Heart className="size-8" />
          ) : (
            <UserRound className="size-8" />
          )}

          <span className="mt-0.5 text-[10px] font-bold">
            {getInitial(name)}
          </span>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <div className="mt-2 flex min-w-0 items-start gap-2">
        {icon && (
          <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400">
            {icon}
          </span>
        )}

        <p className="break-words text-sm font-medium leading-6 text-slate-800 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function AdminUserDetailsClient({
  userId,
}: AdminUserDetailsClientProps) {
  const router = useRouter();

  const { data, isLoading, isError, refetch } =
    useAdminUserDetails(userId);

  const updateStatusMutation = useUpdateUserStatus();

  const user = data?.data;

  const handleStatusChange = () => {
    if (!user || user.role === "ADMIN" || updateStatusMutation.isPending) {
      return;
    }

    const nextStatus: AccountStatus =
      user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    updateStatusMutation.mutate(
      {
        userId: user.id,
        status: nextStatus,
      },
      {
        onSuccess: () => {
          void refetch();
          router.refresh();
        },
      },
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-5 w-36 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="size-20 rounded-2xl bg-slate-200 dark:bg-slate-800" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-7 w-52 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-64 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 lg:col-span-2" />
            <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>

          <div className="h-40 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/admin-dashboard/users"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="size-4" />
            Back to Users
          </Link>

          <div className="mt-8 rounded-2xl border border-rose-200 bg-white p-8 dark:border-rose-900/50 dark:bg-slate-900">
            <CircleAlert className="size-8 text-rose-600 dark:text-rose-400" />

            <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Unable to load user
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              The user could not be found or something went wrong while
              retrieving the account information.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin-dashboard/users"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="size-4" />
          Back to Users
        </Link>

        {/* Profile header */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="h-2 bg-emerald-600" />

          <div className="p-5 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <ProfileAvatar
                  name={user.name}
                  role={user.role}
                  imageUrl={user.imageUrl}
                />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />

                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Daan User Profile
                    </p>
                  </div>

                  <h1 className="mt-2 break-words text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {user.name}
                  </h1>

                  <p className="mt-2 break-all text-sm text-slate-600 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getRoleStyle(user.role)}`}
                >
                  {user.role}
                </span>

                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(user.status)}`}
                >
                  <span className="mr-2 size-1.5 rounded-full bg-current" />
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-3">
          {/* User information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <UserRound className="size-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold">User Information</h2>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Personal and account details
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-x-6 gap-y-6 border-t border-slate-100 pt-6 dark:border-slate-800 sm:grid-cols-2">
              <InfoItem label="Full Name" value={user.name} />

              <InfoItem
                label="Email Address"
                value={user.email}
                icon={<Mail className="size-4" />}
              />

              <InfoItem
                label="Phone Number"
                value={user.phone || "Not provided"}
                icon={<Phone className="size-4" />}
              />

              <InfoItem
                label="Address"
                value={user.address || "Not provided"}
                icon={<MapPin className="size-4" />}
              />

              <InfoItem label="Account Role" value={user.role} />

              <InfoItem
                label="Authentication Method"
                value={user.authProvider}
              />
            </div>
          </section>

          {/* Account status */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <Shield className="size-5" />
              </div>

              <div>
                <h2 className="text-lg font-bold">Account Status</h2>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Security and verification
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5 border-t border-slate-100 pt-6 dark:border-slate-800">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Current Status
                </p>

                <span
                  className={`mt-2 inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(user.status)}`}
                >
                  {user.status}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Email Verification
                </p>

                <div className="mt-2 flex items-center gap-2">
                  {user.emailVerified ? (
                    <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <CircleAlert className="size-5 text-amber-600 dark:text-amber-400" />
                  )}

                  <span className="text-sm font-semibold">
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Account Created
                </p>

                <div className="mt-2 flex items-start gap-2">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-slate-500 dark:text-slate-400" />

                  <p className="text-sm font-medium leading-6">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Last Updated
                </p>

                <div className="mt-2 flex items-start gap-2">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-slate-500 dark:text-slate-400" />

                  <p className="text-sm font-medium leading-6">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Admin actions */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold">Admin Actions</h2>

              <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                Manage this account&apos;s access to Daan.
              </p>
            </div>
          </div>

          {user.role === "ADMIN" ? (
            <div className="mt-5 rounded-xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-900/50 dark:bg-violet-950/30">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-violet-700 dark:text-violet-300" />

                <div>
                  <p className="text-sm font-bold text-violet-800 dark:text-violet-300">
                    Admin Account Protection
                  </p>

                  <p className="mt-1 text-sm leading-6 text-violet-700 dark:text-violet-400">
                    Admin account status cannot be changed from this page.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-5">
              {updateStatusMutation.isError && (
                <div
                  role="alert"
                  className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
                >
                  <CircleAlert className="mt-0.5 size-4 shrink-0" />

                  <p>
                    Unable to update this account&apos;s status. Please try
                    again.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleStatusChange}
                disabled={updateStatusMutation.isPending}
                className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${
                  user.status === "ACTIVE"
                    ? "bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-500 dark:focus-visible:ring-offset-slate-900"
                    : "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-slate-900"
                }`}
              >
                {updateStatusMutation.isPending
                  ? "Updating Account..."
                  : user.status === "ACTIVE"
                    ? "Block User"
                    : "Unblock User"}
              </button>

              <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {user.status === "ACTIVE"
                  ? "Blocking this account may prevent the user from accessing protected features."
                  : "Unblocking this account restores access according to the user's role and permissions."}
              </p>
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500 dark:text-slate-500">
          Daan — Donate with Trust
        </p>
      </div>
    </main>
  );
}