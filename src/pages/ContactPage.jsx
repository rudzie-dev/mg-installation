import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileStickyBar from "../components/layout/MobileStickyBar";
import SEO from "../components/SEO";
import { Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const WA_NUMBER = "27606038238";
const WA_MESSAGE = encodeURIComponent("Hi MG Installations! I'd like to get a free quote.");

const WA_ICON = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 flex-shrink-0">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const INPUT = "bg-[#F5F5F4] border border-[#E7E5E4] text-[#1C1917] focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-500/10 rounded-xl px-5 py-4 outline-none transition-all text-sm font-medium w-full";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/mykveqwl", {
        method: "POST", body: new FormData(e.target), headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.target.reset();
    } catch { setStatus("error"); }
  };

  return (
    <div className="bg-[#F5F5F4] text-[#1C1917] min-h-screen font-sans flex flex-col pb-20 md:pb-0">
      <SEO
        title="Contact MG Installations | Ladysmith CCTV & DStv Installer"
        description="Call, WhatsApp, or send a message to your local DStv, CCTV, and TV mounting installer near you in Ladysmith and surrounding uMnambithi areas. We respond fast and quote for free."
        path="/contact"
      />
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">

        {/* Header */}
        <motion.div {...fadeUp()} className="max-w-2xl mb-14">
          <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">Get in Touch</p>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Let's get it <span className="text-[#2563EB]">sorted.</span>
          </h1>
          <p className="text-[#57534E] text-lg leading-relaxed">
            Call, WhatsApp, or drop a message. We respond fast and quote for free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Contact cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {[
              { delay: 0.1, href: "tel:0606038238", icon: <Phone className="w-6 h-6 text-[#2563EB]" />, bg: "bg-[#EFF6FF]", label: "Call Direct", value: "060 603 8238" },
            ].map(({ delay, href, icon, bg, label, value }) => (
              <motion.a key={label} {...fadeUp(delay)} href={href}
                className="bg-white border border-[#E7E5E4] p-6 rounded-2xl flex items-center gap-4 hover:shadow-lg hover:shadow-black/5 transition-all group">
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0`}>{icon}</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-0.5">{label}</p>
                  <p className="font-bold text-lg text-[#1C1917] group-hover:text-[#2563EB] transition-colors">{value}</p>
                </div>
              </motion.a>
            ))}

            <motion.a {...fadeUp(0.15)} href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-white border border-[#E7E5E4] p-6 rounded-2xl flex items-center gap-4 hover:shadow-lg hover:shadow-black/5 transition-all group">
              <div className="w-12 h-12 bg-[#F0FDF4] rounded-xl flex items-center justify-center shrink-0 text-[#16a34a]">
                <WA_ICON />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-0.5">WhatsApp</p>
                <p className="font-bold text-lg text-[#1C1917] group-hover:text-[#16a34a] transition-colors">060 603 8238</p>
              </div>
            </motion.a>

            <motion.div {...fadeUp(0.2)}
              className="bg-white border border-[#E7E5E4] p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFF1F0] rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-[#ef4444]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-0.5">Location</p>
                <p className="font-bold text-sm text-[#1C1917] leading-snug">Shop 19, Game Centre<br />Ladysmith, KZN</p>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-8 bg-white border border-[#E7E5E4] rounded-2xl p-8 md:p-10 shadow-sm">
            <h3 className="font-black text-2xl text-[#1C1917] mb-8">Send a message</h3>

            {status === "success" ? (
              <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-8 rounded-2xl text-center flex flex-col items-center gap-3">
                <CheckCircle className="w-10 h-10 text-[#16a34a]" />
                <h4 className="font-black text-lg text-[#15803d]">Message received</h4>
                <p className="text-sm text-[#57534E]">We'll be in touch shortly. You can also WhatsApp us for a faster response.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Full Name</label>
                    <input type="text" name="name" required className={INPUT} placeholder="John Dlamini" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Phone Number</label>
                    <input type="tel" name="phone" required className={INPUT} placeholder="060 123 4567" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Email (optional)</label>
                  <input type="email" name="email" className={INPUT} placeholder="john@example.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">How can we help?</label>
                  <textarea name="message" required rows={4} className={`${INPUT} resize-none`} placeholder="Describe your job..." />
                </div>
                <button type="submit" disabled={status === "submitting"}
                  className="bg-[#1C1917] text-white px-8 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#2563EB] transition-all mt-1 disabled:opacity-50">
                  {status === "submitting" ? "Sending..." : "Send Message"}
                  <ArrowRight className="w-4 h-4" />
                </button>
                {status === "error" && <p className="text-red-500 text-sm text-center font-medium">Something went wrong. Please call or WhatsApp us directly.</p>}
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}