import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
  IconPlayerPause,
  IconSparkles,
  IconBuildingStore,
  IconScissors,
  IconWorld,
  IconCrown,
  IconMapPin,
} from "@tabler/icons-react";
import { LUXURY_EASE, LUXURY_SPRING } from "@/lib/animations";

// Archival imagery imports
import img1992 from "@/assets/gallery/store1.jpg";
import img2000 from "@/assets/team/tailor1.jpg";
import img2010 from "@/assets/products/fabrics1.jpg";
import img2020 from "@/assets/gallery/store2.jpg";
import img2026 from "@/assets/branches/lxpro.jpg";

export const roadMilestones = [
  {
    id: 1,
    year: "1992",
    shortYear: "'92",
    chapter: "Chapter I",
    title: "The Genesis Loom at Varachha",
    subtitle: "A Single Counter & An Honest Promise",
    location: "Varachha Main Road, Surat",
    image: img1992,
    badge: "Origin Atelier • 1992",
    description:
      "Founded on Varachha Road under the Laxminarayan Fabrics banner with a single counter and an uncompromising pledge: genuine handloom cottons and authentic suiting at mill-honest pricing. While others compromised, our founders established relationships that lasted three decades.",
    highlights: [
      { label: "Origin Store", value: "Varachha Road" },
      { label: "Foundation", value: "100% Pure Cotton" },
      { label: "Clientele", value: "Surat Families" },
    ],
    pinX: 108,
    pinY: 265,
  },
  {
    id: 2,
    year: "2000",
    shortYear: "'00",
    chapter: "Chapter II",
    title: "The Master Bespoke Guild",
    subtitle: "32-Point Anatomy & 3 City Ateliers",
    location: "Kapodra & Katargam, Surat",
    image: img2000,
    badge: "Master Tailoring • 3 Ateliers",
    description:
      "As Surat's textile landscape flourished, Laxminarayan established its dedicated master bespoke guild. Bringing senior karigars from traditional tailoring hubs, we introduced floating canvas chest pieces, hand-padded lapels, and expanded into Kapodra and Katargam.",
    highlights: [
      { label: "Expansion", value: "3 Flagships" },
      { label: "Innovation", value: "Floating Canvas" },
      { label: "Dressed", value: "15,000+ Men" },
    ],
    pinX: 270,
    pinY: 130,
  },
  {
    id: 3,
    year: "2010",
    shortYear: "'10",
    chapter: "Chapter III",
    title: "The European Continental Passage",
    subtitle: "Direct Mill Collaborations: Biella & Normandy",
    location: "Biella (Italy) • Normandy (France)",
    image: img2010,
    badge: "Global Mill Allocation",
    description:
      "Our directors voyaged directly to the historic weaving valleys of Biella in Northern Italy and the flax fields of Normandy. Securing direct mill allocations of Super 150s Australian Merino wool and certified Irish flaxes, we brought European runway textiles to Surat.",
    highlights: [
      { label: "Mill Partners", value: "Italy & Ireland" },
      { label: "Signature", value: "Super 150s Merino" },
      { label: "Purity", value: "Certified Flax" },
    ],
    pinX: 440,
    pinY: 225,
  },
  {
    id: 4,
    year: "2020",
    shortYear: "'20",
    chapter: "Chapter IV",
    title: "Modern Metamorphosis & VIP Concierge",
    subtitle: "Private Styling Chambers & Omnichannel Service",
    location: "Ghod Dod Road & Surat Digital",
    image: img2020,
    badge: "VIP Concierge • Omnichannel",
    description:
      "Transforming the luxury retail experience, LX PRO introduced private appointment chambers at our premier Ghod Dod Road atelier. We launched real-time WhatsApp fabric styling, doorstep master measurements, and bespoke wedding consultation suites for Gujarat's elite.",
    highlights: [
      { label: "Service", value: "VIP Chambers" },
      { label: "Access", value: "24/7 Concierge" },
      { label: "Reach", value: "All Gujarat & NRIs" },
    ],
    pinX: 645,
    pinY: 60,
  },
  {
    id: 5,
    year: "2026",
    shortYear: "'26",
    chapter: "Chapter V",
    title: "The Imperial Crown Era",
    subtitle: "8 Architectural Flagships & LX PRO Haute Couture",
    location: "Nana Varachha Landmark & 8 City Ateliers",
    image: img2026,
    badge: "8 Flagship Empire",
    description:
      "Today, under the unified LX PRO crown, 8 multi-story architectural ateliers span every corner of Surat. Dressing over 50,000 gentlemen annually, we curate royal wedding sherwanis, imperial safari suits, and certified European linens for a legacy entering its 34th golden year.",
    highlights: [
      { label: "Footprint", value: "8 Surat Flagships" },
      { label: "Patrons", value: "50,000+ Annually" },
      { label: "Haute Lines", value: "Royal Wedding & Safari" },
    ],
    pinX: 840,
    pinY: 305,
  },
];

export default function HeritageRoadMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isDriving, setIsDriving] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const autoPlayRef = useRef(null);
  const roadPathRef = useRef(null);
  const carRef = useRef(null);
  const currentDistRef = useRef(null);
  const animFrameRef = useRef(null);

  // Exact distance ratios along the winding road path for milestones 1-5
  const MILESTONE_RATIOS = [0.086, 0.213, 0.329, 0.4875, 0.890];

  const updateCarPosition = (dist, path, totalLength) => {
    if (!carRef.current || !path) return;
    const p1 = path.getPointAtLength(Math.max(0, dist - 2));
    const p2 = path.getPointAtLength(Math.min(totalLength, dist + 2));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    carRef.current.setAttribute("transform", `translate(${p2.x}, ${p2.y}) rotate(${angle})`);
  };

  useEffect(() => {
    const path = roadPathRef.current;
    if (!path) return;
    const totalLength = path.getTotalLength();
    const targetDist = MILESTONE_RATIOS[activeIndex] * totalLength;

    // Initial mount - place car immediately at first milestone
    if (currentDistRef.current === null) {
      currentDistRef.current = targetDist;
      updateCarPosition(targetDist, path, totalLength);
      return;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startDist = currentDistRef.current;
    const distDelta = targetDist - startDist;
    if (Math.abs(distDelta) < 1) {
      setDisplayIndex(activeIndex);
      setIsDriving(false);
      return;
    }

    setIsDriving(true);

    // REALISTIC LUXURY AUTOMOTIVE CRUISING SPEED:
    // Physical speed based on curve arc distance, buttery sinusoidal easing
    const duration = Math.max(1600, Math.min(3800, 1100 + Math.abs(distDelta) * 1.8));
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth sinusoidal ease-in-out (continuous acceleration & deceleration)
      const ease = 0.5 * (1 - Math.cos(Math.PI * progress));

      const current = startDist + distDelta * ease;
      currentDistRef.current = current;
      updateCarPosition(current, path, totalLength);

      // Smoothly reveal new chapter story at halfway mark of the journey
      if (progress >= 0.5 && displayIndex !== activeIndex) {
        setDisplayIndex(activeIndex);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsDriving(false);
        setDisplayIndex(activeIndex);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [activeIndex]);

  const activeMilestone = roadMilestones[displayIndex];

  // Auto-play tour timer (gives 5.5s so user can view story after arrival)
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % roadMilestones.length);
      }, 5500);
    } else {
      clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isPlaying]);

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev === 0 ? roadMilestones.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % roadMilestones.length);
  };

  const handleSelectPin = (index) => {
    setIsPlaying(false);
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      {/* ── SECTION HEADER ── */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] shadow-2xs mb-4"
        >
          <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
            34-Year Sartorial Odyssey • 1992 - 2026
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight mb-4 font-serif"
        >
          The Heritage{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Highway
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASE }}
          className="text-[#6B5E55] text-sm sm:text-base font-light max-w-xl leading-relaxed"
        >
          Follow the winding road of Surat&rsquo;s foremost luxury menswear atelier &mdash; from a single counter on Varachha Road to 8 imperial city flagships.
        </motion.p>
      </div>

      {/* ── MAIN LUXURY ROAD CONTAINER ── */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-[#EAE3D7] bg-[#FFFFFF] p-4 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        {/* Ambient warm canvas glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse,rgba(235,178,74,0.12)_0%,transparent_70%)] blur-3xl -z-10"
          aria-hidden="true"
        />

        {/* ── QUICK YEAR TABS (Mobile / Desktop Quick Jump) ── */}
        <div className="flex items-center justify-between gap-2 mb-6 sm:mb-8 pb-4 border-b border-[#F0EBE1] flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
            {roadMilestones.map((m, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectPin(idx)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#1F1714] text-white shadow-xs"
                      : "bg-[#FAF7F2] hover:bg-[#F4EFE6] text-[#6B5E55] border border-[#EAE3D7]"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      isSelected ? "bg-[#D4AF37]" : "bg-[#B8863B]/60"
                    }`}
                  />
                  <span>{m.year}</span>
                </button>
              );
            })}
          </div>

          {/* Tour Autoplay & Arrow Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-full border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                isPlaying
                  ? "bg-[#F4EFE6] text-[#8A5528] border-[#9A6233]"
                  : "bg-white hover:bg-[#FAF7F2] text-[#6B5E55] border-[#EAE3D7]"
              }`}
              title={isPlaying ? "Pause Tour" : "Auto-Play Tour"}
            >
              {isPlaying ? (
                <IconPlayerPause className="w-3.5 h-3.5 text-[#8A5528]" />
              ) : (
                <IconPlayerPlay className="w-3.5 h-3.5 text-[#6B5E55]" />
              )}
              <span className="text-[11px] font-medium hidden sm:inline">
                {isPlaying ? "Pause" : "Tour"}
              </span>
            </button>

            <button
              onClick={handlePrev}
              className="size-8 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#EAE3D7] flex items-center justify-center text-[#1F1714] transition-colors cursor-pointer shadow-2xs"
              title="Previous Chapter"
            >
              <IconChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="size-8 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#EAE3D7] flex items-center justify-center text-[#1F1714] transition-colors cursor-pointer shadow-2xs"
              title="Next Chapter"
            >
              <IconChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── MOBILE HERITAGE HIGHWAY STEPPER (md:hidden) ── */}
        <div className="md:hidden mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#1F1714] to-[#2E2019] border border-[#8C532B]/40 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${isDriving ? "bg-[#3B82F6] animate-ping" : "bg-[#D4AF37]"}`} />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                Heritage Odyssey
              </span>
            </div>
            <span className="text-[11px] font-serif italic text-[#D9CFC3]">
              {isDriving ? "Cruising..." : `${activeMilestone.year} • ${activeMilestone.chapter}`}
            </span>
          </div>

          {/* Progress track */}
          <div className="relative w-full h-1.5 bg-white/10 rounded-full mb-3.5 overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#8C532B] via-[#D4AF37] to-[#F3ECE0] rounded-full"
              animate={{ width: `${((activeIndex + 1) / roadMilestones.length) * 100}%` }}
              transition={{ duration: 0.5, ease: LUXURY_EASE }}
            />
          </div>

          {/* Quick milestone tap chips */}
          <div className="flex items-center justify-between gap-1.5">
            {roadMilestones.map((m, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectPin(idx)}
                  className={`flex-1 py-1.5 px-1 rounded-lg text-center transition-all cursor-pointer ${
                    isCurrent 
                      ? "bg-[#D4AF37] text-[#1F1714] font-bold shadow-xs scale-105" 
                      : "bg-white/5 hover:bg-white/10 text-[#BFAF9F] text-[11px]"
                  }`}
                >
                  <div className="text-[11px]">{m.year}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── THE WINDING ROAD GRAPHIC (Matching User Reference Image - Desktop / Tablet) ── */}
        <div className="hidden md:block relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#F7A600] to-[#E59500] p-3 sm:p-6 lg:p-8 shadow-inner mb-8">
          {/* Subtle texture / contour lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Responsive SVG Road Canvas */}
          <div className="w-full relative">
            <svg
              viewBox="0 0 1000 450"
              className="w-full h-auto drop-shadow-sm select-none"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* 3D Drop Shadow underneath the highway */}
                <filter id="road-depth-shadow" x="-10%" y="-10%" width="130%" height="150%">
                  <feDropShadow
                    dx="0"
                    dy="18"
                    stdDeviation="14"
                    floodColor="#000000"
                    floodOpacity="0.35"
                  />
                </filter>

                {/* 3D Drop Shadow for pins */}
                <filter id="pin-depth-shadow" x="-30%" y="-20%" width="160%" height="160%">
                  <feDropShadow
                    dx="0"
                    dy="10"
                    stdDeviation="7"
                    floodColor="#000000"
                    floodOpacity="0.32"
                  />
                </filter>

                {/* Forward Headlight Beam Gradient */}
                <linearGradient id="headlight-beam" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.85" />
                  <stop offset="30%" stopColor="#93C5FD" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
                </linearGradient>

                {/* Taillight Red Glow Gradient */}
                <radialGradient id="taillight-glow" cx="40%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#DC2626" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                </radialGradient>

                {/* 3D Glossy Pin Gradient */}
                <linearGradient id="pin-surface-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>

                {/* Sedan Car Shadow */}
                <filter id="car-shadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.65" />
                </filter>
              </defs>

              {/* 1. Road White Outer Curb & Elevation Shadow */}
              <path
                d="M -30,240
                   C 35,240 65,290 110,290
                   C 165,290 205,155 270,155
                   C 335,155 375,250 440,250
                   C 515,250 555,85 645,85
                   C 735,85 770,150 765,220
                   C 760,285 700,295 640,295
                   C 585,295 580,355 640,360
                   C 720,365 770,335 840,330
                   C 900,325 960,320 1030,315"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="58"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#road-depth-shadow)"
              />

              {/* 2. Road Dark Charcoal Asphalt */}
              <path
                ref={roadPathRef}
                id="road-path"
                d="M -30,240
                   C 35,240 65,290 110,290
                   C 165,290 205,155 270,155
                   C 335,155 375,250 440,250
                   C 515,250 555,85 645,85
                   C 735,85 770,150 765,220
                   C 760,285 700,295 640,295
                   C 585,295 580,355 640,360
                   C 720,365 770,335 840,330
                   C 900,325 960,320 1030,315"
                fill="none"
                stroke="#22252E"
                strokeWidth="46"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 3. Road Center Dashed Line */}
              <path
                d="M -30,240
                   C 35,240 65,290 110,290
                   C 165,290 205,155 270,155
                   C 335,155 375,250 440,250
                   C 515,250 555,85 645,85
                   C 735,85 770,150 765,220
                   C 760,285 700,295 640,295
                   C 585,295 580,355 640,360
                   C 720,365 770,335 840,330
                   C 900,325 960,320 1030,315"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeDasharray="14 14"
                strokeLinecap="round"
              />

              {/* ── EXACT BLUE LUXURY SEDAN CAR (TOP VIEW) ── */}
              <g
                ref={carRef}
                id="sedan-car"
                transform="translate(107.3, 289.9)"
                style={{ willChange: "transform" }}
              >
                <title>LX PRO Heritage Sedan</title>

                {/* 1. Forward Headlight Illumination Beams on Asphalt */}
                <polygon
                  points="24,-7 62,-17 62,-2 24,-5"
                  fill="url(#headlight-beam)"
                />
                <polygon
                  points="24,7 62,17 62,2 24,5"
                  fill="url(#headlight-beam)"
                />

                {/* 2. Rear Taillight Red Aura on Asphalt */}
                <circle cx="-25" cy="-7" r="9" fill="url(#taillight-glow)" />
                <circle cx="-25" cy="7" r="9" fill="url(#taillight-glow)" />
                <ellipse cx="-28" cy="0" rx="10" ry="14" fill="url(#taillight-glow)" opacity="0.65" />

                {/* 3. Aerodynamic Sedan Body with Chassis Drop Shadow */}
                <g filter="url(#car-shadow)">
                  {/* Outer Light-Blue Highlight Rim (Edge Contour) */}
                  <path
                    d="M 23,-5
                       C 24,-7.5 21.5,-10 17.5,-10.5
                       L -16.5,-10.5
                       C -21.5,-10.5 -24,-8 -24,-4.5
                       L -24,4.5
                       C -24,8 -21.5,10.5 -16.5,10.5
                       L 17.5,10.5
                       C 21.5,10 24,7.5 23,5
                       Z"
                    fill="none"
                    stroke="#80BFFF"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />

                  {/* Main Body Fill (Electric Cobalt / Azure Blue) */}
                  <path
                    d="M 22.5,-4.5
                       C 23.5,-7 21,-9.5 17,-10
                       L -16,-10
                       C -21,-10 -23.5,-7.5 -23.5,-4
                       L -23.5,4
                       C -23.5,7.5 -21,10 -16,10
                       L 17,10
                       C 21,9.5 23.5,7 22.5,4.5
                       Z"
                    fill="#006DE3"
                  />

                  {/* Front Hood Scoop / Power Dome (Trapezoidal Intake) */}
                  <path
                    d="M 12,-4.5
                       L 18,-4.5
                       C 19.5,-4.5 20,-2.5 20,0
                       C 20,2.5 19.5,4.5 18,4.5
                       L 12,4.5
                       Z"
                    fill="#0056BD"
                    stroke="#75B5FD"
                    strokeWidth="0.75"
                  />
                  {/* Scoop intake lip highlight */}
                  <line x1="12" y1="-4.5" x2="12" y2="4.5" stroke="#BAE6FD" strokeWidth="0.8" opacity="0.85" />

                  {/* Front Windshield (Dark Curved Arc) */}
                  <path
                    d="M 9.5,-8.5
                       C 12.5,-4 12.5,4 9.5,8.5
                       L 3.5,7
                       C 5.5,3.5 5.5,-3.5 3.5,-7
                       Z"
                    fill="#111622"
                    stroke="#60A5FA"
                    strokeWidth="0.4"
                  />

                  {/* Windshield Reflection Streak */}
                  <line x1="5.5" y1="-5.5" x2="9" y2="2" stroke="#93C5FD" strokeWidth="0.6" opacity="0.45" />

                  {/* Side Windows & Pillars (Greenhouse Flanks) */}
                  {/* Left Side Windows */}
                  <polygon points="5,-9.5 9,-8.8 3.5,-7.2 -2.5,-7.2" fill="#111622" />
                  <polygon points="-3.8,-7.2 -10,-7.2 -13.5,-9 -3.8,-9.5" fill="#111622" />
                  <line x1="9" y1="-8.8" x2="-13.5" y2="-9" stroke="#93C5FD" strokeWidth="0.7" />
                  <line x1="-3.2" y1="-9.5" x2="-3.2" y2="-7.2" stroke="#006DE3" strokeWidth="0.8" />

                  {/* Right Side Windows */}
                  <polygon points="5,9.5 9,8.8 3.5,7.2 -2.5,7.2" fill="#111622" />
                  <polygon points="-3.8,7.2 -10,7.2 -13.5,9 -3.8,9.5" fill="#111622" />
                  <line x1="9" y1="8.8" x2="-13.5" y2="9" stroke="#93C5FD" strokeWidth="0.7" />
                  <line x1="-3.2" y1="9.5" x2="-3.2" y2="7.2" stroke="#006DE3" strokeWidth="0.8" />

                  {/* Solid Electric Blue Roof Panel */}
                  <rect
                    x="-10.5"
                    y="-7.2"
                    width="14"
                    height="14.4"
                    rx="1.5"
                    fill="#006DE3"
                  />
                  {/* Roof Rails (Light Blue) */}
                  <line x1="-9.5" y1="-7.2" x2="2.5" y2="-7.2" stroke="#80BFFF" strokeWidth="0.8" />
                  <line x1="-9.5" y1="7.2" x2="2.5" y2="7.2" stroke="#80BFFF" strokeWidth="0.8" />

                  {/* Rear Windshield (Dark Curved Arc) */}
                  <path
                    d="M -10.5,-7.2
                       C -10,-3.5 -10,3.5 -10.5,7.2
                       L -15.5,8.8
                       C -17.5,4.5 -17.5,-4.5 -15.5,-8.8
                       Z"
                    fill="#111622"
                    stroke="#60A5FA"
                    strokeWidth="0.4"
                  />

                  {/* Dual Side Wing Mirrors */}
                  <polygon points="6.5,-10 4,-12.8 8,-12" fill="#006DE3" stroke="#80BFFF" strokeWidth="0.6" />
                  <polygon points="6.5,10 4,12.8 8,12" fill="#006DE3" stroke="#80BFFF" strokeWidth="0.6" />

                  {/* Front Headlights (Bright White LEDs at corner edges) */}
                  <ellipse cx="21" cy="-7.2" rx="1.5" ry="1.8" fill="#FFFFFF" stroke="#80BFFF" strokeWidth="0.5" />
                  <ellipse cx="21" cy="7.2" rx="1.5" ry="1.8" fill="#FFFFFF" stroke="#80BFFF" strokeWidth="0.5" />

                  {/* Rear Deck / Trunk Lid Creases */}
                  <path d="M -17,-5 L -22.5,-5" stroke="#0056BD" strokeWidth="0.6" opacity="0.6" />
                  <path d="M -17,5 L -22.5,5" stroke="#0056BD" strokeWidth="0.6" opacity="0.6" />

                  {/* Rear Taillights (Red LED Bars at corners) */}
                  <path d="M -23.5,-9.5 L -21.5,-9.5 L -21.5,-5.5 L -23.5,-5.5 Z" fill="#EF4444" />
                  <path d="M -23.5,9.5 L -21.5,9.5 L -21.5,5.5 L -23.5,5.5 Z" fill="#EF4444" />
                  <line x1="-23" y1="-5.5" x2="-23" y2="5.5" stroke="#DC2626" strokeWidth="0.7" opacity="0.8" />
                </g>
              </g>

              {/* ── 5 EXACT 3D WHITE TEARDROP PINS (Matching dc7850a0.jpg) ── */}
              {roadMilestones.map((m, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <g
                    key={m.id}
                    onClick={() => handleSelectPin(idx)}
                    className="cursor-pointer group"
                    transform={`translate(${m.pinX}, ${m.pinY})`}
                  >
                    {/* Road Contact Shadow */}
                    <ellipse
                      cx="0"
                      cy="3"
                      rx={isActive ? "8" : "6"}
                      ry={isActive ? "4" : "3"}
                      fill="#000000"
                      opacity={isActive ? "0.45" : "0.28"}
                    />

                    {/* Active pulse radar wave on road when parked */}
                    {isActive && !isDriving && (
                      <circle
                        cx="0"
                        cy="-26"
                        r="16"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="2"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Smooth 3D Glossy Teardrop Pin Body */}
                    <g
                      transform={isActive ? "translate(0, -4) scale(1.15)" : "translate(0, 0) scale(1)"}
                      filter="url(#pin-depth-shadow)"
                      style={{
                        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                      className="group-hover:translate-y-[-3px]"
                    >
                      {/* Outer smooth glossy teardrop */}
                      <path
                        d="M 0,0
                           C -4,-7 -14,-16 -14,-26
                           A 14,14 0 1,1 14,-26
                           C 14,-16 4,-7 0,0 Z"
                        fill="url(#pin-surface-grad)"
                      />

                      {/* Subtle 3D left facet bevel */}
                      <path
                        d="M 0,0
                           C -4,-7 -14,-16 -14,-26
                           A 14,14 0 0,1 0,-40
                           L 0,0 Z"
                        fill="#CBD5E1"
                        opacity="0.5"
                      />

                      {/* Inset circular face dial */}
                      <circle
                        cx="0"
                        cy="-26"
                        r="9.5"
                        fill={isActive ? "#1F1714" : "#FFFFFF"}
                        stroke={isActive ? "#D4AF37" : "#E2E8F0"}
                        strokeWidth={isActive ? "1.8" : "1.2"}
                      />

                      {/* Milestone Number 1..5 */}
                      <text
                        x="0"
                        y="-22"
                        textAnchor="middle"
                        fontFamily="Plus Jakarta Sans, -apple-system, sans-serif"
                        fontWeight="800"
                        fontSize="12"
                        fill={isActive ? "#FAF7F2" : "#1E293B"}
                      >
                        {m.id}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* ── 5-CHAPTER STORYBOARD FILM-STRIP REEL ── */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isDriving ? "bg-[#3B82F6] animate-ping" : "bg-[#D4AF37]"}`} />
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A5528]">
                Heritage Storyboard Reel
              </span>
            </div>
            <span className="text-xs font-serif italic text-[#9A8F85]">
              {isDriving ? (
                <span className="text-[#8A5528] font-semibold animate-pulse">
                  Cruising along Heritage Highway to {activeMilestone.chapter}...
                </span>
              ) : (
                `Scene 0${activeMilestone.id} of 05 • ${activeMilestone.year}`
              )}
            </span>
          </div>

          <div className="flex sm:grid overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 scrollbar-none snap-x snap-mandatory sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {roadMilestones.map((m, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectPin(idx)}
                  className={`text-left p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between min-w-[200px] sm:min-w-0 snap-center shrink-0 sm:shrink ${
                    isSelected
                      ? "bg-[#1F1714] text-white border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50"
                      : "bg-[#FAF7F2] hover:bg-[#F3ECE0] text-[#1F1714] border-[#EAE3D7]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#D4AF37] text-[#1F1714]"
                          : "bg-[#FFFFFF] text-[#8A5528] border border-[#EAE3D7]"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span
                      className={`text-[10px] font-medium font-serif italic ${
                        isSelected ? "text-[#D4AF37]" : "text-[#9A8F85]"
                      }`}
                    >
                      {m.chapter}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="size-10 rounded-lg overflow-hidden shrink-0 border border-black/10">
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className={`text-xs font-semibold truncate leading-tight ${
                          isSelected ? "text-white" : "text-[#1F1714]"
                        }`}
                      >
                        {m.title}
                      </h4>
                      <p
                        className={`text-[10px] truncate mt-0.5 ${
                          isSelected ? "text-[#D9CFC3]" : "text-[#7A695B]"
                        }`}
                      >
                        {m.location.split("•")[0]}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] via-[#F3ECE0] to-[#D4AF37]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── CINEMATIC LUXURY STORYBOARD THEATRE (Matching 4b3d9586.png) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: LUXURY_EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center p-4 sm:p-8 rounded-2xl bg-[#1C1613] border border-[#8C532B]/40 shadow-xl relative overflow-hidden"
          >
            {/* Ambient luxury warm gold spotlight glow */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-2xl"
              aria-hidden="true"
            />

            {/* Left: Archival Photo with Gallery Frame */}
            <div className="lg:col-span-5 relative h-48 sm:h-64 lg:h-72 rounded-xl overflow-hidden shadow-lg border border-[#8C532B]/30 group">
              <img
                src={activeMilestone.image}
                alt={activeMilestone.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Chapter Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FAF7F2] text-[10px] font-bold tracking-wider uppercase border border-[#D4AF37]/40 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#D4AF37]" />
                <span>{activeMilestone.chapter} • {activeMilestone.year}</span>
              </div>

              {/* Bottom Location & Archival Caption */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <div className="text-[11px] font-serif italic text-[#D4AF37] mb-0.5">
                  Archival Heritage Registry
                </div>
                <div className="text-xs font-medium flex items-center gap-1.5 text-[#E0D8CE] truncate">
                  <IconMapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{activeMilestone.location}</span>
                </div>
              </div>
            </div>

            {/* Right: Rich Editorial Storyboard Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2A211D] border border-[#8C532B]/50 text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">
                    {activeMilestone.badge}
                  </span>
                  <span className="text-xs text-[#B8863B] font-serif italic">
                    Scene 0{activeMilestone.id} of 05 • 34-Year Odyssey
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-serif text-[#FAF7F2] font-light leading-tight mb-1.5">
                  {activeMilestone.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#D4AF37] font-medium mb-2.5 sm:mb-3.5">
                  {activeMilestone.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#D9CFC3] leading-relaxed mb-4 sm:mb-6 font-light">
                  {activeMilestone.description}
                </p>

                {/* 3 Luxury Metadata Boxes */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mb-5 sm:mb-6">
                  {activeMilestone.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-2 sm:p-3 rounded-xl bg-[#231C18] border border-[#8C532B]/35 text-center"
                    >
                      <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#A8988B] block truncate">
                        {h.label}
                      </span>
                      <span className="text-[11px] sm:text-sm font-semibold text-[#FAF7F2] block mt-0.5 sm:mt-1 truncate">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Scene Controls & Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#8C532B]/30">
                <div className="flex items-center gap-1.5">
                  {roadMilestones.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectPin(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeIndex === i ? "w-8 bg-[#D4AF37]" : "w-2 bg-[#4A3D36] hover:bg-[#D4AF37]/50"
                      }`}
                      title={`Go to Scene ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="px-3.5 py-1.5 rounded-full bg-[#2A211D] hover:bg-[#382C27] border border-[#8C532B]/50 text-[#FAF7F2] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <IconChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-4 py-1.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#1F1714] text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <span>Next Scene</span>
                    <IconChevronRight className="w-3.5 h-3.5 text-[#1F1714]" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

