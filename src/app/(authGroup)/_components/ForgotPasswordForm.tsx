
"use client";

import { useForm } from "@tanstack/react-form";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  LoaderCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useForgotPassword } from "@/hooks/auth.hook";
import { ForgotPasswordZodSchema } from "@/validation";

type ForgotPasswordFormValues = z.infer<
  typeof ForgotPasswordZodSchema
>;

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
    } as ForgotPasswordFormValues,

    validators: {
      onSubmit: ForgotPasswordZodSchema,
    },

    onSubmit: async ({ value }) => {
      const email = value.email.trim().toLowerCase();

      forgotPassword(
        { email },
        {
          onSuccess: (response) => {
            // If the API returns a success flag, respect it.
            if (
              response &&
              typeof response === "object" &&
              "success" in response &&
              response.success === false
            ) {
              toast.add({
                title: "Password reset unavailable",
                description:
                  "We couldn't send the reset code. Please try again.",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Check your email",
              description:
                "If the request was accepted, your password reset instructions will arrive by email.",
              type: "success",
            });

            const params = new URLSearchParams({ email });

            // Keep this route aligned with the actual reset flow.
            router.push(`/reset-password?${params.toString()}`);
          },

          onError: (error) => {
            toast.add({
              title: "Password reset failed",
              description:
                error.message ||
                "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900">
          <HeartHandshake className="size-7" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#173d2d] dark:text-emerald-50 sm:text-3xl">
          Forgot Your Password?
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          No worries. Enter the email associated with your Daan account
          and follow the password recovery instructions.
        </p>
      </div>

      {/* Recovery information */}
      <div className="flex gap-3 rounded-xl border border-emerald-900/10 bg-emerald-50/60 p-4 dark:border-emerald-800/40 dark:bg-emerald-950/20">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm dark:bg-emerald-950 dark:text-emerald-300">
          <Mail className="size-4" aria-hidden="true" />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">
            Password recovery
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Make sure you can access your email before continuing.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        <FieldGroup className="gap-2">
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid} className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-semibold"
                  >
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
                    className="h-12 rounded-xl border-border/80 bg-background px-4 transition-colors focus-visible:border-emerald-600 focus-visible:ring-emerald-600/20"
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            disabled={isPending}
            className="group mt-2 h-12 w-full rounded-xl bg-[#176b46] font-semibold text-white shadow-sm transition-all hover:bg-[#125638] hover:shadow-md disabled:opacity-60"
          >
            {isPending ? (
              <>
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Sending instructions...
              </>
            ) : (
              <>
                Send Reset Instructions
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </FieldGroup>
      </form>

      {/* Back to login */}
      <Link
        href="/login"
        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-border/80 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-emerald-600/40 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
        Back to Login
      </Link>

      {/* Trust note */}
      <div className="flex items-start justify-center gap-2 border-t border-border/60 pt-4">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
        <p className="max-w-sm text-center text-xs leading-5 text-muted-foreground">
          Protect your account by keeping your password and verification
          codes private.
        </p>
      </div>
    </div>
  );
}
