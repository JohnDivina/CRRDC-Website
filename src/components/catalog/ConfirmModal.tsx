"use client";

// components/catalog/ConfirmModal.tsx — Accessible confirmation alert dialog for destructive actions
import { useEffect, useRef } from "react";
import ModalWrapper from "./ModalWrapper";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Clear Cart",
  cancelLabel = "Cancel",
  triggerRef,
}: ConfirmModalProps) {
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);
  const prevFocusedElementRef = useRef<HTMLElement | null>(null);

  // Accessibility focus management: focus "Cancel" on open, restore focus to trigger button on close
  useEffect(() => {
    if (isOpen) {
      prevFocusedElementRef.current = (document.activeElement as HTMLElement) || triggerRef?.current || null;
      const timer = setTimeout(() => {
        cancelBtnRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      if (triggerRef?.current) {
        triggerRef.current.focus();
      } else if (prevFocusedElementRef.current) {
        prevFocusedElementRef.current.focus();
      }
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="min(92vw, 420px)"
      role="alertdialog"
      ariaLabelledBy="confirm-dialog-title"
      ariaDescribedBy="confirm-dialog-message"
      zIndex={100005}
    >
      <div className="confirm-modal-inner">
        <div className="confirm-modal-body">
          <h2 id="confirm-dialog-title" className="confirm-title">
            {title}
          </h2>
          <p id="confirm-dialog-message" className="confirm-message">
            {message}
          </p>
        </div>

        <div className="confirm-modal-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="confirm-btn confirm-btn--cancel"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="confirm-btn confirm-btn--danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>

      <style jsx>{`
        .confirm-modal-inner {
          display: flex;
          flex-direction: column;
          padding: 24px;
          gap: 20px;
          box-sizing: border-box;
          background-color: var(--color-paper, #ffffff);
          border-radius: 16px;
        }

        .confirm-modal-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .confirm-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-heading, #0f172a);
          margin: 0;
          line-height: 1.3;
          letter-spacing: -0.015em;
        }

        .confirm-message {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--color-ink-2, #64748b);
          margin: 0;
          line-height: 1.5;
        }

        .confirm-modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 4px;
        }

        /* Base button styles matching system modals */
        .confirm-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 10px 20px;
          border-radius: var(--radius-md, 12px);
          font-family: var(--font-body);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          border: 1px solid transparent;
          /* Color-only hover transition: no size/padding change */
          transition: background-color 160ms ease,
                      color 160ms ease,
                      border-color 160ms ease;
        }

        /* Secondary (Cancel) button */
        .confirm-btn--cancel {
          background-color: var(--color-paper-2, #f8fafc);
          border-color: var(--color-border, #e2e8f0);
          color: var(--color-ink, #0f172a);
        }
        .confirm-btn--cancel:hover,
        .confirm-btn--cancel:focus-visible {
          background-color: #d89700 !important;
          border-color: #d89700 !important;
          color: var(--color-primary-dark, #14532d) !important;
          transform: none !important;
        }

        /* Primary (Clear Cart) button */
        .confirm-btn--danger {
          background-color: var(--color-primary-dark, #14532d);
          border-color: var(--color-primary-dark, #14532d);
          color: var(--color-primary-fg, #ffffff);
          font-weight: 700;
        }
        .confirm-btn--danger:hover,
        .confirm-btn--danger:focus-visible {
          background-color: #d89700 !important;
          border-color: #d89700 !important;
          color: var(--color-primary-dark, #14532d) !important;
          transform: none !important;
        }

        .confirm-btn:focus-visible {
          outline: 2px solid var(--color-accent, #d89700);
          outline-offset: 2px;
        }

        @media (max-width: 480px) {
          .confirm-modal-inner {
            padding: 20px 18px;
            gap: 16px;
          }
          .confirm-modal-actions {
            flex-direction: column-reverse;
            gap: 10px;
          }
          .confirm-btn {
            width: 100%;
            min-height: 44px;
          }
        }
      `}</style>
    </ModalWrapper>
  );
}
