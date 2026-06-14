// src/components/common/coming-soon.tsx
import { Rocket, Sparkles } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export const ComingSoon = ({
  title = "Coming Soon",
  description = "This feature is currently under development and will be available soon.",
}: ComingSoonProps) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md px-4">
        {/* Coming Soon Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold"
          style={{
            background:
              "linear-gradient(135deg, var(--color-secondary-500), var(--color-secondary-600))",
            color: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Sparkles className="w-4 h-4" />
          <span>COMING SOON</span>
        </div>

        <div className="relative inline-block mb-6">
          <div
            className="w-24 h-24 flex items-center justify-center mx-auto"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))",
            }}
          >
            <Rocket className="w-12 h-12 text-[var(--color-text-inverse)]" />
          </div>
          <div
            className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center animate-pulse"
            style={{
              backgroundColor: "var(--color-secondary-400)",
            }}
          >
            <Sparkles className="w-5 h-5 text-[var(--color-text-inverse)]" />
          </div>
        </div>

        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: "var(--color-primary-600)" }}
        >
          {title}
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

        <div className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-[var(--color-amber)] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-[var(--color-amber)]"></span>
          </span>
          <span>Under Development</span>
        </div>

        <div className="flex items-center justify-center space-x-2 mt-8">
          <div
            className="w-3 h-3 animate-bounce"
            style={{
              backgroundColor: "var(--color-primary-500)",
              animationDelay: "0ms",
            }}
          ></div>
          <div
            className="w-3 h-3 animate-bounce"
            style={{
              backgroundColor: "var(--color-secondary-500)",
              animationDelay: "150ms",
            }}
          ></div>
          <div
            className="w-3 h-3 animate-bounce"
            style={{
              backgroundColor: "var(--color-primary-500)",
              animationDelay: "300ms",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
