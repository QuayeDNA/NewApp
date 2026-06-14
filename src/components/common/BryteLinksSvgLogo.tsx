import React from "react";
import { brand } from "../../config/brand";

interface BrandLogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

// Full logo — renders brand initials in Ink & Steel style as a text mark
export const BryteLinksSvgLogo: React.FC<BrandLogoProps> = ({
  width = 200,
  height = 180,
  className = "",
  color,
}) => {
  const initials = brand.shortName;
  return (
    <div
      className={`flex items-center justify-center font-bold tracking-tighter leading-none select-none ${className}`}
      style={{
        width,
        height,
        fontFamily: "var(--font-body)",
        color: color ?? "var(--color-ink)",
        fontSize: "clamp(2rem, 5vw, 4rem)",
        lineHeight: 1,
      }}
      aria-label={brand.name}
    >
      {initials}
    </div>
  );
};

// Horizontal compact version for headers/navbars
export const BryteLinksSvgLogoCompact: React.FC<BrandLogoProps> = ({
  width = 220,
  height = 60,
  className = "",
  color,
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{ width, height }}
      aria-label={brand.name}
    >
      <span
        className="font-bold tracking-tighter leading-none"
        style={{
          fontFamily: "var(--font-body)",
          color: color ?? "var(--color-ink)",
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
        }}
      >
        {brand.shortName}
      </span>
    </div>
  );
};

// Icon-only version
export const BryteLinksSvgIcon: React.FC<BrandLogoProps> = ({
  width = 48,
  height = 48,
  className = "",
  color,
}) => {
  const initials = brand.shortName.slice(0, 2);
  return (
    <div
      className={`flex items-center justify-center font-bold leading-none select-none ${className}`}
      style={{
        width,
        height,
        fontFamily: "var(--font-body)",
        color: color ?? "var(--color-ink)",
        fontSize: "clamp(0.875rem, 2vw, 1.25rem)",
        border: "2px solid",
        borderColor: color ?? "var(--color-ink)",
        lineHeight: 1,
      }}
      aria-label={brand.name}
    >
      {initials}
    </div>
  );
};

// Minimal badge version for very small spaces
export const BryteLinksBadge: React.FC<BrandLogoProps> = ({
  width = 32,
  height = 32,
  className = "",
}) => {
  const initials = brand.shortName.slice(0, 1);
  return (
    <div
      className={`flex items-center justify-center font-bold leading-none select-none ${className}`}
      style={{
        width,
        height,
        fontFamily: "var(--font-body)",
        color: "var(--color-text-inverse)",
        backgroundColor: "var(--color-ink)",
        fontSize: "clamp(0.625rem, 1.5vw, 0.875rem)",
        lineHeight: 1,
      }}
      aria-label={brand.name}
    >
      {initials}
    </div>
  );
};
