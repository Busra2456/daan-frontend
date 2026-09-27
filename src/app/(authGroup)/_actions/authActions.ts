"use client";

import { api } from "@/lib/api/client";
import type {
  RegistrationPayload,
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
