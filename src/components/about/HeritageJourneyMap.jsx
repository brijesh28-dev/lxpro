import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconCompass,
  IconCrown,
  IconScissors,
  IconWorld,
  IconSparkles,
  IconBuildingStore,
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
  IconPlayerPause,
  IconMapPin,
  IconCheck,
  IconArrowUpRight,
  IconRoute,
} from "@tabler/icons-react";
import { LUXURY_EASE, LUXURY_SPRING } from "@/lib/animations";

// Archival imagery imports
import img1992 from "@/assets/gallery/store1.jpg";
import img2000 from "@/assets/team/tailor1.jpg";
import img2010 from "@/assets/products/fabrics1.jpg";
import img2020 from "@/assets/gallery/store2.jpg";
import img2025 from "@/assets/branches/lxpro.jpg";

export const journeyMilestones = [
  {
    year: "1992",
    shortYear: "'92",
    chapter: "Chapter I",
    mile: "Mile 00 • Origin",
    title: "The Genesis Loom at Varachha",
    subtitle: "A Single Counter & An Honest Promise",
    location: "Varachha Main Road, Surat",
    coordinates: "21.2185° N, 72.8682° E",
    icon: IconBuildingStore,
    image: img1992,
    badge: "Origin Atelier • 1992",
    tagline: "Where Surat's honest fabric legacy began",
    description:
      "Founded on Varachha Road under the Laxminarayan Fabrics banner with a single counter and a bold pledge: genuine handloom cottons and authentic suiting at mill-honest pricing. While others compromised, our founders established relationships that lasted three decades.",
    highlights: [
      { label: "Origin Store", value: "Varachha Road" },
      { label: "Core Foundation", value: "100% Pure Indian Cotton" },
      { label: "Clientele", value: "Generational Surat Families" },
    ],
    artifact: "Ledger No. 01 • Honest Mill Direct",
    accent: "from-[#8C532B] to-[#B8863B]",
  },
  {
    year: "2000",
    shortYear: "'00",
    chapter: "Chapter II",
    mile: "Mile 08 • Guild Expansion",
    title: "The Master Bespoke Guild",
    subtitle: "32-Point Anatomy & 3 City Ateliers",
    location: "Kapodra & Katargam, Surat",
    coordinates: "21.2268° N, 72.8445° E",
    icon: IconScissors,
    image: img2000,
    badge: "Master Tailoring • 3 Ateliers",
    tagline: "Instituting the 32-point anatomic fit",
    description:
      "As Surat's business community flourished, Laxminarayan established its master bespoke guild. Bringing senior karigars from traditional tailoring hubs, we introduced floating canvas chest pieces, hand-padded lapels, and expanded into Kapodra and Katargam.",
    highlights: [
      { label: "Expansion", value: "3 Flagship Locations" },
      { label: "Craft Innovation", value: "Floating Horsehair Canvas" },
      { label: "Patrons Dressed", value: "15,000+ Discerning Men" },
    ],
    artifact: "Senior Karigar Guild Seal",
    accent: "from-[#9A6233] to-[#C59B4D]",
  },
  {
    year: "2010",
    shortYear: "'10",
    chapter: "Chapter III",
    mile: "Mile 18 • Continental Passage",
    title: "The European Continental Passage",
    subtitle: "Direct Mill Collaborations: Biella & Normandy",
    location: "Biella (Italy) • Normandy (France)",
    coordinates: "45.5630° N, 8.0583° E",
    icon: IconWorld,
    image: img2010,
    badge: "Global Mill Allocation",
    tagline: "Bypassing middlemen for pure European luxury",
    description:
      "Our directors voyaged directly to the historic weaving valleys of Biella in Northern Italy and the flax fields of Normandy. Securing direct mill allocations of Super 150s Australian Merino wool and certified Irish flaxes, we brought European runway textiles to Surat.",
    highlights: [
      { label: "Mill Partners", value: "Italy, Ireland, France" },
      { label: "Signature Weave", value: "Super 150s Merino Wool" },
      { label: "Certification", value: "100% European Flax Certified" },
    ],
    artifact: "Biella & Normandy Mill Direct Charter",
    accent: "from-[#B8863B] to-[#E6C99E]",
  },
  {
    year: "2020",
    shortYear: "'20",
    chapter: "Chapter IV",
    mile: "Mile 28 • Digital Horizon",
    title: "Modern Metamorphosis & VIP Concierge",
    subtitle: "Private Styling Chambers & Omnichannel Service",
    location: "Ghod Dod Road & Surat Digital",
    coordinates: "21.1702° N, 72.8311° E",
    icon: IconSparkles,
    image: img2020,
    badge: "VIP Concierge • Omnichannel",
    tagline: "Bridging artisan heritage with modern convenience",
    description:
      "Transforming the luxury retail experience, LX PRO introduced private appointment chambers at our premier Ghod Dod Road atelier. We launched real-time WhatsApp fabric styling, doorstep master measurements, and bespoke wedding consultation suites for Gujarat's elite.",
    highlights: [
      { label: "Service", value: "Private Styling Chambers" },
      { label: "Access", value: "24/7 Styling Concierge" },
      { label: "Reach", value: "All Gujarat & Global NRIs" },
    ],
    artifact: "Bespoke Concierge Charter",
    accent: "from-[#9A6233] to-[#D4A359]",
  },
  {
    year: "2025",
    shortYear: "'25",
    chapter: "Chapter V",
    mile: "Mile 34 • Imperial Empire",
    title: "The Imperial Crown Era",
    subtitle: "8 Architectural Flagships & LX PRO Haute Couture",
    location: "Nana Varachha Landmark & 8 City Ateliers",
    coordinates: "21.2312° N, 72.8942° E",
    icon: IconCrown,
    image: img2025,
    badge: "8 Flagship Empire",
    tagline: "Surat's undisputed kingdom of luxury menswear",
    description:
      "Today, under the unified LX PRO crown, 8 multi-story architectural ateliers span every corner of Surat. Dressing over 50,000 gentlemen annually, we curate royal wedding sherwanis, imperial safari suits, and certified European linens for a legacy entering its 34th golden year.",
    highlights: [
      { label: "Footprint", value: "8 Flagships in Surat" },
      { label: "Lifetime Patrons", value: "248,000+ Gentlemen" },
      { label: "Haute Lines", value: "Royal Wedding & Safari" },
    ],
    artifact: "Imperial LX PRO Royal Crest",
    accent: "from-[#8C532B] via-[#B8863B] to-[#703C15]",
  },
];

export default function HeritageJourneyMap() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayRef = useRef(null);

  const current = journeyMilestones[activeStep];

  // Auto-play timer for interactive tour
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % journeyMilestones.length);
      }, 4500);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveStep((prev) => (prev > 0 ? prev - 1 : journeyMilestones.length - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveStep((prev) => (prev < journeyMilestones.length - 1 ? prev + 1 : 0));
  };

  const handleSelectStep = (index) => {
    setIsPlaying(false);
    setActiveStep(index);
  };

  return (
    <div className="w-full relative py-6 sm:py-10">
      {/* ── EXPEDITION HEADER ── */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        {/* Decorative Cartographic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] mb-4 shadow-[0_2px_12px_rgba(60,40,20,0.05)]"
        >
          <IconCompass className="w-4 h-4 text-[#9A6233] animate-[spin_16s_linear_infinite]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-semibold">
            Sartorial Cartography • 1992 &ndash; 2025
          </span>
        </motion.div>

        {/* Section Headline */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] font-serif leading-tight mb-4"
        >
          The Grand Heritage{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Journey
          </span>
        </motion.h3>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASE }}
          className="text-[#6B5E55] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto"
        >
          Embark upon an interactive 34-year sartorial voyage &mdash; tracing our path from a single
          counter on Varachha Road to direct European mill collaborations and 8 imperial flagship
          ateliers across Surat.
        </motion.p>
      </div>

      {/* ── INTERACTIVE EXPEDITION CONTROL HUD ── */}
      <div className="w-full max-w-4xl mx-auto mb-12 sm:mb-16">
        <div className="relative p-3 sm:p-4 rounded-3xl bg-[#FFFFFF] border border-[#EAE3D7] shadow-[0_12px_36px_rgba(60,40,20,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Waypoint Scrubber Buttons */}
          <div className="relative w-full sm:w-auto flex-1 flex items-center justify-between px-2 sm:px-6">
            {/* Connecting golden route line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#EAE3D7] z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-[#9A6233] to-[#C59B4D]"
                animate={{
                  width: `${(activeStep / (journeyMilestones.length - 1)) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: LUXURY_EASE }}
              />
            </div>

            {journeyMilestones.map((m, idx) => {
              const isActive = activeStep === idx;
              const isPast = activeStep >= idx;
              return (
                <button
                  key={m.year}
                  onClick={() => handleSelectStep(idx)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                  aria-label={`Go to year ${m.year}`}
                >
                  {/* Waypoint Node Ring */}
                  <div
                    className={`size-9 sm:size-11 rounded-full flex items-center justify-center font-serif text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#241A15] text-[#FAF7F2] ring-4 ring-[#C59B4D]/30 scale-110 shadow-[0_4px_16px_rgba(36,26,21,0.25)]"
                        : isPast
                        ? "bg-[#9A6233] text-[#FAF7F2] hover:scale-105"
                        : "bg-[#FFFFFF] text-[#7A6B60] border border-[#EAE3D7] hover:border-[#9A6233] hover:text-[#1F1714]"
                    }`}
                  >
                    {m.shortYear}
                  </div>
                  {/* Mini year caption */}
                  <span
                    className={`text-[10px] font-medium mt-1.5 transition-colors hidden sm:block ${
                      isActive ? "text-[#8A5528] font-bold" : "text-[#8A7E73]"
                    }`}
                  >
                    {m.year}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expedition Actions / Tour Control */}
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-[#EAE3D7] pt-2 sm:pt-0 sm:pl-4 shrink-0">
            {/* Auto Play / Tour Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isPlaying
                  ? "bg-[#241A15] text-[#FAF7F2] shadow-sm"
                  : "bg-[#F4EFE6] hover:bg-[#EAE3D7] text-[#1F1714]"
              }`}
              aria-label={isPlaying ? "Pause auto tour" : "Play auto tour"}
            >
              {isPlaying ? (
                <>
                  <IconPlayerPause className="w-3.5 h-3.5 text-[#C59B4D]" />
                  <span>Pause Tour</span>
                </>
              ) : (
                <>
                  <IconPlayerPlay className="w-3.5 h-3.5 text-[#9A6233]" />
                  <span>Auto Tour</span>
                </>
              )}
            </button>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="size-8 rounded-full bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#1F1714] transition-colors cursor-pointer"
                aria-label="Previous chapter"
              >
                <IconChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="size-8 rounded-full bg-[#FFFFFF] hover:bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#1F1714] transition-colors cursor-pointer"
                aria-label="Next chapter"
              >
                <IconChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── GRAND SPOTLIGHT CHAPTER STAGE (Cinematic Experience) ── */}
      <div className="w-full max-w-5xl mx-auto mb-20 sm:mb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1410] via-[#241A15] to-[#120D0A] border border-[#C59B4D]/30 text-[#FAF7F2] shadow-[0_24px_64px_rgba(30,20,10,0.35)]"
          >
            {/* Top Specular Rim */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59B4D]/80 to-transparent" />

            {/* Ambient Background Aura */}
            <div className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(197,155,77,0.15)_0%,transparent_70%)] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-[radial-gradient(circle,rgba(154,98,51,0.12)_0%,transparent_70%)] blur-2xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 p-6 sm:p-10 lg:p-12 items-center relative z-10">
              {/* Left Column: Archival Visual Artifact */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] max-w-sm rounded-2xl overflow-hidden border border-[#C59B4D]/40 shadow-2xl group">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Luxury vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140E0B]/90 via-[#140E0B]/20 to-transparent" />

                  {/* Corner Ornaments */}
                  <div className="absolute top-3 left-3 size-4 border-t-2 border-l-2 border-[#C59B4D]/80" />
                  <div className="absolute top-3 right-3 size-4 border-t-2 border-r-2 border-[#C59B4D]/80" />
                  <div className="absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-[#C59B4D]/80" />
                  <div className="absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-[#C59B4D]/80" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-[#1F1714]/85 text-[#FAF7F2] border border-[#C59B4D]/30 backdrop-blur-md shadow-md">
                      {current.chapter}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-[#E6C99E] bg-[#C59B4D]/20 border border-[#C59B4D]/30">
                      {current.year}
                    </span>
                  </div>

                  {/* Bottom Archival Stamp */}
                  <div className="absolute inset-x-4 bottom-4 p-3 rounded-xl bg-[#140E0B]/85 border border-[#C59B4D]/25 backdrop-blur-md">
                    <p className="text-[10px] uppercase tracking-widest text-[#C59B4D] font-medium">
                      Archival Record
                    </p>
                    <p className="text-xs text-[#FAF7F2] font-serif font-light mt-0.5">
                      {current.artifact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Historical Dispatch & Coordinates */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Waypoint Coordinates & Location */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-[#C59B4D]/30 text-xs text-[#E6C99E]">
                    <IconMapPin className="w-3.5 h-3.5 text-[#C59B4D]" />
                    <span>{current.location}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8A7E73] tracking-wider">
                    [{current.coordinates}]
                  </span>
                </div>

                {/* Chapter Headline */}
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C59B4D] block mb-1">
                    {current.subtitle}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7F2] leading-tight">
                    {current.title}
                  </h4>
                </div>

                {/* Narrative prose */}
                <p className="text-sm sm:text-base text-[#D4C7BA] font-light leading-relaxed mb-6">
                  {current.description}
                </p>

                {/* 3 Key Pillar Metrics */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mb-6">
                  {current.highlights.map((h, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-[#C59B4D] font-medium">
                        {h.label}
                      </span>
                      <span className="text-xs sm:text-[13px] font-serif font-normal text-[#FAF7F2] mt-0.5">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Journey Action Button */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleNext}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C59B4D] to-[#9A6233] hover:from-[#D4A359] hover:to-[#C59B4D] text-[#1F1714] font-semibold text-xs tracking-wide transition-all shadow-[0_4px_16px_rgba(197,155,77,0.25)] cursor-pointer"
                  >
                    <span>
                      {activeStep === journeyMilestones.length - 1
                        ? "Restart Journey from 1992"
                        : `Next: Chapter ${activeStep + 2}`}
                    </span>
                    <IconChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>

                  <span className="text-xs text-[#8A7E73] font-light">
                    Step {activeStep + 1} of {journeyMilestones.length}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── THE SERPENTINE CARTOGRAPHIC ROUTE MAP (Detailed Visual Waypoints) ── */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE3D7]">
          <div className="flex items-center gap-2">
            <IconRoute className="w-4 h-4 text-[#9A6233]" />
            <h4 className="font-serif text-lg sm:text-xl font-light text-[#1F1714]">
              The 5 Chronological Waypoints
            </h4>
          </div>
          <span className="text-xs text-[#7A6B60]">
            Click any milestone to inspect that historical era
          </span>
        </div>

        {/* Serpentine Timeline Path with Rich Editorial Cards */}
        <div className="relative">
          {/* Animated Golden Central Curving Path */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#C59B4D]/60 via-[#9A6233]/40 to-[#703C15]/20 sm:-translate-x-1/2" />

          <div className="flex flex-col gap-12 sm:gap-16">
            {journeyMilestones.map((m, idx) => {
              const isSelected = activeStep === idx;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={m.year}
                  className={`relative flex items-center gap-6 sm:gap-0 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Desktop Content Side */}
                  <div
                    className={`hidden sm:flex flex-1 ${
                      isEven ? "justify-end pr-12 text-right" : "justify-start pl-12 text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleSelectStep(idx)}
                      className={`max-w-lg w-full p-5 sm:p-6 rounded-3xl border transition-all duration-300 cursor-pointer text-left overflow-hidden ${
                        isSelected
                          ? "bg-[#FFFFFF] border-[#C59B4D] shadow-[0_16px_40px_rgba(197,155,77,0.18)] ring-1 ring-[#C59B4D]"
                          : "bg-[#FFFFFF] border-[#EAE3D7] hover:border-[#9A6233]/50 shadow-[0_6px_20px_rgba(60,40,20,0.04)]"
                      }`}
                    >
                      {/* Top Bar with Chapter & Coordinates */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A5528] px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#EAE3D7]">
                            {m.chapter} &bull; {m.year}
                          </span>
                          <span className="text-[10px] font-medium text-[#C59B4D] hidden md:inline">
                            {m.mile}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#7A6B60] flex items-center gap-1">
                          <IconMapPin className="w-3 h-3 text-[#9A6233]" />
                          {m.location.split(",")[0]}
                        </span>
                      </div>

                      {/* Card Body: Thumbnail & Story */}
                      <div className="flex gap-4 items-start mb-3">
                        {/* Thumbnail */}
                        <div className="size-20 rounded-2xl overflow-hidden shrink-0 border border-[#EAE3D7] relative group-hover:border-[#9A6233] transition-colors">
                          <img
                            src={m.image}
                            alt={m.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Title & snippet */}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-serif text-base sm:text-lg font-medium text-[#1F1714] mb-1 leading-snug">
                            {m.title}
                          </h5>
                          <p className="text-xs text-[#6B5E55] line-clamp-2 leading-relaxed font-light">
                            {m.description}
                          </p>
                        </div>
                      </div>

                      {/* Key highlight pill */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#EAE3D7] text-[11px]">
                        <span className="text-[#8A5528] font-medium">{m.badge}</span>
                        <span className="text-[#1F1714] font-medium flex items-center gap-1 group-hover:text-[#9A6233]">
                          <span>{isSelected ? "Currently Viewing" : "Explore Era"}</span>
                          <IconArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Central Serpentine Node Badge */}
                  <div className="relative flex items-center justify-center z-10 shrink-0">
                    <button
                      onClick={() => handleSelectStep(idx)}
                      className={`relative flex items-center justify-center size-12 sm:size-14 rounded-full border-2 transition-all duration-500 cursor-pointer ${
                        isSelected
                          ? "bg-[#241A15] border-[#C59B4D] text-[#FAF7F2] scale-110 shadow-[0_0_24px_rgba(197,155,77,0.4)]"
                          : "bg-[#FFFFFF] border-[#9A6233]/60 text-[#1F1714] hover:scale-105 shadow-md"
                      }`}
                      aria-label={`Jump to ${m.year}`}
                    >
                      {/* Concentric pulse when active */}
                      {isSelected && (
                        <span className="absolute inset-0 -m-2 rounded-full border border-[#C59B4D] animate-ping pointer-events-none opacity-75" />
                      )}
                      <m.icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                          isSelected ? "text-[#C59B4D]" : "text-[#9A6233]"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Mobile Content Side */}
                  <div className="flex-1 sm:hidden">
                    <div
                      onClick={() => handleSelectStep(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#FFFFFF] border-[#C59B4D] shadow-md ring-1 ring-[#C59B4D]"
                          : "bg-[#FFFFFF] border-[#EAE3D7] shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A5528]">
                          {m.chapter} &bull; {m.year}
                        </span>
                        <span className="text-[10px] text-[#7A6B60]">{m.badge}</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <div className="size-14 rounded-xl overflow-hidden shrink-0 border border-[#EAE3D7]">
                          <img
                            src={m.image}
                            alt={m.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-serif text-sm font-medium text-[#1F1714] line-clamp-1 mb-0.5">
                            {m.title}
                          </h5>
                          <p className="text-[11px] text-[#6B5E55] line-clamp-2 leading-snug font-light">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop */}
                  <div className={`hidden sm:flex flex-1 ${isEven ? "pl-12" : "pr-12"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
