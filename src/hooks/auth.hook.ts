import { useMutation, useQuery } from "@tanstack/react-query";
import { forgotPassword, getMeAction, googleLoginAction, loginAction, refreshTokenAction, registerUser, resetPassword, verifyEmail } from "@/api";
import { logoutAction } from "@/app/(authGroup)/_actions/authActions";

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

export function useLoginAction() {
  return useMutation({
    mutationFn: loginAction,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}


export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMeAction,
    retry: false,
  });
}
export function useGoogleLoginAction() {
  return useMutation({
    mutationFn:googleLoginAction,
  });
}
export function useRefreshTokenAction() {
  return useMutation({
    mutationFn:refreshTokenAction,
  });
}

export function useLogoutAction() {
  return useMutation({
     mutationFn: logoutAction
     });
}

