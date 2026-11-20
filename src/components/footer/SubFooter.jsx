import { IconShieldCheck, IconArrowUp } from "@tabler/icons-react";

export default function SubFooter() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Atelier Service", href: "#terms" },
    { name: "Bespoke Fitting Charter", href: "/#about" },
    { name: "Surat Store Locator", href: "/#branches" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full border-t border-white/[0.08] bg-[#0C0705] text-[#8C7D72] py-8 px-6 sm:px-8 lg:px-12 text-xs relative">
      {/* Warm Saddle Cognac Specular Hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59B4D]/35 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright & Surat Heritage Line */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <p className="text-[#8C7D72] font-light">
            © {currentYear} <strong className="text-[#FAF7F2] font-medium">LX PRO</strong> • Laxminarayan Fabrics.
          </p>
          <span className="hidden sm:inline text-[#5C5046]">•</span>
          <p className="text-[#8C7D72] font-light flex items-center gap-1">
            Born in Surat, Gujarat — The Textile &amp; Diamond Capital
          </p>
        </div>

        {/* Center: Legal Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {legalLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#8C7D72] hover:text-[#FAF7F2] transition-colors relative py-0.5 group text-xs font-light"
            >
              <span>{link.name}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#C59B4D] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right: Payment Trust & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Payment Badges */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-[#BFAF9F]">
            <IconShieldCheck className="w-3.5 h-3.5 text-[#C59B4D]" />
            <span className="tracking-wide">UPI • Cards • NetBanking</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Return to top of page"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#9A6233] text-[#FAF7F2] hover:text-white border border-white/10 hover:border-[#9A6233] transition-all duration-300 cursor-pointer text-[11px] active:scale-95 shadow-xs"
          >
            <span>Top</span>
            <IconArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
