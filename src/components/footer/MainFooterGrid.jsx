import { motion } from "motion/react";
import { 
  IconPhone, 
  IconMail, 
  IconBrandWhatsapp, 
  IconBrandInstagram, 
  IconBrandFacebook, 
  IconBrandX, 
  IconBrandYoutube,
  IconBuildingStore,
  IconCrown,
  IconScissors,
  IconArrowRight,
  IconClock,
  IconSparkles
} from "@tabler/icons-react";
import logoImg from "@/assets/lxProLogo.png";
import { LUXURY_EASE } from "@/lib/animations";

export default function MainFooterGrid() {
  const collections = [
    { name: "Royal Wedding Kurtas & Sherwanis", href: "/products" },
    { name: "Imperial Safari Suits & Tuxedos", href: "/products" },
    { name: "100% Pure Italian Linens", href: "/products" },
    { name: "Irish Flax & European Shirting", href: "/products" },
    { name: "Imported Tailored Trousers", href: "/products" },
    { name: "Hand-Loomed Silk Brocades", href: "/products" },
    { name: "Festive Indo-Western Ensembles", href: "/products" },
  ];

  const conciergeServices = [
    { name: "Private Master Tailor Appointments", href: "/#contact" },
    { name: "Wedding Wardrobe Consultations", href: "/#contact" },
    { name: "Complimentary Lifetime Fitting Support", href: "/#about" },
    { name: "Bespoke Fabric Swatch Book Delivery", href: "/#contact" },
    { name: "Surat 8-Flagship Store Directory", href: "/#branches" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24 relative">
      {/* Background Watermark Crest */}
      <div 
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[220px] font-serif font-black text-white/[0.02] tracking-tighter"
        aria-hidden="true"
      >
        1992
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 relative z-10">
        
        {/* ── COLUMN 1: BRAND STORY & HERITAGE (5 Cols) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8"
        >
          {/* Logo with subtle hover glow */}
          <a href="/#home" className="inline-block group mb-5">
            <img 
              src={logoImg} 
              alt="LX PRO Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_20px_rgba(197,155,77,0.25)]"
            />
          </a>

          {/* Tagline */}
          <p className="font-serif italic text-base sm:text-lg text-[#C59B4D] font-normal tracking-wide mb-4">
            The Timeless Luxury &bull; Est. 1992
          </p>

          {/* Narrative */}
          <p className="text-[#BFAF9F] text-sm leading-relaxed font-light mb-8 max-w-md">
            Powered by <strong className="text-[#FAF7F2] font-medium">Laxminarayan Fabrics</strong>. 
            For over 34 years, our eight prestigious ateliers have dressed Surat&apos;s most distinguished 
            families, business leaders, and grooms in masterfully draped royal Indian couture and pure European fabrics.
          </p>

          {/* Trust Emblems Triad */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-6 border-t border-white/10">
            <div className="flex flex-col items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#9A6233]/60 transition-colors shadow-xs">
              <IconCrown className="w-4 h-4 text-[#C59B4D] mb-1.5" />
              <span className="text-xs font-semibold text-[#FAF7F2] tracking-tight">Est. 1992</span>
              <span className="text-[10px] text-[#8C7D72] uppercase tracking-wider mt-0.5">34 Years</span>
            </div>

            <div className="flex flex-col items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#9A6233]/60 transition-colors shadow-xs">
              <IconBuildingStore className="w-4 h-4 text-[#C59B4D] mb-1.5" />
              <span className="text-xs font-semibold text-[#FAF7F2] tracking-tight">8 Ateliers</span>
              <span className="text-[10px] text-[#8C7D72] uppercase tracking-wider mt-0.5">Surat Flagships</span>
            </div>

            <div className="flex flex-col items-start p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#9A6233]/60 transition-colors shadow-xs">
              <IconScissors className="w-4 h-4 text-[#C59B4D] mb-1.5" />
              <span className="text-xs font-semibold text-[#FAF7F2] tracking-tight">Bespoke</span>
              <span className="text-[10px] text-[#8C7D72] uppercase tracking-wider mt-0.5">Master Tailoring</span>
            </div>
          </div>
        </motion.div>

        {/* ── COLUMN 2: COLLECTIONS & COUTURE (3 Cols) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
          className="lg:col-span-3 flex flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="size-1 rounded-full bg-[#C59B4D]" />
            <h3 className="text-[#FAF7F2] text-sm font-semibold tracking-widest uppercase font-serif">
              Collections
            </h3>
          </div>
          <ul className="space-y-3.5">
            {collections.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-2 text-sm text-[#BFAF9F] hover:text-[#FAF7F2] transition-all font-light"
                >
                  <IconArrowRight className="w-3 h-3 text-[#C59B4D] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  <span className="relative">
                    {link.name}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#C59B4D] transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── COLUMN 3: CONCIERGE & SURAT ATELIERS (4 Cols) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASE }}
          className="lg:col-span-4 flex flex-col items-start"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="size-1 rounded-full bg-[#C59B4D]" />
            <h3 className="text-[#FAF7F2] text-sm font-semibold tracking-widest uppercase font-serif">
              Concierge &amp; Flagships
            </h3>
          </div>

          <div className="space-y-3 w-full mb-6">
            {/* Direct Telephone */}
            <a
              href="tel:7600050236"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#9A6233]/60 text-[#FAF7F2] transition-all text-sm group shadow-xs"
            >
              <div className="size-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-[#C59B4D] group-hover:bg-[#9A6233] group-hover:text-white transition-colors shrink-0">
                <IconPhone className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#8C7D72]">Atelier Inquiries</span>
                <span className="font-semibold text-[#FAF7F2] tracking-wide">76000 50236</span>
              </div>
            </a>

            {/* Email Concierge */}
            <a
              href="mailto:lxpro2025@gmail.com"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#9A6233]/60 text-[#FAF7F2] transition-all text-sm group shadow-xs"
            >
              <div className="size-9 rounded-xl bg-white/[0.06] flex items-center justify-center text-[#C59B4D] group-hover:bg-[#9A6233] group-hover:text-white transition-colors shrink-0">
                <IconMail className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#8C7D72]">Electronic Mail</span>
                <span className="font-medium text-[#FAF7F2] truncate max-w-[200px]">lxpro2025@gmail.com</span>
              </div>
            </a>

            {/* WhatsApp VIP Concierge */}
            <a
              href="https://wa.me/917600050236?text=Hello%20LX%20PRO%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20tailoring%20and%20ateliers."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#4EED88] transition-all text-sm group shadow-xs"
            >
              <div className="size-9 rounded-xl bg-[#25D366] text-neutral-950 flex items-center justify-center shadow-xs shrink-0 font-bold">
                <IconBrandWhatsapp className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#4EED88] font-semibold">Instant WhatsApp</span>
                <span className="font-medium text-[#FAF7F2]">Chat with Senior Stylist</span>
              </div>
            </a>
          </div>

          {/* Social Media Icons */}
          <p className="text-xs text-[#8C7D72] uppercase tracking-widest mb-3 font-medium flex items-center gap-1.5">
            <IconSparkles className="w-3.5 h-3.5 text-[#C59B4D]" />
            Follow Our Sartorial Journey
          </p>
          <div className="flex items-center gap-2.5 mb-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LX PRO on Instagram"
              className="size-10 rounded-full bg-white/[0.06] hover:bg-[#9A6233] border border-white/10 hover:border-[#9A6233] flex items-center justify-center text-[#FAF7F2] hover:text-white transition-all duration-300 shadow-xs active:scale-95"
            >
              <IconBrandInstagram className="w-4 h-4" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LX PRO on Facebook"
              className="size-10 rounded-full bg-white/[0.06] hover:bg-[#9A6233] border border-white/10 hover:border-[#9A6233] flex items-center justify-center text-[#FAF7F2] hover:text-white transition-all duration-300 shadow-xs active:scale-95"
            >
              <IconBrandFacebook className="w-4 h-4" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LX PRO on X"
              className="size-10 rounded-full bg-white/[0.06] hover:bg-[#9A6233] border border-white/10 hover:border-[#9A6233] flex items-center justify-center text-[#FAF7F2] hover:text-white transition-all duration-300 shadow-xs active:scale-95"
            >
              <IconBrandX className="w-4 h-4" />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LX PRO on YouTube"
              className="size-10 rounded-full bg-white/[0.06] hover:bg-[#9A6233] border border-white/10 hover:border-[#9A6233] flex items-center justify-center text-[#FAF7F2] hover:text-white transition-all duration-300 shadow-xs active:scale-95"
            >
              <IconBrandYoutube className="w-4 h-4" />
            </a>
          </div>

          {/* Atelier Hours & Surat Flagships */}
          <div className="flex items-center gap-2 text-xs text-[#8C7D72] pt-3 border-t border-white/10 w-full">
            <IconClock className="w-3.5 h-3.5 text-[#C59B4D] shrink-0" />
            <span>Open Daily: 10:00 AM – 9:00 PM IST across 8 Surat Branches</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
