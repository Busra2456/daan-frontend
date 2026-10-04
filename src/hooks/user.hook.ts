import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


import type { UserStatus } from "@/types/user.type";
import { getAllUsers, getUserById, updateUserStatus } from "@/api";

export function useAllUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });
}

export function useAdminUserDetails(userId: string) {
  return useQuery({
    queryKey: ["admin-user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: UserStatus;
    }) => updateUserStatus(userId, status),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-user", variables.userId],
      });
    },
  });
}