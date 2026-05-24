"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen bg-bg-primary items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">
          Could not load your courses
        </h2>
        <p className="text-text-secondary mb-6">
          There was a problem connecting to the database. Check your connection and try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-glow transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
