import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Phone, Star } from "lucide-react";

const WA_ICON = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 flex-shrink-0">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

const WA_NUMBER = "27606038238";
const mkWA = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

// ─── SERVICE DATA ────────────────────────────────────────────────────────────
export const SERVICES = {
  cctv: {
    slug: "cctv",
    h1: "Professional CCTV Installation in uMnambithi & Surrounds",
    titleTag: "CCTV Installation in uMnambithi | MG Installations",
    sub: "Crystal-clear HD vision, zero blind spots, and full remote mobile viewing — installed and configured the same day.",
    waMsg: "Hi MG Installations! I'd like a quote for CCTV installation.",
    features: [
      { icon: "📹", title: "HD Night Vision",       desc: "ColorVu cameras deliver full-colour footage even in total darkness." },
      { icon: "📱", title: "Mobile App Setup",      desc: "We configure remote viewing on your phone before we leave." },
      { icon: "🔌", title: "Clean Wiring",          desc: "All cables routed out of sight. No exposed conduit, no mess." },
      { icon: "📍", title: "Zero Blind Spots",      desc: "Strategic placement covers every entry point and risk area." },
      { icon: "💾", title: "NVR/DVR Included",      desc: "Full recorder setup with the right storage for your property size." },
      { icon: "🛠️", title: "Full Commissioning",    desc: "Cameras tested, angles set, and playback verified before we go." },
    ],
    gallery: [
      "/images/ColorVu-Camera.webp",
      "/images/ColorVu-Camera2.webp",
      "/images/ColorVu-Camera3.webp",
      "/images/Hybrid-Dome-Camera.webp",
      "/images/Installer.webp",
      "/images/installer2.webp",
    ],
    review: {
      text: "MG sorted our CCTV the same day I called. The wiring is invisible and the phone app works perfectly. You can't even tell cables run anywhere.",
      name: "Thabo M.",
      location: "Ladysmith",
    },
    cta: "Ready to secure your property?",
  },

  dstv: {
    slug: "dstv",
    h1: "Professional DSTV Installation in uMnambithi & Surrounds",
    titleTag: "DSTV Installer in uMnambithi | MG Installations",
    sub: "Precision dish alignment, Smart LNB routing, and full decoder setup — zero signal dropout guaranteed.",
    waMsg: "Hi MG Installations! I'd like a quote for DSTV installation.",
    features: [
      { icon: "📡", title: "Precision Alignment",   desc: "Dish aligned to the exact degree for maximum signal strength." },
      { icon: "🔁", title: "Smart LNB Routing",     desc: "Multi-room setups wired correctly with the right LNB configuration." },
      { icon: "📺", title: "Decoder Setup",         desc: "Full Explora/decoder installation, activation, and channel scan." },
      { icon: "🌧️", title: "Weatherproofed",        desc: "All outdoor connections sealed to prevent moisture signal loss." },
      { icon: "🏠", title: "Multi-Room Ready",      desc: "Extra points added neatly for bedroom or second-screen viewing." },
      { icon: "⚡", title: "Same-Day Service",       desc: "Most DSTV jobs are completed within a few hours of your call." },
    ],
    gallery: [
      "/images/Dstv1.webp",
      "/images/Dstv2.webp",
    ],
    review: {
      text: "My DSTV signal has been flawless since MG came out. Previous installers left the dish loose — he fixed everything properly and explained what was wrong.",
      name: "Priya N.",
      location: "Ladysmith",
    },
    cta: "Ready for crystal-clear signal?",
  },

  tvmounting: {
    slug: "tvmounting",
    h1: "Professional TV Wall Mounting in uMnambithi & Surrounds",
    titleTag: "TV Wall Mounting in uMnambithi | MG Installations",
    sub: "Perfectly level structural mounts with every cable buried completely out of sight.",
    waMsg: "Hi MG Installations! I'd like a quote for TV wall mounting.",
    features: [
      { icon: "📐", title: "Perfectly Level",       desc: "Laser-checked alignment every time. No eyeballing, no tilting." },
      { icon: "🪝", title: "Structural Mount",      desc: "Mounted into studs or anchored correctly — it won't sag or fall." },
      { icon: "🔧", title: "Bracket Supplied",      desc: "We bring the right bracket for your exact TV size and wall type." },
      { icon: "🪄", title: "Hidden Cables",         desc: "All wiring buried in wall or run through neat conduit out of sight." },
      { icon: "🔌", title: "HDMI & Power Sorted",   desc: "We position the power outlet and HDMI runs where they need to be." },
      { icon: "🧱", title: "Any Wall Type",         desc: "Brick, drywall, or concrete — we have the right fixings for each." },
    ],
    gallery: [
      "/images/TV-Mount.webp",
    ],
    review: {
      text: "Looks like it came out of a showroom. No cables visible at all — I didn't think that was possible. Took him less than an hour.",
      name: "Sipho K.",
      location: "Steadville",
    },
    cta: "Ready for a clean, cable-free setup?",
  },

  repairs: {
    slug: "repairs",
    h1: "CCTV & DSTV Repairs and Callouts in uMnambithi & Surrounds",
    titleTag: "CCTV & DSTV Repairs in uMnambithi | MG Installations",
    sub: "Fast Ladysmith callouts to diagnose and fix broken cameras, lost signal, faulty gates, and dead tech — same day.",
    waMsg: "Hi MG Installations! I need a repair callout.",
    features: [
      { icon: "⚡", title: "Same-Day Callout",      desc: "Most repair jobs in Ladysmith and surrounds attended the same day." },
      { icon: "🔍", title: "Full Diagnosis",        desc: "We find the root cause — not just the symptom — before we fix." },
      { icon: "📹", title: "Camera Repairs",        desc: "Faulty camera, bad cable run, or corrupt recorder — all sorted." },
      { icon: "📡", title: "Signal Recovery",       desc: "Lost DSTV signal from wind, lightning, or a knocked dish — fixed." },
      { icon: "💰", title: "Transparent Pricing",   desc: "Callout fee quoted upfront. No surprises on the invoice." },
      { icon: "🛠️", title: "Parts On Hand",         desc: "We carry common replacement parts so most jobs finish in one visit." },
    ],
    gallery: [
      "/images/Installer.webp",
      "/images/installer2.webp",
    ],
    review: {
      text: "Called at 9am, he was here by 11. Fixed a camera that two other guys couldn't sort out. Knew exactly what the problem was within minutes.",
      name: "Farhan A.",
      location: "Ladysmith",
    },
    cta: "Need something fixed today?",
  },
};

// ─── REUSABLE PAGE COMPONENT ─────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function ServicePage({ service }) {
  const s = typeof service === "string" ? SERVICES[service] : service;
  
  // ── SEO & SCHEMA INJECTION ──
  useEffect(() => {
    if (!s) return;

    // 1. Dynamic Title
    document.title = s.titleTag || `${s.h1} | MG Installations`;

    // 2. Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = s.sub; // The subtitle is a perfect SEO description

    // 3. Dynamic Service Schema
    const schemaId = `schema-service-${s.slug}`;
    let script = document.getElementById(schemaId);
    if (!script) {
      script = document.createElement("script");
      script.id = schemaId;
      script.type = "application/ld+json";
      
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org/",
        "@type": "Service",
        "serviceType": s.h1,
        "provider": {
          "@type": "LocalBusiness",
          "name": "MG Installations"
        },
        "areaServed": {
          "@type": "City",
          "name": "uMnambithi"
        },
        "description": s.sub
      });
      document.head.appendChild(script);
    }

    // Cleanup to prevent duplicate tags when navigating between services
    return () => {
      const existingScript = document.getElementById(schemaId);
      if (existingScript) existingScript.remove();
    };
  }, [s]);

  if (!s) return null;

  const waHref = mkWA(s.waMsg);

  return (
    <div className="bg-[#F5F5F4] text-[#1C1917] min-h-screen font-sans">
      <Navbar />

      {/* ── 1. HERO ── */}
      <section className="min-h-[85vh] flex items-center pt-28 pb-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
          <span className="font-black text-[22vw] leading-none tracking-tighter text-[#ECEAE8] whitespace-nowrap">MG</span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-4">MG Installations · Ladysmith</p>
            <h1 className="font-black text-4xl sm:text-5xl tracking-tight leading-[1.05] mb-5 text-[#1C1917]">{s.h1}</h1>
            <p className="text-lg text-[#57534E] leading-relaxed mb-10 max-w-lg">{s.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a href={waHref} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-black text-white text-base shadow-lg shadow-green-500/20"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <WA_ICON /> Message on WhatsApp
              </motion.a>
              <a href="tel:0606038238"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-[#1C1917] border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] transition-colors text-base">
                <Phone className="w-4 h-4 text-[#57534E]" /> 060 603 8238
              </a>
            </div>
          </motion.div>
          {/* Hero image — first gallery photo */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block rounded-2xl overflow-hidden border border-[#E7E5E4] shadow-xl shadow-black/8 aspect-[4/3]">
            <img src={s.gallery[0]} alt={s.h1} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. WHAT'S INCLUDED ── */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">What's Included</p>
            <h2 className="font-black text-3xl md:text-4xl tracking-tight text-[#1C1917]">A complete job, every time.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {s.features.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)}
                className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-2xl p-6 flex flex-col gap-3">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="font-bold text-base text-[#1C1917]">{f.title}</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. GALLERY ── */}
      {s.gallery.length > 1 && (
        <section className="py-24 px-6 md:px-12 bg-[#F5F5F4]">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp()} className="mb-12">
              <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">Our Work</p>
              <h2 className="font-black text-3xl md:text-4xl tracking-tight text-[#1C1917]">See it for yourself.</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {s.gallery.map((img, i) => (
                <motion.div key={i} {...fadeUp(i * 0.05)}
                  className="rounded-2xl overflow-hidden border border-[#E7E5E4] aspect-[4/3] group">
                  <img src={img} alt={`${s.h1} photo ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. REVIEW ── */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-2xl p-10 flex flex-col gap-5">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-xl text-[#1C1917] font-medium leading-relaxed">"{s.review.text}"</p>
            <div className="flex items-center gap-3 pt-2 border-t border-[#E7E5E4]">
              <div className="w-9 h-9 rounded-full bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-sm">
                {s.review.name[0]}
              </div>
              <div>
                <p className="font-bold text-sm text-[#1C1917]">{s.review.name}</p>
                <p className="text-xs text-[#A8A29E]">{s.review.location}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. FINAL CTA ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F5F4]">
        <motion.div {...fadeUp()}
          className="max-w-4xl mx-auto rounded-3xl relative overflow-hidden text-white"
          style={{ background: "linear-gradient(135deg,#1a2a4a 0%,#0f172a 60%,#0a0a0a 100%)" }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-600/20 blur-[80px] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-20 gap-8">
            <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Let's Get Started</p>
            <h2 className="font-black text-4xl md:text-5xl tracking-tight leading-tight">{s.cta}</h2>
            <p className="text-white/50 text-lg max-w-md">Same-day service available across Ladysmith and surrounding areas.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <motion.a href={waHref} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex-1 py-4 rounded-2xl font-black text-white flex items-center justify-center gap-2 text-sm shadow-lg shadow-green-500/20"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <WA_ICON /> Message on WhatsApp
              </motion.a>
              <a href="tel:0606038238"
                className="flex-1 py-4 rounded-2xl font-black text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}