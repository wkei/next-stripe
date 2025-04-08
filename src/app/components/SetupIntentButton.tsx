export default function SetupIntentButton({
  clientSecret,
  onSetupIntent,
}: {
  clientSecret?: string;
  onSetupIntent: (clientSecret: string) => void;
}) {
  const handleCreateSetupIntent = async () => {
    const response = await fetch("/api/create-setup-intent", {
      method: "POST",
    });

    const data = await response.json();
    onSetupIntent(data.clientSecret);
  };

  return (
    <div className="mb-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCreateSetupIntent}
      >
        Create Setup Intent
      </button>

      <div>
        <h2>Client Secret:</h2>
        <code>{clientSecret}</code>
      </div>
    </div>
  );
}
