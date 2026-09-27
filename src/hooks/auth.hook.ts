import { useMutation } from "@tanstack/react-query";
import { registerUser, verifyEmail } from "@/api";

export function useRegistration() {
  return useMutation({
    mutationFn: registerUser,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}
