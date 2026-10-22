"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import {
  useDonationRequestById,
  useUpdateDonationRequest,
} from "@/hooks/donation-request.hook";

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

const inputClassName =
  "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500";

export default function EditRequestForm({
  requestId,
}: EditRequestFormProps) {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useDonationRequestById(requestId);

  const {
    mutateAsync: updateRequest,
    isPending,
  } = useUpdateDonationRequest();

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
      if (!request || request.status !== "PENDING") {
        toast.add({
          title: "Request Cannot Be Updated",
          description:
            "Only pending donation requests can be edited.",
          type: "error",
        });
        return;
      }

      try {
        await updateRequest({
          requestId,
          payload: {
            title: value.title.trim(),
            description: value.description.trim(),
            requiredAmount: value.requiredAmount,
            situationVideo: value.situationVideo.trim() || undefined,
            situationAudio: value.situationAudio.trim() || undefined,
          },
        });

        toast.add({
          title: "Request Updated",
          description:
            "Your donation request has been updated successfully.",
          type: "success",
        });

        await Promise.all([
          refetch(),
          router.push(`/needy-dashboard/requests/${requestId}`),
        ]);
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

    form.setFieldValue("title", request.title ?? "");
    form.setFieldValue("description", request.description ?? "");
    form.setFieldValue("requiredAmount", Number(request.requiredAmount));
    form.setFieldValue("situationVideo", request.situationVideo ?? "");
    form.setFieldValue("situationAudio", request.situationAudio ?? "");
  }, [request, form]);

  function renderFieldErrors(errors: unknown[]) {
    if (errors.length === 0) return null;

    return (
      <FieldError>
        {errors.map((error, index) => {
          const message =
            typeof error === "string"
              ? error
              : error &&
                  typeof error === "object" &&
                  "message" in error &&
                  typeof error.message === "string"
                ? error.message
                : "Please check this field.";

          return (
            <span key={`${message}-${index}`}>
              {message}
            </span>
          );
        })}
      </FieldError>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <LoaderCircle className="mb-4 h-9 w-9 animate-spin text-emerald-600" />

        <h2 className="font-semibold text-slate-900 dark:text-white">
          Loading Donation Request
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Please wait while we load your request details.
        </p>
      </div>
    );
  }

  if (isError || !data?.success || !request) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-white p-6 shadow-sm dark:border-rose-900 dark:bg-slate-900 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
          Unable to Load Request
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          We could not load this donation request. Please try again.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => void refetch()}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Try Again
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/needy-dashboard")}
            className="border-slate-200 dark:border-slate-700"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (request.status !== "PENDING") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm dark:border-amber-900 dark:bg-slate-900 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
          Request Cannot Be Edited
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Only pending donation requests can be updated. This request is
          currently marked as{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {request.status}
          </span>
          .
        </p>

        <Button
          type="button"
          onClick={() =>
            router.push(`/needy-dashboard/requests/${requestId}`)
          }
          className="mt-5 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-5 dark:border-slate-800 dark:bg-slate-950/50 sm:px-8">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Edit Request Details
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Update your information carefully. Changes will be saved to
              your donation request.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-8">
        {/* Verification notice */}
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />

          <p className="text-sm leading-6 text-emerald-900 dark:text-emerald-300">
            You can edit this request while it is pending admin verification.
            Please ensure that all details are accurate.
          </p>
        </div>

        <FieldGroup>
          {/* Title */}
          <form.Field name="title">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Request Title <span className="text-rose-500">*</span>
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Enter a clear title for your request"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className={inputClassName}
                  aria-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                />

                {renderFieldErrors(field.state.meta.errors)}
              </Field>
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Description <span className="text-rose-500">*</span>
                </FieldLabel>

                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Explain your circumstances and why you need support..."
                  rows={6}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className={`${inputClassName} min-h-36 resize-y`}
                  aria-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                />

                {renderFieldErrors(field.state.meta.errors)}
              </Field>
            )}
          </form.Field>

          {/* Required amount */}
          <form.Field name="requiredAmount">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Required Amount (BDT){" "}
                  <span className="text-rose-500">*</span>
                </FieldLabel>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-emerald-700 dark:text-emerald-400">
                    ৳
                  </span>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min="1"
                    step="1"
                    placeholder="50000"
                    value={
                      field.state.value === 0
                        ? ""
                        : String(field.state.value)
                    }
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const rawValue = event.target.value;

                      field.handleChange(
                        rawValue === "" ? 0 : Number(rawValue),
                      );
                    }}
                    className={`${inputClassName} pl-8`}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  />
                </div>

                {renderFieldErrors(field.state.meta.errors)}
              </Field>
            )}
          </form.Field>

          {/* Video URL */}
          <form.Field name="situationVideo">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Situation Video URL{" "}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    (Optional)
                  </span>
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://example.com/your-video"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className={inputClassName}
                  aria-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                />

                {renderFieldErrors(field.state.meta.errors)}
              </Field>
            )}
          </form.Field>

          {/* Audio URL */}
          <form.Field name="situationAudio">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>
                  Situation Audio URL{" "}
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    (Optional)
                  </span>
                </FieldLabel>

                <Input
                  id={field.name}
                  name={field.name}
                  type="url"
                  placeholder="https://example.com/your-audio"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className={inputClassName}
                  aria-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                />

                {renderFieldErrors(field.state.meta.errors)}
              </Field>
            )}
          </form.Field>
        </FieldGroup>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={form.state.isSubmitting || isPending}
            onClick={() =>
              router.push(`/needy-dashboard/requests/${requestId}`)
            }
            className="border-slate-200 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={form.state.isSubmitting || isPending}
            className="bg-emerald-600 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            {form.state.isSubmitting || isPending ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Updating Request...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
