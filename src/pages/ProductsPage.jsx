import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconSearch,
  IconSparkles,
  IconBrandWhatsapp,
  IconPhone,
  IconShieldCheck,
  IconScissors,
  IconCrown,
  IconTag,
  IconChevronRight,
  IconChevronLeft,
  IconAdjustmentsHorizontal,
  IconX,
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { products, PRODUCT_CATEGORIES } from "@/config/products";
import { productImages } from "@/config/productImages";
import ProductCard from "@/components/products/ProductCard";
import Masonry from "@/components/ui/Masonry";
import FlexCarousel from "@/components/ui/FlexCarousel";
import { SmartLink } from "@/components/common/SmartLink";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // featured | price-asc | price-desc
  const [selectedProduct, setSelectedProduct] = useState(null);
  const carouselRef = useRef(null);

  // Helper to extract base number from "₹4,500 – ₹18,000"
  const extractPrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.match(/₹([0-9,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => extractPrice(a.priceRange) - extractPrice(b.priceRange));
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => extractPrice(b.priceRange) - extractPrice(a.priceRange));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Map products to FlexCarousel items with LX PRO photography & metadata
  const carouselItems = useMemo(() => {
    const list = filteredProducts.length > 0 ? filteredProducts : products;
    return list.map((p) => ({
      src: productImages[p.imageKey] || "",
      alt: `${p.title} - ${p.fabric}`,
      title: p.title,
      subtitle: `${p.fabric} • ${p.priceRange}`,
      category: p.category,
      badge: p.badge,
      product: p,
    }));
  }, [filteredProducts]);

  // Map products to Masonry format with real LX PRO assets
  const masonryItems = useMemo(() => {
    return filteredProducts.map((p) => ({
      id: String(p.id),
      img: productImages[p.imageKey] || "",
      width: p.width || 600,
      height: p.height || 900,
      title: p.title,
      description: `${p.fabric} • ${p.priceRange}`,
      url: `https://wa.me/917600050236?text=${encodeURIComponent(
        `Hello LX PRO, I am interested in inquiring about the "${p.title}" (${p.priceRange}).`
      )}`,
      urlText: "Inquire via WhatsApp",
      product: p,
    }));
  }, [filteredProducts]);

  const handleInquire = (product) => {
    setSelectedProduct(product);
  };

  const closeInquiry = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FAF7F2]">
      {/* Page Header Showcase with Full-Width Grand 3D Arch FlexCarousel */}
      <header className="w-full pt-20 sm:pt-24 pb-2 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(154,98,51,0.08)_0%,transparent_70%)] blur-3xl -z-10"
          aria-hidden="true"
        />

        {/* Breadcrumb Navigation (Pill removed as requested) */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-2 sm:mb-4">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-[#6B5E55]"
          >
            <SmartLink to="/" className="hover:text-[#1F1714] transition-colors">
              Home
            </SmartLink>
            <IconChevronRight className="w-3.5 h-3.5 text-[#B5A799]" />
            <span className="text-[#8A5528] font-medium">Products &amp; Collections</span>
          </nav>
        </div>

        {/* Full-Bleed Edge-to-Edge 3D Arch FlexCarousel Hero (Scaled to match markup) */}
        <div className="relative w-full h-[380px] sm:h-[520px] md:h-[620px] lg:h-[760px] xl:h-[800px] overflow-hidden">
          <FlexCarousel
            ref={carouselRef}
            items={carouselItems}
            preset="arch"
            intro="rise"
            cardHeight={0.56}
            gap={18}
            squeeze={0.16}
            focusOnClick={false}
            captions
            fit="natural"
            radius={0}
            lensWidth={0.88}
            lensHeight={0.88}
            tilt={-36}
            roundness={1}
            bend={0.34}
            reach={0.4}
            curl="rise"
            dispersion={0}
            liquid={0}
            followCursor={false}
            autoplay
            interval={4}
            captureWheel
            onSelect={(_idx, item) => {
              if (item?.product) {
                handleInquire(item.product);
              }
            }}
          />

          {/* Floating Side Navigation Arrows (Adaptive sizing for mobile) */}
          <div className="absolute inset-y-0 left-2 sm:left-8 lg:left-12 flex items-center pointer-events-none z-20">
            <button
              type="button"
              onClick={() => carouselRef.current?.prev()}
              className="pointer-events-auto size-9 sm:size-14 rounded-full bg-white/95 hover:bg-[#241A15] text-[#1F1714] hover:text-[#FAF7F2] border border-[#EAE3D7] hover:border-[#241A15] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-85 hover:opacity-100"
              aria-label="Previous collection"
            >
              <IconChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-2 sm:right-8 lg:right-12 flex items-center pointer-events-none z-20">
            <button
              type="button"
              onClick={() => carouselRef.current?.next()}
              className="pointer-events-auto size-9 sm:size-14 rounded-full bg-white/95 hover:bg-[#241A15] text-[#1F1714] hover:text-[#FAF7F2] border border-[#EAE3D7] hover:border-[#241A15] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-85 hover:opacity-100"
              aria-label="Next collection"
            >
              <IconChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Catalog Section - Streamlined spacing to connect with user's bottom markup */}
      <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-8 lg:px-12 py-6 sm:py-8">
        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 mb-10 pb-8 border-b border-[#EAE3D7]">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <IconSearch className="w-4 h-4 text-[#8C7D72] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by fabric, style, or collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E2D6C7] focus:border-[#9A6233] rounded-full pl-11 pr-10 py-2.5 text-sm text-[#1F1714] placeholder-[#8C7D72] outline-none transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 size-5 rounded-full bg-[#EAE3D7] hover:bg-[#D5C7B5] flex items-center justify-center text-[#1F1714] text-xs cursor-pointer transition-colors"
              >
                &times;
              </button>
            )}
          </div>

          {/* Sort Selector & Result Count */}
          <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
            <span className="text-[#6B5E55]">
              Showing <strong className="text-[#1F1714] font-medium">{filteredProducts.length}</strong> collections
            </span>

            <div className="flex items-center gap-2">
              <IconAdjustmentsHorizontal className="w-4 h-4 text-[#9A6233]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#E2D6C7] focus:border-[#9A6233] rounded-xl px-3 py-2 text-[#1F1714] outline-none text-xs cursor-pointer shadow-xs"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "text-[#FAF7F2] font-semibold"
                  : "text-[#6B5E55] hover:text-[#1F1714] bg-white hover:bg-[#F3ECE1] border border-[#EAE3D7] shadow-xs"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="product-page-category-tab"
                  className="absolute inset-0 rounded-full bg-[#241A15] shadow-md shadow-[#241A15]/20"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Product Showcase with Real LX PRO Assets Masonry */}
        {masonryItems.length > 0 ? (
          <div className="w-full mb-20 min-h-[500px]">
            <Masonry
              items={masonryItems}
              columnWidth={240}
              gap={12}
              radius={12}
              animateFrom="bottom"
              hoverEffect="zoom"
              captions="hover"
              lightbox
              draggable
              columns="auto"
              stagger={0.05}
              duration={0.6}
              bounce={0.15}
              blurToFocus={false}
              focusOnHover={false}
              parallax={0}
              revealOnScroll
            />
          </div>
        ) : (
          <div className="text-center py-20 bg-white/60 border border-[#EAE3D7] rounded-3xl mb-20 shadow-xs">
            <p className="text-[#6B5E55] text-sm">
              No collections found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#241A15] text-[#FAF7F2] text-xs font-semibold cursor-pointer hover:bg-[#382B23] transition-colors shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Why Choose LX PRO */}
        <div className="mt-16 pt-16 border-t border-[#EAE3D7] mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A5528] font-semibold block mb-2">
              The LX PRO Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#1F1714] font-serif tracking-tight">
              Why Discerning Gentlemen Choose{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8A5528] via-[#B8863B] to-[#5C3717]">
                LX PRO
              </span>
            </h2>
            <p className="text-[#5C5046] text-xs sm:text-sm mt-2">
              Experience the perfect blend of tradition, craftsmanship, and modern luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-[#EAE3D7] shadow-sm flex flex-col items-start transition-all hover:shadow-md">
              <div className="size-12 rounded-2xl bg-[#F7F2EB] border border-[#E8DFD3] flex items-center justify-center text-[#9A6233] mb-5">
                <IconShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-[#1F1714] font-serif text-lg font-normal mb-2">
                100% Certified Quality
              </h3>
              <p className="text-[#5C5046] text-xs font-light leading-relaxed">
                Finest fabrics sourced directly from European and Indian mills with guaranteed thread
                purity, weight, and color fastness.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#EAE3D7] shadow-sm flex flex-col items-start transition-all hover:shadow-md">
              <div className="size-12 rounded-2xl bg-[#F7F2EB] border border-[#E8DFD3] flex items-center justify-center text-[#9A6233] mb-5">
                <IconScissors className="w-6 h-6" />
              </div>
              <h3 className="text-[#1F1714] font-serif text-lg font-normal mb-2">
                Master Bespoke Tailoring
              </h3>
              <p className="text-[#5C5046] text-xs font-light leading-relaxed">
                Precision hand-cutting and drafting by senior artisans with 20+ years of tailoring
                distinction for a flawless drape.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#EAE3D7] shadow-sm flex flex-col items-start transition-all hover:shadow-md">
              <div className="size-12 rounded-2xl bg-[#F7F2EB] border border-[#E8DFD3] flex items-center justify-center text-[#9A6233] mb-5">
                <IconCrown className="w-6 h-6" />
              </div>
              <h3 className="text-[#1F1714] font-serif text-lg font-normal mb-2">
                8 Ateliers Across Surat
              </h3>
              <p className="text-[#5C5046] text-xs font-light leading-relaxed">
                Walk into any of our 8 locations for complimentary fabric swatches, measurements,
                and milestone fitting sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Need Assistance Concierge Banner */}
        <div className="rounded-3xl p-8 sm:p-12 border border-[#3E2D24] bg-gradient-to-br from-[#241A15] via-[#2F221B] to-[#1F1511] text-[#FAF7F2] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl mb-10">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C59B4D] font-semibold block mb-2">
              Personal Styling Concierge
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF7F2] font-light mb-3">
              Need Styling Advice or Custom Sizing?
            </h2>
            <p className="text-[#CFC2B4] text-xs sm:text-sm font-light leading-relaxed">
              Our bespoke stylists are available on WhatsApp and at all 8 Surat locations to assist
              with fabric recommendations, wedding attire planning, and private appointments.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/917600050236?text=Hello%20LX%20PRO%2C%20I%20would%20like%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366] text-neutral-950 font-semibold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-lg active:scale-95"
            >
              <IconBrandWhatsapp className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:7600050236"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF7F2] font-medium text-xs uppercase tracking-wider transition-all"
            >
              <IconPhone className="w-4 h-4 text-[#C59B4D]" />
              <span>Call 76000 50236</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Product Detail & WhatsApp Order Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-[#140E0B]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeInquiry}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="relative max-w-lg w-full bg-white border border-[#E2D6C7] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5 text-[#1F1714]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeInquiry}
                className="absolute top-4 right-4 size-9 rounded-full bg-[#F1E9DE] hover:bg-[#E4DBD0] flex items-center justify-center text-[#1F1714] cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <IconX className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#8A5528] font-semibold px-2.5 py-0.5 rounded-full bg-[#F4EFE6] border border-[#E8DFD3]">
                  {selectedProduct.category}
                </span>
                {selectedProduct.badge && (
                  <span className="text-[10px] uppercase tracking-widest text-[#5C5046] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E2D6C7]">
                    {selectedProduct.badge}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-[#1F1714] font-serif text-xl sm:text-2xl font-normal leading-snug">
                  {selectedProduct.title}
                </h3>
                <p className="text-[#6B5E55] text-xs mt-1">{selectedProduct.subtitle}</p>
                <p className="text-[#8A5528] font-serif font-semibold text-xl mt-3">
                  {selectedProduct.priceRange}
                </p>
                <p className="text-[#5C5046] text-xs mt-1">
                  Fabric: <strong className="text-[#1F1714] font-medium">{selectedProduct.fabric}</strong>
                </p>
              </div>

              <div className="border-t border-[#EAE3D7] pt-4 flex flex-col gap-3">
                <p className="text-[#5C5046] text-xs leading-relaxed">
                  Interested in this collection? Order directly via our official WhatsApp styling
                  concierge or schedule a bespoke master fitting at any of our 8 Surat showrooms.
                </p>

                <div className="flex gap-2 mt-2">
                  <a
                    href={`https://wa.me/917600050236?text=${encodeURIComponent(
                      `Hello LX PRO, I am interested in inquiring about the "${selectedProduct.title}" (${selectedProduct.priceRange}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <IconBrandWhatsapp className="w-4 h-4" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                  <SmartLink
                    to="/#contact"
                    onClick={closeInquiry}
                    className="inline-flex items-center justify-center py-3 px-4 rounded-xl bg-[#241A15] hover:bg-[#382B23] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Book Fitting</span>
                  </SmartLink>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
