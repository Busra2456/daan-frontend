
import { Suspense } from "react";
import VerifyEmailForm from "../../_components/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
        
          <VerifyEmailForm />
        </Suspense>
      </div>
    </main>
  );
}
