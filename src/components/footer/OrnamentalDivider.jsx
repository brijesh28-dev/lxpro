import { motion } from "motion/react";

export default function OrnamentalDivider({ className = "" }) {
  return (
    <div className={`w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-center relative ${className}`}>
      {/* Left Hairline Gradient */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#9A6233]/25 to-[#9A6233]/60" />

      {/* Central Heritage Filigree Motif */}
      <div className="px-4 flex items-center gap-2 shrink-0">
        <span className="size-1 rounded-full bg-[#9A6233]/60" />
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-[#9A6233] drop-shadow-[0_0_8px_rgba(154,98,51,0.25)]"
        >
          <path 
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="rgba(154, 98, 51, 0.12)"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
        <span className="size-1 rounded-full bg-[#9A6233]/60" />
      </div>

      {/* Right Hairline Gradient */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#9A6233]/25 to-[#9A6233]/60" />
    </div>
  );
}
