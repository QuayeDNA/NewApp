import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/50">
      <div className="bg-[var(--color-surface)] shadow-lg max-w-md w-full mx-2 p-6 relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] text-xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
}; 