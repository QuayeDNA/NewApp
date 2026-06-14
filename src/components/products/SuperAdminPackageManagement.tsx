/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { usePackage } from '../../hooks/use-package';
import { PackageFormModal } from './PackageFormModal';
import { packageService } from '../../services/package.service';
import { useNavigate } from 'react-router-dom';
import type { Package } from '../../types/package';

export const SuperAdminPackageManagement: React.FC = () => {
  // State for modals and selected package
  const [showFormModal, setShowFormModal] = useState(false);
  const [editPackage, setEditPackage] = useState<Package | null>(null);
  const [deletePackage, setDeletePackage] = useState<Package | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const {
    packages,
    loading,
    error,
    fetchPackages,
    pagination
  } = usePackage();

  const navigate = useNavigate();

  // Handle create or update
  const handleFormSubmit = async (data: any) => {
    setActionLoading(true);
    setActionError(null);
    try {
      if (editPackage?._id) {
        await packageService.updatePackage(editPackage._id, data);
      } else {
        await packageService.createPackage(data);
      }
      setShowFormModal(false);
      setEditPackage(null);
      fetchPackages(undefined, { page: pagination.page, limit: pagination.limit });
    } catch (err: any) {
      setActionError(err?.message || 'Failed to save package');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!deletePackage?._id) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await packageService.deletePackage(deletePackage._id);
      setShowDeleteModal(false);
      setDeletePackage(null);
      fetchPackages(undefined, { page: pagination.page, limit: pagination.limit });
    } catch (err: any) {
      setActionError(err?.message || 'Failed to delete package');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchPackages(undefined, { page, limit: pagination.limit });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Package Management</h2>
          <p className="text-[var(--color-text-secondary)]">Create, update, and manage all packages</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center px-4 py-2 bg-[var(--color-info)] text-white hover:bg-[var(--color-info)]/80 transition-colors"
            onClick={() => { setEditPackage(null); setShowFormModal(true); }}
          >
            <FaPlus className="mr-2" />
            Create Package
          </button>
        </div>
      </div>

      {/* Error/Loading States */}
      {actionError && <div className="text-[var(--color-error)] text-sm mb-2">{actionError}</div>}
      {(loading || actionLoading) && <div className="text-[var(--color-text-muted)] text-sm mb-2">Loading...</div>}
      {error && <div className="text-[var(--color-error)] text-sm mb-2">{error}</div>}

      {/* Table Card */}
      <div className="bg-[var(--color-surface)] shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[var(--color-surface-alt)]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Active</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-[var(--color-surface)] divide-y divide-[var(--color-border)]">
              {(packages || []).map(pkg => (
                <tr key={pkg._id} className="hover:bg-[var(--color-surface-alt)]">
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pkg.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pkg.isActive ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]' : 'bg-[var(--color-error)]/10 text-[var(--color-error)]'}`}>{pkg.isActive ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-[var(--color-text-muted)]">{pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button className="text-[var(--color-info)] hover:text-[var(--color-info)]" onClick={() => { setEditPackage(pkg); setShowFormModal(true); }}><FaEdit /></button>
                    <button className="text-[var(--color-error)] hover:text-[var(--color-error)]" onClick={() => { setDeletePackage(pkg); setShowDeleteModal(true); }}><FaTrash /></button>
                    <button className="text-[var(--color-success)] hover:text-[var(--color-success)]" onClick={() => navigate(`/superadmin/packages/${pkg._id}/bundles`)}>View All Bundles</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-[var(--color-surface)] px-4 py-3 border-t border-[var(--color-border)] sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  className="relative inline-flex items-center px-4 py-2 border border-[var(--color-border-strong)] text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-[var(--color-border-strong)] text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Showing <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-medium">{pagination.total}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex shadow-[var(--shadow-sm)] -space-x-px">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="relative inline-flex items-center px-2 py-2 border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                      className="relative inline-flex items-center px-2 py-2 border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <PackageFormModal
        open={showFormModal}
        onClose={() => { setShowFormModal(false); setEditPackage(null); }}
        onSubmit={handleFormSubmit}
        initialData={editPackage}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/40">
          <div className="bg-[var(--color-surface)] shadow-[var(--shadow-lg)] w-full max-w-md p-6 relative">
            <h2 className="text-lg font-bold mb-4">Delete Package</h2>
            <p>Are you sure you want to delete <span className="font-semibold">{deletePackage?.name}</span>?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                onClick={() => { setShowDeleteModal(false); setDeletePackage(null); }}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/80"
                onClick={handleDelete}
                disabled={actionLoading}
              >
                {actionLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 