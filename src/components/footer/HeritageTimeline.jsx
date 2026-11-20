import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconHistory, IconCrown, IconBuildingSkyscraper, IconSparkles, IconWorld } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";

const milestones = [
  {
    year: "1992",
    tag: "Founding",
    title: "The Inception of Laxminarayan",
    location: "Surat Textile District",
    icon: IconHistory,
    desc: "Established with an unrelenting devotion to traditional hand-weaving and pure textiles, establishing our reputation as the region's benchmark for honest luxury.",
  },
  {
    year: "2000",
    tag: "8 Ateliers",
    title: "Expansion: 8 Flagship Ateliers",
    location: "Ghod Dod Rd • Katargam • Varachha • Adajan",
    icon: IconBuildingSkyscraper,
    desc: "Growing to meet the needs of Surat's most discerning families, expanding into dedicated multi-story boutiques with private tailoring fitting suites.",
  },
  {
    year: "2010",
    tag: "Euro Mills",
    title: "European Mill Partnerships",
    location: "Biella (Italy) • Belfast (Ireland)",
    icon: IconWorld,
    desc: "Direct collaborations with legendary mills to introduce Super 150s Australian merino wools and 100% Normandy flaxed Italian linens to Gujarat.",
  },
  {
    year: "2020",
    tag: "Concierge",
    title: "VIP Bespoke Tailoring Concierge",
    location: "Private Styling Chambers",
    icon: IconSparkles,
    desc: "Pioneering private festive appointments, bespoke wedding wardrobe consultations, and doorstep fitting services for high-profile patrons.",
  },
  {
    year: "2025+",
    tag: "Haute Era",
    title: "The LX PRO Contemporary Era",
    location: "Haute Couture & Festive Lines",
    icon: IconCrown,
    desc: "Unveiling modern regal silhouettes, structured imperial safari suites, and high-fashion kurtas that honour our 34-year royal lineage.",
  },
];

export default function HeritageTimeline() {
  const [selectedYear, setSelectedYear] = useState(0);
  const activeMilestone = milestones[selectedYear];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 relative">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-4 shadow-xs"
        >
          <IconHistory className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A5528] font-medium">
            34 Years of Sartorial Mastery
          </span>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1714] font-serif tracking-tight">
          Our Royal Heritage{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Through The Decades
          </span>
        </h2>
      </div>

      {/* ── INTERACTIVE TIMELINE SELECTOR (Years Ribbon) ── */}
      <div className="relative mb-10 max-w-4xl mx-auto">
        {/* Connecting Golden Line */}
        <div className="hidden sm:block absolute top-1/2 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#9A6233]/40 to-transparent -translate-y-1/2 z-0" />

        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 relative z-10 scrollbar-none">
          {milestones.map((m, idx) => {
            const isSelected = selectedYear === idx;
            return (
              <button
                key={m.year}
                type="button"
                onClick={() => setSelectedYear(idx)}
                className="group relative flex flex-col items-center focus:outline-none cursor-pointer shrink-0 px-3 py-2"
              >
                {/* Year Badge */}
                <div 
                  className={`size-11 sm:size-12 rounded-full flex items-center justify-center font-serif text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md ${
                    isSelected
                      ? "bg-[#241A15] text-[#FAF7F2] scale-110 shadow-[0_0_20px_rgba(36,26,21,0.25)] border border-[#241A15]"
                      : "bg-[#FFFFFF] text-[#6B5E55] border border-[#EAE3D7] hover:border-[#9A6233]/50 hover:text-[#1F1714]"
                  }`}
                >
                  {m.year}
                </div>

                {/* Sub-label */}
                <span className={`text-[10px] uppercase tracking-widest mt-2 transition-colors ${
                  isSelected ? "text-[#8A5528] font-semibold" : "text-[#7A6B60] group-hover:text-[#1F1714]"
                }`}>
                  {m.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE MILESTONE CARD SHOWCASE ── */}
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.year}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            className="relative p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EAE3D7] shadow-[0_16px_40px_rgba(60,40,20,0.06)] flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            {/* Top Specular Rim */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#9A6233]/30 to-transparent" />

            {/* Year Stamp */}
            <div className="size-16 sm:size-20 rounded-2xl bg-[#F4EFE6] border border-[#EAE3D7] flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="text-[10px] uppercase tracking-widest text-[#8A5528]">Milestone</span>
              <span className="text-xl sm:text-2xl font-serif text-[#1F1714] font-semibold">{activeMilestone.year}</span>
            </div>

            {/* Narrative Info */}
            <div className="flex-1 text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#8A5528] font-medium">
                {activeMilestone.location}
              </span>
              <h3 className="text-lg sm:text-xl font-serif text-[#1F1714] font-semibold tracking-tight mt-0.5 mb-2">
                {activeMilestone.title}
              </h3>
              <p className="text-sm text-[#6B5E55] font-light leading-relaxed">
                {activeMilestone.desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
