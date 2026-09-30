"use client";

import { useForm } from "@tanstack/react-form";
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

export function ForgotPasswordForm() {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const router = useRouter();

  type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordZodSchema>;

  const defaultValues: ForgotPasswordFormValues = {
    email: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: ForgotPasswordZodSchema,
    },
    onSubmit: async ({ value }) => {
      const forgotPasswordData = {
        email: value.email.trim().toLowerCase(),
      };

      forgotPassword(forgotPasswordData, {
        onSuccess: () => {
          toast.add({
            title: "OTP Sent",
            description: "Please check your email for the password reset OTP.",
            type: "success",
          });

          const params = new URLSearchParams({
            email: forgotPasswordData.email,
          });

          router.push(`/forgot-password${params.toString()}`);
        },
        onError: (error) => {
          toast.add({
            title: "Password Reset Failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Forgot your password?
        </h1>

        <p className="text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a verification code
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
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                  />

                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              );
            }}
          </form.Field>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Sending OTP..." : "Send OTP"}
          </Button>
        </FieldGroup>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Login
        </Link>
      </div>
    </div>
  );
}