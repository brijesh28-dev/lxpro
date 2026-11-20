import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import useThemeMode from "@/hooks/useThemeMode";

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const hoveringRef = useRef(false);
  const isDark = useThemeMode();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  useEffect(() => {
    // Only enable on desktop pointer devices without touch capability
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isFinePointer || hasTouch) return;

    let rafId = null;
    let pendingX = -500;
    let pendingY = -500;
    let pendingTarget = null;

    const flush = () => {
      mouseX.set(pendingX);
      mouseY.set(pendingY);

      if (pendingTarget) {
        const isHover = Boolean(
          pendingTarget.closest("button") ||
          pendingTarget.closest("a") ||
          pendingTarget.closest("[role='button']") ||
          pendingTarget.closest(".interactive-target")
        );
        if (isHover !== hoveringRef.current) {
          hoveringRef.current = isHover;
          setIsHoveringInteractive(isHover);
        }
      }
      rafId = null;
    };

    const handleMouseMove = (e) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      pendingTarget = e.target;
      if (!isVisible) setIsVisible(true);

      if (!rafId) {
        rafId = requestAnimationFrame(flush);
      }
    };

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const lightBg = isHoveringInteractive
    ? "radial-gradient(circle, rgba(163, 104, 56, 0.12) 0%, rgba(197, 155, 77, 0.05) 45%, transparent 70%)"
    : "radial-gradient(circle, rgba(163, 104, 56, 0.06) 0%, rgba(197, 155, 77, 0.02) 50%, transparent 75%)";

  const darkBg = isHoveringInteractive
    ? "radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.06) 45%, transparent 70%)"
    : "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 50%, transparent 75%)";

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-40 -translate-x-1/2 -translate-y-1/2 rounded-full transform-gpu will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
        width: isHoveringInteractive ? 240 : 160,
        height: isHoveringInteractive ? 240 : 160,
        background: isDark ? darkBg : lightBg,
        transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
      }}
    />
  );
}

