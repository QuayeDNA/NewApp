export const statusColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]",
    active: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
    expired: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
    archived: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  };
  return colors[status] || colors.draft;
};

export const priorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    low: "bg-[var(--color-info)]/10 text-[var(--color-info)]",
    medium: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
    high: "bg-[var(--color-ink)]/10 text-[var(--color-ink)]",
    urgent: "bg-[var(--color-error)]/10 text-[var(--color-error)]",
  };
  return colors[priority] || colors.medium;
};
