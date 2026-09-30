"use client";

import { GoogleLogin } from "@react-oauth/google";
import { toast } from "@/components/ui/toast";

interface GoogleAuthButtonProps {
  onSuccess: (credential: string) => void | Promise<void>;
}

export default function GoogleAuthButton({
  onSuccess,
}: GoogleAuthButtonProps) {
  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (!credentialResponse.credential) {
            toast.add({
              title: "Google Authentication Failed",
              description: "Google credential was not received.",
              type: "error",
            });

            return;
          }

          onSuccess(credentialResponse.credential);
        }}
        onError={() => {
          toast.add({
            title: "Google Authentication Failed",
            description: "Could not authenticate with Google.",
            type: "error",
          });
        }}
      />
    </div>
  );
}