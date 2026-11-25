"use client";

import { useEffect } from "react";
import { Check, X, ShoppingBag } from "lucide-react";
import ModalWrapper from "./ModalWrapper";
import type { Product } from "@/types";
import { formatPHP } from "@/types";

interface AddToCartModalProps {
  product: Product | null;
  quantity: number;
  isOpen: boolean;
  onClose: () => void;
  onViewCart: () => void;
}

export default function AddToCartModal({
  product,
  quantity,
  isOpen,
  onClose,
  onViewCart,
}: AddToCartModalProps) {
  // Auto-dismiss notification after 3500ms
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const lineTotal = product.price_php * quantity;

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="min(92vw, 440px)"
      ariaLabelledBy="modal-title"
    >
      <div className="add-to-cart-inner">
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Confirmation Header */}
        <div className="modal-header">
          <div className="success-badge" aria-hidden="true">
            <Check size={22} className="check-icon" />
          </div>
          <h2 id="modal-title" className="modal-title">
            Added to your cart!
          </h2>
          <p className="modal-subtitle">
            This item has been successfully added to your order.
          </p>
        </div>

        {/* Product Summary Card */}
        <div className="product-summary-card">
          <img
            src={product.image_url || "/images/placeholder-stats-bg.jpg"}
            alt={product.name}
            className="product-thumbnail"
          />
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-spec">
              {product.specification || product.description || "Certified product"}
            </p>
            <div className="product-math">
              <span className="unit-pricing">
                {formatPHP(product.price_php).replace(".00", "")} × {quantity}
              </span>
              <span className="product-subtotal">
                {formatPHP(lineTotal).replace(".00", "")}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button
            type="button"
            className="continue-btn"
            onClick={onClose}
          >
            Continue Shopping
          </button>
          <button
            type="button"
            className="view-cart-btn"
            onClick={() => {
              onClose();
              onViewCart();
            }}
          >
            <ShoppingBag size={16} />
            <span>View Cart</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .add-to-cart-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow-y: auto;
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #e2e7dc;
          background: #f4f6f1;
          color: #526356;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 140ms ease;
        }
        .modal-close-btn:hover {
          background: #f1f5f9;
          color: #18231c;
        }

        .modal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 20px;
        }
        .success-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #dcfce7;
          color: #008736;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }
        .modal-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #18231c;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .modal-subtitle {
          font-size: 0.8rem;
          color: #526356;
          margin: 0;
        }

        .product-summary-card {
          display: flex;
          gap: 12px;
          background-color: #f4f6f1;
          border: 1px solid #e2e7dc;
          border-radius: 14px;
          padding: 12px;
          margin-bottom: 22px;
          align-items: center;
        }
        .product-thumbnail {
          width: 68px;
          height: 68px;
          border-radius: 10px;
          object-fit: cover;
          background-color: #ffffff;
          flex-shrink: 0;
        }
        .product-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .product-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #18231c;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-spec {
          font-size: 0.72rem;
          color: #526356;
          margin: 0 0 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-math {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .unit-pricing {
          font-size: 0.78rem;
          color: #526356;
          font-weight: 500;
        }
        .product-subtotal {
          font-size: 1.1rem;
          font-weight: 800;
          color: #008736;
        }

        .modal-actions {
          display: flex;
          gap: 10px;
        }
        .continue-btn {
          flex: 1;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1.5px solid #d8dfd1;
          background: #ffffff;
          color: #18231c;
          font-weight: 700;
          font-size: 0.84rem;
          cursor: pointer;
          transition: background-color 140ms ease;
        }
        .continue-btn:hover {
          background-color: #f4f6f1;
        }
        .view-cart-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 14px;
          border-radius: 12px;
          border: none;
          background-color: #008736;
          color: #ffffff;
          font-weight: 800;
          font-size: 0.84rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(21, 128, 61, 0.25);
          transition: background-color 140ms ease;
        }
        .view-cart-btn:hover {
          background-color: #124d26;
        }
      `}</style>
    </ModalWrapper>
  );
}
