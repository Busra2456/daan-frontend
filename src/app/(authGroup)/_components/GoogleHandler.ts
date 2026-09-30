"use client";

import { getMeAction, googleLoginAction } from "@/api";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export function useGoogleAuth() {
  const router = useRouter();

  const handleGoogleLogin = async (credential: string) => {
    try {
      const response = await googleLoginAction({
        idToken: credential,
      });

      if (!response.success) {
        toast.add({
          title: "Google Login Failed",
          description: response.message || "Google login failed.",
          type: "error",
        });
        return;
      }

      const meResponse = await getMeAction();

      if (!meResponse.success) {
        toast.add({
          title: "Login Failed",
          description: "Could not load your account information.",
          type: "error",
        });
        return;
      }

      const user = meResponse.data;

      toast.add({
        title: "Google Login Successful",
        description: "Welcome back to Daan!",
        type: "success",
      });

      switch (user.role) {
        case "ADMIN":
          router.replace("/admin-dashboard");
          break;

        case "DONOR":
          router.replace("/donor-dashboard");
          break;

        case "NEEDY":
          router.replace("/needy-dashboard");
          break;

        default:
          toast.add({
            title: "Login Error",
            description: "Your account role is not recognized.",
            type: "error",
          });
          return;
      }

      router.refresh();
    } catch (error) {
      toast.add({
        title: "Google Login Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        type: "error",
      });
    }
  };

  const handleGoogleRegister = async (credential: string) => {
    try {
      const response = await googleLoginAction({
        idToken: credential,
      });

      if (!response.success) {
        toast.add({
          title: "Google Registration Failed",
          description:
            response.message || "Google registration failed.",
          type: "error",
        });
        return;
      }

      const meResponse = await getMeAction();

      if (!meResponse.success) {
        toast.add({
          title: "Registration Failed",
          description: "Could not load your account information.",
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Registration Successful",
        description: "Welcome to Daan!",
        type: "success",
      });

      router.replace("/needy-dashboard");
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Google Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
        type: "error",
      });
    }
  };

  return {
    handleGoogleLogin,
    handleGoogleRegister,
  };
}