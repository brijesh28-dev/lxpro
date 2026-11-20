import HeroSection from "@/components/hero/HeroSection";
import SignaturePreview from "@/components/products/SignaturePreview";
import GallerySection from "@/components/gallery/GallerySection";
import BranchesSection from "@/components/branches/BranchesSection";
import AboutSection from "@/components/about/AboutSection";
import ContactSection from "@/components/contact/ContactSection";
import OrnamentalDivider from "@/components/common/OrnamentalDivider";

export default function HomePage({ isLoaded = true }) {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection isLoaded={isLoaded} />

      <OrnamentalDivider />

      {/* 2. Atelier Visual Heritage Gallery */}
      <GallerySection />

      <OrnamentalDivider />

      {/* 4. 8 Flagship Ateliers & Interactive City Map */}
      <BranchesSection />

      <OrnamentalDivider />

      {/* 5. About Heritage, Craftsmanship & Milestones */}
      <AboutSection />

      <OrnamentalDivider />

      {/* 6. Concierge & Bespoke Consultation Hub */}
      <ContactSection />
    </>
  );
}
