"use client";

import { useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";

import {
  createDonation,
  createPayment,
  createSSLCommerzPayment,
} from "../_actions/donationActions";
import { CreateDonationZodSchema } from "@/validation";
import { DonationFormProps } from "@/types/donation-request.type";



export default function DonationForm({
  requestId,
  requiredAmount,
}: DonationFormProps) {
  const [amount, setAmount] = useState(requiredAmount);
const [isBkashLoading, setIsBkashLoading] = useState(false);
const [isSSLLoading, setIsSSLLoading] = useState(false);

  async function handleBkashDonate() {
    const donationAmount = Number(amount);

    const validationResult = CreateDonationZodSchema.safeParse({
  amount: donationAmount,
});

if (!validationResult.success) {
  toast.error(validationResult.error.issues[0]?.message);
  return;
}


    try {
      setIsBkashLoading(true);

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
      setIsBkashLoading(false);
    }
  }

  async function handleSSLCommerzDonate() {
	const donationAmount = Number(amount);

	const validationResult = CreateDonationZodSchema.safeParse({
		amount: donationAmount,
	});

	if (!validationResult.success) {
		toast.error(validationResult.error.issues[0]?.message);
		return;
	}

	try {
setIsSSLLoading(true);
		const donationResponse = await createDonation({
			amount: donationAmount,
			requestId,
		});

		const donationId = donationResponse.data.id;

		const paymentResponse =
			await createSSLCommerzPayment(donationId);

		window.location.href =
			paymentResponse.data.sslcommerzURL;
	} catch (error) {
		console.error(error);

		toast.error(
			"Unable to start SSLCommerz payment. Please try again.",
		);
	} finally {
setIsSSLLoading(false)	}
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
          disabled={isBkashLoading || isSSLLoading}        />
      </div>

<div className="mt-4 grid gap-3 sm:grid-cols-2">
  <button
    type="button"
    onClick={handleBkashDonate}
    disabled={isBkashLoading || isSSLLoading}
    className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isBkashLoading ? "Processing..." : "Pay with bKash"}
  </button>

  <button
    type="button"
    onClick={handleSSLCommerzDonate}
    disabled={isBkashLoading || isSSLLoading}
    className="rounded-lg border px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isSSLLoading ? "Processing..." : "Pay with SSLCommerz"}
  </button>
</div>
    <p className="mt-2 text-sm text-muted-foreground">
  You will be redirected to a secure payment gateway.
</p>
    </div>
  );
}