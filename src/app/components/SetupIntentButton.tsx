"use client";

import { useState } from "react";

export default function SetupIntentButton({
  clientSecret,
  onSetupIntent,
}: {
  clientSecret?: string;
  onSetupIntent: (clientSecret: string) => void;
}) {
  const [error, setError] = useState<string>();

  const handleCreateSetupIntent = async () => {
    try {
      setError(undefined);
      const response = await fetch("/api/create-setup-intent", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create setup intent");
      }

      const data = await response.json();
      onSetupIntent(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
    }
  };

  return (
    <div className="mb-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreateSetupIntent}
      >
        Create Setup Intent
      </button>

      {error && <div className=" text-red-700 rounded">{error}</div>}

      <div>
        <h2>Client Secret:</h2>
        <code>{clientSecret}</code>
      </div>
    </div>
  );
}
