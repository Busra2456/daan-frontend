import { api } from "@/lib/api/client";
import type {
  AllUsersResponse,
  UpdateUserStatusResponse,
  UserDetailsResponse,
  UserStatus,
} from "@/types/user.type";

export async function getAllUsers(): Promise<AllUsersResponse> {
  return api("/api/users", {
    method: "GET",
  });
}

export async function getUserById(
  userId: string,
): Promise<UserDetailsResponse> {
  return api(`/api/users/${userId}`, {
    method: "GET",
  });
}

export async function updateUserStatus(
  userId: string,
  status: UserStatus,
): Promise<UpdateUserStatusResponse> {
  return api(`/api/users/${userId}/status`, {
    method: "PATCH",
    body: {
      status,
    },
  });
}