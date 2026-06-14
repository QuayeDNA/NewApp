import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../design-system/components/button";
import { Badge } from "../design-system/components/badge";
import { useSiteStatus } from "../contexts/site-status-context";
import ImpersonationService from "../utils/impersonation";
import { AlertTriangle, ShieldAlert, Eye, X } from "lucide-react";

const BANNER_HEIGHT = 44;

export { BANNER_HEIGHT };

export const StatusBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { siteStatus, isLoading } = useSiteStatus();
  const [dismissed, setDismissed] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);

  useEffect(() => {
    setIsImpersonating(
      typeof window !== "undefined" &&
        localStorage.getItem("impersonation") === "true",
    );
  }, []);

  const isAuthenticatedRoute =
    location.pathname.startsWith("/agent") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/superadmin");

  const siteClosed = !isLoading && siteStatus && !siteStatus.isSiteOpen;

  const showBanner =
    (isImpersonating && isAuthenticatedRoute) || (siteClosed && !dismissed);

  if (!showBanner) return null;

  const handleReturnToAdmin = async () => {
    try {
      await ImpersonationService.endImpersonation();
      navigate("/superadmin");
    } catch {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) localStorage.setItem("token", adminToken);
      localStorage.removeItem("adminToken");
      localStorage.removeItem("impersonation");
      navigate("/superadmin");
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center gap-3 px-4 text-sm"
      style={{
        height: BANNER_HEIGHT,
        backgroundColor: "var(--color-warning)",
        borderBottom: "1px solid var(--color-warning)",
        backdropFilter: "blur(6px)",
      }}
    >
      {isImpersonating && isAuthenticatedRoute ? (
        <>
          <Eye className="h-4 w-4 shrink-0 text-[var(--color-warning)]" />
          <span className="truncate font-medium text-[var(--color-warning)] flex-1 min-w-0">
            Impersonation Active — Acting as another user
          </span>
          {siteClosed && (
            <Badge colorScheme="warning" size="sm">
              Site Closed
            </Badge>
          )}
          <Badge colorScheme="warning" size="sm" className="mr-1">
            Impersonating
          </Badge>
          <Button
            variant="danger"
            size="sm"
            onClick={handleReturnToAdmin}
            className="shrink-0"
          >
            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
            Return to Admin
          </Button>
        </>
      ) : siteClosed ? (
        <>
          <AlertTriangle className="h-4 w-4 shrink-0 text-[var(--color-warning)]" />
          <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0">
            <div className="inline-block animate-marquee">
              <span className="text-[var(--color-warning)] font-medium px-4">
                {siteStatus?.customMessage || "Site is currently closed"}
              </span>
            </div>
          </div>
          <Badge colorScheme="warning" size="sm">
            Site Closed
          </Badge>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="shrink-0 ml-2 p-1 rounded-md text-[var(--color-warning)] hover:bg-[var(--color-warning)]/10 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </>
      ) : null}
    </div>
  );
};
