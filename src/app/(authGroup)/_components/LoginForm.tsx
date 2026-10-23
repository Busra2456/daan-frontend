"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HandHeart,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
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

type DemoRole = "ADMIN" | "DONOR" | "NEEDY";

const demoRoles = [
  {
    role: "ADMIN" as const,
    title: "Admin",
    description: "Review requests and manage the platform.",
    badge: "ADMIN ACCESS",
    icon: ShieldCheck,
    className:
      "border-violet-200 bg-violet-50/70 hover:border-violet-400 hover:bg-violet-100 dark:border-violet-900 dark:bg-violet-950/30 dark:hover:bg-violet-950/60",
    iconClassName:
      "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300",
    badgeClassName:
      "text-violet-700 dark:text-violet-300",
  },
  {
    role: "DONOR" as const,
    title: "Donor",
    description: "Discover requests and support people in need.",
    badge: "GIVE SUPPORT",
    icon: HeartHandshake,
    className:
      "border-emerald-200 bg-emerald-50/70 hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/60",
    iconClassName:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    badgeClassName:
      "text-emerald-700 dark:text-emerald-300",
  },
  {
    role: "NEEDY" as const,
    title: "Needy",
    description: "Explore the platform for requesting support.",
    badge: "GET SUPPORT",
    icon: HandHeart,
    className:
      "border-amber-200 bg-amber-50/70 hover:border-amber-400 hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/30 dark:hover:bg-amber-950/60",
    iconClassName:
      "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    badgeClassName:
      "text-amber-700 dark:text-amber-300",
  },
];

function getDashboardPath(role: string): string | null {
  switch (role) {
    case "ADMIN":
      return "/admin-dashboard";
    case "DONOR":
      return "/donor-dashboard";
    case "NEEDY":
      return "/needy-dashboard";
    default:
      return null;
  }
}

export function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleGoogleLogin } = useGoogleAuth();

  const redirectUser = (role: string) => {
    const dashboardPath = getDashboardPath(role);

    if (!dashboardPath) {
      toast.add({
        title: "Login Error",
        description: "Your account role is not recognized.",
        type: "error",
      });
      return;
    }

    router.push(dashboardPath);
    router.refresh();
  };

  const handleDemoLogin = async (role: DemoRole) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await demoLoginAction(role);

      if (!response.success) {
        toast.add({
          title: "Demo Login Failed",
          description:
            response.message ||
            "Could not log in with this demo account.",
          type: "error",
        });
        return;
      }

      const meResponse = await getMeAction();

      if (!meResponse.success) {
        toast.add({
          title: "Login Failed",
          description:
            "Login succeeded, but account information could not be loaded.",
          type: "error",
        });
        return;
      }

      const user = meResponse.data;
      const dashboardPath = getDashboardPath(user.role);

      if (!dashboardPath) {
        toast.add({
          title: "Login Error",
          description: "Your account role is not recognized.",
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Demo Login Successful",
        description: `Welcome to Daan, ${user.name}!`,
        type: "success",
      });

      router.push(dashboardPath);
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Demo Login Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
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
      if (isLoading) return;

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
              response.message || "Invalid email or password.",
            type: "error",
          });
          return;
        }

        const meResponse = await getMeAction();

        if (!meResponse.success) {
          toast.add({
            title: "Login Failed",
            description:
              "Login succeeded, but account information could not be loaded.",
            type: "error",
          });
          return;
        }

        const user = meResponse.data;
        const dashboardPath = getDashboardPath(user.role);

        if (!dashboardPath) {
          toast.add({
            title: "Login Error",
            description: "Your account role is not recognized.",
            type: "error",
          });
          return;
        }

        toast.add({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
          type: "success",
        });

        router.push(dashboardPath);
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
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
          <HeartHandshake size={30} aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome Back
        </h1>

        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Sign in to continue your journey with Daan.
        </p>
      </div>

      {/* Login form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
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
                    Email address
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value)
                    }
                    aria-invalid={isInvalid}
                    autoComplete="email"
                    disabled={isLoading}
                    className="h-11"
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
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel htmlFor={field.name}>
                      Password
                    </FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300 sm:text-sm"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="current-password"
                      disabled={isLoading}
                      className="h-11 pr-11"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          size={18}
                          aria-hidden="true"
                        />
                      ) : (
                        <Eye
                          size={18}
                          aria-hidden="true"
                        />
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
            className="h-11 w-full bg-emerald-600 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
                Logging in...
              </>
            ) : (
              <>
                Login to Daan
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-border" />
        <span className="mx-4 shrink-0 text-xs text-muted-foreground">
          OR CONTINUE WITH
        </span>
        <div className="flex-grow border-t border-border" />
      </div>

      {/* Google login */}
      <div className="w-full">
        <GoogleAuthButton onSuccess={handleGoogleLogin} />
      </div>

      {/* Demo login */}
      <section className="space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-4 sm:p-5">
        <div className="space-y-1 text-center">
          <h2 className="text-base font-bold">
            Explore Daan
          </h2>

          <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
            Choose a role to explore the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {demoRoles.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.role}
                type="button"
                disabled={isLoading}
                onClick={() => void handleDemoLogin(item.role)}
                className={`group rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${item.className}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${item.iconClassName}`}
                  >
                    <Icon size={21} aria-hidden="true" />
                  </span>

                  <ArrowRight
                    size={17}
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>

                <h3 className="mt-4 text-base font-bold">
                  {item.title}
                </h3>

                <p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">
                  {item.description}
                </p>

                <span
                  className={`mt-3 inline-block text-[10px] font-bold tracking-wider ${item.badgeClassName}`}
                >
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-[11px] leading-5 text-muted-foreground">
          Demo access depends on the demo accounts configured on the
          server.
        </p>
      </section>

      {/* Register link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-emerald-700 transition-colors hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
