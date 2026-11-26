"use client";

// components/layout/Masthead.tsx — N6 Masthead nav (Hallmark nav archetype)
// N6: wide institutional horizontal bar, wordmark left, links center, cart hover preview + Admin Login right
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, UserCheck, LogIn, ArrowRight, Trash2, Sprout, Landmark, Heart, User } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPHP, breakdownRiceQty } from "@/types";
import { useLanguage } from "./LanguageContext";

export default function Masthead() {
  const pathname = usePathname();
  const { items, totalItems, totalPHP, removeItem } = useCart();
  const { t } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const cartTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setCartOpen(false);
  }, [pathname]);

  // Wishlist count synchronization across pages
  useEffect(() => {
    const updateWishlist = () => {
      try {
        const saved = localStorage.getItem("crrdc-wishlist");
        if (saved) {
          const list = JSON.parse(saved);
          setWishlistCount(Array.isArray(list) ? list.length : 0);
        } else {
          setWishlistCount(0);
        }
      } catch {
        setWishlistCount(0);
      }
    };

    updateWishlist();
    window.addEventListener("crrdc-wishlist-updated", updateWishlist);
    window.addEventListener("storage", updateWishlist);
    return () => {
      window.removeEventListener("crrdc-wishlist-updated", updateWishlist);
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  const handleOpenCart = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === "/shop" || pathname.startsWith("/catalog")) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("crrdc-open-cart"));
    }
  };

  const handleOpenFavorites = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === "/shop" || pathname.startsWith("/catalog")) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("crrdc-open-favorites"));
    }
  };

  const handleMouseEnterCart = () => {
    if (cartTimerRef.current) clearTimeout(cartTimerRef.current);
    setCartOpen(true);
  };

  const handleMouseLeaveCart = () => {
    cartTimerRef.current = setTimeout(() => {
      setCartOpen(false);
    }, 200);
  };

  const isAdminPath = pathname.startsWith("/admin");

  return (
    <>
      <header
        className="masthead"
        data-scrolled={scrolled}
        aria-label="Site header"
      >
        <div className="masthead__inner">
          {/* Wordmark & Official Logos — left */}
          <Link href="/" className="masthead__wordmark" aria-label="CRRDC home">
            <div className="masthead__brand-row">
              <img
                src="/images/crrdc-logo.png"
                alt="CRRDC Logo"
                className="masthead__logo-img"
              />
              <span className="masthead__logo-block" aria-hidden="true">
                <span className="masthead__logo-clsu">CLSU</span>
                <span className="masthead__logo-dot">·</span>
                <span className="masthead__logo-crrdc">CRRDC</span>
              </span>
            </div>
            <span className="masthead__tagline">{t("tagline")}</span>
          </Link>

          {/* Right actions */}
          <div className="masthead__actions">
            {/* 1. "How Ordering Works" Button */}
            <Link
              href="/how-ordering-works"
              className="masthead__ordering-btn"
              aria-label="How Ordering Works"
            >
              How Ordering Works
            </Link>

            {/* 2. Icon Buttons Group */}
            <div className="masthead__icon-group">
              {/* Favorites Button */}
              <Link
                href="/shop?openFavorites=true"
                onClick={handleOpenFavorites}
                className="masthead__icon-btn"
                aria-label={`Favorites (${wishlistCount} saved)`}
                title="Your Favorites"
              >
                <Heart
                  size={18}
                  className={wishlistCount > 0 ? "is-favorited" : ""}
                  fill={wishlistCount > 0 ? "var(--color-error)" : "none"}
                  stroke="currentColor"
                  aria-hidden="true"
                />
                {wishlistCount > 0 && (
                  <span className="masthead__badge masthead__badge--error" aria-hidden="true">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <Link
                href="/cart"
                onClick={handleOpenCart}
                className="masthead__icon-btn"
                aria-label={`Shopping cart (${totalItems} items)`}
                title="Shopping Cart"
              >
                <ShoppingCart size={18} stroke="currentColor" aria-hidden="true" />
                {totalItems > 0 && (
                  <span className="masthead__badge masthead__badge--accent" aria-hidden="true">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>

              {/* User / Admin Button */}
              <Link
                href={isAdminPath ? "/admin/dashboard" : "/admin/login"}
                className="masthead__icon-btn"
                aria-label={isAdminPath ? "Admin Dashboard" : "Admin Login"}
                title={isAdminPath ? "Admin Dashboard" : "Admin Account"}
              >
                <User size={18} stroke="currentColor" aria-hidden="true" />
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="masthead__menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <nav
        id="mobile-nav"
        className="masthead__mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        data-open={menuOpen}
      >
        <ul className="masthead__mobile-list" role="list">
          <li>
            <Link
              href="/how-ordering-works"
              className="masthead__mobile-link"
              tabIndex={menuOpen ? 0 : -1}
            >
              <span>How Ordering Works</span>
            </Link>
          </li>
          <li>
            <Link
              href="/shop?openFavorites=true"
              onClick={handleOpenFavorites}
              className="masthead__mobile-link"
              tabIndex={menuOpen ? 0 : -1}
            >
              <Heart size={18} aria-hidden="true" />
              <span>Favorites ({wishlistCount})</span>
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              onClick={handleOpenCart}
              className="masthead__mobile-link"
              tabIndex={menuOpen ? 0 : -1}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              <span>{t("cart")} ({totalItems})</span>
            </Link>
          </li>
          <li>
            {isAdminPath ? (
              <Link
                href="/admin/dashboard"
                className="masthead__mobile-link masthead__mobile-link--admin"
                tabIndex={menuOpen ? 0 : -1}
              >
                <UserCheck size={18} aria-hidden="true" />
                <span>{t("adminDashboard")}</span>
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="masthead__mobile-link masthead__mobile-link--admin"
                tabIndex={menuOpen ? 0 : -1}
              >
                <User size={18} aria-hidden="true" />
                <span>{t("adminLogin")}</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <style>{`
        .masthead {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          display: flex;
          justify-content: center;
          height: 4.5rem;
          pointer-events: none;
        }
        .masthead__inner {
          pointer-events: auto;
          width: 100%;
          max-width: 100%;
          height: 4.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-6);
          padding-inline: var(--gutter);
          background-color: rgba(251, 252, 249, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid transparent;
          border-bottom-color: var(--color-border);
          border-radius: 0;
          box-shadow: 0 0 0 0 transparent;
          transform: translateY(0);
          will-change: transform, max-width, border-radius;
          transition: max-width 360ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-radius 360ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform 360ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 360ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 360ms cubic-bezier(0.16, 1, 0.3, 1),
                      padding 360ms cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .masthead[data-scrolled="true"] .masthead__inner,
        .masthead.is-floating .masthead__inner {
          max-width: min(72rem, calc(100% - 1.5rem));
          transform: translateY(0.7rem);
          border-color: var(--color-border);
          border-radius: 9999px;
          box-shadow: 0 8px 28px rgba(24, 35, 28, 0.08);
          padding-inline: 1.5rem;
          background-color: rgba(255, 255, 255, 0.96);
        }
        .masthead__wordmark {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-decoration: none;
          flex-shrink: 0;
          line-height: 1;
        }
        .masthead__brand-row {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }
        .masthead__logo-img {
          height: 34px;
          width: auto;
          object-fit: contain;
        }
        .masthead__logo-block {
          display: flex;
          align-items: baseline;
          gap: 0.35em;
          font-family: var(--font-display);
        }
        .masthead__logo-clsu {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: -0.01em;
        }
        .masthead__logo-dot {
          color: var(--color-ink-3);
          font-size: var(--text-sm);
        }
        .masthead__logo-crrdc {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-ink);
          letter-spacing: -0.01em;
        }
        .masthead__tagline {
          font-size: 0.7rem;
          color: var(--color-ink-2);
          font-family: var(--font-body);
          letter-spacing: 0.01em;
        }

        /* Actions */
        .masthead__actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* "How Ordering Works" Text Button */
        .masthead__ordering-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background-color: var(--color-paper-2);
          color: var(--color-ink);
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
          flex-shrink: 0;
          transition: background-color 160ms var(--ease-out),
                      border-color 160ms var(--ease-out),
                      color 160ms var(--ease-out);
        }
        .masthead__ordering-btn:hover,
        .masthead__ordering-btn:focus-visible {
          background-color: var(--color-ink);
          border-color: var(--color-ink);
          color: #ffffff;
        }
        .masthead__ordering-btn:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        /* Shared Icon Button Group */
        .masthead__icon-group {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        /* Shared Icon Button Style: Favorites, Cart, User */
        .masthead__icon-btn {
          width: 36px;
          height: 36px;
          min-width: 36px;
          min-height: 36px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background-color: var(--color-paper-2);
          color: var(--color-ink);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          padding: 0;
          text-decoration: none;
          line-height: 1;
          transition: background-color 160ms var(--ease-out),
                      border-color 160ms var(--ease-out),
                      color 160ms var(--ease-out);
        }
        .masthead__icon-btn:hover,
        .masthead__icon-btn:focus-visible {
          background-color: var(--color-ink);
          border-color: var(--color-ink);
          color: #ffffff;
        }
        .masthead__icon-btn:hover :global(svg),
        .masthead__icon-btn:focus-visible :global(svg) {
          stroke: #ffffff;
        }
        .masthead__icon-btn:hover :global(svg.is-favorited),
        .masthead__icon-btn:focus-visible :global(svg.is-favorited) {
          fill: #ffffff;
          stroke: #ffffff;
        }
        .masthead__icon-btn:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        /* Notification Badges */
        .masthead__badge {
          position: absolute;
          top: -2px;
          right: -2px;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          border-radius: var(--radius-full);
          font-size: 0.65rem;
          font-weight: 800;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #ffffff;
          pointer-events: none;
        }
        .masthead__badge--accent {
          background-color: var(--color-primary);
          color: #ffffff;
        }
        .masthead__badge--error {
          background-color: var(--color-error);
          color: #ffffff;
        }

        .masthead__menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          background-color: var(--color-paper-2);
          color: var(--color-ink);
          cursor: pointer;
          transition: background-color 160ms var(--ease-out),
                      border-color 160ms var(--ease-out),
                      color 160ms var(--ease-out);
        }
        .masthead__menu-toggle:hover,
        .masthead__menu-toggle:focus-visible {
          background-color: var(--color-ink);
          border-color: var(--color-ink);
          color: #ffffff;
        }

        .masthead__mobile-nav {
          display: none;
          position: fixed;
          top: 4.5rem;
          inset-inline: 0;
          background-color: #fbfcf9;
          border-bottom: 1px solid var(--color-border);
          box-shadow: 0 12px 32px rgba(24, 35, 28, 0.08);
          z-index: 499;
          transform: translateY(-100%);
          opacity: 0;
          transition: transform var(--dur-slow) var(--ease-out), opacity var(--dur-slow) var(--ease-out);
          pointer-events: none;
        }
        .masthead__mobile-nav[data-open="true"] {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }
        .masthead__mobile-list {
          list-style: none;
          margin: 0;
          padding: var(--space-4) var(--gutter);
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .masthead__mobile-link {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-5);
          border-radius: var(--radius-md);
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--color-ink);
          text-decoration: none;
        }
        .masthead__mobile-link:hover {
          background-color: var(--color-paper-2);
        }
        .masthead__mobile-link--admin {
          color: #ffffff;
          font-weight: 600;
          background-color: var(--color-ink);
          margin-top: var(--space-2);
        }

        @media (max-width: 900px) {
          .masthead__menu-toggle { display: flex; }
          .masthead__mobile-nav { display: block; }
          .masthead__actions { gap: 8px; }
          .masthead__icon-group { gap: 6px; }
        }
        @media (max-width: 640px) {
          .masthead__inner {
            gap: 8px;
            padding-inline: 12px;
          }
          .masthead[data-scrolled="true"] .masthead__inner,
          .masthead.is-floating .masthead__inner {
            max-width: calc(100% - 1rem);
            padding-inline: 12px;
          }
          .masthead__wordmark {
            min-width: 0;
          }
          .masthead__ordering-btn,
          .masthead__icon-group {
            display: none;
          }
          .masthead__actions { gap: 6px; }
          .masthead__menu-toggle {
            width: 36px;
            height: 36px;
          }
        }
        @media (max-width: 480px) {
          .masthead__tagline { display: none; }
          .masthead__logo-img { height: 28px; }
          .masthead__logo-clsu,
          .masthead__logo-crrdc { font-size: var(--text-base); }
          .masthead__actions { gap: 5px; }
        }
        @media (max-width: 380px) {
          .masthead__inner {
            padding-inline: 10px;
          }
          .masthead__logo-img { height: 26px; }
          .masthead__logo-clsu,
          .masthead__logo-crrdc { font-size: 0.95rem; }
          .masthead__actions { gap: 4px; }
        }
      `}</style>
    </>
  );
}
