import { motion } from "motion/react";
import { IconSparkles, IconCrown, IconCertificate } from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import aboutImg from "@/assets/gallery/about-bg.jpg";

export default function FounderStory() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20 sm:mb-28">
      {/* Narrative Column */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: LUXURY_EASE }}
        className="lg:col-span-7 flex flex-col items-start"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EAE3D7] backdrop-blur-md mb-6 shadow-xs">
          <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
            Est. 1992 • Surat, Gujarat
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight mb-5 font-serif">
          Three Decades of{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Sartorial Excellence
          </span>
        </h2>

        <p className="text-[#3D2C24] text-base sm:text-lg font-serif italic mb-6 leading-relaxed border-l-2 border-[#9A6233] pl-4">
          &ldquo;We don’t settle for ‘okay’. Our mission is to make every gentleman look sharp and distinguished, bringing genuine global fabrics together with masterful Indian craftsmanship.&rdquo;
        </p>

        <p className="text-[#5C5046] text-sm sm:text-base font-light leading-relaxed mb-6">
          Powered by <strong className="text-[#1F1714] font-medium">Laxminarayan Fabrics</strong>, LX PRO began in 1992 on Varachha Road with a simple promise: exceptional fabrics at honest pricing. Over 34 years, that vision has grown into 8 premier ateliers across Surat, dressing more than 248,000 discerning patrons.
        </p>

        <p className="text-[#5C5046] text-sm sm:text-base font-light leading-relaxed mb-8">
          Today, under the <strong className="text-[#1F1714]">LX PRO</strong> banner, we marry European mill-certified linens and Super 150s Merino wools with traditional hand-loomed Banarasi zari and bespoke tailoring — creating garments of timeless distinction.
        </p>

        {/* Milestones Chips */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-8">
          {[
            { label: "8 Flagship Ateliers", icon: IconCrown },
            { label: "34+ Years of Legacy", icon: IconSparkles },
            { label: "248k+ Dressed Patrons", icon: IconCertificate },
            { label: "100% Mill Direct", icon: IconCrown },
          ].map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#FFFFFF] border border-[#EAE3D7] text-[#1F1714] shadow-xs"
            >
              <item.icon className="w-3.5 h-3.5 text-[#9A6233]" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#241A15] text-[#FAF7F2] font-semibold text-sm hover:bg-[#3D2C24] transition-all shadow-md active:scale-95"
        >
          <span>Schedule Private Atelier Session</span>
          <div className="size-8 rounded-full bg-[#FAF7F2] text-[#241A15] flex items-center justify-center group-hover:bg-[#B8863B] group-hover:text-[#FAF7F2] transition-colors">
            <IconCrown className="w-4 h-4" />
          </div>
        </a>
      </motion.div>

      {/* Visual Portrait Column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: LUXURY_EASE }}
        className="lg:col-span-5 relative"
      >
        <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-[#EAE3D7] shadow-[0_20px_50px_rgba(60,40,20,0.10)]">
          <img
            src={aboutImg}
            alt="LX PRO Heritage Showroom"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1714]/85 via-[#1F1714]/25 to-transparent" />

          {/* Floating Heritage Seal */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FFFFFF]/92 border border-[#EAE3D7] backdrop-blur-md shadow-lg">
            <p className="text-[10px] uppercase tracking-widest text-[#8A5528] font-semibold mb-1">
              Family Tradition Since 1992
            </p>
            <p className="text-[#1F1714] text-xs sm:text-sm font-light leading-snug">
              &ldquo;In Perpetual Service to Surat&rsquo;s Modern Gentlemen.&rdquo;
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

