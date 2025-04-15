"use client";

import PaymentFormContent from "./components/PaymentForm";
import { StripeProvider } from "./components/StripeProvider";

export default function Home() {
  return (
    <main>
      <div>
        <StripeProvider>
          <PaymentFormContent />
        </StripeProvider>
      </div>
    </main>
  );
}
