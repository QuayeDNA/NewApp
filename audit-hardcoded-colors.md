# Ink & Steel Design System Audit - Hardcoded Tailwind Color Classes

## Available CSS Variables (Ink & Steel Design System)

**Background:** `--color-ink`, `--color-ink-hover`, `--color-ink-active`, `--color-steel`, `--color-steel-hover`, `--color-steel-active`, `--color-surface`, `--color-surface-alt`, `--color-ground`, `--color-sidebar`, `--color-header`, `--color-amber`, `--color-amber-hover`, `--color-amber-active`, `--color-border`, `--color-border-strong`, `--color-success`, `--color-warning`, `--color-error`, `--color-info`

**Text:** `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-inverse`, `--color-text-header`, `--color-text-sidebar`

**Borders:** `--color-border`, `--color-border-strong`

**Radii:** All `--radius-*` are 0px (brutalist style)

**Shadows:** All `--shadow-*` use hard-edge (no blur) shadows

---

## FINDINGS BY FILE

### 1. `src/App.tsx`
| Line | Issue |
|------|-------|
| 51 | `shadow-sm` → `var(--shadow-sm)` |
| 51 | `color-mix(in srgb, ...)` → remove |

### 2. `src/components/header.tsx`
| Line | Issue |
|------|-------|
| 75 | `text-emerald-400` → `text-[var(--color-success)]` |
| 76 | `text-amber-400` → `text-[var(--color-amber)]` |
| 77 | `text-red-400` → `text-[var(--color-error)]` |
| 223 | `shadow-sm` → `var(--shadow-sm)` |
| 223 | `rounded-b-xl` → remove |
| 238 | `rounded-lg` → remove; `text-white` → `text-[var(--color-text-header)]` |
| 256 | `text-white` → `text-[var(--color-text-header)]` |
| 306 | `rounded-full` → remove |
| 329 | `rounded-lg` → remove |
| 330 | `text-white` → `text-[var(--color-text-header)]` |
| 338 | `text-emerald-400` → `text-[var(--color-success)]` |
| 360 | `rounded-full` → remove |
| 365 | `text-white` → `text-[var(--color-text-header)]` |
| 370 | `rounded-full` → remove; `bg-amber-400` → `bg-[var(--color-amber)]`; `border-white` → `border-[var(--color-text-header)]` |
| 391 | `rounded-xl` → remove; `shadow-2xl` → `var(--shadow-2xl)` |
| 401 | `rounded-full` → remove; `text-white` → `text-[var(--color-text-header)]` |
| 421 | `text-emerald-500` → `text-[var(--color-success)]` |
| 429 | `bg-amber-500/10` → `bg-[var(--color-amber)]/10`; `border-amber-500/25` → `border-[var(--color-amber)]/25`; `rounded-lg` → remove |
| 430 | `rounded-full` → remove; `bg-amber-400` → `bg-[var(--color-amber)]` |
| 432 | `text-amber-300` → `text-[var(--color-amber)]` |
| 433 | `text-amber-400/80` → `text-[var(--color-amber)]/80` |
| 449 | `rounded-full` → remove |
| 494 | `text-amber-400` → `text-[var(--color-amber)]` |
| 502 | `text-red-400` → `text-[var(--color-error)]` |
| 530 | `rounded-xl` → remove; `text-white` → `text-[var(--color-text-header)]` |
| 540 | `rounded-lg` → remove |
| 541 | `text-white` → `text-[var(--color-text-header)]` |
| 552 | `text-white` → `text-[var(--color-text-header)]` |
| 565 | `text-white` → `text-[var(--color-text-header)]` |

### 3. `src/components/sidebar.tsx`
| Line | Issue |
|------|-------|
| 322 | `bg-emerald-500` → `bg-[var(--color-success)]` |
| 360 | `text-red-300` → `text-[var(--color-error)]`; `border-red-500/20` → `border-[var(--color-error)]/20`; `bg-red-500/10` → `bg-[var(--color-error)]/10` |
| 361 | `bg-red-500/20` → `bg-[var(--color-error)]/20`; `border-red-500/40` → `border-[var(--color-error)]/40`; `text-red-200` → `text-[var(--color-error)]` |
| 362 | `focus-visible:ring-red-400/70` → `focus-visible:ring-[var(--color-error)]/70` |

### 4. `src/components/public/OrderDialog/index.tsx`
| Line | Issue |
|------|-------|
| 213 | `rounded-full` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 410 | `rounded-xl` → remove; `text-white` → `text-[var(--color-text-inverse)]` |
| 725 | `rounded-xl` → remove; `text-white` → `text-[var(--color-text-inverse)]` |
| 927 | `rounded-xl` → remove; `text-white` → `text-[var(--color-text-inverse)]` |
| 1072 | `rounded-xl` → remove; `text-white` → `text-[var(--color-text-inverse)]` |

### 5. `src/components/public/StoreFooter.tsx`
| Line | Issue |
|------|-------|
| 69 | `hover:text-blue-600` → `hover:text-[var(--color-info)]` |
| 80 | `hover:text-sky-500` → `hover:text-[var(--color-info)]` |
| 91 | `hover:text-pink-600` → use CSS variable |

### 6. `src/components/public/BundleCard.tsx`
| Line | Issue |
|------|-------|
| 58 | `rounded-full` → remove; `shadow-md` → `var(--shadow-md)` |
| 128 | `bg-gray-500` → `bg-[var(--color-surface-alt)]` |
| 130 | `rounded-xl` → remove; `text-white` → `text-[var(--color-text-inverse)]`; `shadow` → remove; `shadow-lg` → `var(--shadow-lg)` |
| 270 | `rounded-t-xl` → remove; `bg-gray-200` → `bg-[var(--color-surface-alt)]` |

### 7. `src/components/public/StoreHeader.tsx`
| Line | Issue |
|------|-------|
| 199 | `text-white` → `text-[var(--color-text-inverse)]` |
| 292 | `text-white` → `text-[var(--color-text-inverse)]` |

### 8. `src/components/public/StoreToolbar.tsx`
| Line | Issue |
|------|-------|
| 254 | `rounded-full` → remove; `text-white` → `text-[var(--color-text-inverse)]` |

### 9. `src/components/public/BundleSections.tsx`
| Line | Issue |
|------|-------|
| 292 | `rounded-xl` → remove; `shadow-sm`/`shadow-md` → `var(--shadow-*)` |
| 297 | `rounded-lg` → remove; `shadow-sm` → `var(--shadow-sm)` |

### 10. `src/components/public/FeaturedSection.tsx`
| Line | Issue |
|------|-------|
| 238 | `rounded-full` → remove; `shadow-lg` → `var(--shadow-lg)` |

### 11. `src/components/public/TrackOrderDrawer.tsx`
| Line | Issue |
|------|-------|
| 264 | `rounded-2xl` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 385 | `shadow-2xl` → `var(--shadow-2xl)` |

### 12. `src/components/common/GlobalFab.tsx`
| Line | Issue |
|------|-------|
| 412 | `shadow-lg` → `var(--shadow-lg)` |
| 434 | `shadow-lg` → `var(--shadow-lg)` |
| 437 | `focus-visible:ring-emerald-500` → `focus-visible:ring-[var(--color-success)]` |
| 440 | `text-emerald-500` → `text-[var(--color-success)]` |
| 465 | `text-white` → `text-[var(--color-text-inverse)]` |
| 467 | `text-white` → `text-[var(--color-text-inverse)]` |

### 13. `src/components/common/coming-soon.tsx`
| Line | Issue |
|------|-------|
| 38 | `text-white` → `text-[var(--color-text-inverse)]` |
| 46 | `text-white` → `text-[var(--color-text-inverse)]` |
| 59 | `text-gray-700` → `text-[var(--color-text-secondary)]`; `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `border-gray-200` → `border-[var(--color-border)]`; `rounded-lg` → remove |
| 61 | `rounded-full` → remove; `bg-orange-400` → `bg-[var(--color-amber)]` |
| 62 | `rounded-full` → remove; `bg-orange-500` → `bg-[var(--color-amber)]` |

### 14. `src/components/common/BryteLinksLogoShowcase.tsx`
| Line | Issue |
|------|-------|
| 14 | `bg-gray-50` → `bg-[var(--color-ground)]` |
| 21 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-sm` → `var(--shadow-sm)`; `border-gray-200` → `border-[var(--color-border)]` |
| 35 | Same as 21 |
| 49 | Same as 21 |
| 71 | Same as 21 |
| 77 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 92 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 107 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove |
| 111 | `bg-gray-800` → `bg-[var(--color-ink)]`; `rounded-lg` → remove |
| 115 | `bg-blue-50` → `bg-[var(--color-info)]/10`; `rounded-lg` → remove |
| 124 | `bg-gray-900` → `bg-[var(--color-ink)]`; `rounded-lg` → remove; `text-white` → `text-[var(--color-text-inverse)]` |
| 128 | `text-blue-300` → `text-[var(--color-info)]` |
| 129 | `text-green-300` → `text-[var(--color-success)]` |
| 134 | `text-blue-300` → `text-[var(--color-info)]` |
| 135 | `text-yellow-300` → `text-[var(--color-amber)]` |
| 136 | `text-yellow-300` → `text-[var(--color-amber)]` |
| 137 | `text-yellow-300` → `text-[var(--color-amber)]` |

### 15. `src/components/network-status-indicator.tsx`
| Line | Issue |
|------|-------|
| 24 | `bg-white` → `bg-[var(--color-surface)]`; `dark:bg-gray-800` → remove; `rounded-lg` → remove; `shadow-lg` → `var(--shadow-lg)`; `border-gray-200` → `border-[var(--color-border)]`; `dark:border-gray-700` → remove |
| 44 | `text-gray-500` → `text-[var(--color-text-muted)]`; `dark:text-gray-400` → remove |
| 52 | `border-gray-200` → `border-[var(--color-border)]`; `dark:border-gray-600` → remove |
| 85 | `border-gray-200` → `border-[var(--color-border)]`; `dark:border-gray-600` → remove |

### 16. `src/components/guided-tour.tsx`
| Line | Issue |
|------|-------|
| 176 | `rounded-md` → remove |
| 190 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-xl` → `var(--shadow-xl)`; `border-2 border-blue-500` → `border-2 border-[var(--color-info)]` |
| 196 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `rounded-full` → remove |
| 197 | `text-blue-600` → `text-[var(--color-info)]` |
| 219 | `bg-gray-200` → `bg-[var(--color-surface-alt)]`; `rounded-full` → remove |
| 221 | `from-blue-500` → `from-[var(--color-info)]`; `to-blue-600` → `to-[var(--color-info)]`; `rounded-full` → remove |
| 291 | `text-blue-600` → `text-[var(--color-info)]`; `hover:text-blue-800` → `hover:text-[var(--color-info)]` |

### 17. `src/components/ErrorBoundary.tsx`
| Line | Issue |
|------|-------|
| 47 | `text-red-500` → `text-[var(--color-error)]` |
| 68 | `bg-red-50` → `bg-[var(--color-error)]/10`; `rounded-lg` → remove; `border-red-200` → `border-[var(--color-error)]/30` |
| 69 | `text-red-800` → `text-[var(--color-error)]` |
| 72 | `text-red-700` → `text-[var(--color-error)]` |

### 18. `src/components/install-prompt.tsx`
| Line | Issue |
|------|-------|
| 72 | `rounded-lg` → remove |
| 94 | `bg-green-500` → `bg-[var(--color-success)]`; `rounded-full` → remove |
| 98 | `bg-green-500` → `bg-[var(--color-success)]`; `rounded-full` → remove |
| 102 | `bg-green-500` → `bg-[var(--color-success)]`; `rounded-full` → remove |
| 106 | `bg-green-500` → `bg-[var(--color-success)]`; `rounded-full` → remove |

### 19. `src/components/status-banner.tsx`
| Line | Issue |
|------|-------|
| 57 | `color-mix(in srgb, ...)` → remove |
| 58 | `color-mix(in srgb, ...)` → remove |

### 20. `src/components/announcements/announcement-banner.tsx`
| Line | Issue |
|------|-------|
| 10 | `color-mix(in srgb, ...)` → remove |
| 15 | `color-mix(in srgb, ...)` → remove |
| 20 | `color-mix(in srgb, ...)` → remove |
| 25 | `color-mix(in srgb, ...)` → remove |
| 30 | `color-mix(in srgb, ...)` → remove |
| 67 | `color-mix(in srgb, ...)` → remove |
| 82 | `rounded` → remove; `hover:bg-black/10` → `hover:bg-[var(--color-ink)]/10` |

### 21. `src/components/examples/HeaderWithLogo.tsx`
| Line | Issue |
|------|-------|
| 10 | `bg-white` → `bg-[var(--color-surface)]`; `shadow-sm` → `var(--shadow-sm)`; `border-gray-200` → `border-[var(--color-border)]` |
| 24 | `text-gray-900` → `text-[var(--color-text-primary)]`; `hover:text-blue-600` → `hover:text-[var(--color-info)]`; `rounded-md` → remove |
| 27 | `text-gray-500` → `text-[var(--color-text-muted)]`; `hover:text-gray-900` → `hover:text-[var(--color-text-primary)]`; `rounded-md` → remove |
| 30 | `text-gray-500` → `text-[var(--color-text-muted)]`; `hover:text-gray-900` → `hover:text-[var(--color-text-primary)]`; `rounded-md` → remove |
| 33 | `text-gray-500` → `text-[var(--color-text-muted)]`; `hover:text-gray-900` → `hover:text-[var(--color-text-primary)]`; `rounded-md` → remove |

### 22. `src/components/product-setup-step.tsx`
| Line | Issue |
|------|-------|
| 19 | `border-gray-300` → `border-[var(--color-border-strong)]`; `rounded-md` → remove; `focus:ring-blue-500` → `focus:ring-[var(--color-info)]` |
| 31 | Same as 19 |
| 42 | `rounded-l-md` → remove; `border-gray-300` → `border-[var(--color-border-strong)]`; `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `text-gray-500` → `text-[var(--color-text-muted)]` |
| 48 | `border-gray-300` → `border-[var(--color-border-strong)]`; `rounded-none` → keep; `rounded-r-md` → remove; `focus:ring-blue-500` → `focus:ring-[var(--color-info)]` |
| 62 | Same as 19 |
| 73 | Same as 19 |

### 23. `src/components/wallet/TopUpRequestModal.tsx`
| Line | Issue |
|------|-------|
| 53,62 | `rounded-full` → remove |
| 69 | `color-mix(in srgb, ...)` → remove |
| 361,366-369 | `text-white` → `text-[var(--color-text-inverse)]` |
| 414 | `rounded-xl` → remove |
| 419 | `color-mix(in srgb, ...)` → remove |
| 431,436 | `rounded-full` → remove |
| 439 | `color-mix(in srgb, ...)` → remove |
| 456 | `rounded-xl` → remove |
| 461 | `color-mix(in srgb, ...)` → remove |
| 473,478 | `rounded-full` → remove |
| 481 | `color-mix(in srgb, ...)` → remove |
| 523 | `rounded-lg` → remove |
| 525-526 | `color-mix(in srgb, ...)` → remove |
| 540,546 | `color-mix(in srgb, ...)` → remove |
| 573 | `rounded-xl` → remove |

### 24. `src/components/audit/UserActivityTimeline.tsx`
| Line | Issue |
|------|-------|
| 90 | `rounded-lg` → remove; `text-gray-600` → `text-[var(--color-text-secondary)]`; `hover:bg-gray-100` → `hover:bg-[var(--color-surface-alt)]` |
| 107 | `bg-blue-600` → `bg-[var(--color-info)]`; `shadow-sm` → `var(--shadow-sm)`; `text-white` OK on semantic |
| 108 | `text-gray-600` → `text-[var(--color-text-secondary)]`; `hover:bg-gray-100` → `hover:bg-[var(--color-surface-alt)]` |
| 119 | Same as 90 |
| 143 | `rounded-xl` → remove; `border-gray-200` → `border-[var(--color-border)]`; `bg-white` → `bg-[var(--color-surface)]`; `shadow-sm`/`shadow-md` → `var(--shadow-*)` |
| 191 | `border-gray-100` → `border-[var(--color-border)]` |
| 205 | `rounded-lg` → remove; `bg-gray-50` → `bg-[var(--color-surface-alt)]` |
| 215 | `rounded-lg` → remove; `bg-gray-50` → `bg-[var(--color-surface-alt)]` |
| 269 | `bg-blue-600` → `bg-[var(--color-info)]`; `shadow-sm` → `var(--shadow-sm)` |
| 270 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `text-gray-600` → `text-[var(--color-text-secondary)]`; `hover:bg-gray-200` → `hover:bg-[var(--color-surface-alt)]` |
| 283 | `rounded-xl` → remove; `border-gray-200` → `border-[var(--color-border)]` |
| 286 | `rounded-full` → remove; `bg-gray-200` → `bg-[var(--color-surface-alt)]` |
| 288 | `rounded` → remove; `bg-gray-200` → `bg-[var(--color-surface-alt)]` |
| 289 | `rounded` → remove; `bg-gray-100` → `bg-[var(--color-surface-alt)]` |
| 296 | `rounded-xl` → remove; `border-gray-300` → `border-[var(--color-border-strong)]`; `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `text-gray-500` → `text-[var(--color-text-muted)]` |

### 25. `src/components/audit/RecentActivityFeed.tsx`
| Line | Issue |
|------|-------|
| 103 | `rounded-lg` → remove; `border-gray-200` → `border-[var(--color-border)]`; `bg-white` → `bg-[var(--color-surface)]` |
| 130 | `rounded` → remove; `bg-gray-50` → `bg-[var(--color-surface-alt)]` |

### 26. `src/components/audit/AuditStatsWidget.tsx`
| Line | Issue |
|------|-------|
| 112 | `rounded-lg` → remove; `border-gray-200` → `border-[var(--color-border)]` |
| 155 | `rounded-lg` → remove; `border-gray-200` → `border-[var(--color-border)]` |
| 186 | `rounded-full` → remove; `bg-gray-100` → `bg-[var(--color-surface-alt)]` |
| 202 | `rounded-lg` → remove; `border-gray-200` → `border-[var(--color-border)]` |
| 210 | `rounded-md` → remove; `bg-gray-50` → `bg-[var(--color-surface-alt)]` |

### 27. `src/components/audit/AuditLogTable.tsx`
| Line | Issue |
|------|-------|
| 298 | `bg-gray-50` → `bg-[var(--color-surface-alt)]` |
| 309 | `rounded` → remove; `border-gray-200` → `border-[var(--color-border)]`; `bg-white` → `bg-[var(--color-surface)]` |

### 28. `src/components/orders/UnifiedOrderExcel.tsx`
| Line | Issue |
|------|-------|
| 703 | `bg-yellow-500` → `bg-[var(--color-amber)]`; `hover:bg-yellow-600` → `hover:bg-[var(--color-amber-hover)]` |
| 731 | `bg-red-600` → `bg-[var(--color-error)]`; `hover:bg-red-700` → `hover:bg-[var(--color-error)]/80` |
| 759 | `bg-blue-600` → `bg-[var(--color-info)]`; `hover:bg-blue-700` → `hover:bg-[var(--color-info)]/80` |
| 777 | `bg-green-600` → `bg-[var(--color-success)]`; `hover:bg-green-700` → `hover:bg-[var(--color-success)]/80`; `rounded-lg` → remove |
| 821 | `shadow-lg` → `var(--shadow-lg)` |

### 29. `src/components/orders/UnifiedOrderCard.tsx`
| Line | Issue |
|------|-------|
| 134 | `text-white` on `bg-[var(--color-text-muted)]` → `text-[var(--color-text-inverse)]` |
| 140 | Same |
| 142 | Same |
| 410 | `rounded-lg` → remove; `shadow-sm`/`shadow-md` → `var(--shadow-*)` |
| 460 | `rounded-lg` → remove; `shadow-xl` → `var(--shadow-xl)` |

### 30. `src/components/orders/UnifiedOrderTable.tsx`
| Line | Issue |
|------|-------|
| 73 | `rounded-md` → remove; `shadow-lg` → `var(--shadow-lg)` |
| 525 | Same |

### 31. `src/components/orders/UnifiedOrderList.tsx`
| Line | Issue |
|------|-------|
| 788 | `shadow-sm` → `var(--shadow-sm)` |
| 800 | `shadow-sm` → `var(--shadow-sm)` |

### 32. `src/components/orders/ReportModal.tsx`
| Line | Issue |
|------|-------|
| 139 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-xl` → `var(--shadow-xl)` |
| 141 | `from-red-600` → `from-[var(--color-error)]`; `to-red-700` → `to-[var(--color-error)]` |
| 151 | `hover:text-gray-200` → `hover:text-[var(--color-text-secondary)]` |
| 182 | `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 213 | `bg-gray-50` → `bg-[var(--color-surface-alt)]` |
| 225 | `bg-red-600` → `bg-[var(--color-error)]`; `hover:bg-red-700` → `hover:bg-[var(--color-error)]/80` |

### 33. `src/components/orders/OrderProcessingDialog.tsx`
| Line | Issue |
|------|-------|
| 86 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `rounded-full` → remove |
| 87 | `text-blue-600` → `text-[var(--color-info)]` |
| 104 | `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `border-gray-200` → `border-[var(--color-border)]`; `rounded-lg` → remove |
| 130 | `text-blue-600` → `text-[var(--color-info)]`; `focus:ring-blue-500` → `focus:ring-[var(--color-info)]` |
| 145 | Same |
| 160 | Same |
| 193 | `bg-gray-200` → `bg-[var(--color-surface-alt)]`; `text-gray-800` → `text-[var(--color-text-primary)]`; `rounded-lg` → remove; `hover:bg-gray-300` → `hover:bg-[var(--color-surface-alt)]` |
| 200 | `bg-blue-600` → `bg-[var(--color-info)]`; `rounded-lg` → remove; `hover:bg-blue-700` → `hover:bg-[var(--color-info)]/80` |
| 214 | `bg-green-600` → `bg-[var(--color-success)]`; `rounded-lg` → remove; `hover:bg-green-700` → `hover:bg-[var(--color-success)]/80` |
| 246 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `rounded-full` → remove |
| 247 | `text-blue-600` → `text-[var(--color-info)]` |
| 265 | `bg-gray-200` → `bg-[var(--color-surface-alt)]`; `rounded-full` → remove |
| 267 | `bg-blue-600` → `bg-[var(--color-info)]` |
| 288 | `bg-green-50` → `bg-[var(--color-success)]/10`; `text-green-700` → `text-[var(--color-success)]` |
| 290 | `bg-blue-50` → `bg-[var(--color-info)]/10`; `text-blue-700` → `text-[var(--color-info)]` |
| 291 | `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `text-gray-500` → `text-[var(--color-text-muted)]` |
| 294 | `text-green-600` → `text-[var(--color-success)]` |
| 296 | `text-blue-600` → `text-[var(--color-info)]` |

### 34. `src/components/orders/DuplicateOrderWarningModal.tsx`
| Line | Issue |
|------|-------|
| 87 | `bg-yellow-100` → `bg-[var(--color-warning)]/10`; `text-yellow-800` → `text-[var(--color-warning)]` |
| 88 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `text-blue-800` → `text-[var(--color-info)]` |
| 89 | `bg-green-100` → `bg-[var(--color-success)]/10`; `text-green-800` → `text-[var(--color-success)]` |
| 90 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `text-gray-800` → `text-[var(--color-text-primary)]` |
| 91 | Same |
| 99 | `text-amber-500` → `text-[var(--color-amber)]` |
| 112 | `border-amber-400` → `border-[var(--color-amber)]` |
| 114 | `text-amber-500` → `text-[var(--color-amber)]` |
| 116 | `text-amber-800` → `text-[var(--color-amber)]` |
| 117 | `text-amber-700` → `text-[var(--color-amber)]` |
| 139 | `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 141 | `text-blue-500` → `text-[var(--color-info)]` |
| 160 | `text-amber-500` → `text-[var(--color-amber)]` |
| 171 | `bg-red-50` → `bg-[var(--color-error)]/10`; `rounded-lg` → remove |
| 172 | `text-red-900` → `text-[var(--color-error)]` |
| 173 | `text-red-500` → `text-[var(--color-error)]` |
| 178 | `bg-white` → `bg-[var(--color-surface)]`; `rounded` → remove; `border-red-300` → `border-[var(--color-error)]/50` |
| 181 | `text-red-400` → `text-[var(--color-error)]` |
| 186 | `text-amber-500` → `text-[var(--color-amber)]` |
| 192 | `text-blue-600` → `text-[var(--color-info)]` |
| 199 | `text-gray-500` → `text-[var(--color-text-muted)]`; `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `rounded` → remove |
| 207 | `bg-green-50` → `bg-[var(--color-success)]/10`; `rounded-lg` → remove |
| 208 | `text-green-900` → `text-[var(--color-success)]` |
| 209 | `text-green-500` → `text-[var(--color-success)]` |
| 212 | `text-green-700` → `text-[var(--color-success)]` |
| 216 | `bg-white` → `bg-[var(--color-surface)]`; `rounded` → remove; `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 234 | `bg-blue-50` → `bg-[var(--color-info)]/10`; `rounded-lg` → remove |
| 235 | `text-blue-900` → `text-[var(--color-info)]` |
| 236 | `text-blue-500` → `text-[var(--color-info)]` |
| 241 | `bg-white` → `bg-[var(--color-surface)]`; `rounded` → remove |
| 248 | `bg-green-100` → `bg-[var(--color-success)]/10`; `text-green-800` → `text-[var(--color-success)]`; `bg-yellow-100` → `bg-[var(--color-warning)]/10`; `text-yellow-800` → `text-[var(--color-warning)]` |
| 263 | `bg-amber-50` → `bg-[var(--color-amber)]/10`; `rounded-lg` → remove |
| 264 | `text-amber-900` → `text-[var(--color-amber)]` |
| 265 | `text-amber-800` → `text-[var(--color-amber)]` |

### 35. `src/components/orders/DraftOrdersHandler.tsx`
| Line | Issue |
|------|-------|
| 139 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-xl` → `var(--shadow-xl)` |
| 141 | `border-gray-200` → `border-[var(--color-border)]` |
| 143 | `text-yellow-500` → `text-[var(--color-warning)]` |
| 161 | `text-green-500` → `text-[var(--color-success)]` |
| 173 | `bg-blue-50` → `bg-[var(--color-info)]/10`; `border-blue-200` → `border-[var(--color-info)]/30`; `rounded-lg` → remove |
| 175 | `text-blue-600` → `text-[var(--color-info)]` |
| 177 | `text-blue-900` → `text-[var(--color-info)]` |
| 180 | `text-blue-700` → `text-[var(--color-info)]` |
| 200 | `bg-gray-200` → `bg-[var(--color-surface-alt)]`; `rounded-full` → remove |
| 202 | `bg-blue-600` → `bg-[var(--color-info)]`; `rounded-full` → remove |
| 229 | `bg-gray-50` → `bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 264 | `bg-green-50` → `bg-[var(--color-success)]/10`; `border-green-200` → `border-[var(--color-success)]/30` |
| 265 | `bg-red-50` → `bg-[var(--color-error)]/10`; `border-red-200` → `border-[var(--color-error)]/30` |
| 273 | `text-green-800` → `text-[var(--color-success)]` |
| 274 | `text-red-800` → `text-[var(--color-error)]` |
| 292 | `text-green-800` → `text-[var(--color-success)]` |
| 293 | `text-red-800` → `text-[var(--color-error)]` |
| 346 | `bg-red-50` → `bg-[var(--color-error)]/10`; `border-red-200` → `border-[var(--color-error)]/30`; `rounded-lg` → remove |
| 347 | `text-red-800` → `text-[var(--color-error)]` |
| 353 | `text-red-700` → `text-[var(--color-error)]` |
| 407 | `bg-red-50` → `bg-[var(--color-error)]/10`; `border-red-200` → `border-[var(--color-error)]/30`; `rounded-lg` → remove |
| 408 | `text-red-700` → `text-[var(--color-error)]` |

### 36. `src/components/orders/BulkOrderModal.tsx`
| Line | Issue |
|------|-------|
| 399 | `text-white` → `text-[var(--color-text-inverse)]` |
| 514 | `rounded-lg` → remove |

### 37. `src/components/notifications/NotificationManagementModal.tsx`
| Line | Issue |
|------|-------|
| 207 | `from-primary-500` → `from-[var(--color-ink)]`; `to-primary-600` → `to-[var(--color-ink)]`; `rounded-t-lg` → remove |
| 210 | `rounded-lg` → remove |
| 319 | `rounded-full` → remove |

### 38. `src/components/notifications/NotificationDropdown.tsx`
| Line | Issue |
|------|-------|
| 167 | `rounded-full` → remove |
| 175 | `rounded-full` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 196 | `rounded-xl` → remove; `shadow-xl` → `var(--shadow-xl)` |
| 216 | `rounded-md` → remove |
| 235 | `rounded-full` → remove |
| 258 | `shadow-sm` → `var(--shadow-sm)` |
| 317 | `rounded-full` → remove |
| 337 | `rounded-lg` → remove |

### 39. `src/components/products/SuperAdminPackageManagement.tsx`
| Line | Issue |
|------|-------|
| 74 | `text-gray-900` → `text-[var(--color-text-primary)]` |
| 75 | `text-gray-600` → `text-[var(--color-text-secondary)]` |
| 79 | `bg-blue-600` → `bg-[var(--color-info)]`; `rounded-lg` → remove; `hover:bg-blue-700` → `hover:bg-[var(--color-info)]/80` |
| 89 | `text-red-600` → `text-[var(--color-error)]` |
| 90 | `text-gray-500` → `text-[var(--color-text-muted)]` |
| 91 | `text-red-600` → `text-[var(--color-error)]` |
| 97 | `bg-gray-50` → `bg-[var(--color-surface-alt)]` |
| 99-104 | `text-gray-500` → `text-[var(--color-text-muted)]` |
| 107 | `bg-white` → `bg-[var(--color-surface)]`; `divide-gray-200` → `divide-[var(--color-border)]` |
| 109 | `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]` |
| 114 | `bg-green-100` → `bg-[var(--color-success)]/10`; `text-green-800` → `text-[var(--color-success)]`; `bg-red-100` → `bg-[var(--color-error)]/10`; `text-red-800` → `text-[var(--color-error)]` |
| 116 | `text-gray-500` → `text-[var(--color-text-muted)]` |
| 118 | `text-blue-600` → `text-[var(--color-info)]`; `hover:text-blue-900` → `hover:text-[var(--color-info)]` |
| 119 | `text-red-600` → `text-[var(--color-error)]`; `hover:text-red-900` → `hover:text-[var(--color-error)]` |
| 120 | `text-green-600` → `text-[var(--color-success)]`; `hover:text-green-900` → `hover:text-[var(--color-success)]` |
| 127 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `text-blue-600` → `text-[var(--color-info)]` |
| 128 | `text-blue-600` → `text-[var(--color-info)]` |
| 129 | `bg-white` → `bg-[var(--color-surface)]`; `border-gray-200` → `border-[var(--color-border)]` |
| 135 | `border-gray-300` → `border-[var(--color-border-strong)]`; `text-gray-700` → `text-[var(--color-text-secondary)]`; `bg-white` → `bg-[var(--color-surface)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]`; `rounded-md` → remove |
| 142 | Same |
| 149 | `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 155 | `rounded-md` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 159 | `rounded-l-md` → remove; `border-gray-300` → `border-[var(--color-border-strong)]`; `bg-white` → `bg-[var(--color-surface)]`; `text-gray-500` → `text-[var(--color-text-muted)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]` |
| 166 | `rounded-r-md` → remove; same as 159 |
| 171 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `text-blue-600` → `text-[var(--color-info)]` |
| 172 | `text-blue-600` → `text-[var(--color-info)]` |
| 188 | `bg-black` → `bg-[var(--color-ink)]`; `bg-opacity-40` → `/40` |
| 189 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-lg` → `var(--shadow-lg)` |
| 194 | `border-gray-300` → `border-[var(--color-border-strong)]`; `text-gray-700` → `text-[var(--color-text-secondary)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 201 | `bg-red-600` → `bg-[var(--color-error)]`; `hover:bg-red-700` → `hover:bg-[var(--color-error)]/80`; `rounded-lg` → remove |

### 40. `src/components/products/ProviderList.tsx`
| Line | Issue |
|------|-------|
| 105 | `bg-red-50` → `bg-[var(--color-error)]/10`; `border-red-200` → `border-[var(--color-error)]/30`; `rounded-lg` → remove |
| 106 | `text-red-800` → `text-[var(--color-error)]` |
| 115 | `text-gray-900` → `text-[var(--color-text-primary)]` |
| 120 | `bg-blue-600` → `bg-[var(--color-info)]`; `rounded-lg` → remove; `hover:bg-blue-700` → `hover:bg-[var(--color-info)]/80`; `focus:ring-blue-500` → `focus:ring-[var(--color-info)]` |
| 146 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-md` → `var(--shadow-md)` |
| 147 | `bg-gray-200` → `bg-[var(--color-surface-alt)]`; `rounded-full` → remove |
| 148 | `bg-gray-200` → `bg-[var(--color-surface-alt)]`; `rounded` → remove |
| 149 | Same |
| 155 | `text-gray-400` → `text-[var(--color-text-muted)]` |
| 156 | `text-gray-900` → `text-[var(--color-text-primary)]` |
| 157 | `text-gray-500` → `text-[var(--color-text-muted)]` |
| 166 | Same as 120 |
| 178 | Same as 146 |
| 188 | `rounded-full` → remove; `bg-gray-100` → `bg-[var(--color-surface-alt)]` |
| 191 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `rounded-full` → remove; `text-gray-500` → `text-[var(--color-text-muted)]` |
| 198 | `rounded-full` → remove; `hover:bg-gray-100` → `hover:bg-[var(--color-surface-alt)]` |
| 201 | `text-gray-500` → `text-[var(--color-text-muted)]` |
| 207 | `text-gray-900` → `text-[var(--color-text-primary)]` |
| 209 | `text-gray-500` → `text-[var(--color-text-muted)]` |
| 216 | `bg-green-100` → `bg-[var(--color-success)]/10`; `text-green-800` → `text-[var(--color-success)]` |
| 217 | `bg-yellow-100` → `bg-[var(--color-amber)]/10`; `text-yellow-800` → `text-[var(--color-amber)]` |
| 230 | `text-yellow-600` → `text-[var(--color-amber)]`; `hover:bg-yellow-50` → `hover:bg-[var(--color-amber)]/10`; `text-green-600` → `text-[var(--color-success)]`; `hover:bg-green-50` → `hover:bg-[var(--color-success)]/10` |
| 240 | `text-blue-600` → `text-[var(--color-info)]`; `hover:bg-blue-50` → `hover:bg-[var(--color-info)]/10`; `rounded` → remove |
| 249 | `text-green-600` → `text-[var(--color-success)]`; `hover:bg-green-50` → `hover:bg-[var(--color-success)]/10`; `rounded` → remove |
| 257 | `text-red-600` → `text-[var(--color-error)]`; `hover:bg-red-50` → `hover:bg-[var(--color-error)]/10`; `rounded` → remove |
| 281 | `text-gray-400` → `text-[var(--color-text-muted)]` |
| 282 | `hover:bg-gray-100` → `hover:bg-[var(--color-surface-alt)]` |
| 294 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `text-blue-600` → `text-[var(--color-info)]`; `border-blue-300` → `border-[var(--color-info)]/50` |
| 295 | `hover:bg-gray-100` → `hover:bg-[var(--color-surface-alt)]` |
| 307 | `text-gray-400` → `text-[var(--color-text-muted)]` |
| 308 | `hover:bg-gray-100` → `hover:bg-[var(--color-surface-alt)]` |

### 41. `src/components/products/ProviderFormModal.tsx`
| Line | Issue |
|------|-------|
| 90 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-xl` → `var(--shadow-xl)` |
| 92 | `border-gray-200` → `border-[var(--color-border)]` |
| 93 | `text-gray-900` → `text-[var(--color-text-primary)]` |
| 98 | `text-gray-400` → `text-[var(--color-text-muted)]`; `hover:text-gray-600` → `hover:text-[var(--color-text-secondary)]` |
| 108 | `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 116 | `border-gray-300` → `border-[var(--color-border-strong)]`; `rounded-md` → remove; `focus:ring-blue-500` → `focus:ring-[var(--color-info)]` |
| 122 | `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 145 | Same as 116 |
| 152 | `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 160 | Same as 116 |
| 166 | `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 182 | Same as 116 |
| 187 | `bg-blue-600` → `bg-[var(--color-info)]`; `rounded-md` → remove; `hover:bg-blue-700` → `hover:bg-[var(--color-info)]/80` |
| 196 | `bg-blue-100` → `bg-[var(--color-info)]/10`; `text-blue-800` → `text-[var(--color-info)]`; `rounded-full` → remove |
| 202 | `text-blue-600` → `text-[var(--color-info)]`; `hover:text-blue-800` → `hover:text-[var(--color-info)]` |
| 213 | `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 228 | Same as 116 |
| 241 | `text-gray-700` → `text-[var(--color-text-secondary)]` |
| 247 | `border-gray-200` → `border-[var(--color-border)]` |
| 251 | `text-gray-700` → `text-[var(--color-text-secondary)]`; `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `rounded-md` → remove; `hover:bg-gray-200` → `hover:bg-[var(--color-surface-alt)]` |
| 258 | `bg-blue-600` → `bg-[var(--color-info)]`; `rounded-md` → remove; `hover:bg-blue-700` → `hover:bg-[var(--color-info)]/80` |

### 42. `src/components/products/PackageManagement.tsx`
| Line | Issue |
|------|-------|
| 220 | `bg-red-50` → `bg-[var(--color-error)]/10`; `border-red-200` → `border-[var(--color-error)]/30`; `rounded-lg` → remove |
| 222 | `bg-red-100` → `bg-[var(--color-error)]/10`; `rounded-lg` → remove |
| 223 | `text-red-600` → `text-[var(--color-error)]` |
| 226 | `text-red-800` → `text-[var(--color-error)]` |
| 229 | `text-red-700` → `text-[var(--color-error)]` |
| 241 | `text-gray-900` → `text-[var(--color-text-primary)]` |
| 248 | `text-gray-600` → `text-[var(--color-text-secondary)]` |
| 261 | `bg-blue-600` → `bg-[var(--color-info)]`; `rounded-lg` → remove; `hover:bg-blue-700` → `hover:bg-[var(--color-info)]/80` |
| 274 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 279 | `bg-white` → `bg-[var(--color-surface)]`; `text-gray-900` → `text-[var(--color-text-primary)]`; `shadow-sm` → `var(--shadow-sm)` |
| 280 | `text-gray-600` → `text-[var(--color-text-secondary)]`; `hover:text-gray-900` → `hover:text-[var(--color-text-primary)]` |
| 289 | Same as 279 |
| 328 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `border-gray-200` → `border-[var(--color-border)]` |
| 335 | Same |
| 355 | Same |
| 357 | `divide-gray-200` → `divide-[var(--color-border)]` |
| 358 | `bg-gray-50` → `bg-[var(--color-surface-alt)]` |
| 394 | `bg-white` → `bg-[var(--color-surface)]`; `divide-gray-200` → `divide-[var(--color-border)]` |
| 401 | `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]` |
| 521 | `bg-white` → `bg-[var(--color-surface)]`; `border-gray-200` → `border-[var(--color-border)]` |
| 527 | `border-gray-300` → `border-[var(--color-border-strong)]`; `text-gray-700` → `text-[var(--color-text-secondary)]`; `bg-white` → `bg-[var(--color-surface)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]`; `rounded-md` → remove |
| 534 | Same |
| 558 | `rounded-md` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 562 | `rounded-l-md` → remove; `border-gray-300` → `border-[var(--color-border-strong)]`; `bg-white` → `bg-[var(--color-surface)]`; `text-gray-500` → `text-[var(--color-text-muted)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]` |
| 569 | `rounded-r-md` → remove; same as 562 |
| 597 | `bg-black` → `bg-[var(--color-ink)]`; `bg-opacity-40` → `/40` |
| 598 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-lg` → `var(--shadow-lg)` |
| 606 | `border-gray-300` → `border-[var(--color-border-strong)]`; `text-gray-700` → `text-[var(--color-text-secondary)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |

### 43. `src/components/products/PackageList.tsx`
| Line | Issue |
|------|-------|
| 182 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |
| 187 | `bg-white` → `bg-[var(--color-surface)]`; `text-gray-900` → `text-[var(--color-text-primary)]`; `shadow-sm` → `var(--shadow-sm)` |
| 197 | Same |
| 225 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `border-gray-200` → `border-[var(--color-border)]` |
| 232 | Same |
| 251 | Same |
| 253 | `divide-gray-200` → `divide-[var(--color-border)]` |
| 254 | `bg-gray-50` → `bg-[var(--color-surface-alt)]` |
| 280 | `bg-white` → `bg-[var(--color-surface)]`; `divide-gray-200` → `divide-[var(--color-border)]` |
| 287 | `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]` |
| 351 | `bg-white` → `bg-[var(--color-surface)]`; `border-gray-200` → `border-[var(--color-border)]` |
| 357 | `border-gray-300` → `border-[var(--color-border-strong)]`; `text-gray-700` → `text-[var(--color-text-secondary)]`; `bg-white` → `bg-[var(--color-surface)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]`; `rounded-md` → remove |
| 364 | Same |
| 388 | `rounded-md` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 392 | `rounded-l-md` → remove; same as 357 |
| 399 | `rounded-r-md` → remove; same as 357 |

### 44. `src/components/products/PackageFormModal.tsx`
| Line | Issue |
|------|-------|
| 83 | `bg-white` → `bg-[var(--color-surface)]`; `rounded-lg` → remove; `shadow-lg` → `var(--shadow-lg)` |
| 97 | `border-gray-300` → `border-[var(--color-border-strong)]`; `rounded-lg` → remove; `focus:ring-blue-500` → `focus:ring-[var(--color-info)]`; `focus:border-blue-500` → `focus:border-[var(--color-info)]` |
| 107 | Same |
| 117 | Same |
| 132 | Same |
| 147 | `border-gray-300` → `border-[var(--color-border-strong)]`; `text-blue-600` → `text-[var(--color-info)]`; `focus:ring-blue-500` → `focus:ring-[var(--color-info)]` |
| 154 | `border-gray-300` → `border-[var(--color-border-strong)]`; `text-gray-700` → `text-[var(--color-text-secondary)]`; `hover:bg-gray-50` → `hover:bg-[var(--color-surface-alt)]`; `rounded-lg` → remove |

### 45. `src/components/products/PackageItem.tsx`
| Line | Issue |
|------|-------|
| 92 | `border-gray-100` → `border-[var(--color-border)]` |

### 46. `src/components/products/PricingManagementModal.tsx`
| Line | Issue |
|------|-------|
| 273 | `bg-gray-100` → `bg-[var(--color-surface-alt)]`; `text-gray-800` → `text-[var(--color-text-primary)]` |

### 47. `src/components/products/BundleFormModal.tsx`
| Line | Issue |
|------|-------|
| 125 | `rounded-xl` → remove; `shadow-xl` → `var(--shadow-xl)` |

### 48. `src/components/products/BundleCard.tsx`
| Line | Issue |
|------|-------|
| 128 | `shadow-[0_0_0_2px_white,_0_0_0_4px_var(--brand-border)]` → `shadow-[0_0_0_2px_var(--color-text-inverse),_0_0_0_4px_var(--brand-border)]` |
| 272 | `rounded-b-xl` → remove |

### 49. `src/components/products/ProviderPackageDisplay.tsx`
| Line | Issue |
|------|-------|
| 357 | `rounded-lg` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 449 | `rounded-full` → remove |
| 462 | `text-white` → `text-[var(--color-text-inverse)]` |
| 466 | Same |
| 481 | Same |
| 530-531 | Same |

### 50. `src/components/storefront/storefront-settings.tsx`
| Line | Issue |
|------|-------|
| 203 | `rounded-lg` → remove; `text-white` → `text-[var(--color-text-inverse)]`; `shadow-lg` → `var(--shadow-lg)` |
| 880 | `bg-white` → `bg-[var(--color-surface)]` |
| 1199 | `rounded-xl` → remove; `shadow-sm` → `var(--shadow-sm)` |
| 1275 | `rounded-lg` → remove; `text-white` → `text-[var(--color-text-inverse)]` |
| 1549 | `color-mix(in srgb, ...)` → remove |
| 1550 | `color-mix(in srgb, ...)` → remove |

### 51. `src/components/storefront/store-setup-wizard.tsx`
| Line | Issue |
|------|-------|
| 213 | `rounded-full` → remove; `color-mix(in srgb, ...)` → remove |
| 259 | `color-mix(in srgb, ...)` → remove |
| 284 | Same |
| 306 | Same |
| 328 | Same |
| 768 | Same |
| 775 | `rounded-xl` → remove; `color-mix(...)` → remove |
| 780 | `color-mix(in srgb, ...)` → remove |
| 908 | `color-mix(in srgb, ...)` → remove |
