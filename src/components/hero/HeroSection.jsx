import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  IconArrowUpRight, 
  IconBuildingStore, 
  IconSparkles, 
  IconChevronRight,
  IconCrown,
  IconScissors,
  IconChevronLeft
} from "@tabler/icons-react";

import { 
  LUXURY_EASE, 
  LUXURY_SPRING, 
  useMagneticHover, 
  useAnimatedCounter 
} from "@/lib/animations";
import { SmartLink } from "@/components/common/SmartLink";
import CardSwap, { Card } from "@/components/ui/CardSwap";

import storeImg from "@/assets/hero/store.jpg";
import kurtaImg from "@/assets/hero/kurta.jpg";
import safariImg from "@/assets/hero/safari.webp";
import shirtImg from "@/assets/hero/shirt.jpg";

const collections = [
  {
    id: "atelier",
    title: "Flagship Showroom",
    subtitle: "Surat's Iconic Luxury Landmark",
    badge: "Since 1992",
    tag: "8 Branches in Surat",
    fabric: "Architectural Grandeur",
    image: storeImg,
  },
  {
    id: "kurta",
    title: "Royal Wedding Kurtas",
    subtitle: "Bespoke Festive Elegance",
    badge: "Handcrafted Zari",
    tag: "Traditional Heritage",
    fabric: "Raw Silk & Banarasi Brocade",
    image: kurtaImg,
  },
  {
    id: "safari",
    title: "Imperial Suits & Safari",
    subtitle: "Master Tailoring & Structure",
    badge: "Bespoke Cut",
    tag: "Executive Luxury",
    fabric: "Super 150s Merino Wool",
    image: safariImg,
  },
  {
    id: "linen",
    title: "Pure Italian Linens",
    subtitle: "Airy Summer Shirts & Trousers",
    badge: "100% Imported",
    tag: "European Mill Certified",
    fabric: "Normandy Flaxed Linen",
    image: shirtImg,
  },
];

// Single Metric Counter Component with smooth exponential ease-out
function SmoothEaseCounter({ targetValue, isInView, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const num = parseInt(String(targetValue).replace(/[^0-9]/g, ""), 10) || 0;
    if (num === 0) return;

    // Small numbers (like 8) animate with steady, crisp momentum
    // Larger numbers (like 100) glide smoothly
    const duration = num <= 10 ? 0.9 : num <= 50 ? 1.3 : 1.6;
    let startTime = null;
    let animId = null;

    const timeout = setTimeout(() => {
      const step = (now) => {
        if (!startTime) startTime = now;
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);

        // Apple / Linear exponential ease-out: 1 - Math.pow(2, -10 * progress)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(easeOut * num);

        setDisplayValue(current);

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          setDisplayValue(num);
        }
      };

      animId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isInView, targetValue, delay]);

  return <>{displayValue}</>;
}

// Single Metric Counter Component with luxury counting animation (scroll-triggered)
function MetricCounterItem({ value, suffix, label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.8, delay, ease: LUXURY_EASE }}
      className="flex flex-col relative group"
      aria-label={`${value}${suffix} ${label}`}
    >
      <div className="flex items-baseline gap-0.5" aria-hidden="true">
        <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] dark:text-[#FAF7F2] tracking-tight font-serif tabular-nums">
          <SmoothEaseCounter targetValue={value} isInView={isInView} delay={delay} />
        </span>
        <span className="text-xl sm:text-2xl font-light text-[#9A6233] dark:text-[#D4AF37] font-serif transition-colors">
          {suffix}
        </span>
      </div>
      <span className="text-[12px] uppercase tracking-[0.18em] text-[#7A6B60] dark:text-[#C8BAAC] mt-1.5 font-medium transition-colors">
        {label}
      </span>
      {/* Specular hairline underline that glows on hover */}
      <div className="w-12 h-[1px] bg-gradient-to-r from-[#EAE3D7] dark:from-[#D4AF37]/30 to-transparent mt-3 transition-all duration-500 group-hover:w-24 group-hover:from-[#9A6233]/60 dark:group-hover:from-[#D4AF37]/80" />
    </motion.div>
  );
}

export default function HeroSection({ isLoaded = true }) {
  const sectionRef = useRef(null);
  const cardSwapRef = useRef(null);

  // Magnetic Button Hooks for tactile cursor-tracking interaction
  const primaryMagnetic = useMagneticHover(7, 13);
  const secondaryMagnetic = useMagneticHover(6, 10);

  // Memoized luxury collection cards for rock-solid stability and zero mobile re-renders
  const cards = useMemo(
    () =>
      collections.map((item) => (
        <Card 
          key={item.id} 
          className="relative w-full h-full p-2 bg-[#FFFFFF] border border-[#EAE3D7] rounded-[1.75rem] shadow-[0_20px_50px_-15px_rgba(70,45,20,0.12)] overflow-hidden select-none"
        >
          {/* Top Specular Rim */}
          <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent z-10" />

          {/* Inner Core Enclosure */}
          <div className="relative w-full h-full rounded-[calc(1.75rem-0.35rem)] overflow-hidden bg-[#FAF7F2]">
            <img
              src={item.image}
              alt={item.title}
              draggable={false}
              loading={item.id === "atelier" || item.id === "kurta" ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover object-center select-none pointer-events-none"
            />
            {/* Luxury Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/85 via-[#1F1714]/20 to-transparent pointer-events-none" />

            {/* Floating Specular Badge - Top Right */}
            <div className="absolute top-3.5 right-3.5 z-20">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#241A15]/95 text-[#FAF7F2] border border-[#EAE3D7]/30 shadow-md flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-[#C59B4D]" />
                {item.badge}
              </span>
            </div>

            {/* Floating Fabric Origin Badge - Top Left */}
            <div className="absolute top-3.5 left-3.5 z-20">
              <span className="px-2.5 py-1 rounded-full text-[9px] font-medium uppercase tracking-widest bg-[#FFFFFF]/95 text-[#1F1714] border border-[#EAE3D7] shadow-xs">
                {item.fabric}
              </span>
            </div>

            {/* Card Bottom Glassmorphic Meta Island */}
            <div className="absolute inset-x-3.5 bottom-3.5 z-20 p-3.5 rounded-2xl bg-[#FFFFFF]/96 dark:bg-[#1E1612]/96 border border-[#EAE3D7] dark:border-[#3D2C22] flex items-center justify-between shadow-[0_8px_30px_rgba(40,25,15,0.08)]">
              <div className="pr-2">
                <p className="text-[10px] uppercase tracking-widest text-[#9A6233] font-semibold">
                  {item.tag}
                </p>
                <h3 className="text-[#1F1714] text-base font-semibold tracking-tight mt-0.5">
                  {item.title}
                </h3>
                <p className="text-[#6B5E55] text-xs mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
              <SmartLink
                to="/products"
                className="size-9 rounded-full bg-[#FAF7F2] hover:bg-[#241A15] hover:text-[#FAF7F2] text-[#1F1714] border border-[#EAE3D7] flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer"
                aria-label={`View ${item.title}`}
              >
                <IconChevronRight className="w-4 h-4" />
              </SmartLink>
            </div>
          </div>
        </Card>
      )),
    []
  );

  // Headline Words for Staggered Orchestration
  const headlineWords1 = ["The", "Timeless", "Luxury", "of"];
  const headlineWords2 = ["&", "Royal", "Heritage."];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28 flex flex-col justify-between items-center overflow-hidden"
    >
      {/* ── AMBIENT LUXURY RADIAL ILLUMINATION (Optimized Static GPU Layer) ── */}
      <div 
        className="pointer-events-none absolute -top-40 right-1/4 w-[750px] h-[750px] rounded-full bg-[radial-gradient(circle,rgba(197,155,77,0.08)_0%,rgba(217,185,145,0.03)_40%,transparent_70%)] transform-gpu -z-10"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(163,104,56,0.05)_0%,rgba(235,215,188,0.02)_40%,transparent_70%)] transform-gpu -z-10"
        aria-hidden="true" 
      />

      {/* ── MAIN ASYMMETRICAL EDITORIAL CONTAINER ── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* ── LEFT COLUMN: EDITORIAL NARRATIVE (7 Cols) ── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Eyebrow Badge — Stagger 1 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.15, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] mb-7 shadow-[0_2px_12px_rgba(60,40,20,0.04)] group hover:border-[#9A6233]/40 transition-colors"
          >
            <motion.span 
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block size-1.5 rounded-full bg-[#9A6233]" 
            />
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#8A5528] font-medium">
              Surat&apos;s Iconic Textile Empire • Est. 1992
            </span>
            <IconCrown className="w-3.5 h-3.5 text-[#9A6233]/80 group-hover:rotate-12 transition-transform duration-300" />
          </motion.div>

          {/* Staggered Cinematic Headline */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-light text-[#1F1714] tracking-[-0.03em] leading-[1.08] mb-6">
            <span className="inline-block">
              {headlineWords1.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                  transition={{ duration: 0.75, delay: 0.22 + i * 0.05, ease: LUXURY_EASE }}
                  className="inline-block mr-1.5 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br />
            {/* Shimmering Golden Italic Luxury Centerpiece */}
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.85, delay: 0.45, ease: LUXURY_EASE }}
              className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15] inline-block mr-1.5 sm:mr-3 drop-shadow-[0_4px_20px_rgba(184,134,59,0.18)]"
            >
              Bespoke Craft
            </motion.span>
            <span className="inline-block">
              {headlineWords2.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 28 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                  transition={{ duration: 0.75, delay: 0.58 + i * 0.05, ease: LUXURY_EASE }}
                  className="inline-block mr-1.5 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Editorial Sub-copy — Stagger 3 */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.9, delay: 0.85, ease: LUXURY_EASE }}
            className="text-[#5C5046] text-base sm:text-lg font-light leading-relaxed max-w-xl mb-10"
          >
            Powered by <strong className="text-[#1F1714] font-medium">Laxminarayan Fabrics</strong> since 1992. 
            Surat&apos;s foremost destination for royal wedding kurtas, imperial safari suits, 
            imported trousers, and pure Italian linens across 8 premier city flagships.
          </motion.p>

          {/* Button-in-Button Nested CTAs with Magnetic Physics — Stagger 4 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.9, delay: 1.0, ease: LUXURY_EASE }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 w-full sm:w-auto"
          >
            {/* Primary Magnetic CTA */}
            <motion.div
              ref={primaryMagnetic.ref}
              style={{ x: primaryMagnetic.x, y: primaryMagnetic.y }}
              {...primaryMagnetic.bind}
              className="relative w-full sm:w-auto"
            >
              <SmartLink
                to="/products"
                className="group relative inline-flex items-center justify-between sm:justify-start gap-4 pl-7 pr-2.5 py-2.5 rounded-full bg-[#241A15] text-[#FAF7F2] font-semibold text-[15px] hover:bg-[#3D2C24] transition-all shadow-[0_12px_32px_rgba(36,26,21,0.16)] active:scale-95 cursor-pointer select-none w-full sm:w-auto"
              >
                <span className="tracking-wide">Explore Collections</span>
                <motion.div 
                  style={{ x: primaryMagnetic.innerX, y: primaryMagnetic.innerY }}
                  className="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#241A15] flex items-center justify-center shadow-md transition-colors group-hover:bg-[#B8863B] group-hover:text-[#FAF7F2]"
                >
                  <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.div>
              </SmartLink>
            </motion.div>

            {/* Secondary Magnetic Glass CTA */}
            <motion.div
              ref={secondaryMagnetic.ref}
              style={{ x: secondaryMagnetic.x, y: secondaryMagnetic.y }}
              {...secondaryMagnetic.bind}
              className="relative w-full sm:w-auto"
            >
              <a
                href="#branches"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#E4DBD0] hover:border-[#D5C7B8] text-[#241A15] font-medium text-[15px] backdrop-blur-md transition-all active:scale-95 cursor-pointer select-none shadow-xs w-full sm:w-auto"
              >
                <motion.div style={{ x: secondaryMagnetic.innerX, y: secondaryMagnetic.innerY }}>
                  <IconBuildingStore className="w-4 h-4 text-[#9A6233] transition-transform group-hover:scale-110" />
                </motion.div>
                <span className="tracking-wide">Locate 8 Surat Stores</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Heritage Micro Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.15, ease: LUXURY_EASE }}
            className="flex items-center gap-6 mt-12 pt-8 border-t border-[#EAE3D7] w-full max-w-xl"
          >
            <div className="flex items-center gap-2 text-xs text-[#7A6B60] group cursor-default">
              <IconScissors className="w-4 h-4 text-[#9A6233] group-hover:rotate-45 transition-transform duration-300" />
              <span className="group-hover:text-[#1F1714] transition-colors">Master Tailoring</span>
            </div>
            <div className="h-3 w-[1px] bg-[#EAE3D7]" />
            <div className="flex items-center gap-2 text-xs text-[#7A6B60] group cursor-default">
              <IconSparkles className="w-4 h-4 text-[#9A6233] group-hover:scale-125 transition-transform duration-300" />
              <span className="group-hover:text-[#1F1714] transition-colors">Bespoke Fittings</span>
            </div>
            <div className="h-3 w-[1px] bg-[#EAE3D7]" />
            <div className="flex items-center gap-2 text-xs text-[#7A6B60] group cursor-default">
              <IconCrown className="w-4 h-4 text-[#9A6233] group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span className="group-hover:text-[#1F1714] transition-colors">Global Mill Fabrics</span>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN: CARD SWAP 3D SARTORIAL STACK (5 Cols) ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.1, delay: 0.35, ease: LUXURY_EASE }}
          className="lg:col-span-5 flex flex-col items-center justify-center w-full lg:-mt-10 xl:-mt-16"
        >
          {/* 3D Interactive CardSwap Stack with Navigation */}
          <div className="relative w-full max-w-lg min-h-[500px] sm:min-h-[560px] lg:h-[660px] flex items-center justify-center">
            
            {/* Left Arrow Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASE }}
              onClick={() => cardSwapRef.current?.prev()}
              className="absolute left-1 sm:-left-10 lg:-left-16 top-1/2 -translate-y-1/2 z-20 group"
              aria-label="Previous card"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/95 sm:bg-[#FFFFFF] border border-[#EAE3D7] hover:border-[#9A6233] shadow-md hover:shadow-xl backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
                <IconChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-[#7A6B60] group-hover:text-[#9A6233] transition-colors duration-300" />
              </div>
            </motion.button>

            {/* Right Arrow Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASE }}
              onClick={() => cardSwapRef.current?.next()}
              className="absolute right-1 sm:-right-10 lg:-right-16 top-1/2 -translate-y-1/2 z-20 group"
              aria-label="Next card"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white/95 sm:bg-[#FFFFFF] border border-[#EAE3D7] hover:border-[#9A6233] shadow-md hover:shadow-xl backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95">
                <IconChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-[#7A6B60] group-hover:text-[#9A6233] transition-colors duration-300" />
              </div>
            </motion.button>

            <CardSwap
              ref={cardSwapRef}
              width={360}
              height={480}
              cardDistance={52}
              verticalDistance={44}
              depth={80}
              skewAmount={5}
              visibleCards={4}
              cardRadius={26}
              delay={5500}
              speed={0.75}
              bounce={0.15}
              parallax={0.5}
              hoverSpread={0.06}
              dim={0.35}
              autoplay
              pauseOnHover
              draggable
              intro={false}
              theme="luxury"
            >
              {cards}
            </CardSwap>
          </div>

          {/* Interactive Drag / Swipe Hint */}
          <div className="flex items-center gap-2 mt-3 text-[11px] text-[#7A6B60] font-light">
            <span className="size-1.5 rounded-full bg-[#9A6233] animate-pulse" />
            <span>Drag or click cards to swap &bull; Autoplays 4 collections</span>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM ARCHITECTURAL HERITAGE METRICS RIBBON (Scroll Triggered) ── */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 sm:mt-24 pt-10 border-t border-[#EAE3D7]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <MetricCounterItem 
            value={8} 
            suffix="" 
            label="Flagship Stores in Surat" 
            delay={0.1}
          />
          <MetricCounterItem 
            value={34} 
            suffix="+" 
            label="Years of Legacy (1992)" 
            delay={0.25}
          />
          <MetricCounterItem 
            value={100} 
            suffix="%" 
            label="Authentic Global Fabrics" 
            delay={0.4}
          />
          <MetricCounterItem 
            value={50} 
            suffix="k+" 
            label="Discerning Gentlemen Dressed" 
            delay={0.55}
          />
        </div>
      </div>
    </section>
  );
}
