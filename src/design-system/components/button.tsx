import { forwardRef } from "react";
import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "accent"
  | "danger"
  | "success"
  | "warning"
  | "info";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonColorScheme =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  rounded?: boolean;
  iconOnly?: boolean;
  loadingText?: string;
}

const sizeClasses = {
  xs: "text-xs px-2 py-1 h-6",
  sm: "text-sm px-3 py-1.5 h-8",
  md: "text-sm px-4 py-2 h-10",
  lg: "text-base px-5 py-2.5 h-12",
  xl: "text-lg px-6 py-3 h-14",
};

const iconOnlySizeClasses = {
  xs: "p-1 min-h-6 h-6 w-6",
  sm: "p-1.5 min-h-8 h-8 w-8",
  md: "p-2 min-h-10 h-10 w-10",
  lg: "p-2.5 min-h-12 h-12 w-12",
  xl: "p-3 min-h-14 h-14 w-14",
};

const semanticColors: Record<ButtonColorScheme, { solid: string; outline: string; ghost: string; link: string }> = {
  default: {
    solid: "text-[var(--color-text-inverse)] hover:brightness-110 active:brightness-125",
    outline: "bg-transparent border text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]",
    ghost: "bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]",
    link: "bg-transparent text-[var(--color-ink)] hover:underline p-0 h-auto",
  },
  success: {
    solid: "bg-[var(--color-success)] text-white hover:brightness-110 active:brightness-125",
    outline: "bg-transparent border border-[var(--color-success)] text-[var(--color-success)] hover:bg-[var(--color-success)]/10",
    ghost: "bg-transparent text-[var(--color-success)] hover:bg-[var(--color-success)]/10",
    link: "bg-transparent text-[var(--color-success)] hover:underline p-0 h-auto",
  },
  warning: {
    solid: "bg-[var(--color-warning)] text-white hover:brightness-110 active:brightness-125",
    outline: "bg-transparent border border-[var(--color-warning)] text-[var(--color-warning)] hover:bg-[var(--color-warning)]/10",
    ghost: "bg-transparent text-[var(--color-warning)] hover:bg-[var(--color-warning)]/10",
    link: "bg-transparent text-[var(--color-warning)] hover:underline p-0 h-auto",
  },
  error: {
    solid: "bg-[var(--color-error)] text-white hover:brightness-110 active:brightness-125",
    outline: "bg-transparent border border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10",
    ghost: "bg-transparent text-[var(--color-error)] hover:bg-[var(--color-error)]/10",
    link: "bg-transparent text-[var(--color-error)] hover:underline p-0 h-auto",
  },
  info: {
    solid: "bg-[var(--color-info)] text-white hover:brightness-110 active:brightness-125",
    outline: "bg-transparent border border-[var(--color-info)] text-[var(--color-info)] hover:bg-[var(--color-info)]/10",
    ghost: "bg-transparent text-[var(--color-info)] hover:bg-[var(--color-info)]/10",
    link: "bg-transparent text-[var(--color-info)] hover:underline p-0 h-auto",
  },
  danger: {
    solid: "bg-[var(--color-error)] text-white hover:brightness-110 active:brightness-125",
    outline: "bg-transparent border border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error)]/10",
    ghost: "bg-transparent text-[var(--color-error)] hover:bg-[var(--color-error)]/10",
    link: "bg-transparent text-[var(--color-error)] hover:underline p-0 h-auto",
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      colorScheme = "default",
      fullWidth = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled = false,
      type = "button",
      rounded = false,
      iconOnly = false,
      loadingText,
      ...props
    },
    ref,
  ) => {
    const getVariantClasses = () => {
      const semanticVariant = variant === "danger" || variant === "success" || variant === "warning" || variant === "info"
        ? variant
        : undefined;
      const scheme = semanticVariant ?? colorScheme;
      const colors = semanticColors[scheme as ButtonColorScheme];

      switch (variant) {
        case "primary":
        case "accent":
          return `bg-[var(--color-ink)] ${colors.solid}`;
        case "secondary":
          return `bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-border)] active:brightness-95`;
        case "outline":
          return colors.outline;
        case "ghost":
          return colors.ghost;
        case "link":
          return colors.link;
        default:
          return `bg-[var(--color-ink)] ${colors.solid}`;
      }
    };

    const focusRing = variant === "link"
      ? "focus:outline-none"
      : "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ink)]";

    const buttonClasses = [
      "inline-flex items-center justify-center",
      "font-medium",
      "rounded-none",
      focusRing,
      "transition-all duration-200",
      iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
      getVariantClasses(),
      fullWidth ? "w-full" : "",
      disabled || isLoading ? "opacity-60 cursor-not-allowed" : "",
      className,
    ].join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText && <span className="ml-2">{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className={`flex items-center ${children ? "mr-2" : ""}`}>
                {leftIcon}
              </span>
            )}
            {children && (
              <span className={`flex items-center ${iconOnly ? "sr-only" : ""}`}>
                {children}
              </span>
            )}
            {rightIcon && (
              <span className={`flex items-center ${children ? "ml-2" : ""}`}>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
