'use client';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] dark:bg-[#121212]">
      <div className="flex flex-col items-center gap-8">
        {/* Animated SVG Logo/Icon */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="text-[var(--gold)] dark:text-[#b8961e]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle with pulse animation */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.2"
            fill="none"
          >
            <animate
              attributeName="r"
              values="50;55;50"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.2;0.4;0.2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Middle circle */}
          <circle
            cx="60"
            cy="60"
            r="35"
            stroke="currentColor"
            strokeWidth="2"
            strokeOpacity="0.4"
            fill="none"
          >
            <animate
              attributeName="r"
              values="35;40;35"
              dur="2s"
              begin="0.3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.4;0.6;0.4"
              dur="2s"
              begin="0.3s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Inner circle */}
          <circle
            cx="60"
            cy="60"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <animate
              attributeName="r"
              values="20;25;20"
              dur="2s"
              begin="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur="2s"
              begin="0.6s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Center dot */}
          <circle
            cx="60"
            cy="60"
            r="4"
            fill="currentColor"
          >
            <animate
              attributeName="opacity"
              values="0.5;1;0.5"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-serif text-lg text-neutral-900 dark:text-neutral-100 tracking-wider">
            WITH INTENT
          </p>
          <div className="flex gap-1">
            <span className="w-1 h-1 bg-[var(--gold)] dark:bg-[#b8961e] rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
            <span className="w-1 h-1 bg-[var(--gold)] dark:bg-[#b8961e] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-1 h-1 bg-[var(--gold)] dark:bg-[#b8961e] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
