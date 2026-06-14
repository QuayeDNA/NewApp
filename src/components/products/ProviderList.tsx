/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/products/ProviderList.tsx
import React, { useEffect, useState } from 'react';
import { useProvider } from '../../hooks/use-provider';
import { useAuth } from '../../hooks/use-auth';
import { ProviderFormModal } from './ProviderFormModal';
import { SearchAndFilter } from '../common';
import type { Provider } from '../../types/package';
import type { ProviderFormData } from './ProviderFormModal';
import { FaPlus, FaEdit, FaTrash, FaUndo, FaEllipsisV, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export const ProviderList: React.FC = () => {
  const {
    providers,
    loading,
    error,
    pagination,
    filters,
    fetchProviders,
    createProvider,
    updateProvider,
    deleteProvider,
    restoreProvider,
    setFilters
  } = useProvider();

  const { authState } = useAuth();
  const isSuperAdmin = authState.user?.userType === 'super_admin';

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, search: searchTerm };
    setFilters(newFilters);
    fetchProviders(newFilters);
  };

  const handleFilterChange = (_filterKey: string, _value: string) => {
    // Provider list doesn't have additional filters yet
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    const newFilters = { ...filters, search: '' };
    setFilters(newFilters);
    fetchProviders(newFilters);
  };

  const handleModalSubmit = async (data: ProviderFormData) => {
    // Remove empty string from code if present
    const providerData: Partial<Provider> = {
      ...data,
      code: data.code === '' ? undefined : data.code
    };
  
    if (modalMode === 'create') {
      await createProvider(providerData);
    } else if (selectedProvider?._id) {
      await updateProvider(selectedProvider._id, providerData);
    }
  };

  const handleCreateNew = () => {
    setModalMode('create');
    setSelectedProvider(null);
    setShowModal(true);
  };

  const handleEdit = (provider: Provider) => {
    setModalMode('edit');
    setSelectedProvider(provider);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      await deleteProvider(id);
    }
  };

  const handleRestore = async (id: string) => {
    if (window.confirm('Are you sure you want to restore this provider?')) {
      await restoreProvider(id);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    await updateProvider(id, { isActive: !currentStatus });
  };

  const handlePageChange = (page: number) => {
    fetchProviders(filters, { page });
  };

  if (error) {
    return (
      <div className="p-6 bg-[var(--color-error)]/10 border border-[var(--color-error)]/30">
        <p className="text-[var(--color-error)]">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Network Providers</h1>

        {isSuperAdmin && (
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-info)] text-white hover:bg-[var(--color-info)]/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-info)]"
          >
            <FaPlus className="text-sm" />
            Add Provider
          </button>
        )}
      </div>

      {/* Search */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search providers..."
        enableAutoSearch={true}
        debounceDelay={500}
        filters={{}}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClearFilters={handleClearFilters}
        isLoading={loading}
      />

      {/* Provider Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={`loading-${index}`} className="bg-[var(--color-surface)] shadow-[var(--shadow-md)] p-6 animate-pulse">
              <div className="w-16 h-16 bg-[var(--color-surface-alt)] mb-4"></div>
              <div className="h-6 bg-[var(--color-surface-alt)] w-3/4 mb-2"></div>
              <div className="h-4 bg-[var(--color-surface-alt)] w-1/2"></div>
            </div>
          ))}
        </div>
      ) : !providers || providers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-[var(--color-text-muted)] text-6xl mb-4">📱</div>
          <h3 className="text-xl font-medium text-[var(--color-text-primary)] mb-2">No providers found</h3>
          <p className="text-[var(--color-text-muted)] mb-6">
            {isSuperAdmin 
              ? "Get started by adding your first network provider" 
              : "No network providers are currently available"
            }
          </p>
          {isSuperAdmin && (
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-info)] text-white hover:bg-[var(--color-info)]/80"
            >
              <FaPlus className="text-sm" />
              Add Provider
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider._id}
              className={`bg-[var(--color-surface)] shadow-[var(--shadow-md)] overflow-hidden ${
                provider.isDeleted ? 'opacity-60' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {provider.logo ? (
                    <img
                      src={provider.logo.url}
                      alt={provider.logo.alt ?? provider.name}
                      className="w-16 h-16 object-contain bg-[var(--color-surface-alt)]"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] text-2xl font-bold">
                      {provider.name.charAt(0)}
                    </div>
                  )}
                  
                  <div className="relative">
                    <button
                      className="p-2 hover:bg-[var(--color-surface-alt)]"
                      aria-label="More options"
                    >
                      <FaEllipsisV className="text-[var(--color-text-muted)]" />
                    </button>
                    {/* Dropdown menu can be added here */}
                  </div>
                </div>

                <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-1">{provider.name}</h3>
                {provider.description && (
                  <p className="text-[var(--color-text-muted)] text-sm mb-3">{provider.description}</p>
                )}

                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium ${
                      provider.isActive
                        ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                        : 'bg-[var(--color-amber)]/10 text-[var(--color-amber)]'
                    }`}
                  >
                    {provider.isActive ? 'Active' : 'Inactive'}
                  </span>

                  <div className="flex gap-2">
                    {isSuperAdmin && (
                      <>
                        <button
                          onClick={() => handleToggleStatus(provider._id ?? '', provider.isActive)}
                          className={`p-2 ${
                            provider.isActive
                              ? 'text-[var(--color-amber)] hover:bg-[var(--color-amber)]/10'
                              : 'text-[var(--color-success)] hover:bg-[var(--color-success)]/10'
                          }`}
                          title={provider.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {provider.isActive ? <FaToggleOn /> : <FaToggleOff />}
                        </button>
                        
                        <button
                          onClick={() => handleEdit(provider)}
                          className="p-2 text-[var(--color-info)] hover:bg-[var(--color-info)]/10"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        
                        {provider.isDeleted ? (
                          <button
                            onClick={() => handleRestore(provider._id ?? '')}
                            className="p-2 text-[var(--color-success)] hover:bg-[var(--color-success)]/10"
                            title="Restore"
                          >
                            <FaUndo />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleDelete(provider._id ?? '')}
                            className="p-2 text-[var(--color-error)] hover:bg-[var(--color-error)]/10"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
            disabled={pagination.page === 1}
            className={`px-3 py-1 border ${
              pagination.page === 1
                ? 'text-[var(--color-text-muted)] cursor-not-allowed'
                : 'hover:bg-[var(--color-surface-alt)]'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: pagination.pages }, (_, index) => (
            <button
              key={`page-${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border ${
                pagination.page === index + 1
                  ? 'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/50'
                  : 'hover:bg-[var(--color-surface-alt)]'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(Math.min(pagination.pages, pagination.page + 1))}
            disabled={pagination.page === pagination.pages}
            className={`px-3 py-1 border ${
              pagination.page === pagination.pages
                ? 'text-[var(--color-text-muted)] cursor-not-allowed'
                : 'hover:bg-[var(--color-surface-alt)]'
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Provider Modal */}
      <ProviderFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
        provider={selectedProvider}
        mode={modalMode}
        loading={loading}
      />
    </div>
  );
};
