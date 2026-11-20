import { motion } from "motion/react";
import { IconSparkles, IconArrowUpRight, IconTag } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { products } from "@/config/products";
import ProductCard from "./ProductCard";
import { SmartLink } from "@/components/common/SmartLink";

// Handpicked 4 iconic signature pieces for homepage preview
const FEATURED_IDS = ["kurta-1", "safari-1", "shirt-1", "koti-1"];

export default function SignaturePreview() {
  const featured = products.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <section
      id="products-preview"
      className="relative w-full py-20 sm:py-28 overflow-hidden border-t border-[#EAE3D7]"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-[750px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(163,104,56,0.06)_0%,transparent_70%)] blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-4 shadow-xs"
            >
              <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
                Signature Collections
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight font-serif"
            >
              Curated Highlights for the{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
                Modern Gentleman
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: LUXURY_EASE }}
          >
            <SmartLink
              to="/products"
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#241A15] text-[#FAF7F2] font-semibold text-sm hover:bg-[#3D2C24] transition-all shadow-md active:scale-95"
            >
              <span>View All 15+ Collections</span>
              <div className="size-8 rounded-full bg-[#FAF7F2] text-[#241A15] flex items-center justify-center group-hover:bg-[#B8863B] group-hover:text-[#FAF7F2] transition-colors">
                <IconArrowUpRight className="w-4 h-4" />
              </div>
            </SmartLink>
          </motion.div>
        </div>

        {/* 4 Iconic Bento Cards Preview - Temporarily removed, blank space preserved */}
        {/*
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 auto-rows-[280px] sm:auto-rows-[310px] lg:auto-rows-[290px] mb-12">
          {featured.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              index={idx}
              onInquire={() => {
                window.location.href = "/products";
              }}
            />
          ))}
        </div>
        */}
        <div className="w-full min-h-[400px] my-12" aria-label="Blank Space Placeholder" />

        {/* Bottom Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D7] shadow-xs">
          <div className="flex items-center gap-3 text-sm text-[#6B5E55]">
            <div className="size-8 rounded-full bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] shrink-0">
              <IconTag className="w-4 h-4" />
            </div>
            <span>
              Looking for our complete catalog of imported fabrics, wedding sherwanis, and bespoke tailoring?
            </span>
          </div>

          <SmartLink
            to="/products"
            className="text-xs uppercase tracking-widest text-[#8A5528] hover:text-[#1F1714] font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Explore Dedicated Products Page</span>
            <IconArrowUpRight className="w-4 h-4" />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

