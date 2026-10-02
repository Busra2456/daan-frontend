import z from "zod";

export const CreateDonationZodSchema = z.object({
  amount: z
    .number()
    .positive("Donation amount must be greater than 0."),
});

export type CreateDonationFormValues = z.infer<
  typeof CreateDonationZodSchema
>;