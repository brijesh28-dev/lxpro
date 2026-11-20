import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import lxLogo from "@/assets/lxProLogoDark.png";
import lxLogoLight from "@/assets/lxProLogo.png";
import useThemeMode from "@/hooks/useThemeMode";
import { LUXURY_EASE } from "@/lib/animations";

export default function PageLoader({ isVisible, onComplete }) {
  const isDark = useThemeMode();

  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1100);
    return () => clearTimeout(t);
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: LUXURY_EASE }}
          className="fixed inset-0 z-[300] bg-[#FAF7F2] dark:bg-[#0A0705] flex flex-col items-center justify-center gap-6"
          aria-label="Loading LX PRO"
        >
          <motion.img
            src={isDark ? lxLogoLight : lxLogo}
            alt="LX PRO"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            className="h-14 w-auto object-contain"
          />
          <div className="w-48 h-[2px] rounded-full bg-[#EAE3D7] dark:bg-[#2C211A] overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#9A6233] dark:via-[#D4AF37] to-transparent"
            />
          </div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#85766B] dark:text-[#C8BAAC] font-medium">
            The Timeless Luxury
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
