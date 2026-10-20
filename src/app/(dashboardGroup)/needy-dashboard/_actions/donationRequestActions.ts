
"use server";

import { cookies } from "next/headers";

export async function createDonationRequestAction(
  formData: FormData,
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error("Backend URL is not configured.");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(
    `${backendUrl}/api/donation-requests`,
    {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
      body: formData,
      cache: "no-store",
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create donation request.",
    );
  }

  return result;
}
