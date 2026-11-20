import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  IconArrowRight, 
  IconCheck, 
  IconMail, 
  IconSparkles, 
  IconCrown, 
  IconDiamond 
} from "@tabler/icons-react";
import { LUXURY_EASE, useMagneticHover } from "@/lib/animations";

export default function PreFooterNewsletter() {
  const [email, setEmail] = useState("");
  const [selectedPreference, setSelectedPreference] = useState("Royal Wedding");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const submitMagnetic = useMagneticHover(6, 10);

  const preferences = [
    "Royal Wedding",
    "Imperial Safari",
    "Pure Italian Linens",
    "Bespoke Tailoring"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid luxury email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    // Simulate instant luxury concierge dispatch
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 850);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-24 text-center z-10">
      {/* Background Champagne Glow Orb */}
      <div 
        className="pointer-events-none absolute inset-0 max-w-3xl mx-auto h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(163,104,56,0.06)_0%,transparent_70%)] blur-3xl -z-10" 
        aria-hidden="true" 
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05, margin: "150px 0px 150px 0px" }}
        transition={{ duration: 0.9, ease: LUXURY_EASE }}
        className="relative p-8 sm:p-14 lg:p-16 rounded-[2.5rem] bg-[#FFFFFF] border border-[#EAE3D7] shadow-[0_24px_60px_-15px_rgba(60,40,20,0.08)] overflow-hidden"
      >
        {/* Top Filigree Specular Line */}
        <div className="pointer-events-none absolute inset-x-12 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#9A6233]/40 to-transparent" />

        {/* Ambient Corner Monogram Watermark */}
        <div 
          className="pointer-events-none absolute -bottom-10 -right-10 select-none text-[160px] font-serif font-black text-[#1F1714]/[0.025] tracking-tighter"
          aria-hidden="true"
        >
          LX
        </div>

        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#EAE3D7] backdrop-blur-md mb-6">
          <IconCrown className="w-3.5 h-3.5 text-[#9A6233]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-medium">
            Private VIP Privileges
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1F1714] tracking-[-0.02em] leading-tight mb-4 font-serif">
          Invitations to Our{" "}
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#8C532B] via-[#B8863B] to-[#703C15]">
            Private Salon &amp; Ateliers
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-[#6B5E55] text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed mb-8">
          Gain privileged first access to rare European mill fabric drops, private festive trunk shows, 
          and priority booking with our Master Tailors across Surat&apos;s 8 flagship branches.
        </p>

        {/* Sartorial Interest Pill Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-xl mx-auto">
          <span className="text-xs text-[#7A6B60] mr-2 flex items-center gap-1 font-light">
            <IconDiamond className="w-3 h-3 text-[#9A6233]" /> Your Interest:
          </span>
          {preferences.map((pref) => {
            const isSelected = selectedPreference === pref;
            return (
              <button
                key={pref}
                type="button"
                onClick={() => setSelectedPreference(pref)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "bg-[#241A15] border-[#241A15] text-[#FAF7F2] shadow-xs font-medium"
                    : "bg-[#F4EFE6] border-[#EAE3D7] text-[#6B5E55] hover:text-[#1F1714] hover:bg-[#EAE3D7]"
                }`}
              >
                {pref}
              </button>
            );
          })}
        </div>

        {/* Subscription Form */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-[#FAF7F2] border border-[#9A6233]/40 text-[#1F1714] shadow-md"
            >
              <div className="size-7 rounded-full bg-[#9A6233] text-white flex items-center justify-center shadow">
                <IconCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-sm font-medium tracking-wide">
                Welcome to the Inner Circle. An atelier concierge will contact you with private previews.
              </span>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="relative max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-[#FAF7F2] border border-[#EAE3D7] focus-within:border-[#9A6233] transition-all shadow-md"
            >
              <div className="flex items-center gap-3 w-full px-4 py-2.5 sm:py-0">
                <IconMail className="w-5 h-5 text-[#9A6233] shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your personal or business email..."
                  aria-label="Email address for bespoke updates"
                  className="w-full bg-transparent text-sm sm:text-[15px] text-[#1F1714] placeholder-[#A89C91] focus:outline-none font-light"
                />
              </div>

              {/* Magnetic Submit Button */}
              <motion.div
                ref={submitMagnetic.ref}
                style={{ x: submitMagnetic.x, y: submitMagnetic.y }}
                {...submitMagnetic.bind}
                className="w-full sm:w-auto shrink-0"
              >
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#241A15] text-[#FAF7F2] font-semibold text-sm hover:bg-[#3D2C24] transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-70"
                >
                  <span className="tracking-wide text-[#FAF7F2] font-medium">
                    {status === "submitting" ? "Requesting..." : "Request Invitation"}
                  </span>
                  <motion.div 
                    style={{ x: submitMagnetic.innerX, y: submitMagnetic.innerY }}
                    className="size-8 rounded-full bg-[#FAF7F2] text-[#241A15] flex items-center justify-center transition-colors group-hover:bg-[#B8863B] group-hover:text-[#FAF7F2]"
                  >
                    <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </motion.div>
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Error Feedback */}
        {errorMessage && (
          <p className="text-rose-500 text-xs mt-3 font-medium tracking-wide">
            {errorMessage}
          </p>
        )}

        {/* Privacy Note */}
        <p className="text-[#7A6B60] text-xs mt-6 font-light flex items-center justify-center gap-1.5">
          <IconSparkles className="w-3.5 h-3.5 text-[#9A6233]" />
          <span>Curated discretion assured. No unsolicited correspondence. Unsubscribe anytime.</span>
        </p>
      </motion.div>
    </section>
  );
}
