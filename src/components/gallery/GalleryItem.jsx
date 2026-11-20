import { motion } from "motion/react";
import { IconZoomIn, IconSparkles } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";

export default function GalleryItem({ image, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.08, ease: LUXURY_EASE }}
      className="group relative cursor-pointer rounded-2xl overflow-hidden break-inside-avoid border border-[#EAE3D7] hover:border-[#9A6233]/60 active:scale-[0.98] transition-all duration-300 shadow-[0_8px_24px_rgba(60,40,20,0.06)] hover:shadow-[0_16px_40px_rgba(70,45,20,0.12)] bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#9A6233]"
      onClick={() => onClick(index)}
      tabIndex={0}
      role="button"
      aria-label={`View ${image.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(index);
        }
      }}
    >
      <div className="relative overflow-hidden aspect-[4/3] sm:aspect-auto">
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/85 via-[#1F1714]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-[#241A15]/80 border border-[#EAE3D7]/30 text-[#FAF7F2] backdrop-blur-md">
            <IconSparkles className="w-2.5 h-2.5 text-[#C59B4D]" />
            {image.category}
          </span>
        </div>

        {/* Interactive Hover Reveal */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 z-10 transition-transform duration-300">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[#FAF7F2] text-sm sm:text-base font-serif font-light tracking-wide group-hover:text-white transition-colors leading-snug">
                {image.title}
              </p>
              <p className="text-[#D4C7BA] text-xs font-light mt-0.5 line-clamp-1">
                Atelier Showcase • Surat
              </p>
            </div>
            <div className="size-9 rounded-full bg-[#FFFFFF]/20 border border-[#FFFFFF]/30 backdrop-blur-md flex items-center justify-center text-[#FAF7F2] shrink-0 group-hover:bg-[#FAF7F2] group-hover:text-[#241A15] group-hover:border-[#FAF7F2] transition-all duration-300 group-hover:rotate-12">
              <IconZoomIn className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

