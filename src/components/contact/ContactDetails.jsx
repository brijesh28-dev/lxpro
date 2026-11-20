import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconPhone,
  IconMail,
  IconClock,
  IconMapPin,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandThreads,
  IconLink,
  IconChevronDown,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { SOCIAL_LINKS } from "@/config/socialLinks";

const FAQS = [
  {
    q: "What is bespoke tailoring at LX PRO?",
    a: "Bespoke tailoring means your garment is individually cut and crafted from raw fabric to your unique anatomical measurements. Our master tailors account for shoulder slope, posture, and drape to ensure a silhouette that fits you effortlessly.",
  },
  {
    q: "How long does custom tailoring take?",
    a: "A bespoke safari suit or wedding sherwani typically takes 7–12 working days, including milestone fittings. For urgent ceremonial occasions, express tailoring can be accommodated at our flagship ateliers upon request.",
  },
  {
    q: "Can I inspect fabric swatches before committing?",
    a: "Yes. All 8 Surat ateliers carry complete swatch books of our European linens, Super 150s wools, and silk brocades. You can also message our WhatsApp concierge to request fabric pictures or a swatch delivery.",
  },
  {
    q: "Do you offer tailoring for fabrics brought from outside?",
    a: "While our expertise shines brightest when working with our mill-certified fabrics, our master tailors do accept select premium fabrics for bespoke crafting and fitting.",
  },
  {
    q: "Do I need an appointment to visit?",
    a: "Walk-ins are always warmly welcomed across all 8 Surat locations daily between 10:00 AM and 9:00 PM IST. If you desire a dedicated master tailor consultation or private room for wedding ensembles, scheduling ahead ensures zero wait time.",
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-[#EAE3D7] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left gap-4 cursor-pointer group"
      >
        <span className="text-[#1F1714] text-sm font-serif font-normal group-hover:text-[#9A6233] transition-colors leading-snug">
          {item.q}
        </span>
        <div
          className={`size-7 rounded-full bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 bg-[#241A15] text-[#FAF7F2] border-[#241A15]" : ""
          }`}
        >
          <IconChevronDown className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-[#6B5E55] text-xs sm:text-sm font-light leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactDetails() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      {/* Primary Contact Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFFFF] border border-[#EAE3D7] shadow-[0_8px_30px_rgba(60,40,20,0.05)] flex flex-col gap-4">
        <h4 className="text-[#1F1714] font-serif text-lg font-light mb-1">
          Concierge &amp; Headquarters
        </h4>

        {/* Helpline */}
        <a
          href="tel:7600050236"
          className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-[#F4EFE6] transition-colors"
        >
          <div className="size-11 rounded-2xl bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] group-hover:bg-[#241A15] group-hover:text-[#FAF7F2] transition-all shrink-0">
            <IconPhone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#7A6B60]">
              Direct Phone Helpline
            </p>
            <p className="text-[#1F1714] font-medium text-sm sm:text-base group-hover:text-[#9A6233] transition-colors">
              +91 76000 50236
            </p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:lxpro2025@gmail.com"
          className="flex items-center gap-4 group p-2.5 rounded-2xl hover:bg-[#F4EFE6] transition-colors"
        >
          <div className="size-11 rounded-2xl bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] group-hover:bg-[#241A15] group-hover:text-[#FAF7F2] transition-all shrink-0">
            <IconMail className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-[#7A6B60]">
              Official Email
            </p>
            <p className="text-[#1F1714] font-medium text-sm sm:text-base group-hover:text-[#9A6233] transition-colors truncate">
              lxpro2025@gmail.com
            </p>
          </div>
        </a>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/917600050236?text=Hello%20LX%20PRO%2C%20I%20would%20like%20to%20inquire%20about%20bespoke%20tailoring."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 group p-2.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 hover:bg-[#25D366]/20 transition-all"
        >
          <div className="size-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
            <IconBrandWhatsapp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#168a3e] font-semibold">
              Instant WhatsApp Concierge
            </p>
            <p className="text-[#1F1714] font-medium text-sm flex items-center gap-1.5">
              <span>Chat Directly with a Stylist</span>
              <IconArrowUpRight className="w-3.5 h-3.5 text-[#168a3e]" />
            </p>
          </div>
        </a>

        {/* Flagship Address */}
        <div className="flex items-start gap-4 p-2.5">
          <div className="size-11 rounded-2xl bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] shrink-0 mt-0.5">
            <IconMapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#7A6B60]">
              Main Flagship Showroom
            </p>
            <p className="text-[#1F1714] text-xs sm:text-sm font-light leading-relaxed mt-0.5">
              Krishna Park Society, 5&amp;6, Varachha Main Rd, near D-mart, Sarthana Jakat Naka, Nana Varachha, Surat, Gujarat 395013
            </p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-center gap-4 p-2.5 border-t border-[#EAE3D7] pt-3">
          <div className="size-11 rounded-2xl bg-[#F4EFE6] border border-[#EAE3D7] flex items-center justify-center text-[#9A6233] shrink-0">
            <IconClock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#7A6B60]">
              Showroom Hours
            </p>
            <p className="text-[#1F1714] text-xs sm:text-sm font-light">
              Daily 10:00 AM – 9:00 PM IST (All 8 Ateliers)
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 px-6 rounded-2xl bg-[#FFFFFF] border border-[#EAE3D7] shadow-xs">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#7A6B60] font-medium block">
            Follow Our Journey
          </span>
          <span className="text-[11px] text-[#9A6233] font-serif italic">
            @lxpro_25 &bull; Laxminarayan Fabrics
          </span>
        </div>
        <div className="flex items-center gap-2">
          {[
            { Icon: IconBrandInstagram, label: "Instagram (@lxpro_25)", href: SOCIAL_LINKS.instagram.url },
            { Icon: IconBrandFacebook,  label: "Facebook (LX Pro)",  href: SOCIAL_LINKS.facebook.url },
            { Icon: IconBrandThreads,   label: "Threads (@lxpro_25)", href: SOCIAL_LINKS.threads.url },
            { Icon: IconBrandWhatsapp,  label: "WhatsApp Concierge", href: SOCIAL_LINKS.whatsapp.url },
            { Icon: IconLink,           label: "Official Linktree", href: SOCIAL_LINKS.linktree.url },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="size-9 rounded-full bg-[#F4EFE6] hover:bg-[#241A15] border border-[#EAE3D7] hover:border-[#241A15] flex items-center justify-center text-[#1F1714] hover:text-[#FAF7F2] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Luxury FAQ Accordion */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#FFFFFF] border border-[#EAE3D7] shadow-[0_8px_30px_rgba(60,40,20,0.05)]">
        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A5528] font-semibold">
            Common Inquiries
          </span>
          <h4 className="text-[#1F1714] font-serif text-lg font-light">
            Bespoke Guidance &amp; FAQs
          </h4>
        </div>
        <div className="mt-4">
          {FAQS.map((faq, idx) => (
            <FaqItem
              key={idx}
              item={faq}
              isOpen={openFaq === idx}
              onToggle={() => setOpenFaq(openFaq === idx ? -1 : idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}