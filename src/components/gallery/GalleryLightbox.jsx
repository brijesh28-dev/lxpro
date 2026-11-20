import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconX, IconChevronLeft, IconChevronRight, IconSparkles } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
  onSelect,
}) {
  const touchStartX = useRef(0);
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || currentIndex === null || !images[currentIndex]) return null;

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[120] bg-[#140E0B]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image Lightbox"
      >
        {/* Top Controls Header */}
        <div
          className="w-full max-w-7xl flex items-center justify-between z-20 py-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/[0.08] border border-white/15 text-[#E6C99E]">
              <IconSparkles className="w-3.5 h-3.5 text-[#C59B4D]" />
              {current.category || "Showroom"}
            </span>
            <span className="text-[#A8988C] text-xs tracking-wider">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="size-10 sm:size-11 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 flex items-center justify-center text-[#FAF7F2] transition-all cursor-pointer active:scale-95"
            aria-label="Close lightbox"
          >
            <IconX className="w-5 h-5" />
          </button>
        </div>

        {/* Center Main Stage with Touch Swipe */}
        <div
          className="relative w-full max-w-5xl flex-1 flex items-center justify-center min-h-0 my-3"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff > 45) onPrev();
            else if (diff < -45) onNext();
          }}
        >
          {/* Previous Button */}
          <button
            onClick={onPrev}
            className="absolute left-1 sm:-left-16 size-10 sm:size-14 rounded-full bg-white/10 hover:bg-[#9A6233] text-[#FAF7F2] hover:text-white border border-white/20 hover:border-[#9A6233] flex items-center justify-center backdrop-blur-md transition-all duration-300 z-20 active:scale-90 cursor-pointer"
            aria-label="Previous image"
          >
            <IconChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="absolute right-1 sm:-right-16 size-10 sm:size-14 rounded-full bg-white/10 hover:bg-[#9A6233] text-[#FAF7F2] hover:text-white border border-white/20 hover:border-[#9A6233] flex items-center justify-center backdrop-blur-md transition-all duration-300 z-20 active:scale-90 cursor-pointer"
            aria-label="Next image"
          >
            <IconChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Active Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4, ease: LUXURY_EASE }}
            className="relative max-h-[70vh] flex flex-col items-center justify-center px-2"
          >
            <img
              src={current.src}
              alt={current.title}
              className="max-h-[60vh] sm:max-h-[68vh] max-w-full w-auto object-contain rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.9)] border border-white/15"
            />
            <div className="mt-3 text-center">
              <h3 className="text-[#FAF7F2] font-serif text-base sm:text-lg font-light tracking-wide">
                {current.title}
              </h3>
              <p className="text-[#C59B4D] text-xs uppercase tracking-widest mt-0.5">
                LX PRO Atelier Heritage • Surat
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div
          className="w-full max-w-4xl overflow-x-auto py-2 px-4 flex items-center justify-start sm:justify-center gap-2 z-20 scrollbar-none"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={img.id || i}
              onClick={() => onSelect(i)}
              className={`relative size-12 sm:size-14 rounded-xl overflow-hidden shrink-0 border transition-all duration-300 cursor-pointer ${
                i === currentIndex
                  ? "border-[#9A6233] scale-105 shadow-[0_0_15px_rgba(154,98,51,0.5)]"
                  : "border-white/15 opacity-50 hover:opacity-100"
              }`}
            >
              <img src={img.src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
