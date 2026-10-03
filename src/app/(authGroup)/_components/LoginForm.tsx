"use client";

import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type z from "zod";

import { demoLoginAction, getMeAction, loginAction } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { UserLoginZodSchema } from "@/validation";

import GoogleAuthButton from "./GoogleAuthButton";
import { useGoogleAuth } from "./GoogleHandler";

type LoginFormValues = z.infer<typeof UserLoginZodSchema>;

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleGoogleLogin } = useGoogleAuth();

  const handleDemoLogin = async (
  role: "ADMIN" | "DONOR" | "NEEDY",
) => {
  setIsLoading(true);

  try {
    const response = await demoLoginAction(role);

    if (!response.success) {
      toast.add({
        title: "Demo Login Failed",
        description:
          response.message || "Could not login with demo account.",
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
      title: "Demo Login Successful",
      description: `Welcome to Daan, ${user.name}!`,
      type: "success",
    });

    switch (user.role) {
      case "ADMIN":
        router.push("/admin-dashboard");
        break;

      case "DONOR":
        router.push("/donor-dashboard");
        break;

      case "NEEDY":
        router.push("/needy-dashboard");
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
      title: "Demo Login Failed",
      description:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      type: "error",
    });
  } finally {
    setIsLoading(false);
  }
};

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormValues,

    validators: {
      onSubmit: UserLoginZodSchema,
    },

    onSubmit: async ({ value }) => {
      setIsLoading(true);

      try {
        const response = await loginAction({
          email: value.email,
          password: value.password,
        });

        if (!response.success) {
          toast.add({
            title: "Login Failed",
            description:
              response.message || "Invalid email or password",
            type: "error",
          });

          return;
        }

        const meResponse = await getMeAction();

        if (!meResponse.success) {
          toast.add({
            title: "Login Failed",
            description:
              "Could not load your account information.",
            type: "error",
          });

          return;
        }

        const user = meResponse.data;

        toast.add({
          title: "Login Successful",
          description: "Welcome back to Daan!",
          type: "success",
        });

        switch (user.role) {
          case "ADMIN":
            router.push("/admin-dashboard");
            break;

          case "DONOR":
            router.push("/donor-dashboard");
            break;

          case "NEEDY":
            router.push("/needy-dashboard");
            break;

          default:
            toast.add({
              title: "Login Error",
              description:
                "Your account role is not recognized.",
              type: "error",
            });

            return;
        }

        router.refresh();
      } catch (error) {
        toast.add({
          title: "Login Failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>

        <p className="text-muted-foreground">
          Login to continue to Daan
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Enter your email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    aria-invalid={isInvalid}
                    autoComplete="email"
                  />

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={
                        showPassword ? "text" : "password"
                      }
                      placeholder="Enter your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      className="pr-10"
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <GoogleAuthButton
            onSuccess={handleGoogleLogin}
          />
          <div className="mt-4 space-y-3">
  <div className="text-center">
    <p className="text-sm font-medium">
      Quick Demo Login
    </p>

    <p className="text-xs text-muted-foreground">
      Choose a role to continue instantly
    </p>
  </div>

  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      onClick={() => handleDemoLogin("ADMIN")}
    >
      Continue as Admin
    </Button>

    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      onClick={() => handleDemoLogin("DONOR")}
    >
      Continue as Donor
    </Button>

    <Button
      type="button"
      variant="outline"
      disabled={isLoading}
      onClick={() => handleDemoLogin("NEEDY")}
    >
      Continue as Needy
    </Button>
  </div>
</div>
        </FieldGroup>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
