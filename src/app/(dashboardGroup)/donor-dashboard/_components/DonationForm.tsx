"use client";

import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";

import {
  createDonation,
  createPayment,
} from "../_actions/donationActions";
import { CreateDonationZodSchema } from "@/validation";
import { DonationFormProps } from "@/types/donation-request.type";



export default function DonationForm({
  requestId,
  requiredAmount,
}: DonationFormProps) {
  const [amount, setAmount] = useState(requiredAmount);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDonate() {
    const donationAmount = Number(amount);

    const validationResult = CreateDonationZodSchema.safeParse({
  amount: donationAmount,
});

if (!validationResult.success) {
  toast.error(validationResult.error.issues[0]?.message);
  return;
}


    try {
      setIsLoading(true);

      const donationResponse = await createDonation({
        amount: donationAmount,
        requestId,
      });

      const donationId = donationResponse.data.id;

      const paymentResponse = await createPayment(donationId);

      window.location.href = paymentResponse.data.bkashURL;
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to start the payment. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6 border-t pt-5">
      <label
        htmlFor="donation-amount"
        className="text-sm font-medium"
      >
        Donation Amount
      </label>

      <div className="mt-2 flex items-center rounded-lg border bg-background px-3">
        <TbCurrencyTaka className="size-5 text-muted-foreground" />

        <input
          id="donation-amount"
          type="number"
          min="1"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-full bg-transparent px-2 py-3 text-sm outline-none"
          placeholder="Enter amount"
          disabled={isLoading}
        />
      </div>

      <button
        type="button"
        onClick={handleDonate}
        disabled={isLoading}
        className="mt-4 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Donate Now"}
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        You will be redirected to secure bKash payment.
      </p>
    </div>
  );
}