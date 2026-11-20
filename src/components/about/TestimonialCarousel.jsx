import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { IconStar, IconChevronLeft, IconChevronRight, IconQuote, IconSparkles } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { testimonials } from "@/config/testimonials";

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.15 });

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : testimonials.length - 1));
  const next = () => setIndex((i) => (i < testimonials.length - 1 ? i + 1 : 0));

  // Auto-play timer (runs strictly when visible in viewport to prevent background animation thrashing)
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      next();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, isInView, index]);

  const current = testimonials[index];

  return (
    <div
      ref={containerRef}
      className="relative mb-20 sm:mb-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: LUXURY_EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] mb-4 shadow-xs"
        >
          <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
            Customer Testimonials
          </span>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: LUXURY_EASE }}
          className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#1F1714] tracking-[-0.02em] font-serif"
        >
          What Our{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Patrons Say
          </span>
        </motion.h3>
      </div>

      {/* Main Testimonial Stage */}
      <div className="relative max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            className="relative rounded-3xl p-8 sm:p-12 bg-[#FFFFFF] border border-[#EAE3D7] shadow-[0_16px_45px_rgba(60,40,20,0.08)] flex flex-col items-center text-center overflow-hidden"
          >
            {/* Background watermark quote */}
            <IconQuote className="absolute top-4 right-6 w-24 h-24 text-[#EAE3D7]/60 pointer-events-none" />

            {/* 5 Gold Stars */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <IconStar
                  key={i}
                  className="w-5 h-5 text-[#C59B4D] fill-[#C59B4D] drop-shadow-[0_2px_8px_rgba(197,155,77,0.3)]"
                />
              ))}
            </div>

            {/* Quote Body */}
            <p className="text-[#1F1714] text-base sm:text-xl lg:text-2xl font-serif font-light leading-relaxed mb-8 max-w-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author Info */}
            <div className="flex flex-col items-center">
              <div className="size-12 rounded-full bg-gradient-to-tr from-[#241A15] to-[#3D2C24] text-[#FAF7F2] font-bold flex items-center justify-center text-sm mb-3 shadow-md">
                {current.initials}
              </div>
              <h4 className="text-[#1F1714] font-serif text-base font-semibold">
                {current.name}
              </h4>
              <p className="text-[#8A5528] text-xs font-medium uppercase tracking-wider mt-0.5">
                {current.occasion} • {current.location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-between mt-6 px-2">
          <button
            onClick={prev}
            className="size-11 rounded-full bg-[#FFFFFF] hover:bg-[#241A15] text-[#1F1714] hover:text-[#FAF7F2] border border-[#EAE3D7] hover:border-[#241A15] shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Previous testimonial"
          >
            <IconChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index
                    ? "w-8 bg-[#9A6233]"
                    : "w-2 bg-[#D9CFC3] hover:bg-[#B8A896]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="size-11 rounded-full bg-[#FFFFFF] hover:bg-[#241A15] text-[#1F1714] hover:text-[#FAF7F2] border border-[#EAE3D7] hover:border-[#241A15] shadow-xs flex items-center justify-center transition-all cursor-pointer active:scale-95"
            aria-label="Next testimonial"
          >
            <IconChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

