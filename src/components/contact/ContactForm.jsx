import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconCheck,
  IconArrowUpRight,
  IconLoader2,
  IconSparkles,
} from "@tabler/icons-react";
import { LUXURY_EASE } from "@/lib/animations";
import { locations } from "@/config/locations";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    service: "",
    date: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";

    // Clean phone number check: allow +91 or 10 digits
    const cleanPhone = form.phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      errs.phone = "Phone number is required";
    } else if (!/^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Simulate concierge booking submission
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  const handleReset = () => {
    setForm({
      name: "",
      phone: "",
      email: "",
      branch: "",
      service: "",
      date: "",
      message: "",
    });
    setStatus("idle");
    setErrors({});
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: LUXURY_EASE }}
            className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-[#FAF7F2] border border-[#9A6233]/40 text-center shadow-xl relative overflow-hidden"
          >
            <div className="size-16 sm:size-20 rounded-full bg-[#9A6233]/15 border border-[#9A6233]/40 flex items-center justify-center mb-5 text-[#9A6233] shadow-[0_0_30px_rgba(154,98,51,0.2)]">
              <IconCheck className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A5528] font-semibold mb-2">
              Appointment Requested
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1F1714] font-light mb-3">
              We Look Forward to Welcoming You
            </h3>
            <p className="text-[#6B5E55] text-sm font-light leading-relaxed max-w-md mb-8">
              Thank you, <span className="text-[#1F1714] font-medium">{form.name}</span>. An LX PRO bespoke styling concierge will reach out via WhatsApp / phone within 24 hours to confirm your consultation.
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#241A15] hover:bg-[#3D2C24] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-md"
            >
              <span>Submit Another Request</span>
            </button>
          </motion.div>
        ) : (
          <form
            key="contact-form"
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Row 1: Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A6B60] font-medium mb-1.5">
                  Full Name <span className="text-[#9A6233]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Mehta"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full bg-[#FAF7F2] border rounded-2xl px-4 py-3.5 text-[#1F1714] placeholder-[#A89C91] text-sm outline-none transition-all duration-300 ${
                    errors.name
                      ? "border-rose-500/80 focus:border-rose-500"
                      : "border-[#EAE3D7] focus:border-[#9A6233] focus:bg-[#FFFFFF]"
                  }`}
                />
                {errors.name && (
                  <p className="text-rose-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A6B60] font-medium mb-1.5">
                  Phone Number <span className="text-[#9A6233]">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`w-full bg-[#FAF7F2] border rounded-2xl px-4 py-3.5 text-[#1F1714] placeholder-[#A89C91] text-sm outline-none transition-all duration-300 ${
                    errors.phone
                      ? "border-rose-500/80 focus:border-rose-500"
                      : "border-[#EAE3D7] focus:border-[#9A6233] focus:bg-[#FFFFFF]"
                  }`}
                />
                {errors.phone && (
                  <p className="text-rose-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Row 2: Email */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#7A6B60] font-medium mb-1.5">
                Email Address <span className="text-[#9A6233]">*</span>
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full bg-[#FAF7F2] border rounded-2xl px-4 py-3.5 text-[#1F1714] placeholder-[#A89C91] text-sm outline-none transition-all duration-300 ${
                  errors.email
                    ? "border-rose-500/80 focus:border-rose-500"
                    : "border-[#EAE3D7] focus:border-[#9A6233] focus:bg-[#FFFFFF]"
                }`}
              />
              {errors.email && (
                <p className="text-rose-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Row 3: Branch and Service Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A6B60] font-medium mb-1.5">
                  Preferred Atelier
                </label>
                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D7] focus:border-[#9A6233] rounded-2xl px-4 py-3.5 text-sm text-[#1F1714] outline-none transition-colors cursor-pointer"
                >
                  <option value="">Any Surat Branch</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.area})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#7A6B60] font-medium mb-1.5">
                  Service Interest
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D7] focus:border-[#9A6233] rounded-2xl px-4 py-3.5 text-sm text-[#1F1714] outline-none transition-colors cursor-pointer"
                >
                  <option value="">Select Wardrobe Need</option>
                  <option value="wedding">Royal Wedding Kurta & Sherwani</option>
                  <option value="safari">Imperial Safari Suit & Tuxedo</option>
                  <option value="linen">Imported Italian Linen Shirting</option>
                  <option value="trouser">Tailored Pants & Trouser Fabrics</option>
                  <option value="fabric">Wholesale / Retail Fabric Swatches</option>
                  <option value="consultation">Master Tailor Bespoke Measurement</option>
                </select>
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#7A6B60] font-medium mb-1.5">
                Special Requests or Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention wedding dates, preferred fabrics, or specific tailoring requirements..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#EAE3D7] focus:border-[#9A6233] focus:bg-[#FFFFFF] rounded-2xl px-4 py-3.5 text-[#1F1714] placeholder-[#A89C91] text-sm outline-none resize-none transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center justify-between sm:justify-start gap-3 pl-6 pr-2 py-2.5 rounded-full bg-[#241A15] text-[#FAF7F2] font-semibold text-sm hover:bg-[#3D2C24] transition-all shadow-md active:scale-95 disabled:opacity-70 cursor-pointer w-full sm:w-auto"
              >
                <span>
                  {status === "submitting"
                    ? "Connecting to Atelier..."
                    : "Request Atelier Appointment"}
                </span>
                <div className="size-8 rounded-full bg-[#FAF7F2] text-[#241A15] flex items-center justify-center group-hover:bg-[#B8863B] group-hover:text-[#FAF7F2] transition-colors">
                  {status === "submitting" ? (
                    <IconLoader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <IconArrowUpRight className="w-4 h-4" />
                  )}
                </div>
              </button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}