import React from "react";
import { Edit, Trash2, Send, BarChart3 } from "lucide-react";
import { Button } from "../../../design-system/components/button";
import type { Announcement } from "../../../types/announcement";
import { statusColor, priorityColor } from "./badge-helpers";

interface Props {
  announcements: Announcement[];
  loading: boolean;
  onViewStats: (a: Announcement) => void;
  onEdit: (a: Announcement) => void;
  onBroadcast: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AnnouncementTable: React.FC<Props> = ({
  announcements,
  loading,
  onViewStats,
  onEdit,
  onBroadcast,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="p-6 text-center text-[var(--color-text-muted)]">Loading...</div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="p-6 text-center text-[var(--color-text-muted)]">No announcements found</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[var(--color-border)]">
        <thead className="bg-[var(--color-surface-alt)]">
          <tr>
            {["Title", "Type", "Priority", "Status", "Target", "Actions"].map(
              (h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
          {announcements.map((a) => (
            <tr key={a._id} className="hover:bg-[var(--color-surface-alt)]">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-[var(--color-text-primary)]">
                  {a.title}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] truncate max-w-xs">
                  {a.message}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[var(--color-info)]/10 text-[var(--color-info)]">
                  {a.type}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColor(a.priority)}`}>
                  {a.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor(a.status)}`}>
                  {a.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {Array.isArray(a.targetAudience) && a.targetAudience.length > 0
                    ? a.targetAudience.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs font-medium rounded-full bg-[rgba(245, 158, 11, 0.12)] text-[var(--color-amber)]"
                        >
                          {t.replace("_", " ")}
                        </span>
                      ))
                    : null}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onViewStats(a)} title="View Stats">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(a)} title="Edit">
                    <Edit className="w-4 h-4" />
                  </Button>
                  {a.status === "active" && (
                    <Button variant="ghost" size="sm" onClick={() => onBroadcast(a._id)} title="Broadcast">
                      <Send className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => onDelete(a._id)} title="Delete">
                    <Trash2 className="w-4 h-4 text-[var(--color-error)]" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
