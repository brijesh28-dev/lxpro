import { useScroll, motion } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[1.5px] z-[200] bg-[#9A6233]/40 dark:bg-gradient-to-r dark:from-[#AA771C] dark:via-[#D4AF37] dark:to-[#FFF0CA] pointer-events-none transform-gpu will-change-transform"
      aria-hidden="true"
    />
  );
}
