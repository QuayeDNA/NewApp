// =============================================================
// Design Tokens — Ink & Steel
// Color palette, spacing, typography, etc.
// =============================================================

export const colors = {
  ink: {
    DEFAULT: "#0c0c0f",
    hover: "#1a1a1f",
    active: "#2a2a30",
  },
  steel: {
    DEFAULT: "#f5f3ef",
    hover: "#efede8",
    active: "#e8e5df",
  },
  surface: {
    DEFAULT: "#ffffff",
    alt: "#f0eeea",
  },
  amber: {
    DEFAULT: "#f59e0b",
    hover: "#d97706",
    active: "#b45309",
  },
  border: {
    DEFAULT: "#e2dfda",
    strong: "#c9c5be",
  },
  text: {
    primary: "#0c0c0f",
    secondary: "#6b6760",
    muted: "#9e9a93",
    inverse: "#ffffff",
  },
  system: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  // Dark mode tokens
  dark: {
    ink: { DEFAULT: "#f5f3ef", hover: "#e8e5df", active: "#d4d0c8" },
    steel: { DEFAULT: "#0c0c0f", hover: "#141418", active: "#1e1e24" },
    surface: { DEFAULT: "#141418", alt: "#1a1a20" },
    border: { DEFAULT: "#2a2a30", strong: "#3a3a42" },
    text: {
      primary: "#f0eeea",
      secondary: "#9e9a93",
      muted: "#6b6760",
      inverse: "#0c0c0f",
    },
    system: {
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      info: "#60a5fa",
    },
  },
  // Network-specific colors (kept for brand recognition)
  network: {
    mtn: {
      bg: "#FEF9C3",
      text: "#854D0E",
      border: "#FCD34D",
      icon: "#F59E0B",
    },
    vodafone: {
      bg: "#FEE2E2",
      text: "#991B1B",
      border: "#FCA5A5",
      icon: "#EF4444",
    },
    airtelTigo: {
      bg: "#DBEAFE",
      text: "#1E40AF",
      border: "#93C5FD",
      icon: "#3B82F6",
    },
  },
};

export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
  52: "13rem",
  56: "14rem",
  60: "15rem",
  64: "16rem",
  72: "18rem",
  80: "20rem",
  96: "24rem",
};

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

export const fontWeights = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
};

export const lineHeights = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
};

export const borderRadius = {
  none: "0px",
  sm: "0px",
  DEFAULT: "0px",
  md: "0px",
  lg: "0px",
  xl: "0px",
  "2xl": "0px",
  full: "0px",
};

export const boxShadows = {
  xs: "0 1px 0 rgba(12, 12, 15, 0.08)",
  sm: "0 2px 0 rgba(12, 12, 15, 0.1)",
  DEFAULT: "0 3px 0 rgba(12, 12, 15, 0.12)",
  md: "0 3px 0 rgba(12, 12, 15, 0.12)",
  lg: "0 4px 0 rgba(12, 12, 15, 0.15)",
  xl: "0 6px 0 rgba(12, 12, 15, 0.18)",
  "2xl": "0 8px 0 rgba(12, 12, 15, 0.22)",
  inner: "none",
  none: "none",
};

export const transitions = {
  duration: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },
  timing: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

export const zIndices = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto",
};
