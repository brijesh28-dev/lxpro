import { motion } from "motion/react";
import { 
  IconCertificate, 
  IconScissors, 
  IconSparkles, 
  IconShieldCheck,
  IconCrown
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";

export default function CraftsmanshipSeal() {
  const promises = [
    {
      icon: IconCertificate,
      title: "100% Curated Mill Fabrics",
      desc: "Pure Italian linens, Irish flax, raw Banarasi silks, and European super-wools sourced directly from certified heritage mills.",
    },
    {
      icon: IconScissors,
      title: "Master Tailor Precision",
      desc: "Over three decades of bespoke bespoke pattern cutting, ensuring your silhouette drapes with effortless regal poise.",
    },
    {
      icon: IconSparkles,
      title: "Personalized Ateliers",
      desc: "Private trial chambers and bespoke stylists across all 8 Surat flagships for weddings, festivals, and black-tie galas.",
    },
    {
      icon: IconShieldCheck,
      title: "Lifetime Fitting Support",
      desc: "Enduring sartorial care. Complimentary seam adjustments and seasonal alterations for all bespoke creations.",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 relative">
      {/* Background Ambient Warmth */}
      <div 
        className="pointer-events-none absolute inset-0 max-w-3xl mx-auto rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] blur-3xl -z-10" 
        aria-hidden="true" 
      />

      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-4 shadow-xs"
        >
          <IconCrown className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A5528] font-medium">
            The LX PRO Craftsmanship Guarantee
          </span>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1714] font-serif tracking-tight">
          Uncompromising Standards of{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Surat&apos;s Master Weavers
          </span>
        </h2>
      </div>

      {/* 4 Pillars Grid with Double-Bezel Hardware Framing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {promises.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: LUXURY_EASE }}
              className="group relative p-6 rounded-3xl bg-[#FFFFFF] border border-[#EAE3D7] hover:border-[#9A6233]/40 transition-all duration-300 shadow-[0_8px_24px_rgba(60,40,20,0.05)] hover:shadow-[0_16px_40px_rgba(60,40,20,0.10)] flex flex-col items-start text-left"
            >
              {/* Top Specular Rim */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#EAE3D7] to-transparent group-hover:via-[#9A6233]/40 transition-colors" />

              {/* Icon Emblem */}
              <div className="size-11 rounded-2xl bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] mb-5 shadow-xs group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 text-[#9A6233]" />
              </div>

              <h3 className="text-base font-semibold text-[#1F1714] tracking-tight mb-2 font-serif">
                {item.title}
              </h3>

              <p className="text-xs sm:text-[13px] text-[#6B5E55] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
