import { motion } from "motion/react";
import { IconScissors, IconCrown, IconSparkles } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import tailor1 from "@/assets/team/tailor1.jpg";
import tailor2 from "@/assets/team/tailor2.jpg";
import tailor3 from "@/assets/team/tailor3.jpg";
import tailor4 from "@/assets/team/tailor4.jpg";

const TAILORS = [
  {
    name: "Master Kantibhai Patel",
    role: "Head Bespoke Craftsman",
    exp: "32+ Years Experience",
    specialty: "Royal Sherwanis & Zari Bandhgalas",
    image: tailor1,
  },
  {
    name: "Umeshbhai Solanki",
    role: "Senior Pattern Master",
    exp: "24+ Years Experience",
    specialty: "Italian Cut Safari Suits & Tuxedos",
    image: tailor2,
  },
  {
    name: "Dineshbhai Mistry",
    role: "Linen & Drape Specialist",
    exp: "20+ Years Experience",
    specialty: "Normandy Flax Shirting & Trousers",
    image: tailor3,
  },
  {
    name: "Pravinbhai Vora",
    role: "Senior Fitting Consultant",
    exp: "18+ Years Experience",
    specialty: "Precision Body Profiling & Alterations",
    image: tailor4,
  },
];

export default function MasterTailors() {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] mb-4 shadow-xs"
        >
          <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
            Artisanal Guild
          </span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1714] tracking-[-0.02em] font-serif"
        >
          The Hands Behind{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Every Stitch
          </span>
        </motion.h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {TAILORS.map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: idx * 0.08, ease: LUXURY_EASE }}
            className="group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FFFFFF] border border-[#EAE3D7] hover:border-[#9A6233]/50 transition-all duration-300 shadow-[0_8px_24px_rgba(60,40,20,0.06)] hover:shadow-[0_16px_36px_rgba(60,40,20,0.12)]"
          >
            {/* Image */}
            <div className="relative aspect-[4/4.5] overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/85 via-[#1F1714]/25 to-transparent" />
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold bg-[#241A15]/80 border border-[#EAE3D7]/30 text-[#FAF7F2] backdrop-blur-md">
                  <IconScissors className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C59B4D]" />
                  {t.exp}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 sm:p-5 flex flex-col flex-1">
              <h4 className="text-[#1F1714] font-serif text-sm sm:text-base font-medium leading-snug group-hover:text-[#9A6233] transition-colors truncate sm:whitespace-normal">
                {t.name}
              </h4>
              <p className="text-[#8A5528] text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-0.5 sm:mt-1 mb-1.5 sm:mb-2 truncate">
                {t.role}
              </p>
              <p className="text-[#6B5E55] text-[10px] sm:text-xs font-light leading-relaxed mt-auto border-t border-[#EAE3D7] pt-2 sm:pt-3 line-clamp-2 sm:line-clamp-none">
                {t.specialty}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

