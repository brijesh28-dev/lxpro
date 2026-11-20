import { motion } from "motion/react";
import {
  IconMapPin,
  IconPhone,
  IconClock,
  IconBrandWhatsapp,
  IconArrowUpRight,
  IconCrown,
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { branchImages } from "@/config/branchImages";

export default function LocationCard({
  location,
  isSelected = false,
  onSelect,
  index = 0,
}) {
  const imageSrc = branchImages[location.id] || location.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: LUXURY_EASE }}
      onClick={() => onSelect && onSelect(location.id)}
      className={`group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer ${
        isSelected
          ? "bg-[#FFFFFF] border-[#9A6233] shadow-[0_16px_45px_rgba(154,98,51,0.18)] -translate-y-1"
          : location.featured
          ? "bg-[#FFFFFF] border-[#B8863B]/50 hover:border-[#9A6233] shadow-[0_8px_30px_rgba(60,40,20,0.06)] hover:shadow-[0_16px_40px_rgba(70,45,20,0.12)]"
          : "bg-[#FFFFFF] border-[#EAE3D7] hover:border-[#9A6233]/40 shadow-xs hover:shadow-[0_12px_32px_rgba(60,40,20,0.08)]"
      }`}
    >
      {/* Image Banner */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={imageSrc}
          alt={location.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/85 via-[#1F1714]/30 to-transparent" />

        {/* Flagship Badge */}
        {location.featured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#9A6233] text-[#FAF7F2] uppercase tracking-wider shadow-md">
              <IconCrown className="w-3 h-3" />
              Flagship Atelier
            </span>
          </div>
        )}

        {/* Area Tag */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest text-[#FAF7F2] font-semibold drop-shadow-md">
            {location.area}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1F1714]/70 border border-[#EAE3D7]/30 text-[#D4C7BA] backdrop-blur-md">
            Surat
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="flex flex-col flex-1 p-5 gap-3.5">
        <div>
          <h3 className="text-[#1F1714] font-serif text-base sm:text-lg font-normal leading-snug group-hover:text-[#9A6233] transition-colors">
            {location.name}
          </h3>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2.5 text-[#6B5E55] text-xs leading-relaxed">
          <IconMapPin className="w-4 h-4 text-[#9A6233] shrink-0 mt-0.5" />
          <p className="line-clamp-2">{location.address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2.5 text-[#1F1714] text-xs">
          <IconPhone className="w-4 h-4 text-[#9A6233] shrink-0" />
          <a
            href={`tel:${location.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-[#9A6233] transition-colors font-medium"
          >
            +91 {location.phone}
          </a>
        </div>

        {/* Hours */}
        <div className="flex items-center gap-2.5 text-[#7A6B60] text-xs">
          <IconClock className="w-4 h-4 text-[#9A6233] shrink-0" />
          <span>{location.hours}</span>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[#EAE3D7]">
          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#F4EFE6] hover:bg-[#EAE3D7] border border-[#E5DACD] text-[#1F1714] text-xs font-medium transition-all group/btn"
          >
            <span>Directions</span>
            <IconArrowUpRight className="w-3.5 h-3.5 text-[#9A6233] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={location.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#168a3e] text-xs font-semibold transition-all"
          >
            <IconBrandWhatsapp className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

