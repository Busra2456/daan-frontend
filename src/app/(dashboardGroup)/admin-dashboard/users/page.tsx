"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  TbAlertCircle,
  TbCheck,
  TbLock,
  TbLockOpen,
  TbUsers,
} from "react-icons/tb";

import {
  useAllUsers,
  useUpdateUserStatus,
} from "@/hooks";
import type { AdminUser, UserRole } from "@/types/user.type";

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

function getStatusStyle(status: AdminUser["status"]) {
  return status === "ACTIVE"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
    : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300";
}

function getInitial(name?: string | null) {
  return name?.trim().charAt(0).toUpperCase() || "U";
}

function UserAvatar({
  name,
  imageUrl,
}: {
  name: string;
  imageUrl?: string | null;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 text-lg font-bold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300">
      {imageUrl && !imageFailed ? (
        <Image
          src={imageUrl}
          alt={`${name}'s profile picture`}
          width={112}
          height={112}
          sizes="56px"
          className="size-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span>{getInitial(name)}</span>
      )}
    </div>
  );
}

function UsersPageSkeleton() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="space-y-3">
          <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-9 w-64 max-w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-96 max-w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-72 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function AdminUsersPage() {
  const { data, isLoading, isError, refetch } = useAllUsers();
  const updateStatus = useUpdateUserStatus();

  const [selectedRole, setSelectedRole] = useState<"ALL" | UserRole>("ALL");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const users = data?.data ?? [];

  const filteredUsers =
    selectedRole === "ALL"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const handleStatusChange = (user: AdminUser) => {
    if (user.role === "ADMIN" || updateStatus.isPending) {
      return;
    }

    const nextStatus = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    setUpdatingUserId(user.id);

    updateStatus.mutate(
      {
        userId: user.id,
        status: nextStatus,
      },
      {
        onSuccess: () => {
          void refetch();
        },
        onSettled: () => {
          setUpdatingUserId(null);
        },
      },
    );
  };

  if (isLoading) {
    return <UsersPageSkeleton />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/admin-dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
          >
            <span aria-hidden="true">←</span>
            Back to Admin Dashboard
          </Link>

          <section className="mt-6 rounded-2xl border border-rose-200 bg-white p-6 dark:border-rose-900/50 dark:bg-slate-900">
            <TbAlertCircle className="size-8 text-rose-600 dark:text-rose-400" />

            <h1 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Unable to load users
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Something went wrong while loading user accounts. Please try again.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-5 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              Try Again
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin-dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <span aria-hidden="true">←</span>
          Back to Admin Dashboard
        </Link>

        {/* Page header */}
        <header className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                <TbUsers className="size-6" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                  Daan Administration
                </p>

                <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  User Management
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
              Manage donor and needy accounts, review account status, and protect
              the Daan community.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:min-w-40">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Users
            </p>

            <p className="mt-1 text-3xl font-extrabold tracking-tight">
              {users.length}
            </p>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Registered accounts
            </p>
          </div>
        </header>

        {/* Role filters */}
        <section className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-semibold text-slate-600 dark:text-slate-400">
              Filter:
            </span>

            {(["ALL", "NEEDY", "DONOR", "ADMIN"] as const).map((role) => {
              const isSelected = selectedRole === role;

              const count =
                role === "ALL"
                  ? users.length
                  : users.filter((user) => user.role === role).length;

              return (
                <button
                  key={role}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedRole(role)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40"
                  }`}
                >
                  {role === "ALL"
                    ? "All Users"
                    : role.charAt(0) + role.slice(1).toLowerCase()}

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Mutation error */}
        {updateStatus.isError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
          >
            <TbAlertCircle className="mt-0.5 size-5 shrink-0" />

            <p>
              Unable to update the account status. Please check your connection
              and try again.
            </p>
          </div>
        )}

        {/* Users list */}
        {filteredUsers.length === 0 ? (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <TbUsers className="size-7" />
            </div>

            <h2 className="mt-4 text-xl font-bold">No users found</h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              No accounts are available in this category yet.
            </p>

            {selectedRole !== "ALL" && (
              <button
                type="button"
                onClick={() => setSelectedRole("ALL")}
                className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
              >
                View All Users
              </button>
            )}
          </section>
        ) : (
          <section
            aria-label="User accounts"
            className="mt-6 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
            {filteredUsers.map((user) => {
              const isUpdating =
                updateStatus.isPending && updatingUserId === user.id;

              return (
                <article
                  key={user.id}
                  className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900"
                >
                  <div className="h-1 bg-emerald-600" />

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex min-w-0 items-center gap-4">
                      <UserAvatar
                        name={user.name}
                        imageUrl={user.imageUrl}
                      />

                      <div className="min-w-0 flex-1">
                        <h2
                          title={user.name}
                          className="truncate text-base font-bold text-slate-900 dark:text-white"
                        >
                          {user.name}
                        </h2>

                        <p
                          title={user.email}
                          className="mt-1 truncate text-sm text-slate-600 dark:text-slate-400"
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${getRoleStyle(user.role)}`}
                      >
                        {user.role}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${getStatusStyle(user.status)}`}
                      >
                        <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />
                        {user.status}
                      </span>

                      {user.emailVerified && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                          <TbCheck className="size-3.5" />
                          Verified
                        </span>
                      )}
                    </div>

                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                      <div className="flex items-start justify-between gap-4 text-sm">
                        <span className="shrink-0 text-slate-500 dark:text-slate-400">
                          Auth method
                        </span>

                        <span className="break-words text-right font-semibold text-slate-800 dark:text-slate-200">
                          {user.authProvider}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-4 text-sm">
                        <span className="shrink-0 text-slate-500 dark:text-slate-400">
                          Phone
                        </span>

                        <span className="break-words text-right font-semibold text-slate-800 dark:text-slate-200">
                          {user.phone || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-t border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50 sm:p-5">
                    <Link
                      href={`/admin-dashboard/users/${user.id}`}
                      className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-sm font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                    >
                      View Details
                    </Link>

                    {user.role !== "ADMIN" ? (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(user)}
                        disabled={updateStatus.isPending}
                        className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus-visible:ring-offset-slate-950 ${
                          user.status === "ACTIVE"
                            ? "bg-rose-600 hover:bg-rose-700 focus-visible:ring-rose-500"
                            : "bg-emerald-600 hover:bg-emerald-700 focus-visible:ring-emerald-500"
                        }`}
                      >
                        {isUpdating ? (
                          "Updating..."
                        ) : user.status === "ACTIVE" ? (
                          <>
                            <TbLock className="size-4" />
                            Block
                          </>
                        ) : (
                          <>
                            <TbLockOpen className="size-4" />
                            Unblock
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="inline-flex min-h-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 dark:border-violet-900/60 dark:bg-violet-950/40 dark:text-violet-300">
                        Protected Admin
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <footer className="mt-10 border-t border-slate-200 pt-5 text-center dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daan — Donate with Trust
          </p>
        </footer>
      </div>
    </main>
  );
}