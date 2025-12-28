interface NotFoundMessageProps {
  message?: string;
}

export function NotFoundMessage({ message = 'Page not found' }: NotFoundMessageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-neutral-600 dark:text-neutral-400">{message}</p>
    </div>
  );
}
