"use client";

import { useState } from "react";
import SetupIntentButton from "./components/SetupIntentButton";
import PaymentFormContent from "./components/PaymentForm";
import { StripeProvider } from "./components/StripeProvider";

export default function Home() {
  const [clientSecret, setClientSecret] = useState<string>();

  const handleSetupIntent = (secret: string) => {
    setClientSecret(secret);
  };

  return (
    <main>
      <div>
        <StripeProvider clientSecret={clientSecret ?? undefined}>
          <SetupIntentButton
            clientSecret={clientSecret}
            onSetupIntent={handleSetupIntent}
          />
          {clientSecret && <PaymentFormContent clientSecret={clientSecret} />}
        </StripeProvider>
      </div>
    </main>
  );
}
