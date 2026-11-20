import { motion } from "motion/react";
import { IconArrowUpRight, IconSparkles } from "@tabler/icons-react";
import { LUXURY_EASE, useTilt3D } from "@/lib/animations";
import { productImages } from "@/config/productImages";

const sizeToColSpan = {
  large:  "lg:col-span-7 sm:row-span-2 row-span-1",
  medium: "lg:col-span-5 row-span-1",
  small:  "lg:col-span-4 row-span-1",
};

export default function ProductCard({ product, index, onInquire }) {
  const colClass = sizeToColSpan[product.size] || "lg:col-span-4 row-span-1";
  const delay = (index % 6) * 0.08;
  const imgSrc = productImages[product.imageKey] || productImages.kurta1;
  const { cardRef, style: tiltStyle, bind: tiltBind } = useTilt3D(5);

  return (
    <motion.div
      ref={cardRef}
      {...tiltBind}
      style={tiltStyle}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: LUXURY_EASE }}
      className={`relative group rounded-3xl overflow-hidden cursor-pointer ${colClass} col-span-1 border border-[#EAE3D7] hover:border-[#9A6233]/60 transition-all duration-500 shadow-[0_10px_30px_rgba(60,40,20,0.06)] hover:shadow-[0_20px_45px_rgba(70,45,20,0.14)] bg-[#FFFFFF]`}
      onClick={() => onInquire && onInquire(product)}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 bg-[#F4EFE6]">
        <img
          src={imgSrc}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/92 via-[#1F1714]/35 to-[#1F1714]/5 group-hover:from-[#1F1714]/96 transition-colors duration-500" />
      </div>

      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-[#241A15]/85 text-[#FAF7F2] border border-[#EAE3D7]/30 backdrop-blur-md shadow-md">
          <IconSparkles className="w-2.5 h-2.5 text-[#C59B4D]" />
          {product.badge}
        </span>
      </div>

      {product.tag && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#9A6233] text-[#FAF7F2] uppercase tracking-wider shadow-md">
            {product.tag}
          </span>
        </div>
      )}

      {/* Card Content Footer */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-[#E6CDB5] font-semibold mb-1 truncate">
              {product.fabric}
            </p>
            <h3 className="text-[#FAF7F2] font-serif text-base sm:text-lg lg:text-xl font-normal tracking-tight leading-snug group-hover:text-white transition-colors truncate">
              {product.title}
            </h3>
            <p className="text-[#D4C7BA] text-xs mt-0.5 font-light line-clamp-1">
              {product.subtitle}
            </p>
            <p className="text-[#FAF7F2] text-sm font-medium mt-2 tracking-wide">
              {product.priceRange}
            </p>
          </div>

          {/* Magnetic CTA Arrow */}
          <div className="size-10 rounded-full bg-[#FFFFFF]/20 border border-[#FFFFFF]/30 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:bg-[#FAF7F2] group-hover:border-[#FAF7F2] group-hover:text-[#241A15] text-[#FAF7F2] transition-all duration-300 group-hover:scale-110">
            <IconArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Specular Glow Hover Outline */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-[#9A6233]/50" />
    </motion.div>
  );
}
