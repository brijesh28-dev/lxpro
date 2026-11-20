import FounderStory from "./FounderStory";
import CraftsmanshipGrid from "./CraftsmanshipGrid";
import HeritageRoadMap from "./HeritageRoadMap";
import MasterTailors from "./MasterTailors";
import TestimonialCarousel from "./TestimonialCarousel";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 overflow-hidden border-t border-[#EAE3D7]"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-0 right-1/4 w-[750px] h-[550px] rounded-full bg-[radial-gradient(ellipse,rgba(163,104,56,0.05)_0%,transparent_70%)] transform-gpu -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-10 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(217,185,145,0.04)_0%,transparent_70%)] transform-gpu -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Module 1: Founder Story & Laxminarayan Fabrics Legacy (Task 23) */}
        <FounderStory />

        {/* Module 2: Craftsmanship Philosophy & Global Mill Sourcing (Tasks 24 & 25) */}
        <CraftsmanshipGrid />

        {/* Module 3: 34-Year Winding Road Heritage Highway */}
        <div className="mb-20 sm:mb-28">
          <HeritageRoadMap />
        </div>

        {/* Module 4: Master Tailors & Artisanal Guild (Task 27) */}
        <div className="mb-20 sm:mb-28">
          <MasterTailors />
        </div>

        {/* Module 5: Customer Testimonials Carousel (Task 26) */}
        <TestimonialCarousel />
      </div>
    </section>
  );
}
