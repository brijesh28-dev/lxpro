import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconSparkles } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { galleryImages } from "@/config/galleryImages";
import GalleryItem from "./GalleryItem";
import GalleryLightbox from "./GalleryLightbox";
import AtelierFeatureCard from "./AtelierFeatureCard";

const CATEGORIES = ["All", "Showrooms", "Fabrics", "Collections", "Craftsmanship"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const handleOpenLightbox = (index) => setLightboxIndex(index);
  const handleCloseLightbox = () => setLightboxIndex(null);
  const handlePrev = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };
  const handleNext = () => {
    setLightboxIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };
  const handleSelect = (index) => setLightboxIndex(index);

  return (
    <section
      id="gallery"
      className="relative w-full py-20 sm:py-28 overflow-hidden border-t border-[#EAE3D7]"
    >
      {/* Ambient Radial Background Aura */}
      <div
        className="pointer-events-none absolute top-1/3 right-0 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(163,104,56,0.05)_0%,transparent_70%)] transform-gpu -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-5 shadow-xs"
          >
            <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
              Atelier Gallery • Visual Heritage
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight mb-4 font-serif"
          >
            Visual{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
              Heritage
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASE }}
            className="text-[#6B5E55] text-sm sm:text-base font-light max-w-xl leading-relaxed"
          >
            A curated glimpse inside our flagship ateliers, master fitting sessions, and rare imported fabric weaves across Surat.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: LUXURY_EASE }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "text-[#FAF7F2] font-semibold"
                  : "text-[#6B5E55] hover:text-[#1F1714] bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#EAE3D7]"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="gallery-category-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#241A15] to-[#3D2C24] shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Responsive Masonry / Columns Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
            className="columns-2 lg:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5"
          >
            {filteredImages.map((img, idx) => (
              <Fragment key={img.id || idx}>
                {activeCategory === "All" && idx === 2 && (
                  <AtelierFeatureCard key="atelier-feature" />
                )}
                {activeCategory !== "All" && idx === 1 && (
                  <AtelierFeatureCard key="atelier-feature-filtered" />
                )}
                <GalleryItem
                  image={img}
                  index={idx}
                  onClick={handleOpenLightbox}
                />
              </Fragment>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <GalleryLightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex !== null}
        onClose={handleCloseLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={handleSelect}
      />
    </section>
  );
}
