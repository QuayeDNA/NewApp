// src/pages/superadmin/payout-management.tsx
//
// Single unified admin payout page.
// Mode-aware: auto / semi-auto / manual driven by `autoPayoutEnabled` setting.
//
// Auto mode:      No pending queue — only history. Admin cannot take action.
// Semi-auto:      Approve → Send via Paystack. Admin triggers transfer.
// Manual:         Approve → Mark Paid. Admin sends money outside platform.
//
// Replaces the old payouts.tsx and payout-history.tsx.

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  EmptyState,
  FormField,
  Input,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../../design-system';
import { useToast } from '../../design-system';
import { SearchAndFilter } from '../../components/common/SearchAndFilter';
import type { PayoutRequestItem } from '../../types/wallet';
import { walletService } from '../../services/wallet-service';
import {
  AlertCircle,
  ArrowDownToLine,
  CheckCircle2,
  Clock,
  DollarSign,
  Loader2,
  RefreshCw,
  Send,
  Zap,
  XCircle,
  Building2,
  Smartphone,
  Info,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AutoPayoutStatus {
  autoPayoutEnabled: boolean;
  canAutoPayout: boolean;
  paystackConfigured: boolean;
  message: string;
}

type ConfirmType = 'approve' | 'process' | 'markPaid' | 'reject' | null;

interface ConfirmState {
  open: boolean;
  type: ConfirmType;
  payout?: PayoutRequestItem;
}

interface AdminPayoutSummary {
  totalProfit: number;
  availableEarnings: number;
  totalWithdrawn: number;
  processingAmount: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(n);
}

function fmtDate(v: string | Date | undefined) {
  if (!v) return '—';
  return new Date(v).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function userName(user: unknown) {
  if (!user) return 'Unknown';
  if (typeof user === 'object' && user !== null) {
    const u = user as Record<string, unknown>;
    return (u.fullName as string) || (u.email as string) || 'Unknown';
  }
  return String(user);
}

function userEmail(user: unknown) {
  if (!user || typeof user !== 'object') return '';
  return ((user as Record<string, unknown>).email as string) || '';
}

function destLabel(dest?: PayoutRequestItem['destination']) {
  if (!dest) return '—';

  const name = dest.accountName || dest.recipientName;
  if (dest.type === 'mobile_money') {
    const provider = dest.mobileProvider ? `${dest.mobileProvider} ` : '';
    const number = dest.phoneNumber || '—';
    return (
      <div className="space-y-0.5">
        <div>{`${provider}${number}`.trim()}</div>
        {name ? <div className="text-xs text-[var(--color-text-secondary)]">{name}</div> : null}
      </div>
    );
  }

  const account = dest.accountNumber || '—';
  const bank = dest.bankCode ? ` (${dest.bankCode})` : '';
  return (
    <div className="space-y-0.5">
      <div>{`${account}${bank}`.trim()}</div>
      {name ? <div className="text-xs text-[var(--color-text-secondary)]">{name}</div> : null}
    </div>
  );
}

type BadgeColor = 'success' | 'warning' | 'error' | 'info' | 'gray';

function statusColor(s: string): BadgeColor {
  switch (s) {
    case 'pending': return 'warning';
    case 'approved': return 'info';
    case 'processing': return 'info';
    case 'completed': return 'success';
    case 'rejected':
    case 'failed': return 'error';
    default: return 'gray';
  }
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    pending: 'Pending',
    approved: 'Approved',
    processing: 'Processing',
    completed: 'Completed',
    rejected: 'Rejected',
    failed: 'Failed',
  };
  return map[s] ?? s;
}

function statusIcon(s: string) {
  switch (s) {
    case 'pending': return <Clock className="w-3 h-3" />;
    case 'approved': return <CheckCircle2 className="w-3 h-3" />;
    case 'processing': return <Loader2 className="w-3 h-3 animate-spin" />;
    case 'completed': return <CheckCircle2 className="w-3 h-3" />;
    case 'rejected':
    case 'failed': return <XCircle className="w-3 h-3" />;
    default: return null;
  }
}

function statusBgClass(s: string) {
  switch (s) {
    case 'pending': return 'border-[var(--color-warning)] bg-[var(--color-warning)]';
    case 'approved': return 'border-[var(--color-ink)] bg-[var(--color-ink)]';
    case 'processing': return 'border-[var(--color-ink)] bg-[var(--color-ink)]';
    case 'completed': return 'border-[var(--color-success)] bg-[var(--color-success)]';
    case 'rejected':
    case 'failed': return 'border-[var(--color-error)] bg-[var(--color-error)]';
    default: return 'border-[var(--color-border)] bg-[var(--color-surface-alt)]';
  }
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'failed', label: 'Failed' },
];

// ─── Mode banner ──────────────────────────────────────────────────────────────

interface ModeBannerProps {
  status: AutoPayoutStatus | null;
  loading: boolean;
}

const ModeBanner: React.FC<ModeBannerProps> = ({ status, loading }) => {
  if (loading || !status) return null;

  if (status.autoPayoutEnabled && status.canAutoPayout) {
    return (
      <div className="flex items-start gap-3 px-4 py-3 text-sm" style={{ backgroundColor: "var(--color-success)", color: "var(--color-text-inverse)" }}>
        <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--color-text-inverse)" }}>
          <Zap className="w-3.5 h-3.5" style={{ color: "var(--color-success)" }} />
        </div>
        <div>
          <p className="font-semibold">Auto Payout Mode</p>
          <p className="mt-0.5">
            Agent requests trigger an immediate Paystack transfer. No admin action is required.
            Completed and failed transfers appear in history below.
          </p>
        </div>
      </div>
    );
  }

  if (!status.paystackConfigured) {
    return (
      <div className="flex items-start gap-3 px-4 py-3 text-sm" style={{ backgroundColor: "var(--color-warning)", color: "var(--color-text-inverse)" }}>
        <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--color-text-inverse)" }}>
          <Info className="w-3.5 h-3.5" style={{ color: "var(--color-warning)" }} />
        </div>
        <div>
          <p className="font-semibold">Manual Payout Mode — Paystack not configured</p>
          <p className="mt-0.5">
            Approve requests, then send money manually (MoMo/bank), and click <strong>Mark Paid</strong> to record completion.
            Configure Paystack in <em>Settings → API</em> to enable the automatic transfer option.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 px-4 py-3 text-sm" style={{ backgroundColor: "var(--color-ink)", color: "var(--color-text-inverse)" }}>
      <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "var(--color-text-inverse)" }}>
        <Send className="w-3.5 h-3.5" style={{ color: "var(--color-ink)" }} />
      </div>
      <div>
        <p className="font-semibold">Semi-Auto Payout Mode</p>
        <p className="mt-0.5">
          Approve each request to deduct the agent's earnings, then click <strong>Send via Paystack</strong> to trigger the transfer, or <strong>Mark Paid</strong> if you sent money manually.
        </p>
      </div>
    </div>
  );
};

// ─── Action buttons per payout status ────────────────────────────────────────

interface ActionCellProps {
  payout: PayoutRequestItem;
  autoMode: boolean;
  paystackConfigured: boolean;
  loading: boolean;
  onApprove: (p: PayoutRequestItem) => void;
  onProcess: (p: PayoutRequestItem) => void;
  onMarkPaid: (p: PayoutRequestItem) => void;
  onReject: (p: PayoutRequestItem) => void;
}

const ActionCell: React.FC<ActionCellProps> = ({
  payout, autoMode, paystackConfigured, loading,
  onApprove, onProcess, onMarkPaid, onReject,
}) => {
  const { status } = payout;

  if (autoMode) {
    if (status === 'processing') return <span className="text-xs flex items-center gap-1 text-[var(--color-ink)]"><Loader2 className="w-3 h-3 animate-spin" /> Processing…</span>;
    if (status === 'completed') return <span className="text-xs text-[var(--color-success)]">Completed</span>;
    if (status === 'failed') return <span className="text-xs text-[var(--color-error)]">Failed — earnings refunded</span>;
    return null;
  }

  if (status === 'pending') {
    return (
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="success" onClick={() => onApprove(payout)} disabled={loading}>
          Approve
        </Button>
        <Button size="xs" variant="danger" onClick={() => onReject(payout)} disabled={loading}>
          Reject
        </Button>
      </div>
    );
  }

  if (status === 'approved') {
    return (
      <div className="flex flex-wrap gap-2">
        {paystackConfigured && (
          <Button size="xs" variant="primary" onClick={() => onProcess(payout)} disabled={loading}>
            <Send className="w-3 h-3 mr-1" />Send via Paystack
          </Button>
        )}
        <Button size="xs" variant="success" onClick={() => onMarkPaid(payout)} disabled={loading}>
          Mark Paid
        </Button>
        <Button size="xs" variant="danger" onClick={() => onReject(payout)} disabled={loading}>
          Reject
        </Button>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="flex flex-wrap gap-2">
        <span className="text-xs flex items-center gap-1 mr-1 text-[var(--color-ink)]">
          <Loader2 className="w-3 h-3 animate-spin" /> Awaiting Paystack…
        </span>
        <Button size="xs" variant="success" onClick={() => onMarkPaid(payout)} disabled={loading}>
          Mark Paid
        </Button>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="primary" onClick={() => onProcess(payout)} disabled={loading}>
          Retry Send
        </Button>
        <Button size="xs" variant="success" onClick={() => onMarkPaid(payout)} disabled={loading}>
          Mark Paid
        </Button>
      </div>
    );
  }

  return null;
};

// ─── Payout table row (reusable) ─────────────────────────────────────────────

interface PayoutRowProps {
  payout: PayoutRequestItem;
  autoMode: boolean;
  paystackConfigured: boolean;
  loading: boolean;
  onApprove: (p: PayoutRequestItem) => void;
  onProcess: (p: PayoutRequestItem) => void;
  onMarkPaid: (p: PayoutRequestItem) => void;
  onReject: (p: PayoutRequestItem) => void;
}

const PayoutRow: React.FC<PayoutRowProps> = ({
  payout, autoMode, paystackConfigured, loading,
  onApprove, onProcess, onMarkPaid, onReject,
}) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{fmtDate(payout.requestedAt)}</div>
      <div className="text-xs text-[var(--color-text-muted)]">{fmtDate(payout.createdAt)}</div>
    </TableCell>

    <TableCell>
      <div className="font-medium">{userName(payout.user)}</div>
      <div className="text-xs text-[var(--color-text-muted)]">{userEmail(payout.user)}</div>
    </TableCell>

    <TableCell>
      <div className="font-semibold">{fmt(payout.amount)}</div>
      {payout.transferFee != null && (
        <div className="text-xs text-[var(--color-warning)]">Fee: {fmt(payout.transferFee)}</div>
      )}
      {payout.netAmount != null && (
        <div className="text-xs font-medium text-[var(--color-success)]">Net: {fmt(payout.netAmount)}</div>
      )}
    </TableCell>

    <TableCell>
      <div className="flex items-center gap-1.5">
        {payout.destination?.type === 'mobile_money'
          ? <Smartphone className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-muted)]" />
          : <Building2 className="w-3.5 h-3.5 shrink-0 text-[var(--color-text-muted)]" />
        }
        {destLabel(payout.destination)}
      </div>
    </TableCell>

    <TableCell>
      <Badge colorScheme={statusColor(payout.status)} size="sm">
        <span className="flex items-center gap-1">
          {statusIcon(payout.status)}
          {statusLabel(payout.status)}
        </span>
      </Badge>
      {payout.paystackTransfer?.failureReason && (
        <div className="text-xs mt-1 max-w-[180px] text-[var(--color-error)]" title={payout.paystackTransfer.failureReason}>
          {payout.paystackTransfer.failureReason}
        </div>
      )}
      {payout.rejectionReason && payout.status === 'rejected' && (
        <div className="text-xs mt-1 max-w-[180px] text-[var(--color-text-muted)]" title={payout.rejectionReason}>
          {payout.rejectionReason}
        </div>
      )}
    </TableCell>

    <TableCell className="text-right">
      <ActionCell
        payout={payout}
        autoMode={autoMode}
        paystackConfigured={paystackConfigured}
        loading={loading}
        onApprove={onApprove}
        onProcess={onProcess}
        onMarkPaid={onMarkPaid}
        onReject={onReject}
      />
    </TableCell>
  </TableRow>
);

PayoutRow.displayName = 'PayoutRow';

// ─── Skeleton loaders ─────────────────────────────────────────────────────────

const PayoutTableSkeleton: React.FC = () => (
  <div className="hidden sm:block">
    <div className="min-w-[760px]">
      <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-[var(--color-surface-alt)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="1rem" width="60%" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, row) => (
        <div key={row} className="grid grid-cols-6 gap-4 px-4 py-3 border-t border-[var(--color-border)]">
          {Array.from({ length: 6 }).map((_, col) => (
            <Skeleton key={col} height={col === 4 ? '1.5rem' : '1rem'} width={col === 5 ? '40%' : '80%'} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const PayoutMobileSkeleton: React.FC = () => (
  <div className="sm:hidden space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <Card key={i} variant="interactive" size="sm">
        <CardBody className="space-y-3 pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width={44} height={44} />
              <div className="space-y-1.5">
                <Skeleton height="0.875rem" width="8rem" />
                <Skeleton height="0.75rem" width="10rem" />
              </div>
            </div>
            <Skeleton height="1.25rem" width="4rem" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2.5 space-y-1.5">
                <Skeleton height="0.625rem" width="3rem" />
                <Skeleton height="0.75rem" width="70%" />
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter className="px-3 py-2.5">
          <Skeleton height="1.5rem" width="5rem" />
        </CardFooter>
      </Card>
    ))}
  </div>
);

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PayoutManagementPage() {
  const { addToast } = useToast();

  const [payouts, setPayouts] = useState<PayoutRequestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 25, total: 0, pages: 0 });
  const [modeStatus, setModeStatus] = useState<AutoPayoutStatus | null>(null);
  const [modeLoading, setModeLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const [summary, setSummary] = useState<AdminPayoutSummary>({
    totalProfit: 0,
    availableEarnings: 0,
    totalWithdrawn: 0,
    processingAmount: 0,
  });
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [confirm, setConfirm] = useState<ConfirmState>({ open: false, type: null });
  const [confirmInput, setConfirmInput] = useState('');

  useEffect(() => {
    walletService.getAutoPayoutAvailability()
      .then(setModeStatus)
      .catch(() => setModeStatus({ autoPayoutEnabled: false, canAutoPayout: false, paystackConfigured: false, message: 'Unable to determine mode' }))
      .finally(() => setModeLoading(false));
  }, []);

  const fetchPayouts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const result = await walletService.getAdminPayoutHistory(
        page,
        pagination.limit,
        statusFilter === 'all' ? undefined : statusFilter,
        undefined,
        searchTerm || undefined,
        dateRange.startDate || undefined,
        dateRange.endDate || undefined,
      );
      setPayouts(result.payouts);
      setPagination(result.pagination);
    } catch {
      addToast('Failed to load payouts', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast, pagination.limit, statusFilter, searchTerm, dateRange]);

  useEffect(() => { void fetchPayouts(1); }, [fetchPayouts]);

  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true);
    try {
      const data = await walletService.getAdminPayoutSummary();
      setSummary(data);
    } catch {
      addToast('Failed to load payout summary', 'error');
    } finally {
      setSummaryLoading(false);
    }
  }, [addToast]);

  useEffect(() => { void fetchSummary(); }, [fetchSummary]);

  const refresh = () => {
    void Promise.all([
      fetchPayouts(pagination.page),
      fetchSummary(),
    ]);
  };

  const openConfirm = (type: ConfirmType, payout: PayoutRequestItem) => {
    setConfirmInput('');
    setConfirm({ open: true, type, payout });
  };
  const closeConfirm = () => setConfirm({ open: false, type: null });

  const handleApprove = async (payout: PayoutRequestItem) => {
    setActionLoading(payout._id);
    try {
      await walletService.approvePayout(payout._id);
      addToast('Payout approved — earnings deducted. You can now send the transfer.', 'success');
      void refresh();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to approve payout', 'error');
    } finally {
      setActionLoading(null);
      closeConfirm();
    }
  };

  const handleProcess = async (payout: PayoutRequestItem) => {
    setActionLoading(payout._id);
    try {
      await walletService.processPayout(payout._id);
      addToast('Paystack transfer initiated. Agent will be notified on completion.', 'success');
      void refresh();
    } catch (err: unknown) {
      void refresh();
      type ErrShape = { response?: { data?: { code?: string; message?: string } } };
      const apiErr = (err as ErrShape).response?.data;
      const code = apiErr?.code;
      const msg = apiErr?.message ?? (err instanceof Error ? err.message : 'Transfer failed');

      if (code === 'NOT_APPROVED') {
        addToast('Approve this payout first before sending the transfer.', 'warning');
      } else if (code === 'ALREADY_PROCESSING') {
        addToast('This transfer is already in progress.', 'info');
      } else if (code === 'PAYSTACK_NOT_CONFIGURED') {
        addToast('Paystack is not configured — use Mark Paid for manual processing.', 'error');
      } else if (code === 'ZERO_NET_AMOUNT') {
        addToast('Net amount is zero after fees. Adjust payout amount or fee settings.', 'error');
      } else {
        addToast(`Transfer blocked: ${msg}. Try Mark Paid instead.`, 'error');
      }
    } finally {
      setActionLoading(null);
      closeConfirm();
    }
  };

  const handleMarkPaid = async (payout: PayoutRequestItem, ref?: string) => {
    setActionLoading(payout._id);
    try {
      await walletService.markPayoutComplete(payout._id, ref || undefined);
      addToast('Payout marked as completed.', 'success');
      void refresh();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to mark payout complete', 'error');
    } finally {
      setActionLoading(null);
      closeConfirm();
    }
  };

  const handleReject = async (payout: PayoutRequestItem, reason?: string) => {
    setActionLoading(payout._id);
    try {
      await walletService.rejectPayout(payout._id, reason || undefined);
      addToast('Payout rejected. Agent has been notified.', 'success');
      void refresh();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to reject payout', 'error');
    } finally {
      setActionLoading(null);
      closeConfirm();
    }
  };

  const isAutoMode = modeStatus?.autoPayoutEnabled && modeStatus?.canAutoPayout;
  const psConfigured = modeStatus?.paystackConfigured ?? false;
  const hasFilters = statusFilter !== 'all' || !!searchTerm.trim() || !!dateRange.startDate || !!dateRange.endDate;
  const pendingCount = payouts.filter(p => p.status === 'pending').length;
  const approvedCount = payouts.filter(p => p.status === 'approved').length;
  const processingCount = payouts.filter(p => p.status === 'processing').length;
  const completedCount = payouts.filter(p => p.status === 'completed').length;
  const failedCount = payouts.filter(p => p.status === 'failed').length;

  const confirmContent = useMemo(() => {
    const p = confirm.payout;
    if (!p) return { title: '', body: null, confirmLabel: '', variant: 'primary' as const };

    switch (confirm.type) {
      case 'approve':
        return {
          title: 'Approve Payout',
          body: (
            <div className="space-y-3 text-sm text-[var(--color-text-primary)]">
              <p>Approving will deduct <strong>{fmt(p.amount)}</strong> from <strong>{userName(p.user)}</strong>&apos;s earnings balance.</p>
              {!isAutoMode && psConfigured && (
                <p className="text-[var(--color-ink)]">After approval, use <strong>Send via Paystack</strong> or <strong>Mark Paid</strong> to complete the transfer.</p>
              )}
              {!isAutoMode && !psConfigured && (
                <p className="text-[var(--color-warning)]">Paystack is not configured. After approval, send the funds manually and use <strong>Mark Paid</strong>.</p>
              )}
            </div>
          ),
          confirmLabel: 'Approve',
          variant: 'success' as const,
        };

      case 'process':
        return {
          title: 'Send via Paystack',
          body: (
            <div className="space-y-3 text-sm text-[var(--color-text-primary)]">
              <p>This transfers <strong>{fmt(p.netAmount ?? p.amount)}</strong> from your Paystack account balance directly to the agent.</p>
              <ul className="list-disc list-inside space-y-1 text-[var(--color-text-secondary)]">
                <li>Requires sufficient Paystack balance and Transfers enabled</li>
                <li>If it fails, the payout stays approved so you can retry or use Mark Paid</li>
              </ul>
              {p.paystackTransfer?.failureReason && (
                <div className="p-3" style={{ backgroundColor: "var(--color-error)", color: "var(--color-text-inverse)" }}>
                  <p className="font-medium text-xs">Previous failure:</p>
                  <p className="text-xs mt-1">{p.paystackTransfer.failureReason}</p>
                </div>
              )}
            </div>
          ),
          confirmLabel: 'Send Transfer',
          variant: 'primary' as const,
        };

      case 'markPaid':
        return {
          title: 'Mark as Paid',
          body: (
            <div className="space-y-3 text-sm text-[var(--color-text-primary)]">
              <p>Use this after sending the money manually (MoMo/bank/Paystack dashboard).</p>
              <ol className="list-decimal list-inside space-y-1 text-[var(--color-text-secondary)]">
                <li>Send <strong>{fmt(p.netAmount ?? p.amount)}</strong> to {destLabel(p.destination)}</li>
                <li>Enter the transaction reference below (recommended)</li>
                <li>Click Mark as Paid to update the agent&apos;s dashboard</li>
              </ol>
              <FormField label="Transfer reference (recommended)">
                <Input
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="e.g. MoMo transaction ID or bank reference"
                />
              </FormField>
            </div>
          ),
          confirmLabel: 'Mark as Paid',
          variant: 'success' as const,
        };

      case 'reject':
        return {
          title: 'Reject Payout',
          body: (
            <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <p>Rejecting will notify the agent. If their earnings were already deducted, they will be refunded automatically.</p>
              <FormField label="Reason (optional)">
                <Input
                  value={confirmInput}
                  onChange={(e) => setConfirmInput(e.target.value)}
                  placeholder="e.g. Invalid account details"
                />
              </FormField>
            </div>
          ),
          confirmLabel: 'Reject',
          variant: 'danger' as const,
        };

      default:
        return { title: '', body: null, confirmLabel: 'Confirm', variant: 'primary' as const };
    }
  }, [confirm, confirmInput, isAutoMode, psConfigured]);

  return (
    <div className="space-y-4 pb-6">

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5" style={{ backgroundColor: "var(--color-text-inverse)" }}>
              <ArrowDownToLine className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "var(--color-ink)" }} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Payout Management</h1>
              <p className="text-xs sm:text-sm mt-0.5 text-[var(--color-text-inverse)]/70">
                {modeLoading
                  ? 'Loading mode…'
                  : isAutoMode
                    ? 'Auto mode — transfers process automatically'
                    : psConfigured
                      ? 'Semi-auto mode — approve then send via Paystack'
                      : 'Manual mode — approve then send outside platform'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="self-start sm:self-auto"
            onClick={refresh}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="px-3 py-2.5 flex flex-col gap-2 border border-[var(--color-text-inverse)]" style={{ background: "var(--color-text-inverse)", color: "var(--color-ink)" }}>
            <div className="flex items-center gap-2">
              <span className="shrink-0"><DollarSign className="w-4 h-4" /></span>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide">Total Profit</p>
                <p className="font-bold text-sm sm:text-base">
                  {summaryLoading ? <Skeleton width="4rem" height="1rem" /> : fmt(summary.totalProfit)}
                </p>
              </div>
            </div>
            <p className="text-xs">Available + withdrawn</p>
          </div>

          <div className="px-3 py-2.5 flex flex-col gap-2 border border-[var(--color-success)]" style={{ background: "var(--color-success)", color: "var(--color-text-primary)" }}>
            <div className="flex items-center gap-2 ">
              <span className="shrink-0"><CheckCircle2 className="w-4 h-4" /></span>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide color-[var(--color-text-primary)]">Available Earnings</p>
                <p className="font-bold text-sm sm:text-base color-[var(--color-text-primary)]">
                  {summaryLoading ? <Skeleton width="4rem" height="1rem" /> : fmt(summary.availableEarnings)}
                </p>
              </div>
            </div>
          </div>

          <div className="px-3 py-2.5 flex flex-col gap-2" style={{ background: "var(--color-text-inverse)", color: "var(--color-ink)" }}>
            <div className="flex items-center gap-2">
              <span className="shrink-0"><ArrowDownToLine className="w-4 h-4" /></span>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide">Total Withdrawn</p>
                <p className="font-bold text-sm sm:text-base">
                  {summaryLoading ? <Skeleton width="4rem" height="1rem" /> : fmt(summary.totalWithdrawn)}
                </p>
              </div>
            </div>
            {summary.processingAmount ? (
              <p className="text-xs">Processing: {fmt(summary.processingAmount)}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: "var(--color-text-inverse)", color: "var(--color-ink)" }}>
            <span className="shrink-0"><DollarSign className="w-4 h-4" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide">Total</p>
              <p className="font-bold text-sm sm:text-base">{pagination.total}</p>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: "var(--color-warning)", color: "var(--color-text-inverse)" }}>
            <span className="shrink-0"><Clock className="w-4 h-4" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide">Pending</p>
              <p className="font-bold text-sm sm:text-base">{pendingCount}</p>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: "var(--color-ink)", color: "var(--color-text-inverse)" }}>
            <span className="shrink-0"><Loader2 className="w-4 h-4" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide">Processing</p>
              <p className="font-bold text-sm sm:text-base">{processingCount}</p>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: "var(--color-success)", color: "var(--color-text-inverse)" }}>
            <span className="shrink-0"><CheckCircle2 className="w-4 h-4" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide">Completed</p>
              <p className="font-bold text-sm sm:text-base">{completedCount}</p>
            </div>
          </div>
          <div className="px-3 py-2.5 flex items-center gap-2" style={{ background: "var(--color-error)", color: "var(--color-text-inverse)" }}>
            <span className="shrink-0"><XCircle className="w-4 h-4" /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-wide">Failed</p>
              <p className="font-bold text-sm sm:text-base">{failedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <ModeBanner status={modeStatus} loading={modeLoading} />

      {!isAutoMode && approvedCount > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 text-sm" style={{ background: "var(--color-surface-alt)", color: "var(--color-text-primary)" }}>
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">{approvedCount} approved payout{approvedCount > 1 ? 's' : ''} waiting for transfer.</span>{' '}
            {psConfigured
              ? 'Use "Send via Paystack" to trigger the transfer automatically, or "Mark Paid" if you\'ve sent it manually.'
              : 'Send the funds manually, then click "Mark Paid" to complete.'}
          </div>
        </div>
      )}

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={(v) => { setSearchTerm(v); setPagination(p => ({ ...p, page: 1 })); }}
        searchPlaceholder="Search by reference, phone or account…"
        filters={{ status: { value: statusFilter, options: STATUS_OPTIONS, label: 'Status' } }}
        onFilterChange={(k, v) => { if (k === 'status') setStatusFilter(v); setPagination(p => ({ ...p, page: 1 })); }}
        onSearch={(e) => e.preventDefault()}
        onClearFilters={() => { setSearchTerm(''); setStatusFilter('all'); setDateRange({ startDate: '', endDate: '' }); setPagination(p => ({ ...p, page: 1 })); }}
        showDateRange
        dateRange={dateRange}
        onDateRangeChange={(start, end) => { setDateRange({ startDate: start, endDate: end }); setPagination(p => ({ ...p, page: 1 })); }}
        showSearchButton={false}
        isLoading={loading}
      />

      <div className="border border-[var(--color-border)]">
        {loading ? (
          <>
            <PayoutTableSkeleton />
            <PayoutMobileSkeleton />
          </>
        ) : payouts.length === 0 ? (
          <EmptyState
            icon={<ArrowDownToLine className="text-2xl text-[var(--color-text-muted)]" />}
            title="No payouts found"
            description={hasFilters ? 'Try adjusting your filters.' : 'No payout requests in the system yet.'}
            action={
              hasFilters ? (
                <Button variant="outline" size="sm" onClick={() => { setSearchTerm(''); setStatusFilter('all'); setDateRange({ startDate: '', endDate: '' }); setPagination(p => ({ ...p, page: 1 })); }}>
                  Clear filters
                </Button>
              ) : undefined
            }
          />
        ) : (
          <>
            <div className="sm:hidden space-y-3">
              {payouts.map((payout) => (
                <Card key={payout._id} variant="interactive" size="sm">
                  <CardBody className="space-y-3 pt-0 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "var(--color-ink)", color: "var(--color-text-inverse)" }}>
                          {userName(payout.user).charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate">{userName(payout.user)}</p>
                          <p className="text-xs text-[var(--color-text-secondary)] truncate">{userEmail(payout.user)}</p>
                        </div>
                      </div>
                      <Badge colorScheme={statusColor(payout.status)} size="xs">
                        {statusLabel(payout.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2.5">
                        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Requested</p>
                        <p className="text-xs font-semibold">{fmtDate(payout.requestedAt)}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{fmtDate(payout.createdAt)}</p>
                      </div>
                      <div className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2.5">
                        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Amount</p>
                        <p className="text-xs font-semibold">{fmt(payout.amount)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {payout.transferFee != null && (
                            <p className="text-[10px] text-[var(--color-warning)]">Fee: {fmt(payout.transferFee)}</p>
                          )}
                          {payout.netAmount != null && (
                            <p className="text-[10px] text-[var(--color-success)]">Net: {fmt(payout.netAmount)}</p>
                          )}
                        </div>
                      </div>
                      <div className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-2.5">
                        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Destination</p>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                          {payout.destination?.type === 'mobile_money'
                            ? <Smartphone className="w-3 h-3 shrink-0" />
                            : <Building2 className="w-3 h-3 shrink-0" />
                          }
                          <span className="truncate">{destLabel(payout.destination)}</span>
                        </div>
                      </div>
                      <div className={`border p-2.5 ${statusBgClass(payout.status)}`}>
                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ opacity: 0.8 }}>Status</p>
                        <p className="text-xs font-semibold">{statusLabel(payout.status)}</p>
                        {payout.rejectionReason && payout.status === 'rejected' && (
                          <p className="text-[10px] mt-1" style={{ opacity: 0.8 }}>{payout.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                  </CardBody>

                  <CardFooter className="px-3 py-3">
                    <ActionCell
                      payout={payout}
                      autoMode={!!isAutoMode}
                      paystackConfigured={psConfigured}
                      loading={actionLoading === payout._id}
                      onApprove={(p) => openConfirm('approve', p)}
                      onProcess={(p) => openConfirm('process', p)}
                      onMarkPaid={(p) => openConfirm('markPaid', p)}
                      onReject={(p) => openConfirm('reject', p)}
                    />
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="hidden sm:block">
              <Table className="min-w-[760px]" variant="simple" size="md">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Requested</TableHeaderCell>
                    <TableHeaderCell>Agent</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Destination</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell className="text-right">Actions</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout) => (
                    <PayoutRow
                      key={payout._id}
                      payout={payout}
                      autoMode={!!isAutoMode}
                      paystackConfigured={psConfigured}
                      loading={actionLoading === payout._id}
                      onApprove={(p) => openConfirm('approve', p)}
                      onProcess={(p) => openConfirm('process', p)}
                      onMarkPaid={(p) => openConfirm('markPaid', p)}
                      onReject={(p) => openConfirm('reject', p)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {pagination.pages > 1 && !loading && (
          <div className="px-4 py-3 border-t border-[var(--color-border)]">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              totalItems={pagination.total}
              itemsPerPage={pagination.limit}
              onPageChange={(page) => {
                setPagination(p => ({ ...p, page }));
                void fetchPayouts(page);
              }}
            />
          </div>
        )}
      </div>

      <Dialog isOpen={confirm.open} onClose={closeConfirm} size="sm">
        <DialogHeader>{confirmContent.title}</DialogHeader>
        <DialogBody>{confirmContent.body}</DialogBody>
        <DialogFooter>
          <div className="flex gap-2 justify-end w-full">
            <Button variant="secondary" onClick={closeConfirm} disabled={!!actionLoading}>
              Cancel
            </Button>
            <Button
              variant={confirmContent.variant}
              isLoading={!!actionLoading}
              onClick={async () => {
                const p = confirm.payout;
                if (!p) return;
                switch (confirm.type) {
                  case 'approve': await handleApprove(p); break;
                  case 'process': await handleProcess(p); break;
                  case 'markPaid': await handleMarkPaid(p, confirmInput || undefined); break;
                  case 'reject': await handleReject(p, confirmInput || undefined); break;
                }
              }}
            >
              {confirmContent.confirmLabel}
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
