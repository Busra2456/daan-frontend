"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  CreateDonationRequestZodSchema,
  type CreateDonationRequestFormValues,
} from "@/validation";
import { Textarea } from "@/components/ui/textarea";

export default function CreateRequestForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      requiredAmount: 0,
      situationVideo: "",
      situationAudio: "",
    } satisfies CreateDonationRequestFormValues,

    validators: {
      onSubmit: CreateDonationRequestZodSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donation-requests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              title: value.title,
              description: value.description,
              requiredAmount: value.requiredAmount,
              ...(value.situationVideo && {
                situationVideo: value.situationVideo,
              }),
              ...(value.situationAudio && {
                situationAudio: value.situationAudio,
              }),
            }),
          },
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to create donation request",
          );
        }

        toast.add({
          title: "Request Created",
          description:
            "Your donation request has been submitted for verification.",
          type: "success",
        });

        router.push("/needy-dashboard");
        router.refresh();
      } catch (error) {
        toast.add({
          title: "Request Failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <FieldGroup>
        <form.Field name="title">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Request Title</FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                placeholder="Example: Need financial help for medical treatment"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />

              {field.state.meta.errors.length > 0 && (
  <FieldError>
    {typeof field.state.meta.errors[0] === "string"
      ? field.state.meta.errors[0]
      : field.state.meta.errors[0]?.message}
  </FieldError>
)}
            </Field>
          )}
        </form.Field>

        <form.Field name="description">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Description</FieldLabel>

              <Textarea
                id={field.name}
                name={field.name}
                placeholder="Explain your situation and why you need help..."
                rows={6}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />

             {field.state.meta.errors.length > 0 && (
  <FieldError>
    {typeof field.state.meta.errors[0] === "string"
      ? field.state.meta.errors[0]
      : field.state.meta.errors[0]?.message}
  </FieldError>
)}
            </Field>
          )}
        </form.Field>

        <form.Field name="requiredAmount">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Required Amount (BDT)
              </FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                type="number"
                min="1"
                placeholder="50000"
                value={
                  field.state.value === 0 ? "" : String(field.state.value)
                }
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(Number(event.target.value))
                }
              />

             {field.state.meta.errors.length > 0 && (
  <FieldError>
    {typeof field.state.meta.errors[0] === "string"
      ? field.state.meta.errors[0]
      : field.state.meta.errors[0]?.message}
  </FieldError>
)}
            </Field>
          )}
        </form.Field>

        <form.Field name="situationVideo">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Situation Video URL
                <span className="ml-2 text-muted-foreground">
                  (Optional)
                </span>
              </FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                type="url"
                placeholder="https://example.com/video"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />

              {field.state.meta.errors.length > 0 && (
  <FieldError>
    {typeof field.state.meta.errors[0] === "string"
      ? field.state.meta.errors[0]
      : field.state.meta.errors[0]?.message}
  </FieldError>
)}
            </Field>
          )}
        </form.Field>

        <form.Field name="situationAudio">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Situation Audio URL
                <span className="ml-2 text-muted-foreground">
                  (Optional)
                </span>
              </FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                type="url"
                placeholder="https://example.com/audio"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />

              {field.state.meta.errors.length > 0 && (
  <FieldError>
    {typeof field.state.meta.errors[0] === "string"
      ? field.state.meta.errors[0]
      : field.state.meta.errors[0]?.message}
  </FieldError>
)}
            </Field>
          )}
        </form.Field>

        <Button
          type="submit"
          className="w-full"
          disabled={form.state.isSubmitting}
        >
          {form.state.isSubmitting
            ? "Submitting Request..."
            : "Submit Donation Request"}
        </Button>
      </FieldGroup>
    </form>
  );
}