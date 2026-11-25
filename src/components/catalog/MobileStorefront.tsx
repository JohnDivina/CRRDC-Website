"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  Sprout,
  Wheat,
  Leaf,
  Heart,
  Plus,
  Minus,
  Bell,
  ChevronDown,
  ArrowRight,
  ShoppingCart,
  Check,
  X,
  User
} from "lucide-react";
import type { Product } from "@/types";
import { formatPHP } from "@/types";
import { useCart } from "@/hooks/useCart";
import CartModal from "./CartModal";
import AddToCartModal from "./AddToCartModal";
import FavoritesModal from "./FavoritesModal";

interface MobileStorefrontProps {
  initialProducts: Product[];
}

type SortOption = "popular" | "price-asc" | "price-desc" | "name-asc";

export default function MobileStorefront({ initialProducts }: MobileStorefrontProps) {
  const { addItem, totalItems } = useCart();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter drawer options
  const [priceRange, setPriceRange] = useState<"all" | "under-200" | "200-500" | "above-500">("all");
  const [inStockOnly, setInStockOnly] = useState(false);

  // Display count (expanded for wide 5-column web layouts)
  const [displayCount, setDisplayCount] = useState(15);

  // Centered Modals
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);
  const [addToCartModalData, setAddToCartModalData] = useState<{
    product: Product;
    quantity: number;
  } | null>(null);

  // Notifications & Alert modals
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifyModalProduct, setNotifyModalProduct] = useState<Product | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  // Wishlist state (persisted in localStorage)
  const [wishlist, setWishlist] = useState<string[]>([]);
  // Quantities for each card
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  // Add-to-cart confirmation feedback state
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  // Check openCart / openFavorites query params & listen to custom open events from header
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("openCart") === "true") {
        setCartModalOpen(true);
      }
      if (params.get("openFavorites") === "true") {
        setFavoritesModalOpen(true);
      }
    }

    const onOpenCart = () => setCartModalOpen(true);
    const onOpenFav = () => setFavoritesModalOpen(true);
    window.addEventListener("crrdc-open-cart", onOpenCart);
    window.addEventListener("crrdc-open-favorites", onOpenFav);
    return () => {
      window.removeEventListener("crrdc-open-cart", onOpenCart);
      window.removeEventListener("crrdc-open-favorites", onOpenFav);
    };
  }, []);



  // Load wishlist on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("crrdc-wishlist");
      if (saved) setWishlist(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const toggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("crrdc-wishlist", JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("crrdc-wishlist-updated"));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleQtyChange = (productId: string, delta: number, maxStock: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, Math.min(maxStock, current + delta));
      return { ...prev, [productId]: next };
    });
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock_qty <= 0) return;

    const qty = quantities[product.id] || 1;
    addItem(product, qty);

    // Button feedback flash
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);

    // Open Interactive Add to Cart Centered Modal Dialog
    setAddToCartModalData({ product, quantity: qty });
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifySubmitted(true);
    setTimeout(() => {
      setNotifyModalProduct(null);
      setNotifySubmitted(false);
      setNotifyEmail("");
    }, 1800);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      // Category filter (including favorites)
      if (selectedCategory !== "all") {
        if (selectedCategory === "favorites" && !wishlist.includes(p.id)) return false;
        if (selectedCategory === "seeds" && p.category !== "seed") return false;
        if (selectedCategory === "rice" && p.category !== "rice") return false;
        if (selectedCategory === "seedlings" && p.category !== "seedling") return false;
        if (selectedCategory === "other" && p.category !== "other") return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = (p.description || "").toLowerCase().includes(q);
        const matchesSpec = (p.specification || "").toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSpec && !matchesCat) return false;
      }

      // In stock only filter
      if (inStockOnly && p.stock_qty <= 0) return false;

      // Price range filter
      if (priceRange === "under-200" && p.price_php >= 200) return false;
      if (priceRange === "200-500" && (p.price_php < 200 || p.price_php > 500)) return false;
      if (priceRange === "above-500" && p.price_php <= 500) return false;

      return true;
    });
  }, [initialProducts, selectedCategory, searchQuery, inStockOnly, priceRange, wishlist]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "popular") {
      list.sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0));
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => a.price_php - b.price_php);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price_php - a.price_php);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, displayCount);
  const hasMore = displayCount < sortedProducts.length;

  return (
    <div className="storefront-page-container">
      {/* ── Hero & Search Bar Section ── */}
      <section className="storefront-hero-bar">
          <div className="storefront-hero-text">
            <h1 className="hero-title">Certified Agricultural Products</h1>
          </div>

          {/* Search & Filter Row */}
          <div className="search-filter-section" aria-label="Search and filter products">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" aria-hidden="true" />
              <input
                type="text"
                className="search-input"
                placeholder="Search seeds, rice, seedlings, planting materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search seeds, rice, seedlings, planting materials"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              type="button"
              className={`filter-toggle-btn ${filterDrawerOpen || inStockOnly || priceRange !== "all" ? "active" : ""}`}
              onClick={() => setFilterDrawerOpen(true)}
              aria-label="Open filter options"
              aria-expanded={filterDrawerOpen}
            >
              <SlidersHorizontal size={18} />
              <span className="filter-btn-text">Filters</span>
            </button>
          </div>
        </section>

        {/* ── 3. Category Filter Pills & Sort Row ── */}
        <section className="filters-control-bar">
          <nav className="category-pills" aria-label="Filter by category">
            <div className="category-pills__scroll">
              <button
                type="button"
                className={`category-pill ${selectedCategory === "all" ? "is-active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                <LayoutGrid size={15} className="pill-icon" />
                <span>All Products</span>
              </button>

              <button
                type="button"
                className={`category-pill ${selectedCategory === "seeds" ? "is-active" : ""}`}
                onClick={() => setSelectedCategory("seeds")}
              >
                <Sprout size={15} className="pill-icon" />
                <span>Seeds</span>
              </button>

              <button
                type="button"
                className={`category-pill ${selectedCategory === "rice" ? "is-active" : ""}`}
                onClick={() => setSelectedCategory("rice")}
              >
                <Wheat size={15} className="pill-icon" />
                <span>Rice</span>
              </button>

              <button
                type="button"
                className={`category-pill ${selectedCategory === "seedlings" ? "is-active" : ""}`}
                onClick={() => setSelectedCategory("seedlings")}
              >
                <Leaf size={15} className="pill-icon" />
                <span>Seedlings</span>
              </button>

              {/* Favorites Filter Tab */}
              <button
                type="button"
                className={`category-pill pill--fav ${selectedCategory === "favorites" ? "is-active" : ""}`}
                onClick={() => setSelectedCategory("favorites")}
              >
                <Heart
                  size={14}
                  className="pill-icon"
                  fill={selectedCategory === "favorites" ? "#ef4444" : "none"}
                />
                <span>Favorites ({wishlist.length})</span>
              </button>
            </div>
          </nav>

          <div className="meta-sort-row">
            <span className="products-count">
              Showing <strong>{sortedProducts.length} products</strong>
            </span>

            <div className="sort-dropdown-container">
              <button
                type="button"
                className="sort-dropdown-btn"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={sortDropdownOpen}
              >
                <span>
                  Sort:{" "}
                  <strong>
                    {sortBy === "popular"
                      ? "Popular"
                      : sortBy === "price-asc"
                      ? "Price: Low to High"
                      : sortBy === "price-desc"
                      ? "Price: High to Low"
                      : "Name"}
                  </strong>
                </span>
                <ChevronDown size={14} className={`chevron-icon ${sortDropdownOpen ? "open" : ""}`} />
              </button>

              {sortDropdownOpen && (
                <div className="sort-dropdown-menu" role="listbox">
                  <button
                    type="button"
                    className={`sort-menu-item ${sortBy === "popular" ? "selected" : ""}`}
                    onClick={() => {
                      setSortBy("popular");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Popular
                  </button>
                  <button
                    type="button"
                    className={`sort-menu-item ${sortBy === "price-asc" ? "selected" : ""}`}
                    onClick={() => {
                      setSortBy("price-asc");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Price: Low to High
                  </button>
                  <button
                    type="button"
                    className={`sort-menu-item ${sortBy === "price-desc" ? "selected" : ""}`}
                    onClick={() => {
                      setSortBy("price-desc");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Price: High to Low
                  </button>
                  <button
                    type="button"
                    className={`sort-menu-item ${sortBy === "name-asc" ? "selected" : ""}`}
                    onClick={() => {
                      setSortBy("name-asc");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Name: A-Z
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 4. Responsive 5-Column Products Grid ── */}
        {displayedProducts.length === 0 ? (
          <div className="empty-results-box">
            <Leaf size={40} className="empty-icon" />
            <h3 className="empty-title">No products found</h3>
            <p className="empty-desc">
              {selectedCategory === "favorites"
                ? "You haven't added any products to your favorites yet. Click the heart icon on any card to save it."
                : "Try adjusting your search query or reset your category and price filters."}
            </p>
            <button
              type="button"
              className="reset-filters-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setPriceRange("all");
                setInStockOnly(false);
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {displayedProducts.map((product) => {
              const isOutOfStock = product.stock_qty <= 0;
              const isLowStock = product.stock_qty > 0 && product.stock_qty <= 10;
              const isFavorited = wishlist.includes(product.id);
              const currentQty = quantities[product.id] || 1;
              const isAdded = !!addedIds[product.id];

              // Category tag label
              const categoryLabel =
                product.category === "seed"
                  ? "Seeds"
                  : product.category === "rice"
                  ? "Rice"
                  : product.category === "seedling"
                  ? "Seedlings"
                  : "Other";

              return (
                <article key={product.id} className="storefront-card" data-out-of-stock={isOutOfStock}>
                  {/* Media Container */}
                  <div className="card-media">
                    <Link href={`/products/${product.id}`} className="card-media__link">
                      <img
                        src={product.image_url || "/images/placeholder-stats-bg.jpg"}
                        alt={product.name}
                        className="card-media__img"
                        loading="lazy"
                      />
                    </Link>

                    {/* Category Badge Pill on Top Left */}
                    <span className={`card-category-pill badge--${product.category}`}>
                      {categoryLabel}
                    </span>

                    {/* Wishlist Heart on Top Right */}
                    <button
                      type="button"
                      className={`card-wishlist-btn ${isFavorited ? "is-favorited" : ""}`}
                      onClick={(e) => toggleWishlist(product.id, e)}
                      aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={15} className="heart-icon" fill={isFavorited ? "#ef4444" : "none"} />
                    </button>

                    {/* Sold Out Banner on Image */}
                    {isOutOfStock && (
                      <div className="card-sold-out-ribbon">
                        <span>Sold out</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="card-info">
                    <Link href={`/products/${product.id}`} className="card-title-link">
                      <h2 className="card-title">{product.name}</h2>
                    </Link>

                    <p className="card-spec">
                      {product.specification || product.description || "Certified agricultural product"}
                    </p>

                    <div className="card-pricing-row">
                      <span className={`card-price ${isOutOfStock ? "is-disabled" : ""}`}>
                        {formatPHP(product.price_php).replace(".00", "")}
                      </span>

                      <div className="card-stock-indicator">
                        {isOutOfStock ? (
                          <>
                            <span className="stock-dot dot--out" />
                            <span className="stock-label text--out">Out of stock</span>
                          </>
                        ) : isLowStock ? (
                          <>
                            <span className="stock-dot dot--low" />
                            <span className="stock-label text--low">
                              Low stock · {product.stock_qty} left
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="stock-dot dot--in" />
                            <span className="stock-label text--in">
                              {product.stock_qty} in stock
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper & Action Button */}
                    <div className="card-actions">
                      {/* Stepper */}
                      <div className={`card-stepper ${isOutOfStock ? "is-disabled" : ""}`}>
                        <button
                          type="button"
                          className="stepper-btn"
                          disabled={isOutOfStock || currentQty <= 1}
                          onClick={(e) => handleQtyChange(product.id, -1, product.stock_qty, e)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="stepper-val">
                          {isOutOfStock ? 0 : currentQty}
                        </span>
                        <button
                          type="button"
                          className="stepper-btn stepper-btn--plus"
                          disabled={isOutOfStock || currentQty >= product.stock_qty}
                          onClick={(e) => handleQtyChange(product.id, 1, product.stock_qty, e)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Action Button: Add to Cart OR Notify Me */}
                      {isOutOfStock ? (
                        <button
                          type="button"
                          className="card-notify-btn"
                          onClick={() => setNotifyModalProduct(product)}
                          aria-label={`Notify when ${product.name} is back in stock`}
                        >
                          <Bell size={14} className="notify-icon" />
                          <span>Notify me</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={`card-add-btn ${isAdded ? "is-added" : ""}`}
                          onClick={(e) => handleAddToCart(product, e)}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span>Add to cart</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ── 5. Load More Products Button ── */}
        {hasMore && (
          <div className="load-more-section">
            <button
              type="button"
              className="load-more-btn"
              onClick={() => setDisplayCount((prev) => prev + 5)}
            >
              <span>Load more products</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      {/* ── Interactive Add to Cart Centered Modal Dialog ── */}
      <AddToCartModal
        isOpen={!!addToCartModalData}
        product={addToCartModalData?.product || null}
        quantity={addToCartModalData?.quantity || 1}
        onClose={() => setAddToCartModalData(null)}
        onViewCart={() => {
          setAddToCartModalData(null);
          setCartModalOpen(true);
        }}
      />

      {/* ── Centered Cart Modal Dialog ── */}
      <CartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
      />

      {/* ── Centered Favorites Modal Dialog ── */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        favoriteIds={wishlist}
        products={initialProducts}
        onRemoveFavorite={toggleWishlist}
        onAddToCart={handleAddToCart}
        onOpenCart={() => setCartModalOpen(true)}
      />

      {/* ── Filter Drawer / Bottom Sheet Modal ── */}
      {filterDrawerOpen && (
        <div className="modal-backdrop" onClick={() => setFilterDrawerOpen(false)}>
          <div className="filter-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="filter-sheet__header">
              <div className="filter-sheet__title-row">
                <SlidersHorizontal size={18} className="header-icon" />
                <h3>Filter Products</h3>
              </div>
              <button
                type="button"
                className="close-modal-btn"
                onClick={() => setFilterDrawerOpen(false)}
                aria-label="Close filters"
              >
                <X size={18} />
              </button>
            </div>

            <div className="filter-sheet__body">
              {/* Category */}
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="filter-chips">
                  {["all", "seeds", "rice", "seedlings", "other"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <div className="filter-chips">
                  {[
                    { key: "all", label: "Any Price" },
                    { key: "under-200", label: "Under ₱200" },
                    { key: "200-500", label: "₱200 - ₱500" },
                    { key: "above-500", label: "Above ₱500" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      className={`filter-chip ${priceRange === key ? "active" : ""}`}
                      onClick={() => setPriceRange(key as any)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Only */}
              <div className="filter-group">
                <label className="filter-checkbox-row">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>Show in-stock items only</span>
                </label>
              </div>
            </div>

            <div className="filter-sheet__footer">
              <button
                type="button"
                className="filter-reset-btn"
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange("all");
                  setInStockOnly(false);
                }}
              >
                Reset
              </button>
              <button
                type="button"
                className="filter-apply-btn"
                onClick={() => setFilterDrawerOpen(false)}
              >
                Apply Filters ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── "Notify Me" Restock Alert Modal ── */}
      {notifyModalProduct && (
        <div className="modal-backdrop" onClick={() => setNotifyModalProduct(null)}>
          <div className="notify-modal" onClick={(e) => e.stopPropagation()}>
            <div className="notify-modal__header">
              <Bell size={24} className="bell-highlight" />
              <h3>Back in Stock Notification</h3>
              <p>
                Enter your contact info to receive an alert when{" "}
                <strong>{notifyModalProduct.name}</strong> is available.
              </p>
            </div>

            {notifySubmitted ? (
              <div className="notify-success">
                <Check size={28} className="success-icon" />
                <h4>You're on the priority list!</h4>
                <p>We'll notify you as soon as new stock is verified by the seed laboratory.</p>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="notify-form">
                <input
                  type="email"
                  className="notify-input"
                  placeholder="Enter your email address"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  required
                />
                <button type="submit" className="notify-submit-btn">
                  Notify Me When Available
                </button>
              </form>
            )}

            <button
              type="button"
              className="notify-close-btn"
              onClick={() => setNotifyModalProduct(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── Full Width Desktop Layout Styles ── */
        .storefront-page-container {
          width: 100%;
          min-height: 100vh;
          background-color: var(--color-paper-2);
          display: flex;
          flex-direction: column;
          padding: 0 0 80px;
          margin: 0;
        }

        /* ── 2. Hero & Search Bar (Edge-to-edge full width) ── */
        .storefront-hero-bar {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          padding: 16px 20px;
          background-color: #fbfcf9;
          border-bottom: 1px solid #e2e7dc;
        }
        @media (min-width: 768px) {
          .storefront-hero-bar {
            padding: 18px 32px;
          }
        }
        @media (min-width: 1280px) {
          .storefront-hero-bar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 20px 56px;
            gap: 16px;
          }
        }
        .storefront-hero-text {
          display: flex;
          flex-direction: column;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: #18231c;
          margin: 0;
          letter-spacing: -0.025em;
          text-wrap: balance;
          max-width: 32ch;
        }
        @media (min-width: 768px) {
          .hero-title {
            font-size: 1.55rem;
          }
        }

        .search-filter-section {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 540px;
        }
        .search-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          background-color: #ffffff;
          border-radius: 10px;
          padding: 8px 14px;
          gap: 8px;
          border: 1px solid #e2e7dc;
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }
        .search-input-wrapper:focus-within {
          border-color: #008736;
          box-shadow: 0 0 0 2px rgba(0, 135, 54, 0.12);
        }
        .search-icon {
          color: #6b7c70;
          flex-shrink: 0;
        }
        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: #18231c;
          outline: none;
        }
        .search-input::placeholder {
          color: #6b7c70;
        }
        .search-clear-btn {
          border: none;
          background: transparent;
          color: #6b7c70;
          cursor: pointer;
          display: flex;
          padding: 2px;
        }

        .filter-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #18231c;
          background-color: #18231c;
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 140ms ease, transform 100ms ease;
        }
        .filter-toggle-btn:hover {
          background-color: #124d26;
          border-color: #124d26;
        }
        .filter-toggle-btn:active {
          transform: scale(0.98);
        }
        .filter-toggle-btn.active {
          background-color: #008736;
          border-color: #008736;
        }
        .filter-btn-text {
          display: inline-block;
        }

        /* ── 3. Filters Control Bar (Edge-to-edge full width) ── */
        .filters-control-bar {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          padding: 10px 20px;
          border-bottom: 1px solid #e2e7dc;
          background-color: #ffffff;
        }
        @media (min-width: 768px) {
          .filters-control-bar {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 12px 32px;
          }
        }
        @media (min-width: 1280px) {
          .filters-control-bar {
            padding: 12px 56px;
          }
        }

        .category-pills__scroll {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .category-pills__scroll::-webkit-scrollbar {
          display: none;
        }
        .category-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid #e2e7dc;
          background-color: #f4f6f1;
          color: #18231c;
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 140ms ease, border-color 140ms ease, color 140ms ease;
        }
        .category-pill:hover {
          border-color: #d8dfd1;
          background-color: #e8ede3;
        }
        .category-pill .pill-icon {
          color: #526356;
        }
        .category-pill.is-active {
          background-color: #18231c;
          border-color: #18231c;
          color: #ffffff;
        }
        .category-pill.is-active .pill-icon {
          color: #ffffff;
        }

        .pill--fav .pill-icon {
          color: #dc2626;
        }
        .category-pill.pill--fav.is-active {
          background-color: #18231c;
          border-color: #18231c;
          color: #ffffff;
        }

        .meta-sort-row {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.82rem;
        }
        .products-count {
          color: #526356;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }
        .products-count strong {
          color: #18231c;
        }

        .sort-dropdown-container {
          position: relative;
        }
        .sort-dropdown-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #e2e7dc;
          border-radius: 9999px;
          padding: 6px 14px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: #18231c;
          cursor: pointer;
          background-color: #f4f6f1;
          white-space: nowrap;
        }
        .sort-dropdown-btn strong {
          color: #008736;
        }
        .chevron-icon {
          transition: transform 160ms ease;
        }
        .chevron-icon.open {
          transform: rotate(180deg);
        }

        .sort-dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 4px);
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(24, 35, 28, 0.1);
          z-index: 50;
          min-width: 160px;
          display: flex;
          flex-direction: column;
          padding: 6px;
        }
        .sort-menu-item {
          text-align: left;
          padding: 8px 12px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: #18231c;
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .sort-menu-item:hover {
          background-color: #f4f6f1;
        }
        .sort-menu-item.selected {
          font-weight: 600;
          color: #ffffff;
          background-color: #18231c;
        }

        /* ── 4. Responsive Full-Width Products Grid ── */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          width: 100%;
          padding: 12px 20px 24px;
        }

        @media (min-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            padding: 14px 24px 28px;
          }
        }
        @media (min-width: 960px) {
          .products-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            padding: 16px 32px 32px;
          }
        }
        @media (min-width: 1280px) {
          .products-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            padding: 18px 56px 36px;
          }
        }
        @media (min-width: 1680px) {
          .products-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 24px;
            padding: 36px 64px;
          }
        }

        .storefront-card {
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
        }
        .storefront-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(24, 35, 28, 0.06);
          border-color: #d8dfd1;
        }

        /* Media */
        .card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background-color: #f4f6f1;
          overflow: hidden;
        }
        .card-media__link {
          display: block;
          width: 100%;
          height: 100%;
        }
        .card-media__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 220ms ease;
        }
        .storefront-card:hover .card-media__img {
          transform: scale(1.03);
        }

        /* Category pill on image — solid neutral bubble (anti-slop) */
        .card-category-pill {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #f4f6f1;
          color: #18231c;
          border: 1px solid #e2e7dc;
          font-size: 0.66rem;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 9999px;
          letter-spacing: 0.01em;
        }

        /* Wishlist Heart */
        .card-wishlist-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 30px;
          height: 30px;
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #526356;
          cursor: pointer;
          transition: transform 140ms ease, border-color 140ms ease;
        }
        .card-wishlist-btn:hover {
          transform: scale(1.06);
          border-color: #d8dfd1;
        }
        .card-wishlist-btn.is-favorited {
          color: #dc2626;
          border-color: #e2e7dc;
        }

        /* Sold Out Banner */
        .card-sold-out-ribbon {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: #18231c;
          color: #ffffff;
          padding: 3px 9px;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        /* Info body */
        .card-info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .card-title-link {
          text-decoration: none;
          color: inherit;
        }
        .card-title {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 600;
          color: #18231c;
          margin: 0 0 2px;
          line-height: 1.28;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 2.2em;
        }
        .card-spec {
          font-size: 0.72rem;
          color: #526356;
          margin: 0 0 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Price & Stock */
        .card-pricing-row {
          display: flex;
          flex-direction: column;
          gap: 3px;
          margin-bottom: 10px;
        }
        .card-price {
          font-family: var(--font-display);
          font-variant-numeric: tabular-nums;
          font-size: 1.05rem;
          font-weight: 700;
          color: #18231c;
          letter-spacing: -0.015em;
        }
        .card-price.is-disabled {
          color: #6b7c70;
          text-decoration: line-through;
        }

        .card-stock-indicator {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          width: fit-content;
          padding: 2px 8px;
          border-radius: 9999px;
          background-color: #f4f6f1;
          border: 1px solid #e2e7dc;
        }
        .stock-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .dot--in {
          background-color: #008736;
        }
        .dot--low {
          background-color: #18231c;
        }
        .dot--out {
          background-color: #dc2626;
        }

        .stock-label {
          font-size: 0.66rem;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
        }
        .text--in {
          color: #526356;
        }
        .text--low {
          color: #18231c;
          font-weight: 600;
        }
        .text--out {
          color: #dc2626;
          font-weight: 600;
        }

        /* Actions: Stepper + Add */
        .card-actions {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-top: auto;
        }

        .card-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #e2e7dc;
          border-radius: 8px;
          padding: 2px;
          background: #f4f6f1;
        }
        .card-stepper.is-disabled {
          opacity: 0.45;
          pointer-events: none;
        }
        .stepper-btn {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #18231c;
          border-radius: 6px;
          cursor: pointer;
        }
        .stepper-btn--plus {
          background-color: #18231c;
          color: #ffffff;
        }
        .stepper-btn--plus:hover {
          background-color: #008736;
        }
        .stepper-val {
          font-size: 0.78rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: #18231c;
        }

        .card-add-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          background-color: #008736;
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 140ms ease, transform 100ms ease;
        }
        .card-add-btn:hover {
          background-color: #124d26;
        }
        .card-add-btn:active {
          transform: scale(0.98);
        }
        .card-add-btn.is-added {
          background-color: #18231c;
        }

        .card-notify-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e2e7dc;
          background-color: #ffffff;
          color: #18231c;
          font-family: var(--font-body);
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 140ms ease, border-color 140ms ease;
        }
        .card-notify-btn:hover {
          background-color: #f4f6f1;
          border-color: #d8dfd1;
        }

        /* ── 5. Load More Section ── */
        .load-more-section {
          padding: 24px 32px 32px;
          display: flex;
          justify-content: center;
        }
        .load-more-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          max-width: 340px;
          padding: 11px 20px;
          border-radius: 9999px;
          border: 1px solid #e2e7dc;
          background-color: #ffffff;
          color: #18231c;
          font-family: var(--font-body);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 150ms ease, border-color 150ms ease;
        }
        .load-more-btn:hover {
          background-color: #f4f6f1;
          border-color: #d8dfd1;
        }

        /* ── Empty Box with Constrained Line Length ── */
        .empty-results-box {
          text-align: center;
          padding: 60px 24px;
          background: #ffffff;
          border-radius: 16px;
          margin: 32px 20px;
          border: 1px solid #e2e7dc;
          max-width: 65ch;
          align-self: center;
          width: calc(100% - 40px);
        }
        @media (min-width: 768px) {
          .empty-results-box {
            margin: 40px auto;
          }
        }
        .empty-icon {
          color: #6b7c70;
          margin-bottom: 12px;
        }
        .empty-title {
          font-size: 1.15rem;
          color: #18231c;
          margin: 0 0 6px;
        }
        .empty-desc {
          font-size: 0.84rem;
          color: #526356;
          margin: 0 0 18px;
        }
        .reset-filters-btn {
          padding: 9px 18px;
          border-radius: 9999px;
          background-color: #18231c;
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        /* ── Modals & Drawers ── */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(11, 28, 17, 0.55);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .filter-sheet {
          position: relative;
          width: 100%;
          max-width: min(92vw, 480px);
          max-height: 85vh;
          max-height: 85dvh;
          overflow-y: auto;
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 18px;
          padding: 22px;
          box-shadow: 0 24px 60px rgba(11, 28, 17, 0.22);
          z-index: 10001;
        }

        .filter-sheet__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e2e7dc;
        }
        .filter-sheet__title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #008736;
        }
        .filter-sheet__title-row h3 {
          font-size: 1.05rem;
          margin: 0;
          color: #18231c;
        }
        .close-modal-btn {
          border: none;
          background: transparent;
          color: #526356;
          cursor: pointer;
        }
        .filter-sheet__body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .filter-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #526356;
        }
        .filter-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .filter-chip {
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 600;
          border: 1px solid #e2e7dc;
          background: #f4f6f1;
          color: #18231c;
          cursor: pointer;
        }
        .filter-chip.active {
          background-color: #18231c;
          color: #ffffff;
          border-color: #18231c;
        }
        .filter-checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #18231c;
          cursor: pointer;
        }
        .filter-sheet__footer {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid #e2e7dc;
        }
        .filter-reset-btn {
          flex: 1;
          padding: 11px;
          border-radius: 10px;
          border: 1px solid #e2e7dc;
          background: #ffffff;
          font-weight: 600;
          font-size: 0.84rem;
          color: #526356;
          cursor: pointer;
        }
        .filter-apply-btn {
          flex: 2;
          padding: 11px;
          border-radius: 10px;
          border: none;
          background: #008736;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.84rem;
          cursor: pointer;
        }

        /* Notify modal */
        .notify-modal {
          position: relative;
          width: 100%;
          max-width: min(92vw, 400px);
          max-height: 85vh;
          max-height: 85dvh;
          overflow-y: auto;
          background: #ffffff;
          border: 1px solid #e2e7dc;
          border-radius: 18px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 24px 60px rgba(11, 28, 17, 0.22);
          z-index: 10001;
        }
        .bell-highlight {
          color: #18231c;
          background: #f4f6f1;
          border: 1px solid #e2e7dc;
          padding: 8px;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          margin-bottom: 12px;
        }
        .notify-modal__header h3 {
          margin: 0 0 6px;
          font-size: 1.1rem;
          color: #18231c;
        }
        .notify-modal__header p {
          font-size: 0.78rem;
          color: #526356;
          margin: 0 0 16px;
          line-height: 1.45;
        }
        .notify-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 12px;
        }
        .notify-input {
          padding: 11px 14px;
          border-radius: 10px;
          border: 1px solid #e2e7dc;
          font-size: 0.84rem;
          color: #18231c;
          outline: none;
        }
        .notify-input:focus {
          border-color: #008736;
        }
        .notify-submit-btn {
          padding: 11px;
          border-radius: 10px;
          border: none;
          background-color: #008736;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.84rem;
          cursor: pointer;
        }
        .notify-close-btn {
          background: transparent;
          border: none;
          color: #526356;
          font-size: 0.78rem;
          cursor: pointer;
        }
        .notify-success {
          padding: 16px 0;
        }
        .success-icon {
          color: #008736;
          margin-bottom: 8px;
        }
        .notify-success h4 {
          margin: 0 0 4px;
          color: #18231c;
        }
        .notify-success p {
          margin: 0;
          font-size: 0.76rem;
          color: #526356;
        }
      `}</style>
    </div>
  );
}
