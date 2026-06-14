// src/components/orders/OrderProcessingDialog.tsx
import React, { useState, useMemo } from "react";
import { Dialog } from "../../design-system";
import {
  FaCopy,
  FaSpinner,
  FaCheck,
  FaClock,
} from "react-icons/fa";
import type { Order } from "../../types/order";

interface OrderProcessingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  orderType: "afa" | "data";
  onProcess: (
    orders: Order[],
    orderType: "afa" | "data",
    batchSize: number,
    statusUpdate: "none" | "processing" | "completed",
    copyOnly: boolean
  ) => Promise<void>;
  isProcessing?: boolean;
}

// Helper functions for formatting
const extractGhanaCardFromNotes = (notes: string | undefined) => {
  if (!notes) return null;
  const match = notes.match(/Ghana Card:\s*([A-Z0-9-]+)/i);
  return match ? match[1] : null;
};

const formatAFAOrder = (order: Order) => {
  const phone =
    order.customerInfo?.phone || order.items[0]?.customerPhone || "N/A";
  const name = order.customerInfo?.name || "N/A";
  const ghanaCard = extractGhanaCardFromNotes(order.notes) || "N/A";
  const price = order.total.toFixed(2);

  return `${phone} | ${name} | ${ghanaCard} | ${price}`;
};

const formatDataOrder = (order: Order) => {
  const phone =
    order.customerInfo?.phone || order.items[0]?.customerPhone || "N/A";
  const dataVolumeRaw =
    order.items[0]?.packageDetails?.dataVolume || "0";
  const dataVolumeNumber = dataVolumeRaw.toString().replace(/[^\d.]/g, "");

  return `${phone} ${dataVolumeNumber}`;
};

export const OrderProcessingDialog: React.FC<OrderProcessingDialogProps> = ({
  isOpen,
  onClose,
  orders,
  orderType,
  onProcess,
  isProcessing = false,
}) => {
  const [batchSize, setBatchSize] = useState(10);
  const [statusUpdate, setStatusUpdate] = useState<"none" | "processing" | "completed">("processing");

  // Format preview
  const formattedPreview = useMemo(() => {
    if (orderType === "afa") {
      return orders.slice(0, 3).map(formatAFAOrder).join("\n");
    } else {
      return orders.slice(0, 3).map(formatDataOrder).join("\n");
    }
  }, [orders, orderType]);

  const handleCopyOnly = async () => {
    await onProcess(orders, orderType, batchSize, statusUpdate, true);
  };

  const handleCopyAndProcess = async () => {
    await onProcess(orders, orderType, batchSize, statusUpdate, false);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-info)]/10 flex items-center justify-center">
            <FaCopy className="text-[var(--color-info)] text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Process {orderType === "afa" ? "AFA" : "Data"} Orders
            </h3>
            <p className="text-sm text-gray-600">
              Selected: {orders.length} {orderType.toUpperCase()} orders
            </p>
          </div>
        </div>

        {/* Copy Format Preview */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Copy Format Preview:
          </label>
          <div className="bg-[var(--color-surface-alt)] border border-[var(--color-border)] p-3 max-h-40 overflow-y-auto">
            <pre className="text-xs font-mono text-[var(--color-text-secondary)] whitespace-pre-wrap">
              {formattedPreview}
              {orders.length > 3 &&
                `\n... and ${orders.length - 3} more`}
            </pre>
          </div>
        </div>

        {/* Status Update Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            Update Status After Copy:
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="statusUpdate"
                value="none"
                checked={statusUpdate === "none"}
                onChange={(e) =>
                  setStatusUpdate(
                    e.target.value as "none" | "processing" | "completed"
                  )
                }
                className="text-[var(--color-info)] focus:ring-[var(--color-info)]"
              />
              <span className="text-sm text-[var(--color-text-secondary)]">Don't update status</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="statusUpdate"
                value="processing"
                checked={statusUpdate === "processing"}
                onChange={(e) =>
                  setStatusUpdate(
                    e.target.value as "none" | "processing" | "completed"
                  )
                }
                className="text-[var(--color-info)] focus:ring-[var(--color-info)]"
              />
              <span className="text-sm text-[var(--color-text-secondary)]">Mark as Processing</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="statusUpdate"
                value="completed"
                checked={statusUpdate === "completed"}
                onChange={(e) =>
                  setStatusUpdate(
                    e.target.value as "none" | "processing" | "completed"
                  )
                }
                className="text-[var(--color-info)] focus:ring-[var(--color-info)]"
              />
              <span className="text-sm text-[var(--color-text-secondary)]">Mark as Completed</span>
            </label>
          </div>
        </div>

        {/* Batch Size */}
        {statusUpdate !== "none" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
              Batch Size: {batchSize} orders at a time
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={batchSize}
              onChange={(e) => setBatchSize(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Smaller batches work better on slow networks
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCopyOnly}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-[var(--color-info)] text-white hover:bg-[var(--color-info)]/80 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" />
                Processing...
              </span>
            ) : (
              "Copy Only"
            )}
          </button>
          <button
            onClick={handleCopyAndProcess}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-[var(--color-success)] text-white hover:bg-[var(--color-success)]/80 transition-colors disabled:opacity-50"
          >
            Copy & Process
          </button>
        </div>
      </div>
    </Dialog>
  );
};

// Progress Dialog Component
interface ProgressDialogProps {
  isOpen: boolean;
  current: number;
  total: number;
  currentBatch: number;
  totalBatches: number;
  batchSize: number;
}

export const ProgressDialog: React.FC<ProgressDialogProps> = ({
  isOpen,
  current,
  total,
  currentBatch,
  totalBatches,
  batchSize,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={() => {}} size="md">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-info)]/10 flex items-center justify-center">
            <FaSpinner className="text-[var(--color-info)] text-lg animate-spin" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Processing Orders...
            </h3>
            <p className="text-sm text-gray-600">Updating order status...</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[var(--color-text-secondary)] mb-2">
            <span>
              Progress: {current}/{total} orders
            </span>
            <span>{Math.round((current / total) * 100)}%</span>
          </div>
          <div className="w-full bg-[var(--color-surface-alt)] h-3 overflow-hidden">
            <div
              className="bg-[var(--color-info)] h-full transition-all duration-300 ease-out"
              style={{
                width: `${(current / total) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Batch Progress */}
        <div className="space-y-2 text-sm">
          {Array.from({ length: totalBatches }).map((_, index) => {
            const batchNum = index + 1;
            const isComplete = batchNum < currentBatch;
            const isCurrent = batchNum === currentBatch;
            const isPending = batchNum > currentBatch;

            return (
              <div
                key={index}
                className={`flex items-center gap-2 p-2 rounded ${
                  isComplete
                    ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                    : isCurrent
                    ? "bg-[var(--color-info)]/10 text-[var(--color-info)]"
                    : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]"
                }`}
              >
                {isComplete && <FaCheck className="text-[var(--color-success)]" />}
                {isCurrent && (
                  <FaSpinner className="text-[var(--color-info)] animate-spin" />
                )}
                {isPending && <FaClock className="text-gray-400" />}
                <span>
                  Batch {batchNum} ({batchSize} orders) -{" "}
                  {isComplete
                    ? "Complete"
                    : isCurrent
                    ? "Processing..."
                    : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Dialog>
  );
};
