import { motion } from "motion/react";
import {
  IconShieldCheck,
  IconScissors,
  IconCrown,
  IconBuildingStore,
  IconSparkles,
  IconWorld,
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";

const VALUES = [
  {
    icon: IconShieldCheck,
    title: "100% Certified Authentic Fabrics",
    desc: "Imported directly from certified European and Indian heritage mills with guaranteed thread integrity and colorfastness.",
    badge: "Mill Direct",
  },
  {
    icon: IconScissors,
    title: "Master Tailor Precision",
    desc: "Every cut, canvas, lapel, and stitch is guided by master craftsmen with over 25+ years of bespoke tailoring pedigree.",
    badge: "Hand-Finished",
  },
  {
    icon: IconCrown,
    title: "Bespoke Fitting Guarantee",
    desc: "We ensure an uncompromising drape. Includes two milestone fittings and complimentary lifetime alteration support.",
    badge: "Zero Compromise",
  },
  {
    icon: IconBuildingStore,
    title: "8 Flagship Ateliers in Surat",
    desc: "Walk into any of our 8 locations across Surat for fabric sampling, body profiling, and dedicated stylist consultations.",
    badge: "Across Surat",
  },
];

const FABRIC_ORIGINS = [
  { region: "Normandy, France & Ireland", fabric: "Pure Flax Linens", detail: "Naturally breathable, crisp texture, summer luxury" },
  { region: "Biella, Northern Italy", fabric: "Super 150s Merino Wool", detail: "Lightweight suiting, fluid drape, wrinkle recovery" },
  { region: "Varanasi, India", fabric: "Hand-Loomed Banarasi Zari", detail: "Pure silk with gold zari for royal wedding ceremonies" },
  { region: "Giza, Egypt", fabric: "Long-Staple Egyptian Cotton", detail: "Silky smooth handfeel for executive formal shirting" },
];

export default function CraftsmanshipGrid() {
  return (
    <div className="mb-20 sm:mb-28">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] mb-4 shadow-xs"
        >
          <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
            Our Standards
          </span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1714] tracking-[-0.02em] font-serif"
        >
          The Four Pillars of{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            LX PRO Craftsmanship
          </span>
        </motion.h3>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-14">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: LUXURY_EASE }}
            className="group relative flex flex-col p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#FFFFFF] border border-[#EAE3D7] hover:border-[#9A6233]/50 hover:bg-[#FAF7F2] transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_24px_rgba(60,40,20,0.05)] hover:shadow-[0_16px_36px_rgba(60,40,20,0.10)]"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-5">
              <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] group-hover:bg-[#241A15] group-hover:text-[#FAF7F2] transition-colors duration-300">
                <v.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-[#8A5528] px-2 sm:px-2.5 py-0.5 rounded-full bg-[#F4EFE6] border border-[#EAE3D7]">
                {v.badge}
              </span>
            </div>
            <h4 className="text-[#1F1714] font-serif text-sm sm:text-lg font-normal mb-1 sm:mb-2 leading-snug">
              {v.title}
            </h4>
            <p className="text-[#6B5E55] text-[11px] sm:text-xs font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
              {v.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Fabric Sourcing Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#EAE3D7] bg-[#FFFFFF] shadow-sm relative overflow-hidden"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <IconWorld className="w-4 h-4 text-[#9A6233]" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#8A5528] font-semibold">
            Global Mill Partnerships
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FABRIC_ORIGINS.map((item, idx) => (
            <div key={idx} className="border-l border-[#EAE3D7] pl-3 sm:pl-4">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#7A6B60] block mb-0.5">
                {item.region}
              </span>
              <h5 className="text-[#1F1714] text-xs sm:text-sm font-semibold mb-1 truncate">{item.fabric}</h5>
              <p className="text-[#6B5E55] text-[11px] sm:text-xs font-light leading-relaxed line-clamp-2 sm:line-clamp-none">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

