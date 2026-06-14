import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = "",
}) => (
  <div className={`flex flex-col items-center justify-center py-16 gap-3 ${className}`}>
    {icon && (
      <div className="w-14 h-14 flex items-center justify-center bg-[var(--color-surface-alt)]">
        {icon}
      </div>
    )}
    <div className="text-center">
      <p className="font-medium text-[var(--color-text-primary)]">{title}</p>
      {description && (
        <p className="text-sm mt-0.5 text-[var(--color-text-secondary)]">{description}</p>
      )}
    </div>
    {action}
  </div>
);
