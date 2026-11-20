import { useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SmartLink, ScrollManager } from "@/components/common/SmartLink";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import logoDark from "@/assets/lxProLogoDark.png";
import logoLight from "@/assets/lxProLogo.png";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import useThemeMode from "@/hooks/useThemeMode";

import CursorGlow from "@/components/common/CursorGlow";
import BackToTop from "@/components/common/BackToTop";
import PageLoader from "@/components/common/PageLoader";
import ScrollProgress from "@/components/common/ScrollProgress";

import HomePage from "@/pages/HomePage";
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
import Footer from "@/components/footer/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = useThemeMode();
  const activeLogo = isDark ? logoLight : logoDark;

  const navItems = [
    { name: "Home",     link: "/#home" },
    { name: "Products", link: "/products" },
    { name: "Gallery",  link: "/#gallery" },
    { name: "Branches", link: "/#branches" },
    { name: "About",    link: "/#about" },
    { name: "Contact",  link: "/#contact" },
  ];

  return (
    <div
      id="home"
      className="min-h-screen w-full bg-[#FAF7F2] dark:bg-[#0E0A08] text-[#1F1714] dark:text-[#FAF7F2] flex flex-col items-center relative selection:bg-[#9A6233]/20 dark:selection:bg-[#C59B4D]/30 selection:text-[#1F1714] dark:selection:text-[#FAF7F2] transition-colors duration-300"
    >
      <ScrollManager />
      <PageLoader isVisible={!loaded} onComplete={() => setLoaded(true)} />
      <CursorGlow />
      <ScrollProgress />
      <BackToTop />

      {/* Luxury Resizable Glass Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo
            href="/#home"
            logoDarkSrc={logoDark}
            logoLightSrc={logoLight}
            logoSrc={activeLogo}
            title="LX PRO"
          />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <NavbarButton variant="secondary" href="tel:7600050236">
              76000 50236
            </NavbarButton>
            <NavbarButton variant="primary" href="/#branches">
              Visit Stores
            </NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo
              href="/#home"
              logoDarkSrc={logoDark}
              logoLightSrc={logoLight}
              logoSrc={activeLogo}
              title="LX PRO"
            />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <SmartLink
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-[#6B5E55] dark:text-[#C4B7AB] hover:text-[#1F1714] dark:hover:text-[#FAF7F2] transition-colors py-2 text-base font-medium w-full"
              >
                <span className="block">{item.name}</span>
              </SmartLink>
            ))}
            <div className="flex w-full flex-col gap-3 pt-3 border-t border-[#EAE3D7] dark:border-[#38281F]">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                href="tel:7600050236"
                className="w-full text-center py-2.5"
              >
                76000 50236
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                href="/#branches"
                className="w-full text-center py-2.5"
              >
                Visit Stores
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Multi-Route Application Content */}
      <main className="w-full flex flex-col items-center flex-1">
        <Suspense
          fallback={
            <div className="min-h-screen w-full bg-[#FAF7F2] dark:bg-[#0E0A08] flex items-center justify-center">
              <span className="size-3 rounded-full bg-[#9A6233] animate-ping" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage isLoaded={loaded} />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      {/* Luxury Multi-tier Footer */}
      <Footer />
    </div>
  );
}
