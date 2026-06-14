import { forwardRef } from "react";
import type { ReactNode, HTMLAttributes } from "react";

type BadgeVariant = "solid" | "subtle" | "outline";
type BadgeSize = "xs" | "sm" | "md" | "lg";
type BadgeColorScheme =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "gray";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  colorScheme?: BadgeColorScheme;
  className?: string;
  rounded?: boolean;
}

const sizeClasses = {
  xs: "text-xs px-1.5 py-0.5",
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2.5 py-1",
  lg: "text-sm px-3 py-1.5",
};

const colorMap: Record<BadgeColorScheme, Record<BadgeVariant, string>> = {
  default: {
    solid: "bg-[var(--color-ink)] text-white",
    subtle: "bg-[rgba(245, 158, 11, 0.12)] text-[var(--color-amber)]",
    outline: "bg-transparent border border-[var(--color-ink)] text-[var(--color-ink)]",
  },
  success: {
    solid: "bg-[var(--color-success)] text-white",
    subtle: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    outline: "bg-transparent border border-[var(--color-success)] text-[var(--color-success)]",
  },
  warning: {
    solid: "bg-[var(--color-warning)] text-white",
    subtle: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    outline: "bg-transparent border border-[var(--color-warning)] text-[var(--color-warning)]",
  },
  error: {
    solid: "bg-[var(--color-error)] text-white",
    subtle: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
    outline: "bg-transparent border border-[var(--color-error)] text-[var(--color-error)]",
  },
  info: {
    solid: "bg-[var(--color-info)] text-white",
    subtle: "bg-[var(--color-info)]/10 text-[var(--color-info)]",
    outline: "bg-transparent border border-[var(--color-info)] text-[var(--color-info)]",
  },
  gray: {
    solid: "bg-[var(--color-text-muted)] text-[var(--color-text-inverse)]",
    subtle: "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]",
    outline: "bg-transparent border border-[var(--color-text-muted)] text-[var(--color-text-secondary)]",
  },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = "subtle",
      size = "sm",
      colorScheme = "default",
      className = "",
      ...props
    },
    ref,
  ) => {
    const badgeClasses = [
      "inline-flex items-center justify-center",
      "font-medium",
      "rounded-none",
      sizeClasses[size],
      colorMap[colorScheme][variant],
      className,
    ].join(" ");

    return (
      <span ref={ref} className={badgeClasses} {...props}>
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
