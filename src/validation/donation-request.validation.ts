import z from "zod";

export const CreateDonationRequestZodSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(200, "Title cannot exceed 200 characters."),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long."),

  requiredAmount: z
    .number()
    .positive("Required amount must be greater than 0."),

  situationVideo: z
    .string()
    .url("Situation video must be a valid URL.")
    .or(z.literal("")),

  situationAudio: z
    .string()
    .url("Situation audio must be a valid URL.")
    .or(z.literal("")),
});

export type CreateDonationRequestFormValues = z.infer<
  typeof CreateDonationRequestZodSchema
>;