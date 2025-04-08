"use client";

import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";

function PaymentFormContent({ clientSecret }: { clientSecret?: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  // Common element styling and error handling
  const cardElementOptions: StripeCardElementOptions = {
    style: {
      invalid: { color: "#e53e3e" },
    },
    classes: {
      base: "p-3 border rounded-md",
      invalid: "border-red-500",
    },
    disableLink: true,
  };

  // Handle card element validation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    if (event.error) {
      setMessage(event.error.message);
    } else {
      setMessage(null);
    }
  };

  // Process payment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);
    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      setMessage("Card element not found");
      setIsProcessing(false);
      return;
    }

    const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: cardholderName },
      },
    });

    if (error) {
      setMessage(error.message ?? "An unexpected error occurred");
    } else if (setupIntent?.status === "succeeded") {
      setMessage("Payment method saved successfully!");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-6">Add credit card</h2>

        <div className="mb-4">
          <label>Card number</label>
          <CardNumberElement
            options={{
              ...cardElementOptions,
              showIcon: true,
              iconStyle: "solid" as const,
            }}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label>Expiry date</label>
            <CardExpiryElement
              options={cardElementOptions}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label>Security code</label>
            <CardCvcElement
              options={cardElementOptions}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <label>Cardholder name</label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Full name"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <p className="text-gray-500 mb-4">
          Set up a payment method to start running campaigns.
        </p>

        <button
          type="submit"
          disabled={isProcessing || !stripe || !elements || !clientSecret}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isProcessing ? "Processing..." : "Save Payment Method"}
        </button>
      </div>

      {message && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {message}
        </div>
      )}
    </form>
  );
}

export default PaymentFormContent;
