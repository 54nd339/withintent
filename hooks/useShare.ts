import { useState } from 'react';

const COPY_FEEDBACK_TIMEOUT = 2000;

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = async (url: string, title: string) => {
    const shareData = {
      title,
      text: `Check out ${title}`,
      url,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          if (process.env.NODE_ENV === 'development') {
            console.error('Failed to share:', err);
          }
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), COPY_FEEDBACK_TIMEOUT);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  return { share, copied };
}
