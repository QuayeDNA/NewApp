import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { Card, CardBody, CardHeader } from "../design-system";
import { BryteLinksSvgIcon } from "../components/common/BryteLinksSvgLogo";
import { brand } from "../config/brand";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  steps?: string[];
  activeStep?: number;
  footer?: ReactNode;
}

export const AuthLayout = ({
  title,
  subtitle,
  children,
  steps,
  activeStep = 1,
  footer,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[var(--color-ground)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card
          variant="outlined"
          noPadding
          className="flex flex-col"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <div className="flex items-center gap-2.5 px-4 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
            <div className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 flex items-center justify-center border-2 border-[var(--color-ink)]">
              <BryteLinksSvgIcon
                width="100%"
                height="100%"
                color="var(--color-ink)"
              />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[var(--color-text-primary)]">
                {brand.shortName}
              </p>
              <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] tracking-wider uppercase">
                {brand.tagline}
              </p>
            </div>
          </div>

          <CardHeader className="px-4 sm:px-6 pb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] leading-tight">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-1 text-xs sm:text-sm text-[var(--color-text-secondary)]">
                {subtitle}
              </p>
            ) : null}
          </CardHeader>

          {steps && steps.length > 0 ? (
            <div className="flex items-center gap-1 px-4 sm:px-6 py-2">
              {steps.map((stepLabel, index) => {
                const stepIndex = index + 1;
                const isComplete = stepIndex < activeStep;
                const isActive = stepIndex <= activeStep;
                return (
                  <div
                    key={stepLabel}
                    className="flex items-center flex-1 last:flex-none gap-1"
                  >
                    <div
                      className={`flex h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 items-center justify-center text-[10px] sm:text-xs font-bold ${
                        isActive
                          ? "text-[var(--color-text-inverse)]"
                          : "text-[var(--color-text-muted)]"
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? "var(--color-ink)"
                          : "var(--color-surface-alt)",
                      }}
                    >
                      {isComplete ? (
                        <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      ) : (
                        stepIndex
                      )}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs leading-none ${
                        isActive
                          ? "text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {stepLabel}
                    </span>
                    {stepIndex < steps.length ? (
                      <div
                        className="flex-1 h-px mx-1"
                        style={{
                          backgroundColor: isComplete
                            ? "var(--color-ink)"
                            : "var(--color-border)",
                        }}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}

          <CardBody className="px-4 sm:px-6 pt-4 pb-5 sm:pb-6">
            {children}
          </CardBody>
        </Card>

        {footer ? (
          <div
            className="mt-4 p-4 text-center text-xs sm:text-sm"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
};
