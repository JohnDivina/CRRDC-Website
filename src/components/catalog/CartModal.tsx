"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ModalWrapper from "./ModalWrapper";
import ConfirmModal from "./ConfirmModal";
import {
  X,
  Trash2,
  Plus,
  Minus,
  Tag,
  QrCode,
  MapPin,
  Clock,
  ArrowRight,
  ShoppingBag,
  Check
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPHP } from "@/types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, totalItems, totalPHP, updateQuantity, removeItem, clearCart } = useCart();

  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const clearBtnRef = useRef<HTMLButtonElement | null>(null);

  // Lock body scroll when modal is open to ensure constant positioning
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherCode.trim().toUpperCase();
    if (!code) return;

    if (code === "COOP10" || code === "CLSU10") {
      const discount = Math.round(totalPHP * 0.1);
      setVoucherDiscount(discount);
      setVoucherMessage({ text: "10% Coop Member Discount applied!", type: "success" });
    } else if (code === "CRRDC" || code === "AGRI50") {
      setVoucherDiscount(50);
      setVoucherMessage({ text: "₱50 Agricultural Voucher applied!", type: "success" });
    } else {
      setVoucherDiscount(0);
      setVoucherMessage({ text: "Invalid or expired voucher code", type: "error" });
    }
  };

  const finalTotal = Math.max(0, totalPHP - voucherDiscount);

  return (
    <>
      <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="min(92vw, 520px)"
      ariaLabelledBy="cart-modal-title"
    >
        {/* ── 1. Header ── */}
        <header className="cart-modal-header">
          <div className="header-title-group">
            <h2 id="cart-modal-title" className="cart-title">Your cart</h2>
            <span className="cart-subtitle">
              {totalItems} {totalItems === 1 ? "item" : "items"} · CLSU CRRDC
            </span>
          </div>

          <div className="header-actions-group">
            {items.length > 0 && (
              <button
                ref={clearBtnRef}
                type="button"
                className="clear-all-btn"
                onClick={() => setConfirmClearOpen(true)}
              >
                Clear all
              </button>
            )}

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* ── 2. Scrollable Body ── */}
        <div className="cart-modal-body">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} />
              </div>
              <h3>Your cart is empty</h3>
              <p>Explore certified seeds, premium rice, and seedlings to add products.</p>
              <button type="button" className="continue-shopping-btn" onClick={onClose}>
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="cart-items-list">
                {items.map(({ product, quantity }) => {
                  const lineTotal = product.price_php * quantity;
                  const isLowStock = product.stock_qty > 0 && product.stock_qty <= 10;

                  return (
                    <article key={product.id} className="cart-item-card">
                      <img
                        src={product.image_url || "/images/placeholder-stats-bg.jpg"}
                        alt={product.name}
                        className="item-thumbnail"
                      />

                      <div className="item-details">
                        <div className="item-header-row">
                          <h3 className="item-title">{product.name}</h3>
                          <button
                            type="button"
                            className="item-remove-btn"
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name} from cart`}
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <p className="item-spec">
                          {product.specification || product.description || "Certified product"}
                        </p>

                        {isLowStock && (
                          <span className="item-low-stock">
                            Low stock · {product.stock_qty} left
                          </span>
                        )}

                        <div className="item-footer-row">
                          {/* Quantity Stepper */}
                          <div className="item-stepper">
                            <button
                              type="button"
                              className="stepper-action-btn"
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="stepper-display">{quantity}</span>
                            <button
                              type="button"
                              className="stepper-action-btn stepper-action-btn--plus"
                              disabled={quantity >= product.stock_qty}
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Line Total */}
                          <span className="item-price">
                            {formatPHP(lineTotal).replace(".00", "")}
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Voucher Code Box */}
              <form onSubmit={handleApplyVoucher} className="voucher-box">
                <div className="voucher-input-row">
                  <Tag size={16} className="voucher-icon" />
                  <input
                    type="text"
                    className="voucher-input"
                    placeholder="Enter coop or voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                  />
                  <button type="submit" className="voucher-apply-btn">
                    Apply
                  </button>
                </div>
                {voucherMessage && (
                  <p className={`voucher-msg msg--${voucherMessage.type}`}>
                    {voucherMessage.text}
                  </p>
                )}
              </form>

              {/* Order Summary Card */}
              <div className="summary-card">
                <h3 className="summary-title">Order summary</h3>

                <div className="summary-row">
                  <span className="row-label">Subtotal ({totalItems} units)</span>
                  <span className="row-val">{formatPHP(totalPHP).replace(".00", "")}</span>
                </div>

                {voucherDiscount > 0 && (
                  <div className="summary-row row--discount">
                    <span className="row-label">Coop Voucher Discount</span>
                    <span className="row-val">- {formatPHP(voucherDiscount).replace(".00", "")}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span className="row-label">Handling fee</span>
                  <span className="row-val">₱0</span>
                </div>

                <div className="summary-row">
                  <span className="row-label">Pick-up at CRRDC</span>
                  <span className="row-val val--free">Free</span>
                </div>

                <div className="summary-divider" />

                <div className="summary-row row--total">
                  <span className="total-label">Total to pay</span>
                  <span className="total-val">{formatPHP(finalTotal).replace(".00", "")}</span>
                </div>
              </div>

              {/* HOW YOU PAY & CLAIM Card */}
              <div className="claim-card">
                <span className="claim-header-tag">HOW YOU PAY &amp; CLAIM</span>

                <div className="claim-content-row">
                  <div className="qr-badge" aria-hidden="true">
                    <QrCode size={20} className="qr-icon" />
                  </div>
                  <div className="claim-text">
                    <h4 className="claim-title">Checkout generates your Order Slip</h4>
                    <p className="claim-desc">
                      Pay at the CLSU Cashier&apos;s Office with your Order Slip, then show your Official Receipt (OR) at the CRRDC Lab to claim.
                    </p>
                  </div>
                </div>

                <div className="claim-pills-row">
                  <span className="claim-pill">
                    <MapPin size={12} className="pill-ico" />
                    <span>Cashier → CRRDC Lab</span>
                  </span>
                  <span className="claim-pill">
                    <Clock size={12} className="pill-ico" />
                    <span>Mon–Fri · 8AM–5PM</span>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── 3. Bottom Checkout Bar ── */}
        {items.length > 0 && (
          <footer className="cart-modal-footer">
            <div className="footer-total-col">
              <span className="footer-total-label">Total</span>
              <span className="footer-total-price">
                {formatPHP(finalTotal).replace(".00", "")}
              </span>
            </div>

            <Link href="/checkout" className="checkout-btn" onClick={onClose}>
              <span>Checkout &amp; get Order Slip</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </footer>
        )}

      <style jsx>{`
        /* ── Header ── */
        .cart-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px 14px;
          border-bottom: 1px solid #f1f5f9;
          background: #ffffff;
          flex-shrink: 0;
        }
        .header-title-group {
          display: flex;
          flex-direction: column;
        }
        .cart-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #18231c;
          margin: 0;
          line-height: 1.2;
        }
        .cart-subtitle {
          font-size: 0.74rem;
          color: #526356;
          font-weight: 500;
          margin-top: 2px;
        }

        .header-actions-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .clear-all-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
        }
        .clear-all-btn:hover {
          text-decoration: underline;
        }
        .modal-close-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #e2e7dc;
          background-color: #f4f6f1;
          color: #18231c;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 140ms ease;
        }
        .modal-close-btn:hover {
          background-color: #f1f5f9;
        }

        /* ── Body ── */
        .cart-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* Empty State */
        .empty-cart-state {
          text-align: center;
          padding: 50px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .empty-cart-icon {
          color: #94a3b8;
          margin-bottom: 12px;
        }
        .empty-cart-state h3 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 0 0 6px;
        }
        .empty-cart-state p {
          font-size: 0.8rem;
          color: #526356;
          margin: 0 0 18px;
          max-width: 280px;
        }
        .continue-shopping-btn {
          padding: 10px 22px;
          border-radius: 10px;
          background-color: #008736;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.84rem;
          border: none;
          cursor: pointer;
        }

        /* ── Cart Item Cards ── */
        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cart-item-card {
          display: flex;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 16px;
          padding: 12px;
          align-items: center;
        }
        .item-thumbnail {
          width: 74px;
          height: 74px;
          border-radius: 12px;
          object-fit: cover;
          background-color: #f4f6f1;
          flex-shrink: 0;
        }
        .item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .item-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 6px;
        }
        .item-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #18231c;
          margin: 0;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-remove-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 2px;
          display: flex;
          transition: color 140ms ease;
        }
        .item-remove-btn:hover {
          color: #ef4444;
        }
        .item-spec {
          font-size: 0.7rem;
          color: #526356;
          margin: 1px 0 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-low-stock {
          font-size: 0.65rem;
          color: #ea580c;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .item-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2px;
        }

        /* Stepper */
        .item-stepper {
          display: flex;
          align-items: center;
          border: 1px solid #e2e7dc;
          border-radius: 8px;
          padding: 2px;
          background: #f4f6f1;
        }
        .stepper-action-btn {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #18231c;
          border-radius: 6px;
          cursor: pointer;
        }
        .stepper-action-btn:hover:not(:disabled) {
          background: #e2e7dc;
        }
        .stepper-action-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .stepper-action-btn--plus {
          background-color: #0d381c;
          color: #ffffff;
        }
        .stepper-action-btn--plus:hover:not(:disabled) {
          background-color: #008736;
        }
        .stepper-display {
          font-size: 0.78rem;
          font-weight: 700;
          color: #18231c;
          padding: 0 8px;
        }
        .item-price {
          font-size: 1.1rem;
          font-weight: 800;
          color: #18231c;
          letter-spacing: -0.01em;
        }

        /* ── Voucher Box ── */
        .voucher-box {
          background-color: #f4f6f1;
          border: 1.5px dashed #86efac;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .voucher-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .voucher-icon {
          color: #008736;
          flex-shrink: 0;
        }
        .voucher-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.8rem;
          color: #18231c;
          outline: none;
        }
        .voucher-input::placeholder {
          color: #526356;
        }
        .voucher-apply-btn {
          border: none;
          background: transparent;
          color: #008736;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          padding: 2px 4px;
        }
        .voucher-apply-btn:hover {
          text-decoration: underline;
        }
        .voucher-msg {
          font-size: 0.7rem;
          margin: 0;
        }
        .msg--success {
          color: #16a34a;
          font-weight: 600;
        }
        .msg--error {
          color: #dc2626;
        }

        /* ── Order Summary Card ── */
        .summary-card {
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .summary-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #18231c;
          margin: 0 0 4px;
        }
        .summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #526356;
        }
        .row-val {
          font-weight: 600;
          color: #1e293b;
        }
        .row--discount .row-val {
          color: #16a34a;
        }
        .val--free {
          color: #008736;
          font-weight: 700;
        }
        .summary-divider {
          height: 1px;
          background-color: #f1f5f9;
          margin: 4px 0;
        }
        .row--total {
          font-size: 1rem;
        }
        .total-label {
          font-weight: 800;
          color: #18231c;
        }
        .total-val {
          font-size: 1.3rem;
          font-weight: 900;
          color: #18231c;
        }

        /* ── HOW YOU PAY & CLAIM Card ── */
        .claim-card {
          background-color: #0b3b1c;
          border-radius: 16px;
          padding: 16px;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .claim-header-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #e2e7dc;
          text-transform: uppercase;
        }
        .claim-content-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .qr-badge {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: #ffffff;
          color: #18231c;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .claim-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .claim-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }
        .claim-desc {
          font-size: 0.74rem;
          color: #e2e7dc;
          margin: 0;
          line-height: 1.35;
        }
        .claim-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .claim-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          font-size: 0.68rem;
          font-weight: 500;
          color: #ffffff;
        }
        .pill-ico {
          color: #ffffff;
        }

        /* ── Bottom Checkout Bar ── */
        .cart-modal-footer {
          border-top: 1px solid #e2e7dc;
          padding: 16px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          background: #ffffff;
          flex-shrink: 0;
        }
        .footer-total-col {
          display: flex;
          flex-direction: column;
        }
        .footer-total-label {
          font-size: 0.68rem;
          color: #526356;
          font-weight: 600;
        }
        .footer-total-price {
          font-size: 1.3rem;
          font-weight: 900;
          color: #18231c;
          line-height: 1.1;
        }
        :global(.checkout-btn) {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          padding: 12px 20px;
          border-radius: 10px;
          border: 1px solid #008736;
          background-color: #008736;
          color: #ffffff;
          font-size: 0.86rem;
          font-weight: 600;
          white-space: nowrap;
          text-decoration: none;
          box-shadow: none;
          transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
        }
        :global(.checkout-btn:hover),
        :global(.checkout-btn:focus-visible) {
          background-color: #124d26;
          color: #ffffff;
          border-color: #124d26;
        }
      `}</style>
    </ModalWrapper>

    <ConfirmModal
      isOpen={confirmClearOpen}
      onClose={() => setConfirmClearOpen(false)}
      onConfirm={() => {
        clearCart();
        setVoucherDiscount(0);
        setVoucherMessage(null);
      }}
      title="Clear your cart?"
      message="This will remove all items from your cart."
      confirmLabel="Clear Cart"
      cancelLabel="Cancel"
      triggerRef={clearBtnRef}
    />
  </>
  );
}
