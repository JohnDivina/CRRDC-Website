"use client";

// components/catalog/ModalWrapper.tsx — Shared Viewport-Centered Modal Portal with Scroll Lock
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  role?: "dialog" | "alertdialog";
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  zIndex?: number;
  className?: string;
}

// Global modal counter for nested/sequential modals to reliably lock/restore body scroll
let activeModalsCount = 0;
// Global modal stack for LIFO Escape key dismissal
const modalEscapeStack: Array<() => void> = [];

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape" && modalEscapeStack.length > 0) {
      e.stopPropagation();
      const topClose = modalEscapeStack[modalEscapeStack.length - 1];
      if (topClose) topClose();
    }
  });
}

export default function ModalWrapper({
  isOpen,
  onClose,
  children,
  maxWidth = "min(92vw, 520px)",
  role = "dialog",
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  zIndex = 99999,
  className = "",
}: ModalWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background body scroll while modal is open, and always restore when all modals close
  useEffect(() => {
    if (!isOpen) return;

    activeModalsCount++;
    document.body.style.overflow = "hidden";

    return () => {
      activeModalsCount = Math.max(0, activeModalsCount - 1);
      if (activeModalsCount === 0) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen]);

  // Register in Escape stack
  useEffect(() => {
    if (!isOpen) return;

    modalEscapeStack.push(onClose);
    return () => {
      const idx = modalEscapeStack.lastIndexOf(onClose);
      if (idx !== -1) {
        modalEscapeStack.splice(idx, 1);
      }
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="modal-portal-overlay"
      onClick={onClose}
      aria-hidden={!isOpen}
      style={{ zIndex }}
    >
      <div
        className={`modal-portal-panel ${className}`}
        onClick={(e) => e.stopPropagation()}
        role={role}
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        style={{ maxWidth }}
      >
        {children}
      </div>

      <style jsx>{`
        .modal-portal-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: oklch(from var(--color-ink) l c h / 0.5);
          backdrop-filter: blur(2px);
          padding: 16px;
          box-sizing: border-box;
          animation: modalOverlayFadeIn 180ms ease-out;
        }

        @keyframes modalOverlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-portal-panel {
          position: relative;
          width: 100%;
          max-height: 85vh;
          max-height: 85dvh;
          background-color: var(--color-paper, #ffffff);
          border-radius: 16px;
          border: 1px solid var(--color-border, #e2e8f0);
          box-shadow: 0 20px 60px oklch(0% 0 0 / 0.35);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          box-sizing: border-box;
          animation: modalPanelScaleIn 180ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPanelScaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
