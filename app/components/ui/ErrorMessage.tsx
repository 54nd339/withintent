interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Please try refreshing the page.
        </p>
      </div>
    </div>
  );
}

