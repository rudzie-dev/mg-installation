import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Commercial Security Feed",  category: "cctv",     img: "/images/ColorVu-Camera.webp",       desc: "ColorVu night-vision deployment at Ladysmith depot." },
  { id: 2, title: "Precision Dish Alignment",  category: "dstv",     img: "/images/Dstv1.webp",                desc: "Rooftop multi-switch setup for residential complex." },
  { id: 3, title: "Clean Media Wall",          category: "mounting",  img: "/images/TV-Mount.webp",             desc: "Cable-free floating TV mount on brick wall." },
  { id: 4, title: "Hybrid Camera Matrix",      category: "cctv",     img: "/images/Hybrid-Dome-Camera.webp",   desc: "Vandal-proof dome cameras for retail storefront." },
  { id: 5, title: "On-Site Installation",      category: "cctv",     img: "/images/Installer.webp",            desc: "Full camera run and termination at commercial site." },
  { id: 6, title: "Hardware Supply & Setup",   category: "dstv",     img: "/images/Farhan-hardware.webp",      desc: "Decoder and LNB sourcing with same-day setup." },
];

const CATEGORIES = [
  { id: "all",      label: "All Work" },
  { id: "cctv",     label: "CCTV" },
  { id: "dstv",     label: "DSTV" },
  { id: "mounting", label: "Mounting" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function PortfolioPage() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === active);

  return (
    <div className="bg-[#F5F5F4] text-[#1C1917] min-h-screen font-sans flex flex-col">
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">

        {/* Header */}
        <motion.div {...fadeUp()} className="max-w-2xl mb-14">
          <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">Visual Archive</p>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Our <span className="text-[#2563EB]">Work.</span>
          </h1>
          <p className="text-[#57534E] text-lg leading-relaxed">
            A selection of clean, technical deployments across residential and commercial sites in Ladysmith.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActive(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                active === cat.id
                  ? "bg-[#1C1917] text-white border-[#1C1917]"
                  : "bg-white text-[#57534E] border-[#E7E5E4] hover:border-[#1C1917] hover:text-[#1C1917]"
              }`}>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div layout key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/8 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#1C1917] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/40">
                    {CATEGORIES.find(c => c.id === item.category)?.label}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-[#1C1917] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}