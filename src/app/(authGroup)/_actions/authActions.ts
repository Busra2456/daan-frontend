"use client";

import { api } from "@/lib/api/client";
import type {
  ForgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  RegistrationPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/types/auth.type";

export async function registerUser(payload: RegistrationPayload) {
  return api("/api/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function verifyEmail(payload: VerifyEmailPayload) {
  return api("/api/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

export async function loginAction(payload: LoginPayload) {
  return api("/api/auth/login", {
    method: "POST",
    body: payload,
  });
}

export async function getMeAction() {
	return api("/api/auth/me", {
		method: "GET",
	});
}

export async function forgotPassword(payload: ForgotPasswordPayload) {
  return api("/api/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
}



export async function resetPassword(payload: ResetPasswordPayload) { 
  return api("/api/auth/reset-password", {
   method: "POST", 
   body: payload, 
  }); 
}

export async function refreshTokenAction() {
  return api("/api/auth/refresh-token", {
    method: "POST",
  });
}

export async function googleLoginAction(payload: GoogleLoginPayload) {
  return api("/api/auth/google-login", {
    method: "POST",
    body: payload,
  });
}