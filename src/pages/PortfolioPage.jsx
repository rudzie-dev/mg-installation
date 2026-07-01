import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/SEO";
import { Loader2 } from "lucide-react";

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Commercial Security Feed",  category: "cctv",     baseImg: "/images/CCTV",     desc: "ColorVu night-vision deployment at Ladysmith depot." },
  { id: 2, title: "Precision Dish Alignment",  category: "dstv",     baseImg: "/images/DSTV",     desc: "Rooftop multi-switch setup for residential complex." },
  { id: 3, title: "Clean Media Wall",          category: "mounting", baseImg: "/images/TVMount",  desc: "Cable-free floating TV mount on brick wall." },
  { id: 4, title: "Hybrid Camera Matrix",      category: "cctv",     baseImg: "/images/CCTV2",    desc: "Vandal-proof dome cameras for retail storefront." },
  { id: 5, title: "On-Site Installation",      category: "cctv",     baseImg: "/images/Raja",     desc: "Full camera run and termination at commercial site." },
  { id: 6, title: "Hardware Supply & Setup",   category: "dstv",     baseImg: "/images/Raja2",    desc: "Decoder and LNB sourcing with same-day setup." },
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
  // Must match between server and client renders for hydration to succeed; the grid
  // fills in client-side once images preload, same as before prerendering existed.
  const [isLoading, setIsLoading] = useState(true);

  const filtered = active === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === active);

  const preloadImages = (items) => {
    return items.map(item => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = `${item.baseImg}-1200px.webp`; // Preload largest size to ensure cache hits
        img.onload = resolve;
        img.onerror = resolve;
      });
    });
  };

  useEffect(() => {
    let isMounted = true;
    const loadInitialAssets = async () => {
      const delayPromise = new Promise(resolve => setTimeout(resolve, 600));
      const imagePromises = preloadImages(PORTFOLIO_ITEMS);
      await Promise.all([delayPromise, ...imagePromises]);
      if (isMounted) setIsLoading(false);
    };
    loadInitialAssets();
    return () => { isMounted = false; };
  }, []);

  const handleFilter = async (categoryId) => {
    if (categoryId === active || isLoading) return;
    setIsLoading(true);
    setActive(categoryId); 
    const newItems = categoryId === "all" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === categoryId);
    const delayPromise = new Promise(resolve => setTimeout(resolve, 600));
    const imagePromises = preloadImages(newItems);
    await Promise.all([delayPromise, ...imagePromises]);
    setIsLoading(false);
  };

  return (
    <div className="bg-[#F5F5F4] text-[#1C1917] min-h-screen font-sans flex flex-col">
      <SEO
        title="Our Work | MG Installations Portfolio in Ladysmith"
        description="A selection of clean, technical CCTV, DSTV, and TV mounting installations across residential and commercial sites in Ladysmith, personally installed by Raja."
        path="/portfolio"
      />
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">

        <motion.div {...fadeUp()} className="max-w-2xl mb-14">
          <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">Visual Archive</p>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Our <span className="text-[#2563EB]">Work.</span>
          </h1>
          <p className="text-[#57534E] text-lg leading-relaxed">
            A selection of clean, technical deployments across residential and commercial sites in Ladysmith, personally installed by Raja.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => handleFilter(cat.id)}
              disabled={isLoading}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                active === cat.id
                  ? "bg-[#1C1917] text-white border-[#1C1917]"
                  : "bg-white text-[#57534E] border-[#E7E5E4] hover:border-[#1C1917] hover:text-[#1C1917]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center items-center py-24 w-full"
              >
                <Loader2 className="w-10 h-10 text-[#2563EB] animate-spin" />
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((item, i) => (
                  <motion.div key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/8 transition-all duration-300">
                    <div className="relative h-52 overflow-hidden">
                      {/* Responsive Image Update */}
                      <img 
                        src={`${item.baseImg}-1200px.webp`} 
                        srcSet={`${item.baseImg}-400px.webp 400w, ${item.baseImg}-800px.webp 800w, ${item.baseImg}-1200px.webp 1200w`}
                        sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
                        alt={item.title} width="800" height="600" loading="lazy" decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform" 
                      />
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}