"use client";

import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const getStripePromise = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error(
      "Stripe publishable key is not set in environment variables"
    );
  }
  return loadStripe(key);
};

const stripePromise = getStripePromise();

export function StripeProvider({
  children,
  clientSecret,
}: {
  children: ReactNode;
  clientSecret?: string;
}) {
  if (!clientSecret) return children;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      {children}
    </Elements>
  );
}
