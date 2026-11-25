// app/(public)/how-ordering-works/page.tsx — "How Ordering Works" Guide
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Sprout, Receipt, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "How Ordering Works | CRRDC — CLSU Agricultural Products",
  description: "Check live CRRDC laboratory stock online, generate your Order Slip, pay at the CLSU Cashier's Office, and claim your items at the laboratory with your Official Receipt (OR).",
};

const STEPS = [
  {
    number: 1,
    title: "Check Live Stock Online",
    description:
      "Browse BPI-certified seeds, milled rice, seedlings, and agricultural inputs with real-time laboratory stock availability—no need to visit the lab first just to ask for stocks.",
    icon: Sprout,
  },
  {
    number: 2,
    title: "Add to Cart & State Purpose",
    description:
      "Select your quantities per kg, 25-kg sack, or packet, then enter your name and order purpose at checkout to generate your Order Slip.",
    icon: ShoppingBag,
  },
  {
    number: 3,
    title: "Pay at the CLSU Cashier's Office",
    description:
      "Bring your Order Slip (phone screen or PDF) directly to the CLSU Cashier's Office to pay in cash and receive your Official Receipt (OR).",
    icon: Receipt,
  },
  {
    number: 4,
    title: "Show OR & Claim at CRRDC Lab",
    description:
      "Present your Official Receipt (OR) and Order ID at the CRRDC Laboratory. Staff will log your OR number and release your products.",
    icon: Building2,
  },
];

export default function HowOrderingWorksPage() {
  return (
    <main className="how-ordering-page">
      <div className="how-ordering-container">
        {/* Page Title */}
        <header className="page-header">
          <h1 className="page-title">How Ordering Works</h1>
        </header>

        {/* 4 Steps Grid */}
        <section className="steps-container" aria-label="Step by step ordering instructions">
          <div className="steps-grid">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="step-card">
                  <div className="step-header">
                    <div className="step-number-badge" aria-label={`Step ${step.number}`}>
                      <span>{step.number}</span>
                    </div>
                    <div className="step-icon-wrap" aria-hidden="true">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h2 className="step-title">{step.title}</h2>
                  <p className="step-description">{step.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Action Callout */}
        <div className="cta-wrapper">
          <Link href="/shop" className="cta-btn">
            <span>Browse Products</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <style>{`
        .how-ordering-page {
          width: 100%;
          min-height: calc(100vh - 68px);
          min-height: calc(100dvh - 68px);
          background-color: var(--color-paper-2);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: clamp(48px, 6vh, 64px) clamp(20px, 3.5vw, 56px);
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .how-ordering-container {
          width: 100%;
          max-width: min(94vw, 1380px);
          margin-inline: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ── Header ── */
        .page-header {
          text-align: center;
          margin-bottom: clamp(40px, 5vh, 56px);
        }

        .page-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.2vw, 3rem);
          color: var(--color-primary-dark);
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.15;
        }

        /* ── Steps Grid ── */
        .steps-container {
          width: 100%;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 2vw, 32px);
          width: 100%;
          align-items: stretch;
        }

        /* Tablet (640px to 1023px): 2x2 Grid */
        @media (max-width: 1023px) and (min-width: 640px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        /* Mobile (< 640px): Full-Width Stack */
        @media (max-width: 639px) {
          .how-ordering-page {
            justify-content: flex-start;
            padding: 36px 16px 48px;
            min-height: auto;
          }

          .page-header {
            margin-bottom: 32px;
          }

          .page-title {
            font-size: clamp(1.85rem, 6vw, 2.25rem);
          }

          .steps-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .cta-wrapper {
            margin-top: 32px;
            margin-bottom: 16px;
          }
        }

        /* ── Step Card ── */
        .step-card {
          background-color: var(--color-paper);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl, 16px);
          padding: clamp(28px, 3.2vh, 36px) clamp(24px, 2vw, 32px);
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 2px 8px oklch(0% 0 0 / 0.04);
          box-sizing: border-box;
          transition: border-color var(--dur-fast) var(--ease-out),
                      box-shadow var(--dur-fast) var(--ease-out);
        }

        .step-card:hover {
          border-color: var(--color-border-strong);
          box-shadow: 0 6px 20px oklch(0% 0 0 / 0.08);
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .step-number-badge {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: var(--radius-full);
          background-color: var(--color-primary-dark);
          color: #facc15;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px oklch(0% 0 0 / 0.15);
        }

        .step-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background-color: oklch(from var(--color-primary) l c h / 0.1);
          color: var(--color-primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 1.3vw, 1.45rem);
          font-weight: 700;
          color: var(--color-heading);
          margin: 0 0 16px;
          line-height: 1.25;
          letter-spacing: -0.015em;
        }

        .step-description {
          font-size: clamp(1rem, 1.05vw, 1.125rem);
          color: var(--color-ink-2);
          line-height: 1.55;
          margin: 0;
          flex-grow: 1;
        }

        /* Mobile specific card adjustments */
        @media (max-width: 639px) {
          .step-card {
            padding: 22px 20px;
            border-radius: var(--radius-lg, 12px);
          }

          .step-header {
            margin-bottom: 16px;
          }

          .step-number-badge {
            width: 40px;
            height: 40px;
            min-width: 40px;
            font-size: 1.15rem;
          }

          .step-icon-wrap {
            width: 34px;
            height: 34px;
          }

          .step-title {
            font-size: clamp(1.15rem, 4.5vw, 1.3rem);
            margin-bottom: 12px;
          }

          .step-description {
            font-size: clamp(1rem, 3.8vw, 1.08rem);
            line-height: 1.5;
          }
        }

        /* ── Action Button ── */
        .cta-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: clamp(40px, 5vh, 56px);
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 50px;
          padding: 0 34px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-primary-dark);
          background-color: var(--color-primary-dark);
          color: var(--color-primary-fg);
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          box-shadow: 0 2px 10px oklch(0% 0 0 / 0.14);
          transition: background-color 160ms ease,
                      border-color 160ms ease,
                      color 160ms ease;
        }

        .cta-btn:hover,
        .cta-btn:focus-visible {
          background-color: #d89700 !important;
          border-color: #d89700 !important;
          color: var(--color-primary-dark) !important;
          transform: none !important;
        }
      `}</style>
    </main>
  );
}
