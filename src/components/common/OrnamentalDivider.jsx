import { motion } from "motion/react";
import { LUXURY_EASE } from "@/lib/animations";
export default function OrnamentalDivider() {
  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.8,ease:LUXURY_EASE}} className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex items-center gap-4">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#9A6233]/25 dark:to-[#D4AF37]/50" />
      <span className="text-[#9A6233]/40 dark:text-[#D4AF37]/80 text-xs select-none">✦</span>
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#9A6233]/25 dark:to-[#D4AF37]/50" />
    </motion.div>
  );
}
