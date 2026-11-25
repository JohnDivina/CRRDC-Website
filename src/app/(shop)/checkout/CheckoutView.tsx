"use client";

// app/(public)/checkout/CheckoutView.tsx — Interactive Checkout Component with Phase 2 Order Types & Red Payment Notice
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/components/layout/LanguageContext";
import { formatPHP, breakdownRiceQty, type OrderType } from "@/types";
import { AlertCircle, ArrowLeft, ShieldAlert, CheckCircle2, Calendar, Building, FileText, User, ArrowRight } from "lucide-react";

export default function CheckoutView() {
  const router = useRouter();
  const { items, totalPHP, clearCart } = useCart();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Customer Form State
  const [customerName, setCustomerName] = useState("");
  const [checkoutMode, setCheckoutMode] = useState<"reserve" | "ipt" | "other">("reserve");
  const [iptSubType, setIptSubType] = useState<"institutional" | "project" | "complimentary">("institutional");
  const [customerOrg, setCustomerOrg] = useState("");
  const [purpose, setPurpose] = useState("");
  const [preferredPickupDate, setPreferredPickupDate] = useState("");
  const [requestionerName, setRequestionerName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [projectTitle, setProjectTitle] = useState("");

  // Ensure body scroll is never left locked after navigating from a modal
  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);

  const orderType: OrderType = checkoutMode === "ipt" ? iptSubType : "regular";

  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Your cart is empty. Please add products before checking out.</p>
        <Link href="/catalog" className="btn-link">
          Browse Catalog
        </Link>
        <style>{`
          .checkout-empty { text-align: center; padding: var(--space-12); }
          .btn-link { display: inline-block; margin-top: var(--space-4); color: var(--color-primary); font-weight: 600; }
        `}</style>
      </div>
    );
  }

  const handleSubmitOrder = async () => {
    if (!customerName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (checkoutMode === "other" && !purpose.trim()) {
      setError("Please specify your purpose for this order.");
      return;
    }

    const resolvedPurpose =
      checkoutMode === "reserve"
        ? "Reserve"
        : checkoutMode === "ipt"
        ? purpose.trim() ||
          (iptSubType === "institutional"
            ? "Institutional / Office Use"
            : iptSubType === "project"
            ? "Project-Based Order"
            : "Token / Giveaway")
        : purpose.trim();

    setLoading(true);
    setError(null);

    try {
      const orderPayload = {
        items: items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
        })),
        customerName: customerName.trim(),
        orderType,
        customerOrg: checkoutMode === "ipt" ? customerOrg.trim() || undefined : undefined,
        purpose: resolvedPurpose,
        preferredPickupDate: preferredPickupDate || undefined,
        requestionerName: checkoutMode === "ipt" && iptSubType === "project" ? requestionerName.trim() || undefined : undefined,
        projectCode: checkoutMode === "ipt" && iptSubType === "project" ? projectCode.trim() || undefined : undefined,
        projectTitle: checkoutMode === "ipt" && iptSubType === "project" ? projectTitle.trim() || undefined : undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Failed to submit order.");
      }

      const { orderId } = result.data;
      clearCart();

      // Redirect immediately to live Order Status & Receipt page
      router.push(`/checkout/order/${orderId}`);
    } catch (err: any) {
      console.error("Order Submit Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-view">
      {/* CONCISE 2-STEP MOBILE GUIDE */}
      <div className="flow-notice">
        <div className="flow-step">
          <span className="flow-num">1</span>
          <span>Pay at <strong>CLSU Cashier</strong> using your Order Slip.</span>
        </div>
        <div className="flow-step">
          <span className="flow-num">2</span>
          <span>Claim at <strong>CRRDC Lab</strong> with your Official Receipt (OR).</span>
        </div>
      </div>

      <div className="checkout-grid">
        {/* Left: Customer Details & Form */}
        <div className="checkout-main">
          <h2 className="checkout-section-title">1. Customer Information &amp; Order Purpose</h2>

          <div className="form-section">
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="req">*</span>
              </label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Juan Dela Cruz"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Order Purpose</label>
              <div className="order-type-pills order-type-pills--three">
                <button
                  type="button"
                  className="type-pill"
                  data-active={checkoutMode === "reserve"}
                  onClick={() => setCheckoutMode("reserve")}
                >
                  Reserve
                </button>
                <button
                  type="button"
                  className="type-pill"
                  data-active={checkoutMode === "ipt"}
                  onClick={() => setCheckoutMode("ipt")}
                >
                  Institutional / Project / Token
                </button>
                <button
                  type="button"
                  className="type-pill"
                  data-active={checkoutMode === "other"}
                  onClick={() => setCheckoutMode("other")}
                >
                  Other Purpose
                </button>
              </div>
            </div>

            {/* Dropdown Form: Institutional / Project / Token */}
            {checkoutMode === "ipt" && (
              <div className="conditional-box">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <div className="order-type-pills order-type-pills--three">
                    <button
                      type="button"
                      className="type-pill"
                      data-active={iptSubType === "institutional"}
                      onClick={() => setIptSubType("institutional")}
                    >
                      Institutional
                    </button>
                    <button
                      type="button"
                      className="type-pill"
                      data-active={iptSubType === "project"}
                      onClick={() => setIptSubType("project")}
                    >
                      Project
                    </button>
                    <button
                      type="button"
                      className="type-pill"
                      data-active={iptSubType === "complimentary"}
                      onClick={() => setIptSubType("complimentary")}
                    >
                      Token
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    {iptSubType === "complimentary"
                      ? "Recipient / Event Name"
                      : iptSubType === "project"
                      ? "Organization / Funding Agency"
                      : "Center / Office Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      iptSubType === "complimentary"
                        ? "e.g. RiceFest 2026 Delegates"
                        : iptSubType === "project"
                        ? "e.g. DOST-PCAARRD Project"
                        : "e.g. CLSU Crop Protection Center"
                    }
                    value={customerOrg}
                    onChange={(e) => setCustomerOrg(e.target.value)}
                    className="form-input"
                  />
                </div>

                {iptSubType === "project" && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Requisitioner Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Maria Santos"
                        value={requestionerName}
                        onChange={(e) => setRequestionerName(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Project Code</label>
                      <input
                        type="text"
                        placeholder="e.g. PRJ-2026-089"
                        value={projectCode}
                        onChange={(e) => setProjectCode(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Smart Agriculture Seed Improvement Program"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label">Details / Remarks (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Field trials, demonstration, or event token details"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            )}

            {/* Dropdown Form: Other Purpose */}
            {checkoutMode === "other" && (
              <div className="conditional-box">
                <div className="form-group">
                  <label className="form-label">
                    Specify Purpose <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <FileText size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Specify what this order is for (e.g. Research trial, Cooperative bulk order, Extension)"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Preferred Pickup Date (Optional)</label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input
                  type="date"
                  value={preferredPickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPreferredPickupDate(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          <h2 className="checkout-section-title" style={{ marginTop: "var(--space-8)" }}>
            2. Review Order Items
          </h2>
          <div className="checkout-items-list">
            {items.map(({ product, quantity }) => {
              const isRiceKg = product.unit_type === "kg";
              const riceBreakdown = isRiceKg ? breakdownRiceQty(quantity) : null;
              return (
                <div key={product.id} className="checkout-item-row">
                  <div>
                    <h3 className="item-title">{product.name}</h3>
                    <span className="item-qty">
                      Qty: {quantity} {isRiceKg ? "kg" : "unit(s)"}
                      {isRiceKg && riceBreakdown && riceBreakdown.sacks > 0
                        ? ` (${riceBreakdown.sacks} sack${riceBreakdown.sacks > 1 ? "s" : ""} ${riceBreakdown.looseKg > 0 ? `+ ${riceBreakdown.looseKg} kg` : ""})`
                        : ""}
                    </span>
                  </div>
                  <span className="item-price">{formatPHP(product.price_php * quantity)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Summary & Action */}
        <aside className="checkout-sidebar">
          <h2 className="checkout-sidebar-title">{t("orderSummary")}</h2>

          <div className="checkout-total-box">
            <span className="total-label">{t("totalAmount")}:</span>
            <span className="total-amount">
              {orderType === "complimentary" ? (
                <span className="free-tag">₱0.00 (Valued at {formatPHP(totalPHP)})</span>
              ) : (
                formatPHP(totalPHP)
              )}
            </span>
          </div>

          {error && (
            <div className="checkout-error">
              <AlertCircle size={16} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            className="submit-order-btn"
            disabled={loading}
            onClick={handleSubmitOrder}
          >
            {loading ? (
              <span>Generating Order Slip...</span>
            ) : (
              <>
                <span>Generate Order Slip</span>
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>

          <Link href="/cart" className="back-cart-link">
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Return to Cart</span>
          </Link>
        </aside>
      </div>

      <style>{`
        .checkout-view { display: flex; flex-direction: column; gap: var(--space-6); }

        /* CONCISE 2-STEP MOBILE GUIDE */
        .flow-notice {
          background-color: #f4f6f1;
          border: 1px solid #e2e7dc;
          border-radius: var(--radius-lg);
          padding: 12px 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
        }
        .flow-step {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #526356;
          line-height: 1.35;
        }
        .flow-step strong { color: #18231c; }
        .flow-num {
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          background-color: #18231c;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .checkout-grid { display: grid; grid-template-columns: 1fr 340px; gap: var(--space-8); align-items: start; }
        .checkout-section-title { font-family: var(--font-display); font-size: var(--text-xl); color: var(--color-primary-dark); margin: 0 0 var(--space-4); }

        .form-section { background-color: var(--color-paper); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4); }
        .form-group { display: flex; flex-direction: column; gap: var(--space-2); }
        .form-label { font-size: var(--text-xs); font-weight: 700; color: var(--color-heading); }
        .req { color: var(--color-error); }
        .form-input { padding: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: 16px; width: 100%; background: #ffffff; color: #18231c; }

        .input-with-icon { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: var(--space-3); color: var(--color-ink-3); pointer-events: none; }
        .input-with-icon .form-input { padding-left: var(--space-10); }

        .order-type-pills { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }
        .order-type-pills--three { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 640px) {
          .order-type-pills--three { grid-template-columns: 1fr; }
        }
        .type-pill { padding: var(--space-3); border: 1px solid var(--color-border); background: var(--color-paper-2); border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 600; color: var(--color-ink-2); cursor: pointer; text-align: center; transition: all var(--dur-fast); }
        .type-pill[data-active="true"] { background-color: var(--color-primary); color: var(--color-primary-fg); border-color: var(--color-primary); }

        .conditional-box { background-color: var(--color-paper-2); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-3); }

        .checkout-items-list { display: flex; flex-direction: column; gap: var(--space-3); background-color: var(--color-paper); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); }
        .checkout-item-row { display: flex; justify-content: space-between; align-items: center; padding-bottom: var(--space-3); border-bottom: 1px solid var(--color-border); }
        .checkout-item-row:last-child { border-bottom: none; padding-bottom: 0; }
        .item-title { font-family: var(--font-display); font-size: var(--text-base); color: var(--color-primary-dark); margin: 0; }
        .item-qty { font-size: var(--text-xs); color: var(--color-ink-3); }
        .item-price { font-family: var(--font-mono); font-weight: 700; color: var(--color-ink); }

        .checkout-sidebar { background-color: var(--color-paper-2); border: 1px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-6); position: sticky; top: var(--space-6); }
        .checkout-sidebar-title { font-family: var(--font-display); font-size: var(--text-xl); color: var(--color-primary-dark); margin: 0 0 var(--space-6); }
        .checkout-total-box { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--color-border); }
        .total-label { font-size: var(--text-sm); font-weight: 600; color: var(--color-ink-2); }
        .total-amount { font-family: var(--font-mono); font-size: var(--text-2xl); font-weight: 700; color: var(--color-primary-dark); }
        .free-tag { font-size: var(--text-sm); color: var(--color-primary); font-weight: 700; }

        .checkout-error { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3); background-color: oklch(from var(--color-error) l c h / 0.1); color: var(--color-error); font-size: var(--text-xs); border-radius: var(--radius-md); margin-bottom: var(--space-4); }

        .submit-order-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 12px 20px;
          background-color: #008736;
          color: #ffffff;
          border: 1px solid #008736;
          border-radius: 10px;
          font-size: var(--text-base);
          font-weight: 600;
          cursor: pointer;
          transition: background-color 160ms ease, transform 100ms ease;
          margin-bottom: var(--space-4);
        }
        .submit-order-btn:hover:not(:disabled),
        .submit-order-btn:focus-visible:not(:disabled) {
          background-color: #124d26;
          border-color: #124d26;
        }
        .submit-order-btn:active:not(:disabled) {
          transform: scale(0.98);
        }
        .submit-order-btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .back-cart-link { display: flex; align-items: center; justify-content: center; gap: var(--space-2); font-size: var(--text-xs); color: var(--color-ink-3); text-decoration: none; }

        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr; }
          .order-type-pills { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
