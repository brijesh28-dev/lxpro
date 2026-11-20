import { motion } from "motion/react";
import { IconSparkles, IconEye } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";

import kurta2 from "@/assets/heritage/kurta2.jpg";
import kurta3 from "@/assets/heritage/kurta3.jpg";
import fabric1 from "@/assets/heritage/fabric1.jpg";
import shirt5 from "@/assets/heritage/shirt5.png";

const galleryItems = [
  {
    title: "Hand-Loomed Zari Kurta",
    category: "Royal Wedding Couture",
    origin: "Banaras & Surat Silk Guild",
    image: kurta2,
  },
  {
    title: "Imperial Velvet & Brocade",
    category: "Festive Occasion Wear",
    origin: "Heritage Embroidery Atelier",
    image: kurta3,
  },
  {
    title: "Structured Tailored Pants",
    category: "Imported Italian Wool",
    origin: "Biella Certified Weave",
    image: fabric1,
  },
  {
    title: "Bespoke Linen Shirting",
    category: "European Flax Collection",
    origin: "Normandy 100% Linen",
    image: shirt5,
  },
];

export default function HeritageGallery() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 relative">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-4 shadow-xs"
        >
          <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A5528] font-medium">
            Atelier Gallery
          </span>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1714] font-serif tracking-tight">
          Glimpses of{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Artisanal Mastery
          </span>
        </h2>
        <p className="text-[#6B5E55] text-sm mt-3 font-light">
          Each garment is an ode to India&apos;s rich textile lineage and European craftsmanship.
        </p>
      </div>

      {/* 4 Gallery Cards Grid / Mobile Horizontal Snap Carousel */}
      <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 scrollbar-none snap-x snap-mandatory sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {galleryItems.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
            transition={{ duration: 0.7, delay: idx * 0.1, ease: LUXURY_EASE }}
            className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#FAF7F2] border border-[#EAE3D7] hover:border-[#9A6233]/40 transition-all duration-500 shadow-[0_8px_24px_rgba(60,40,20,0.06)] hover:shadow-[0_16px_40px_rgba(60,40,20,0.12)] min-w-[240px] sm:min-w-0 snap-center flex-1 shrink-0 sm:shrink"
          >
            {/* Image with smooth zoom */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/85 via-[#1F1714]/25 to-transparent transition-opacity duration-300" />

            {/* Specular Light Hover Glare */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top Tag */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full text-[9px] uppercase tracking-wider bg-[#241A15]/80 text-[#FAF7F2] border border-[#EAE3D7]/30 backdrop-blur-md">
                {item.category}
              </span>
            </div>

            {/* Bottom Meta */}
            <div className="absolute inset-x-4 bottom-4 z-20 flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#E6CDB5] font-medium">
                {item.origin}
              </span>
              <h3 className="text-[#FAF7F2] text-base font-semibold tracking-tight mt-0.5 font-serif group-hover:text-white transition-colors">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
