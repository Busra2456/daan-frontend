"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowRight,
  Eye,
  EyeOff,
  HeartHandshake,
  LoaderCircle,
  Mail,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useRegistration } from "@/hooks/auth.hook";
import { UserRegistrationZodSchema } from "@/validation";

import GoogleAuthButton from "./GoogleAuthButton";
import { useGoogleAuth } from "./GoogleHandler";

type RegisterFormValues = z.infer<
  typeof UserRegistrationZodSchema
>;

export function RegisterForm() {
  const router = useRouter();
  const { mutate: registration, isPending } = useRegistration();
  const { handleGoogleRegister } = useGoogleAuth();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } as RegisterFormValues,

    validators: {
      onSubmit: UserRegistrationZodSchema,
    },

    onSubmit: async ({ value }) => {
      const registrationData = {
        name: value.name.trim(),
        email: value.email.trim(),
        password: value.password,
      };

      registration(registrationData, {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Registration Failed",
              description:
                response.message ||
                "We couldn't create your account. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Account Created Successfully",
            description:
              "Check your email for the verification code.",
            type: "success",
          });

          const params = new URLSearchParams({
            email: registrationData.email,
          });

          router.push(
            `/register/verify-email?${params.toString()}`,
          );
        },

        onError: (error) => {
          toast.add({
            title: "Registration Failed",
            description:
              error.message ||
              "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900">
          <HeartHandshake
            className="size-7"
            aria-hidden="true"
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#173d2d] dark:text-emerald-50 sm:text-3xl">
          Create Your Daan Account
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Join a community where compassion becomes meaningful action.
        </p>
      </div>

      {/* Registration form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup className="gap-4">
          {/* Full name */}
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold"
                  >
                    Full name
                  </FieldLabel>

                  <div className="relative">
                    <UserRound
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter your full name"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="name"
                      disabled={isPending}
                      className="h-12 rounded-xl border-border/80 bg-background pl-10 transition-colors focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                    />
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

          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold"
                  >
                    Email address
                  </FieldLabel>

                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />

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
                      disabled={isPending}
                      className="h-12 rounded-xl border-border/80 bg-background pl-10 transition-colors focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                    />
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

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field
                  data-invalid={isInvalid}
                  className="gap-2"
                >
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold"
                  >
                    Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      autoComplete="new-password"
                      disabled={isPending}
                      className="h-12 rounded-xl border-border/80 bg-background px-4 pr-12 transition-colors focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      disabled={isPending}
                      className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 disabled:opacity-50"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          className="size-4"
                          aria-hidden="true"
                        />
                      ) : (
                        <Eye
                          className="size-4"
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

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="group mt-1 h-12 w-full rounded-xl bg-[#176b46] text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#125638] hover:shadow-md focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <LoaderCircle
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
                Creating your account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight
                  className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Google registration */}
      <div className="space-y-4">
        <FieldSeparator>Or continue with</FieldSeparator>

        <GoogleAuthButton
          onSuccess={handleGoogleRegister}
        />
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-emerald-700 transition-colors hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          Sign in
        </Link>
      </p>

      {/* Trust message */}
      <div className="rounded-xl border border-emerald-900/10 bg-emerald-50/60 px-4 py-3 dark:border-emerald-800/40 dark:bg-emerald-950/20">
        <p className="text-center text-xs leading-5 text-muted-foreground">
          Your journey starts with compassion. Together, we can make
          support more personal, transparent, and meaningful.
        </p>
      </div>
    </div>
  );
}
