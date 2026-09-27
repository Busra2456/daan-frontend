"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useVerifyEmail } from "@/hooks/auth.hook";
import { EmailVerifyZodSchema } from "@/validation";

export default function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") ?? "";

  const [otp, setOtp] = useState("");

  const { mutate: verifyEmail, isPending } = useVerifyEmail();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = EmailVerifyZodSchema.safeParse({
      email: email.trim().toLowerCase(),
      otp: otp.trim(),
    });

    if (!result.success) {
      console.error(result.error.issues);
      return;
    }

    verifyEmail(result.data, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.error("Verification failed:", error);
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verify your email</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We sent a verification code to
        </p>

        <p className="mt-1 font-medium">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
          placeholder="Enter 6-digit OTP"
          className="w-full rounded-md border px-3 py-2"
        />

        <button
          type="submit"
          disabled={isPending || otp.length !== 6}
          className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </div>
  );
}
