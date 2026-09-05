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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-40 w-full transition-all duration-300", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible
          ? "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 135, 54, 0.15)"
          : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        width: visible ? "75%" : "100%",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 40,
      }}
      style={{
        minWidth: visible ? "760px" : "auto",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-5 py-2.5 transition-all lg:flex",
        visible ? "bg-white/95 text-neutral-900 border border-[#008736]/20 shadow-md" : "bg-white text-neutral-900 border-b border-neutral-200/80",
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
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden flex-1 flex-row items-center justify-center space-x-1 text-xs font-semibold text-neutral-700 transition duration-200 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-3 py-1.5 rounded-full text-neutral-700 hover:text-[#008736] transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[#008736]/10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-20 font-medium">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible
          ? "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 135, 54, 0.15)"
          : "none",
        width: visible ? "94%" : "100%",
        borderRadius: visible ? "1rem" : "0",
        y: visible ? 6 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 40,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-white px-4 py-2.5 lg:hidden border-b border-neutral-200",
        visible && "bg-white/95 border border-[#008736]/20 shadow-md",
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
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-full mt-2 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-xl bg-white p-6 shadow-xl border border-neutral-200",
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
        <IconX className="w-6 h-6 text-neutral-900" />
      ) : (
        <IconMenu2 className="w-6 h-6 text-neutral-900" />
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
  if (children) {
    return (
      <a
        href={href}
        className={cn("relative z-20 flex items-center space-x-2 text-sm font-normal text-neutral-900", className)}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn("relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-neutral-900", className)}
    >
      <img
        src="/logos/crrdc-logo.png"
        alt="CRRDC Logo"
        width={32}
        height={32}
        className="object-contain"
      />
      <span className="font-bold text-[#008736]">CRRDC</span>
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
    "px-3.5 py-1.5 rounded-full text-xs font-semibold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center gap-1.5 text-center";

  const variantStyles = {
    primary:
      "bg-[#008736] text-white hover:bg-[#124d26] shadow-sm shadow-[#008736]/20",
    secondary:
      "bg-[#008736]/10 text-[#008736] hover:bg-[#008736]/15 border border-[#008736]/20",
    dark:
      "bg-neutral-900 text-white hover:bg-neutral-800",
    gradient:
      "bg-gradient-to-r from-[#008736] to-[#124d26] text-white shadow-sm",
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
