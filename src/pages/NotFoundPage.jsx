import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileStickyBar from "../components/layout/MobileStickyBar";
import SEO from "../components/SEO";
import { Phone, ArrowRight } from "lucide-react";

const WA_NUMBER = "27606038238";
const WA_MESSAGE = encodeURIComponent("Hi Raja! I landed on a broken link on your site and had a question.");

const WA_ICON = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

const QUICK_LINKS = [
  { label: "CCTV Installer",        path: "/services/cctv" },
  { label: "DStv Installer",        path: "/services/dstv" },
  { label: "TV Wall Mounting",      path: "/services/tv-mounting" },
  { label: "Repairs & Callouts",    path: "/services/repairs" },
  { label: "Service Areas",         path: "/service-areas" },
  { label: "Contact Us",            path: "/contact" },
];

export default function NotFoundPage() {
  return (
    <div className="bg-[#F5F5F4] text-[#1C1917] min-h-screen font-sans flex flex-col pb-20 md:pb-0">
      <SEO
        title="Page Not Found | MG Installations"
        description="This page doesn't exist. Find CCTV, DStv, TV mounting, and repair services from MG Installations in Ladysmith and surrounding areas."
        path="/404"
        noindex
      />
      <Navbar />

      <main className="pt-40 pb-24 px-6 md:px-12 max-w-3xl mx-auto w-full flex-grow flex flex-col items-center text-center">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-4">
          404
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="font-black text-4xl md:text-5xl tracking-tight leading-tight mb-4">
          This page took a wrong turn.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[#57534E] text-lg leading-relaxed mb-10 max-w-md">
          The page you're looking for doesn't exist or may have moved. Here's how to get where you need to go.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mb-14">
          <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
            className="flex-1 py-4 rounded-2xl font-black text-white flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 text-sm"
            style={{ background: "linear-gradient(135deg,#25D366 0%,#128C7E 100%)" }}>
            <WA_ICON /> WhatsApp Raja
          </a>
          <a href="tel:0606038238"
            className="flex-1 py-4 rounded-2xl font-bold text-[#1C1917] border border-[#E7E5E4] bg-white hover:bg-[#F5F5F4] transition-colors flex items-center justify-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-[#57534E]" aria-hidden="true" /> Call Now
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-4">Or go straight to</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {QUICK_LINKS.map(({ label, path }) => (
              <Link key={path} to={path}
                className="group bg-white border border-[#E7E5E4] rounded-xl px-4 py-3 text-sm font-semibold text-[#1C1917] hover:border-[#2563EB]/40 hover:text-[#2563EB] transition-colors flex items-center justify-between gap-2">
                {label} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link to="/" className="inline-block mt-8 text-[#2563EB] font-bold text-sm hover:underline">
            Back to Homepage
          </Link>
        </motion.div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
