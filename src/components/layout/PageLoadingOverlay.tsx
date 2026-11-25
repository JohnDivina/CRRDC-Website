"use client";

import { useEffect, useState } from "react";

export default function PageLoadingOverlay() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fade out overlay after DOM mount / ready
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 300);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className="page-loading-overlay" role="status" aria-label="Loading site">
      <div className="page-loading-content">
        <div className="page-loading-spinner">
          <img
            src="/icon.png"
            alt="CRRDC Logo"
            className="page-loading-logo"
            width={48}
            height={48}
          />
        </div>
        <span className="page-loading-brand">CLSU · CRRDC</span>
        <span className="page-loading-text">Research Innovation and Extension</span>
      </div>

      <style>{`
        .page-loading-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background-color: var(--color-primary-dark);
          color: var(--color-primary-fg);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fade-out 0.4s var(--ease-out) forwards 0.4s;
          pointer-events: none;
        }
        .page-loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          text-align: center;
        }
        .page-loading-spinner {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-full);
          background-color: oklch(from var(--color-primary-fg) l c h / 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 1.2s ease-in-out infinite;
        }
        .page-loading-logo {
          width: 48px;
          height: 48px;
          object-fit: contain;
          border-radius: var(--radius-full);
          filter: drop-shadow(0 2px 8px oklch(0% 0 0 / 0.3));
        }
        .page-loading-brand {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 700;
          color: var(--color-accent);
          letter-spacing: 0.05em;
        }
        .page-loading-text {
          font-size: var(--text-xs);
          color: oklch(from var(--color-primary-fg) l c h / 0.7);
          letter-spacing: 0.03em;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes fade-out {
          to { opacity: 0; visibility: hidden; }
        }
      `}</style>
    </div>
  );
}
