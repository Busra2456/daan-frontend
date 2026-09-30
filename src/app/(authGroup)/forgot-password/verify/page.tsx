import { Suspense } from "react";
import { ResetPasswordForm } from "../../_components/ResetPasswordForm";

export default function VerifyResetPasswordPage() {
  return (
    <div className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}