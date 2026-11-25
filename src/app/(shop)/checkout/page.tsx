// app/(public)/checkout/page.tsx — Checkout Page
import type { Metadata } from "next";
import CheckoutView from "./CheckoutView";

export const metadata: Metadata = {
  title: "Order Checkout & Slip | CRRDC — CLSU",
  description: "Complete your order details to generate your Order Slip for payment at the CLSU Cashier's Office and pickup at CRRDC.",
};

export default function CheckoutPage() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">
          No online payment needed. Fill in your details to get your Order Slip.
        </p>
      </header>

      <CheckoutView />

      <style>{`
        .page-container {
          max-width: var(--container-max);
          margin-inline: auto;
          padding: var(--space-8) var(--gutter);
        }
        .page-header {
          margin-bottom: var(--space-5);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: var(--space-4);
        }
        .page-title {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          color: var(--color-ink);
          margin: 0 0 var(--space-1);
        }
        .page-subtitle {
          font-size: var(--text-sm);
          color: var(--color-ink-2);
          margin: 0;
        }
        @media (max-width: 640px) {
          .page-container {
            padding: var(--space-5) var(--gutter) var(--space-12);
          }
        }
      `}</style>
    </div>
  );
}
