"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ModalWrapper from "./ModalWrapper";
import ConfirmModal from "./ConfirmModal";
import { Heart, X, Trash2, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPHP } from "@/types";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteIds: string[];
  products: Product[];
  onRemoveFavorite: (productId: string, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onOpenCart: () => void;
}

export default function FavoritesModal({
  isOpen,
  onClose,
  favoriteIds,
  products,
  onRemoveFavorite,
  onAddToCart,
  onOpenCart,
}: FavoritesModalProps) {
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const clearFavBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleClearFavorites = () => {
    try {
      localStorage.setItem("crrdc-wishlist", "[]");
      window.dispatchEvent(new Event("crrdc-wishlist-updated"));
    } catch (e) {
      console.error(e);
    }
  };

  // Lock body scroll when modal is open
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

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  return (
    <>
      <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="min(92vw, 480px)"
      ariaLabelledBy="fav-modal-title"
    >
        {/* Header */}
        <header className="fav-modal-header">
          <div className="header-title-group">
            <div className="heart-badge" aria-hidden="true">
              <Heart size={18} fill="#ef4444" color="#ef4444" />
            </div>
            <div>
              <h2 id="fav-modal-title" className="fav-title">Your Favorites</h2>
              <span className="fav-subtitle">
                {favoriteProducts.length} {favoriteProducts.length === 1 ? "item" : "items"} saved
              </span>
            </div>
          </div>

          <div className="header-actions-group">
            {favoriteProducts.length > 0 && (
              <button
                ref={clearFavBtnRef}
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
              aria-label="Close favorites"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="fav-modal-body">
          {favoriteProducts.length === 0 ? (
            <div className="empty-fav-state">
              <div className="empty-fav-icon">
                <Heart size={48} />
              </div>
              <h3>No favorites saved yet</h3>
              <p>Click the heart icon on any product in the catalog to save it here for quick access.</p>
              <button type="button" className="continue-btn" onClick={onClose}>
                Browse Products
              </button>
            </div>
          ) : (
            <div className="fav-items-list">
              {favoriteProducts.map((product) => {
                const isOutOfStock = product.stock_qty <= 0;

                return (
                  <article key={product.id} className="fav-item-card">
                    <img
                      src={product.image_url || "/images/placeholder-stats-bg.jpg"}
                      alt={product.name}
                      className="item-thumbnail"
                    />

                    <div className="item-details">
                      <div className="item-header-row">
                        <Link href={`/products/${product.id}`} className="item-title-link" onClick={onClose}>
                          <h3 className="item-title">{product.name}</h3>
                        </Link>
                        <button
                          type="button"
                          className="item-remove-btn"
                          onClick={(e) => onRemoveFavorite(product.id, e)}
                          title="Remove from favorites"
                          aria-label={`Remove ${product.name} from favorites`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="item-spec">
                        {product.specification || product.description || "Certified agricultural product"}
                      </p>

                      <div className="item-footer-row">
                        <span className="item-price">
                          {formatPHP(product.price_php).replace(".00", "")}
                        </span>

                        <div className="item-actions">
                          {isOutOfStock ? (
                            <span className="out-of-stock-tag">Out of stock</span>
                          ) : (
                            <button
                              type="button"
                              className="add-to-cart-quick-btn"
                              onClick={(e) => {
                                onAddToCart(product, e);
                              }}
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <Plus size={14} />
                              <span>Add to cart</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {favoriteProducts.length > 0 && (
          <footer className="fav-modal-footer">
            <button type="button" className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
            <button
              type="button"
              className="view-cart-link-btn"
              onClick={() => {
                onClose();
                onOpenCart();
              }}
            >
              <ShoppingBag size={16} />
              <span>View Cart</span>
            </button>
          </footer>
        )}

      <style jsx>{`
        /* ── Header ── */
        .fav-modal-header {
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
          align-items: center;
          gap: 12px;
        }
        .heart-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fee2e2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fav-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #18231c;
          margin: 0;
          line-height: 1.2;
        }
        .fav-subtitle {
          font-size: 0.74rem;
          color: #526356;
          font-weight: 500;
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
        .fav-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 18px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .empty-fav-state {
          text-align: center;
          padding: 50px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .empty-fav-icon {
          color: #d8dfd1;
          margin-bottom: 12px;
        }
        .empty-fav-state h3 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 0 0 6px;
        }
        .empty-fav-state p {
          font-size: 0.8rem;
          color: #526356;
          margin: 0 0 18px;
          max-width: 280px;
        }
        .continue-btn {
          padding: 10px 22px;
          border-radius: 10px;
          background-color: #008736;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.84rem;
          border: none;
          cursor: pointer;
        }

        /* Items */
        .fav-items-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .fav-item-card {
          display: flex;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 16px;
          padding: 12px;
          align-items: center;
        }
        .item-thumbnail {
          width: 72px;
          height: 72px;
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
        .item-title-link {
          text-decoration: none;
          color: inherit;
          min-width: 0;
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
          margin: 2px 0 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .item-price {
          font-size: 1.05rem;
          font-weight: 800;
          color: #18231c;
        }
        .add-to-cart-quick-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          background-color: #008736;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 140ms ease;
        }
        .add-to-cart-quick-btn:hover {
          background-color: #124d26;
        }
        .out-of-stock-tag {
          font-size: 0.72rem;
          color: #dc2626;
          font-weight: 600;
        }

        /* Footer */
        .fav-modal-footer {
          border-top: 1px solid #e2e7dc;
          padding: 14px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #ffffff;
          flex-shrink: 0;
        }
        .continue-shopping-btn {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          border: 1px solid #d8dfd1;
          background: #ffffff;
          color: #18231c;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
        }
        .continue-shopping-btn:hover {
          background-color: #f4f6f1;
        }
        .view-cart-link-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 11px;
          border-radius: 10px;
          border: none;
          background-color: #008736;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 800;
          cursor: pointer;
        }
        .view-cart-link-btn:hover {
          background-color: #124d26;
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
      `}</style>
    </ModalWrapper>

    <ConfirmModal
      isOpen={confirmClearOpen}
      onClose={() => setConfirmClearOpen(false)}
      onConfirm={handleClearFavorites}
      title="Clear your favorites?"
      message="This will remove all saved items from your favorites."
      confirmLabel="Clear Favorites"
      cancelLabel="Cancel"
      triggerRef={clearFavBtnRef}
    />
  </>
  );
}
