import { motion } from "motion/react";
import { IconSparkles } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import ContactForm from "./ContactForm";
import ContactDetails from "./ContactDetails";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-28 overflow-hidden border-t border-[#EAE3D7]"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -bottom-20 right-1/4 w-[750px] h-[550px] rounded-full bg-[radial-gradient(ellipse,rgba(163,104,56,0.06)_0%,transparent_70%)] transform-gpu -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: LUXURY_EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-5 shadow-xs"
          >
            <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
              Bespoke Inquiries &amp; Concierge
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
            className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight mb-4 font-serif"
          >
            Begin Your{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
              Bespoke Journey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASE }}
            className="text-[#6B5E55] text-sm sm:text-base font-light max-w-xl leading-relaxed"
          >
            Whether commissioning a wedding sherwani, tailoring an imperial safari suit, or sourcing rare fabrics — our concierge and master tailors are at your service.
          </motion.p>
        </div>

        {/* 2-Column Split: Form (Left) & Concierge Details + FAQ (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Contact Form (Tasks 29-31) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#EAE3D7] shadow-[0_16px_40px_rgba(60,40,20,0.06)]"
          >
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A5528] font-semibold">
                Direct Appointment Booking
              </span>
              <h3 className="text-[#1F1714] font-serif text-xl sm:text-2xl font-light mt-1">
                Consult With a Master Stylist
              </h3>
            </div>
            <ContactForm />
          </motion.div>

          {/* Right Column: Contact Details, Socials, & Luxury FAQ (Tasks 32-34) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: LUXURY_EASE }}
            className="lg:col-span-6"
          >
            <ContactDetails />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
