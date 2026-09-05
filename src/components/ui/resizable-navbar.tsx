"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 40) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.header>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "68%" : "100%",
        y: visible ? 12 : 0,
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.92)"
          : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(16px)",
        boxShadow: visible
          ? "0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)"
          : "0 1px 0 0 rgba(0, 0, 0, 0.06)",
        borderRadius: visible ? "9999px" : "0px",
        paddingLeft: visible ? "1.5rem" : "2rem",
        paddingRight: visible ? "1.5rem" : "2rem",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 32,
      }}
      style={{
        minWidth: visible ? "720px" : "100%",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden max-w-7xl flex-row items-center justify-between py-3 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden flex-1 flex-row items-center justify-center space-x-1 text-xs font-medium text-neutral-600 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-3.5 py-1.5 text-neutral-600 transition-colors hover:text-neutral-900"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered-pill"
              className="absolute inset-0 h-full w-full rounded-full bg-neutral-100"
              transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "92%" : "100%",
        y: visible ? 8 : 0,
        borderRadius: visible ? "1rem" : "0px",
        boxShadow: visible
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)"
          : "0 1px 0 0 rgba(0, 0, 0, 0.06)",
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(14px)",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 32,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between px-4 py-3 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-full mt-2 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-2xl border border-neutral-200/80 bg-white/95 p-6 shadow-xl backdrop-blur-md",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      className="p-1.5 rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors"
    >
      {isOpen ? (
        <IconX className="w-5 h-5 text-neutral-900" />
      ) : (
        <IconMenu2 className="w-5 h-5 text-neutral-900" />
      )}
    </button>
  );
};

export const NavbarLogo = ({
  href = "/",
  children,
  className,
}: {
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "relative z-20 flex items-center gap-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90",
        className,
      )}
    >
      {children || (
        <>
          <div className="flex items-center gap-1.5">
            <img
              src="/logos/clsu-logo.png"
              alt="CLSU Seal"
              className="h-7 w-7 object-contain"
            />
            <img
              src="/logos/crrdc-logo.png"
              alt="CRRDC Logo"
              className="h-7 w-7 object-contain"
            />
          </div>
          <span className="font-bold tracking-tight text-neutral-900">
            CRRDC
            <span className="ml-1.5 hidden text-[11px] font-normal text-neutral-500 xl:inline">
              CLSU
            </span>
          </span>
        </>
      )}
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-1.5 rounded-full text-xs font-medium relative cursor-pointer active:scale-[0.98] transition-all duration-150 inline-flex items-center justify-center gap-1.5 text-center";

  const variantStyles = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm",
    secondary:
      "bg-neutral-100 text-neutral-800 hover:bg-neutral-200/80 border border-neutral-200/70",
    dark:
      "bg-neutral-900 text-white hover:bg-neutral-800",
    gradient:
      "bg-[#008736] text-white hover:bg-[#00702d] shadow-sm",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
