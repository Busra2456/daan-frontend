
"use client";

import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ImagePlus,
  LoaderCircle,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

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

import { createDonationRequest } from "../_actions/donationActions";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export default function CreateRequestForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [situationImage, setSituationImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  function handleImageChange(file: File | undefined) {
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.add({
        title: "Invalid image format",
        description: "Please select a JPG, PNG, or WebP image.",
        type: "error",
      });
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.add({
        title: "Image too large",
        description: "Please select an image smaller than 5 MB.",
        type: "error",
      });
      return;
    }

    setSituationImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setSituationImage(null);
    setImagePreview(null);

    const input = document.getElementById(
      "situationImage",
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  }

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
        const formData = new FormData();

        formData.append("title", value.title.trim());
        formData.append("description", value.description.trim());
        formData.append("requiredAmount", String(value.requiredAmount));

        if (value.situationVideo.trim()) {
          formData.append("situationVideo", value.situationVideo.trim());
        }

        if (value.situationAudio.trim()) {
          formData.append("situationAudio", value.situationAudio.trim());
        }

        if (situationImage) {
          formData.append("situationImage", situationImage);
        }

        await createDonationRequest(formData);

        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["my-donation-requests"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["admin-all-donation-requests"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["pending-donation-requests"],
          }),
        ]);

        toast.add({
          title: "Request submitted successfully",
          description:
            "Your donation request has been submitted for admin verification.",
          type: "success",
        });

        router.push("/needy-dashboard");
        router.refresh();
      } catch (error) {
        toast.add({
          title: "Request submission failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      }
    },
  });

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

          return <span key={`${message}-${index}`}>{message}</span>;
        })}
      </FieldError>
    );
  }

  const inputClassName =
    "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-7"
    >
      {/* Trust notice */}
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />

        <div>
          <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
            Honest information builds trust
          </h3>
          <p className="mt-1 text-sm leading-6 text-emerald-800 dark:text-emerald-400">
            Describe your situation clearly. Your request will be reviewed
            before it is made available to donors.
          </p>
        </div>
      </div>

      <FieldGroup>
        {/* Request title */}
        <form.Field name="title">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Request Title <span className="text-rose-500">*</span>
              </FieldLabel>

              <Input
                id={field.name}
                name={field.name}
                placeholder="Example: Financial assistance for medical treatment"
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
                Describe Your Situation{" "}
                <span className="text-rose-500">*</span>
              </FieldLabel>

              <Textarea
                id={field.name}
                name={field.name}
                placeholder="Explain your circumstances, why you need support, and how the donation will help..."
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

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Include relevant details so donors can understand your needs.
              </p>

              {renderFieldErrors(field.state.meta.errors)}
            </Field>
          )}
        </form.Field>

        {/* Situation image */}
        <Field>
          <FieldLabel htmlFor="situationImage">
            Supporting Image{" "}
            <span className="font-normal text-slate-500 dark:text-slate-400">
              (Optional)
            </span>
          </FieldLabel>

          <label
            htmlFor="situationImage"
            className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition-colors hover:border-emerald-400 hover:bg-emerald-50/60 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/20 sm:p-7"
          >
            {imagePreview ? (
              <div className="w-full max-w-md">
                <Image
                  src={imagePreview}
                  alt="Preview of the selected supporting image"
                  width={640}
                  height={400}
                  unoptimized
                  className="mx-auto max-h-64 w-full rounded-lg object-contain"
                />

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  <Upload className="h-4 w-4" />
                  Choose another image
                </span>
              </div>
            ) : (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <ImagePlus className="h-7 w-7" />
                </div>

                <span className="font-semibold text-slate-800 dark:text-slate-100">
                  Upload a supporting image
                </span>

                <span className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  JPG, PNG or WebP · Maximum 5 MB
                </span>
              </>
            )}
          </label>

          <input
            id="situationImage"
            name="situationImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              handleImageChange(event.target.files?.[0]);
            }}
          />

          {situationImage && (
            <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-950">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                  {situationImage.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {(situationImage.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeImage}
                className="shrink-0 border-slate-200 text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-rose-950/30"
              >
                <X className="mr-1 h-4 w-4" />
                Remove
              </Button>
            </div>
          )}
        </Field>

        {/* Required amount */}
        <form.Field name="requiredAmount">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>
                Required Amount (BDT){" "}
                <span className="text-rose-500">*</span>
              </FieldLabel>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
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

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter the total amount you need in Bangladeshi Taka.
              </p>

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

      {/* Submission note */}
      <div className="flex items-start gap-2 rounded-lg bg-slate-100 p-3 text-sm leading-6 text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
        <AlertCircle className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
        <p>
          Please ensure your information is accurate. Submitting a request
          does not guarantee that the requested amount will be funded.
        </p>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={form.state.isSubmitting}
        className="h-12 w-full bg-emerald-600 text-base font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
      >
        {form.state.isSubmitting ? (
          <>
            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
            Submitting Request...
          </>
        ) : (
          <>
            <ShieldCheck className="mr-2 h-5 w-5" />
            Submit Donation Request
          </>
        )}
      </Button>
    </form>
  );
}
