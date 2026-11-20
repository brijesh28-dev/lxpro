import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconSparkles, IconChevronDown } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import ProductCard from "./ProductCard";
import { products, PRODUCT_CATEGORIES } from "@/config/products";

const INITIAL_LIMIT = 8;

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const displayedProducts = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);

  const handleInquire = (product) => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="products"
      className="relative w-full py-20 sm:py-28 overflow-hidden border-t border-[#EAE3D7] bg-[#FAF7F2]"
    >
      {/* Ambient Background Aura */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-[750px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(154,98,51,0.08)_0%,transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE1] border border-[#E2D6C7] backdrop-blur-md mb-5"
          >
            <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
              Signature Collections
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight mb-4 font-serif"
          >
            Curated Collections for the{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8A5528] via-[#B8863B] to-[#5C3717]">
              Modern Gentleman
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASE }}
            className="text-[#5C5046] text-sm sm:text-base font-light max-w-2xl leading-relaxed"
          >
            From royal wedding kurtas to imported European linens — every piece is handpicked from
            the finest mills across India and the world, tailored to perfection by master craftsmen.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: LUXURY_EASE }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-14"
        >
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "text-[#FAF7F2] font-semibold"
                  : "text-[#6B5E55] hover:text-[#1F1714] bg-white hover:bg-[#F3ECE1] border border-[#EAE3D7] shadow-xs"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="product-category-tab"
                  className="absolute inset-0 rounded-full bg-[#241A15] shadow-md shadow-[#241A15]/20"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* Bento Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + (showAll ? "-all" : "-partial")}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 auto-rows-[280px] sm:auto-rows-[310px] lg:auto-rows-[290px]"
          >
            {displayedProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onInquire={handleInquire}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More Button */}
        {filtered.length > INITIAL_LIMIT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white hover:bg-[#F4EFE6] border border-[#D5C7B5] hover:border-[#9A6233] text-[#1F1714] text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer shadow-xs"
            >
              <span>{showAll ? "Show Fewer Items" : `View All ${filtered.length} Collections`}</span>
              <IconChevronDown
                className={`w-4 h-4 text-[#9A6233] transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
