"use client";

import Link from "next/link";
import { useState } from "react";
import { TbCheck, TbLock, TbLockOpen, TbUsers } from "react-icons/tb";

import {
  useAllUsers,
  useUpdateUserStatus,
} from "@/hooks";
import type { AdminUser, UserRole } from "@/types/user.type";
import Image from "next/image";

function getRoleStyle(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return "bg-purple-100 text-purple-700";
    case "DONOR":
      return "bg-blue-100 text-blue-700";
    case "NEEDY":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getStatusStyle(status: AdminUser["status"]) {
  if (status === "ACTIVE") {
    return "bg-green-100 text-green-700";
  }

  return "bg-red-100 text-red-700";
}

export default function AdminUsersPage() {
  const { data, isLoading, isError } = useAllUsers();

  const updateStatus = useUpdateUserStatus();

  const [selectedRole, setSelectedRole] = useState<
    "ALL" | UserRole
  >("ALL");

  const users = data?.data ?? [];

  const filteredUsers =
    selectedRole === "ALL"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const handleStatusChange = (
    user: AdminUser,
  ) => {
    const newStatus =
      user.status === "ACTIVE"
        ? "BLOCKED"
        : "ACTIVE";

    updateStatus.mutate({
      userId: user.id,
      status: newStatus,
    });
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl p-6 sm:p-8">
        <div className="mb-8">
          <div className="h-9 w-64 animate-pulse rounded-lg bg-muted" />
          <div className="mt-3 h-5 w-96 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-80 animate-pulse rounded-2xl border bg-muted"
            />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl p-6 sm:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800">
            Unable to load users
          </h2>

          <p className="mt-2 text-sm text-red-700">
            Something went wrong while loading users.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-6 sm:p-8">
      <div className="mb-8">
        <Link
          href="/admin-dashboard"
          className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          ← Back to Admin Dashboard
        </Link>

        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <TbUsers className="text-2xl text-primary" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                User Management
              </h1>
            </div>

            <p className="mt-3 text-muted-foreground">
              Manage donors, needy users, and platform accounts.
            </p>
          </div>

          <div className="rounded-xl border bg-card px-5 py-3 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">
              Total Users
            </p>

            <p className="mt-1 text-2xl font-bold">
              {users.length}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["ALL", "NEEDY", "DONOR", "ADMIN"] as const).map(
          (role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedRole === role
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border bg-background hover:bg-muted"
              }`}
            >
              {role === "ALL" ? "All Users" : role}
            </button>
          ),
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <div className="rounded-2xl border bg-card px-6 py-16 text-center">
          <TbUsers className="mx-auto text-4xl text-muted-foreground" />

          <h2 className="mt-4 text-xl font-semibold">
            No users found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There are no users in this category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <article
              key={user.id}
              className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex-1 p-6">
                <div className="flex items-start gap-4">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user.name}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-semibold">
                      {user.name}
                    </h2>

                    <p className="truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyle(user.role)}`}
                  >
                    {user.role}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(user.status)}`}
                  >
                    {user.status}
                  </span>

                  {user.emailVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      <TbCheck />
                      Verified
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-2 border-t pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Auth
                    </span>

                    <span className="font-medium">
                      {user.authProvider}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Phone
                    </span>

                    <span className="truncate font-medium">
                      {user.phone ?? "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t bg-muted/20 p-5">
                <Link
                  href={`/admin-dashboard/users/${user.id}`}
                  className="rounded-xl border bg-background px-4 py-2.5 text-center text-sm font-semibold transition hover:bg-muted"
                >
                  View Details
                </Link>

                {user.role !== "ADMIN" && (
                  <button
                    type="button"
                    onClick={() => handleStatusChange(user)}
                    disabled={
                      updateStatus.isPending
                    }
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      user.status === "ACTIVE"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {user.status === "ACTIVE" ? (
                      <>
                        <TbLock />
                        Block
                      </>
                    ) : (
                      <>
                        <TbLockOpen />
                        Unblock
                      </>
                    )}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}