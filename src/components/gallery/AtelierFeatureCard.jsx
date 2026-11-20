import { motion } from "motion/react";
import { 
  IconCrown, 
  IconScissors, 
  IconSparkles, 
  IconArrowUpRight, 
  IconBuildingStore,
  IconCheck
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { SmartLink } from "@/components/common/SmartLink";

export default function AtelierFeatureCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: LUXURY_EASE }}
      className="group relative rounded-2xl overflow-hidden break-inside-avoid border border-[#EAE3D7] hover:border-[#C59B4D]/60 transition-all duration-500 shadow-[0_12px_36px_rgba(40,25,15,0.14)] hover:shadow-[0_20px_50px_rgba(40,25,15,0.22)] bg-gradient-to-br from-[#1C1410] via-[#241A15] to-[#120D0A] text-[#FAF7F2] p-6 sm:p-7 flex flex-col justify-between select-none"
    >
      {/* Specular Top Rim Hairline */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59B4D]/70 to-transparent" />

      {/* Ambient Warm Golden Illumination */}
      <div 
        className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(197,155,77,0.18)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(163,104,56,0.14)_0%,transparent_70%)] blur-2xl"
        aria-hidden="true" 
      />

      {/* Card Content Top */}
      <div className="relative z-10">
        {/* Floating Crown Eyebrow Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-[#C59B4D]/30 backdrop-blur-md">
            <IconCrown className="w-3.5 h-3.5 text-[#C59B4D]" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#E6C99E] font-medium">
              Bespoke Atelier • Est. 1992
            </span>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C59B4D] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C59B4D]" />
          </span>
        </div>

        {/* Cinematic Headline */}
        <h3 className="font-serif text-2xl sm:text-[1.75rem] font-light text-[#FAF7F2] leading-[1.2] mb-3 tracking-tight">
          The Fine Art of{" "}
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#D4A359] via-[#F3DEB3] to-[#B8863B] drop-shadow-[0_2px_12px_rgba(197,155,77,0.25)]">
            Master Craft
          </span>
        </h3>

        {/* Narrative Description */}
        <p className="text-xs sm:text-[13px] text-[#D4C7BA] leading-relaxed font-light mb-6">
          Every silhouette is individually drafted, hand-basted, and structured by master karigars in Surat. Sourced directly from certified Italian flax mills and royal Banarasi brocade looms.
        </p>

        {/* 4 Architectural Highlight Points */}
        <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-6">
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-[#C59B4D]/15 flex items-center justify-center shrink-0">
              <IconCheck className="w-3 h-3 text-[#C59B4D]" />
            </div>
            <span className="text-[11px] text-[#FAF7F2] font-medium">32-Pt Anatomic Fit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-[#C59B4D]/15 flex items-center justify-center shrink-0">
              <IconCheck className="w-3 h-3 text-[#C59B4D]" />
            </div>
            <span className="text-[11px] text-[#FAF7F2] font-medium">Hand-Basted Canvas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-[#C59B4D]/15 flex items-center justify-center shrink-0">
              <IconCheck className="w-3 h-3 text-[#C59B4D]" />
            </div>
            <span className="text-[11px] text-[#FAF7F2] font-medium">European Mill Flaxes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-5 rounded-full bg-[#C59B4D]/15 flex items-center justify-center shrink-0">
              <IconCheck className="w-3 h-3 text-[#C59B4D]" />
            </div>
            <span className="text-[11px] text-[#FAF7F2] font-medium">8 Surat Flagships</span>
          </div>
        </div>
      </div>

      {/* Card Content Bottom / CTA Actions */}
      <div className="relative z-10 pt-2 border-t border-white/[0.08] flex flex-col gap-2.5">
        <SmartLink
          to="/products"
          className="group/btn relative inline-flex items-center justify-between w-full px-5 py-3 rounded-full bg-gradient-to-r from-[#C59B4D] to-[#B8863B] hover:from-[#D4A359] hover:to-[#C59B4D] text-[#1F1714] font-semibold text-xs transition-all duration-300 shadow-[0_4px_16px_rgba(197,155,77,0.25)] hover:shadow-[0_6px_22px_rgba(197,155,77,0.4)] active:scale-[0.98]"
        >
          <span className="tracking-wide">Explore All Haute Collections</span>
          <div className="size-6 rounded-full bg-[#1F1714] text-[#FAF7F2] flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
            <IconArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </SmartLink>

        <a
          href="#branches"
          className="inline-flex items-center justify-center gap-2 text-[11px] text-[#D4C7BA] hover:text-[#FAF7F2] transition-colors py-1 group/loc"
        >
          <IconBuildingStore className="w-3.5 h-3.5 text-[#C59B4D] group-hover/loc:scale-110 transition-transform" />
          <span>Locate Nearest Surat Atelier</span>
        </a>
      </div>
    </motion.div>
  );
}

