import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSmartNavigate, isSamePage } from "@/components/common/SmartLink";

export const Navbar = ({
  children,
  className
}) => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

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
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full px-3 sm:px-6 pt-2.5 sm:pt-4 flex justify-center pointer-events-none",
        className
      )}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              visible,
              className: cn(child.props.className, "pointer-events-auto"),
            })
          : child)}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible
}) => {
  return (
    <div
      style={{
        backgroundColor: visible ? "var(--nav-bg)" : "var(--nav-bg-top)",
        borderColor: visible ? "var(--nav-border)" : "var(--nav-border-top)",
        boxShadow: visible ? "var(--nav-shadow)" : "var(--nav-shadow-top)",
        transform: visible ? "translateY(14px)" : "translateY(0px)",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden flex-row items-center justify-between rounded-full border px-8 backdrop-blur-xl transition-[max-width,padding,transform,background-color,border-color,box-shadow] duration-300 ease-out lg:flex",
        visible ? "max-w-5xl py-2.5" : "w-full max-w-7xl py-4",
        className
      )}>
      {/* Specular glass reflection rim along top edge */}
      <div 
        className={cn(
          "pointer-events-none absolute inset-x-8 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-white/90 to-transparent transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-75"
        )} 
      />
      {/* Subtle bottom bevel reflection */}
      <div 
        className={cn(
          "pointer-events-none absolute inset-x-12 bottom-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-[#EAE3D7] to-transparent transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-60"
        )} 
      />

      {React.Children.map(children, (child) =>
        React.isValidElement(child) && typeof child.type !== "string"
          ? React.cloneElement(child, { visible })
          : child)}
    </div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick
}) => {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const smartNavigate = useSmartNavigate();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative flex flex-row items-center justify-center space-x-1 lg:space-x-2 text-[15px] font-medium shrink-0",
        className
      )}>
      {items.map((item, idx) => {
        const isActive = isSamePage(location.pathname, item.link);
        return (
          <a
            key={`link-${idx}`}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={smartNavigate(item.link, onItemClick)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "relative px-4 py-2 transition-colors text-[14px] tracking-wide font-medium whitespace-nowrap shrink-0",
              isActive
                ? "text-[#1F1714] dark:text-[#FAF7F2] font-semibold"
                : "text-[#6B5E55] dark:text-[#C4B7AB] hover:text-[#1F1714] dark:hover:text-[#FAF7F2]"
            )}
          >
            {hovered === idx && (
              <motion.div
                layoutId="nav-item-hover"
                className="absolute inset-0 h-full w-full rounded-full bg-white/75 dark:bg-[#2C2018]/85 border border-white/80 dark:border-[#4A382C] shadow-xs backdrop-blur-md"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <span className="relative z-20 whitespace-nowrap">
              {item.name}
            </span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible
}) => {
  return (
    <div
      style={{
        backgroundColor: visible ? "var(--mobile-nav-bg)" : "var(--mobile-nav-bg-top)",
        borderColor: visible ? "var(--nav-border)" : "var(--nav-border-top)",
        boxShadow: visible ? "var(--nav-shadow)" : "var(--nav-shadow-top)",
        transform: visible ? "translateY(6px)" : "translateY(0px)",
      }}
      className={cn(
        "relative z-50 mx-auto flex max-w-[calc(100vw-1.5rem)] flex-col items-center justify-between rounded-full border px-3 sm:px-4 backdrop-blur-xl transition-[width,padding,transform,background-color,border-color,box-shadow] duration-300 ease-out lg:hidden",
        visible ? "w-[94%] py-2" : "w-full py-3",
        className
      )}>
      {/* Specular glass reflection rim */}
      <div 
        className={cn(
          "pointer-events-none absolute inset-x-6 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-white/90 to-transparent transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-75"
        )} 
      />

      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child)}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
  visible
}) => {
  return (
    <div
      className={cn("flex w-full flex-row items-center justify-between", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && typeof child.type !== "string"
          ? React.cloneElement(child, { visible, isMobile: true })
          : child)}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dimmed backdrop scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#1F1714]/30 backdrop-blur-xs pointer-events-auto"
            aria-hidden="true"
          />

          {/* Menu Drawer Container */}
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              backdropFilter: "blur(28px) saturate(190%)",
              WebkitBackdropFilter: "blur(28px) saturate(190%)",
            }}
            className={cn(
              "absolute inset-x-0 top-full mt-2.5 z-50 flex w-full max-h-[calc(100dvh-5.5rem)] overflow-y-auto flex-col items-start justify-start gap-4 rounded-3xl bg-[#FFFEFC]/98 dark:bg-[#16110E]/98 border border-[#EAE3D7] dark:border-[#38281F] p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(70,45,20,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] pointer-events-auto",
              className
            )}>
            <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] rounded-t-3xl bg-gradient-to-r from-transparent via-white/80 dark:via-[#C59B4D]/30 to-transparent" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick
}) => {
  return (
    <button 
      type="button" 
      onClick={onClick}
      className="p-2 rounded-xl text-[#1F1714] dark:text-[#FAF7F2] hover:bg-[#F4EFE6] dark:hover:bg-[#2A1E17] transition-colors cursor-pointer touch-manipulation"
      aria-label="Toggle navigation menu"
    >
      {isOpen ? (
        <IconX className="w-5 h-5 text-current" />
      ) : (
        <IconMenu2 className="w-5 h-5 text-current" />
      )}
    </button>
  );
};

export const NavbarLogo = ({
  href = "/",
  logoSrc,
  logoDarkSrc,
  logoLightSrc,
  title = "LX PRO",
  className,
  imgClassName,
  visible = false,
  isMobile = false,
  onClick
}) => {
  const smartNavigate = useSmartNavigate();
  const hasDualLogos = Boolean(logoDarkSrc && logoLightSrc);

  return (
    <a
      href={href}
      onClick={smartNavigate(href, onClick)}
      className={cn("relative z-20 flex items-center space-x-3 px-2 py-1 text-base font-semibold text-[#1F1714] dark:text-[#FAF7F2] shrink-0 group", className)}>
      {hasDualLogos ? (
        <>
          {/* Dark logo for Light Theme: crisp, deep espresso/charcoal on crystal glass */}
          <img
            src={logoDarkSrc}
            alt={title}
            className={cn(
              "w-auto object-contain shrink-0 transition-all duration-300 group-hover:scale-105 block dark:hidden drop-shadow-xs",
              visible ? (isMobile ? "h-7.5" : "h-9") : (isMobile ? "h-9" : "h-11 sm:h-12"),
              imgClassName
            )}
          />
          {/* Light/Gold logo for Dark Theme: radiant champagne on obsidian glass */}
          <img
            src={logoLightSrc}
            alt={title}
            className={cn(
              "w-auto object-contain shrink-0 transition-all duration-300 group-hover:scale-105 hidden dark:block drop-shadow-[0_1px_8px_rgba(212,175,55,0.22)]",
              visible ? (isMobile ? "h-7.5" : "h-9") : (isMobile ? "h-9" : "h-10 sm:h-12"),
              imgClassName
            )}
          />
        </>
      ) : logoSrc ? (
        <img
          src={logoSrc}
          alt={title}
          className={cn(
            "w-auto object-contain shrink-0 transition-all duration-300 group-hover:scale-105",
            visible ? (isMobile ? "h-7.5" : "h-9") : (isMobile ? "h-9" : "h-11 sm:h-12"),
            imgClassName
          )}
        />
      ) : (
        <span className="font-bold text-[#1F1714] dark:text-[#FAF7F2] text-lg tracking-wider">
          {title}
        </span>
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
  onClick,
  ...props
}) => {
  const smartNavigate = useSmartNavigate();
  const baseStyles =
    "text-[14px] font-semibold tracking-wide transition-all duration-200 inline-flex items-center justify-center text-center cursor-pointer whitespace-nowrap shrink-0";

  const variantStyles = {
    primary:
      "rounded-full bg-[#241A15] text-[#FAF7F2] hover:bg-[#3D2C24] dark:bg-[#C59B4D] dark:text-[#0E0A08] dark:hover:bg-[#D4AF37] px-5 py-2.5 shadow-md shadow-[#241A15]/15 dark:shadow-[#C59B4D]/20 active:scale-95 transition-all font-medium",
    secondary: 
      "rounded-full text-[#241A15] dark:text-[#FAF7F2] hover:text-[#1F1714] dark:hover:text-white bg-white/70 hover:bg-white/95 dark:bg-[#2A1E17]/80 dark:hover:bg-[#3A2B21] border border-white/80 hover:border-[#E4DBD0] dark:border-[#4A382C] dark:hover:border-[#C59B4D]/50 px-4 py-2.5 backdrop-blur-md shadow-xs transition-all font-medium",
  };

  const handleClick = href && Tag === "a" ? smartNavigate(href, onClick) : onClick;

  return (
    <Tag
      href={href || undefined}
      onClick={handleClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}>
      {children}
    </Tag>
  );
};

