"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { useDonationRequestById, useUpdateDonationRequest } from "@/hooks/donation-request.hook";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import {
  CreateDonationRequestZodSchema,
  type CreateDonationRequestFormValues,
} from "@/validation";

interface EditRequestFormProps {
  requestId: string;
}

export default function EditRequestForm({
  requestId,
}: EditRequestFormProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useDonationRequestById(requestId);

  const { mutateAsync: updateRequest } = useUpdateDonationRequest();

  const request = data?.data;

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
        await updateRequest({
          requestId,
          payload: {
            title: value.title,
            description: value.description,
            requiredAmount: value.requiredAmount,
            situationVideo: value.situationVideo || undefined,
            situationAudio: value.situationAudio || undefined,
          },
        });

        toast.add({
          title: "Request Updated",
          description: "Your donation request has been updated successfully.",
          type: "success",
        });

        router.push(`/needy-dashboard/requests/${requestId}`);
        router.refresh();
      } catch (error) {
        toast.add({
          title: "Update Failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      }
    },
  });

  useEffect(() => {
    if (!request) return;

    form.setFieldValue("title", request.title);
    form.setFieldValue("description", request.description);
    form.setFieldValue("requiredAmount", Number(request.requiredAmount));
    form.setFieldValue("situationVideo", request.situationVideo ?? "");
    form.setFieldValue("situationAudio", request.situationAudio ?? "");
  }, [request, form]);

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="text-muted-foreground">Loading request...</p>
      </div>
    );
  }

  if (isError || !data?.success || !request) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-card p-6">
        <p className="text-destructive">
          Failed to load this donation request.
        </p>
      </div>
    );
  }

  if (request.status !== "PENDING") {
    return (
      <div className="rounded-xl border bg-card p-6">
        <h2 className="font-semibold">Request Cannot Be Edited</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Only pending donation requests can be updated.
        </p>
      </div>
    );
  }

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
            ? "Updating Request..."
            : "Update Donation Request"}
        </Button>
      </FieldGroup>
    </form>
  );
}