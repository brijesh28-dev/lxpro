import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowUp } from "@tabler/icons-react";
import { useMagneticHover, LUXURY_EASE } from "@/lib/animations";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const magnetic = useMagneticHover(6, 10);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 380;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={magnetic.ref}
          style={{ x: magnetic.x, y: magnetic.y }}
          {...magnetic.bind}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: LUXURY_EASE }}
          className="fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50 pointer-events-auto"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group relative size-11 sm:size-13 rounded-full bg-[#241A15] dark:bg-[#1A130E] hover:bg-[#382A22] dark:hover:bg-[#281D16] border border-[#EAE3D7] dark:border-[#D4AF37]/35 hover:border-[#9A6233] dark:hover:border-[#D4AF37] backdrop-blur-xl flex items-center justify-center text-[#FAF7F2] transition-all shadow-[0_12px_32px_rgba(40,25,15,0.18)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] active:scale-95 cursor-pointer"
          >
            {/* Specular Top Rim */}
            <div className="pointer-events-none absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 dark:via-[#D4AF37]/50 to-transparent" />
            
            {/* Ambient Cognac / Gold Glow on Hover */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[#9A6233]/0 group-hover:bg-[#9A6233]/20 dark:group-hover:bg-[#D4AF37]/20 transition-colors" />

            <motion.div style={{ x: magnetic.innerX, y: magnetic.innerY }}>
              <IconArrowUp className="w-5 h-5 text-[#FAF7F2] dark:text-[#F3E5AB] group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5" />
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

