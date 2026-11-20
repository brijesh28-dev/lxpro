import { useState, lazy, Suspense } from "react";
import { motion } from "motion/react";
import {
  IconPhone,
  IconSparkles,
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { locations } from "@/config/locations";

const InteractiveMap = lazy(() => import("./InteractiveMap"));

export default function BranchesSection() {
  const [selectedId, setSelectedId] = useState("lxpro");

  const handleSelectLocation = (id) => {
    setSelectedId(id);
  };

  return (
    <section
      id="branches"
      className="relative w-full py-20 sm:py-28 overflow-hidden border-t border-[#EAE3D7]"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -bottom-20 left-1/2 w-[850px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(163,104,56,0.06)_0%,transparent_70%)] transform-gpu -z-10 -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-5 shadow-xs"
          >
            <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
              8 Flagship Ateliers Across Surat
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight mb-4 font-serif"
          >
            Find Your Nearest{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
              Atelier
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASE }}
            className="text-[#6B5E55] text-sm sm:text-base font-light max-w-xl leading-relaxed"
          >
            Eight premium locations across Surat, each offering the full LX PRO experience — bespoke tailoring, rare European fabric selection, and master fittings.
          </motion.p>
        </div>

        {/* Interactive Store Locator (Map on Left + Atelier List on Right) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mb-6"
        >
          <Suspense
            fallback={
              <div className="w-full h-[520px] rounded-2xl bg-[#F4EFE6]/60 dark:bg-[#1A120C]/60 border border-[#EAE3D7] dark:border-[#3D2C22] flex flex-col items-center justify-center gap-3 animate-pulse">
                <span className="size-2 rounded-full bg-[#9A6233] animate-ping" />
                <span className="text-xs uppercase tracking-widest text-[#8A5528]">
                  Loading Surat Atelier Map...
                </span>
              </div>
            }
          >
            <InteractiveMap
              locations={locations}
              selectedId={selectedId}
              onSelectLocation={handleSelectLocation}
            />
          </Suspense>
        </motion.div>

        {/* Bottom Helpline & Concierge Ribbon (Task 20) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-14 pt-8 border-t border-[#EAE3D7]"
        >
          <div className="size-8 rounded-full bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233]">
            <IconPhone className="w-4 h-4" />
          </div>
          <span className="text-[#6B5E55] text-sm">Direct Atelier Helpline:</span>
          <a
            href="tel:7600050236"
            className="text-[#1F1714] font-serif text-base font-medium hover:text-[#9A6233] transition-colors"
          >
            +91 76000 50236
          </a>
          <span className="text-[#D9CFC3] hidden sm:inline">•</span>
          <span className="text-[#7A6B60] text-xs sm:text-sm">
            Daily 10:00 AM – 9:00 PM IST across all 8 Surat locations
          </span>
        </motion.div>
      </div>
    </section>
  );
}
