import PreFooterNewsletter from "./PreFooterNewsletter";
import MainFooterGrid from "./MainFooterGrid";
import SubFooter from "./SubFooter";

export default function Footer() {
  return (
    <footer className="relative w-full z-20">
      {/* ── TIER 1: SEPARATED PRE-FOOTER VIP SALON & NEWSLETTER INVITATION ── */}
      <div className="w-full bg-[#FAF7F2] pt-12 sm:pt-16 pb-16 sm:pb-20 relative">
        {/* Subtle background ambient warmth */}
        <div 
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#F2E9DE]/60 -z-10" 
          aria-hidden="true" 
        />
        <PreFooterNewsletter />
      </div>

      {/* ── TIER 2 & 3: CLASSIC SEPARATED SARTORIAL FOOTER FOUNDATION ── */}
      <div className="relative w-full bg-[#150E0B] text-[#FAF7F2] border-t-2 border-[#9A6233]/40 overflow-hidden shadow-[0_-20px_50px_rgba(21,14,11,0.25)]">
        {/* Golden Specular Hairline Highlight */}
        <div 
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C59B4D]/60 to-transparent" 
          aria-hidden="true" 
        />

        {/* Subtle Linen Weave & Ambient Lighting */}
        <div 
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#C59B4D_0.6px,transparent_0.6px)] [background-size:28px_28px] opacity-[0.03] -z-10" 
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute top-10 left-1/4 w-[700px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_top,rgba(154,98,51,0.08)_0%,transparent_70%)] transform-gpu -z-10"
          aria-hidden="true" 
        />
        <div 
          className="pointer-events-none absolute bottom-10 right-1/4 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(197,155,77,0.06)_0%,transparent_70%)] transform-gpu -z-10"
          aria-hidden="true" 
        />

        {/* Main 4-Column Classic Directory */}
        <MainFooterGrid />

        {/* Sub-Footer Legal & Tribute */}
        <SubFooter />
      </div>
    </footer>
  );
}
