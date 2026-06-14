import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-3 py-2 border border-[var(--color-border)]
            placeholder-[var(--color-text-muted)]
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:bg-[var(--color-surface-alt)] disabled:cursor-not-allowed
            bg-[var(--color-surface)] text-[var(--color-text-primary)]
            ${
              error
                ? "border-[var(--color-error)] focus:ring-[var(--color-error)] focus:border-[var(--color-error)]"
                : "focus:ring-[var(--color-amber)]"
            }
            ${className}
          `}
          style={
            !error
              ? ({
                  "--tw-ring-color": "var(--color-amber)",
                } as React.CSSProperties)
              : undefined
          }
          {...props}
        />
        {error && <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
