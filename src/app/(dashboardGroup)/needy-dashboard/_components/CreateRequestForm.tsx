"use client";

import { useForm } from "@tanstack/react-form";
import { ImagePlus, X } from "lucide-react";import { useRouter } from "next/navigation";

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
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Image from "next/image";

import { createDonationRequest } from "../_actions/donationActions";

export default function CreateRequestForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [situationImage, setSituationImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string | null>(null);

function handleImageChange(file: File | undefined) {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.add({
      title: "Invalid file",
      description: "Please select an image file.",
      type: "error",
    });
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.add({
      title: "Image too large",
      description: "Please select an image under 5 MB.",
      type: "error",
    });
    return;
  }

  if (imagePreview) URL.revokeObjectURL(imagePreview);

  setSituationImage(file);
  setImagePreview(URL.createObjectURL(file));
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
      formData.append(
        "requiredAmount",
        String(value.requiredAmount),
      );

      if (value.situationVideo.trim()) {
        formData.append(
          "situationVideo",
          value.situationVideo.trim(),
        );
      }

      if (value.situationAudio.trim()) {
        formData.append(
          "situationAudio",
          value.situationAudio.trim(),
        );
      }

      if (situationImage) {
        formData.append("situationImage", situationImage);
      }

      await createDonationRequest(formData);

      toast.add({
        title: "Request Created",
        description:
          "Your request has been submitted for verification.",
        type: "success",
      });

      await queryClient.invalidateQueries({
        queryKey: ["my-donation-requests"],
      });

      router.push("/needy-dashboard");
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

        <Field>
  <FieldLabel htmlFor="situationImage">
    Situation Image
    <span className="ml-2 text-muted-foreground">(Optional)</span>
  </FieldLabel>

  <label
    htmlFor="situationImage"
    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition hover:bg-muted/50"
  >
    {imagePreview ? (
      <div className="relative w-full max-w-md">
        <Image
          src={imagePreview}
          alt="Situation image preview"
          width={640}
          height={400}
          unoptimized
          className="max-h-64 w-full rounded-lg object-contain"
        />
        <span className="mt-3 block text-sm font-medium">
          Change image
        </span>
      </div>
    ) : (
      <>
        <ImagePlus className="mb-3 h-10 w-10 text-muted-foreground" />
        <span className="font-medium">Upload situation image</span>
        <span className="mt-1 text-sm text-muted-foreground">
          JPG, PNG or WebP · Maximum 5 MB
        </span>
      </>
    )}
  </label>

  <input
    id="situationImage"
    type="file"
    accept="image/jpeg,image/png,image/webp"
    className="sr-only"
    onChange={(event) => handleImageChange(event.target.files?.[0])}
  />

  {situationImage && (
    <div className="mt-2 flex items-center justify-between gap-3 text-sm">
      <span className="truncate">{situationImage.name}</span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          if (imagePreview) URL.revokeObjectURL(imagePreview);
          setSituationImage(null);
          setImagePreview(null);

          const input = document.getElementById(
            "situationImage",
          ) as HTMLInputElement | null;
          if (input) input.value = "";
        }}
      >
        <X className="mr-1 h-4 w-4" />
        Remove
      </Button>
    </div>
  )}
</Field>

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