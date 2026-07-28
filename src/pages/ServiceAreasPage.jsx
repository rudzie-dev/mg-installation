import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileStickyBar from "../components/layout/MobileStickyBar";
import SEO from "../components/SEO";
import { SERVICE_AREAS } from "../lib/serviceAreas";
import { Phone, MapPin, ArrowRight } from "lucide-react";

const WA_NUMBER = "27606038238";
const mkWA = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const WA_ICON = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

// Four rotating, honest blurb templates so the 16 area entries read as real body copy
// rather than the same sentence with the town name swapped in — cycled by index.
const AREA_BLURBS = [
  (area) => `Looking for a DStv installer near you in ${area}? MG Installations covers new dish installs, decoder setup, and signal troubleshooting throughout the area.`,
  (area) => `We regularly install and service CCTV systems for homes and businesses in ${area} — clean wiring, remote phone viewing, and full commissioning on every job.`,
  (area) => `From TV wall mounting to gate motor repairs, Raja takes on general installation and maintenance callouts in ${area} — message us for a same-day or next-day slot.`,
  (area) => `${area} is one of the areas we visit regularly for DStv, CCTV, and TV mounting work. Get in touch for a free, no-obligation quote.`,
];

const FAQS = [
  {
    q: "What areas does MG Installations cover?",
    a: `We're based in Ladysmith and travel throughout uMnambithi, including ${SERVICE_AREAS.join(", ")}. If your area isn't listed, message us anyway — we still take on jobs just outside our usual radius.`,
  },
  {
    q: "How do I find a DStv or CCTV installer near me?",
    a: "WhatsApp or call us with your suburb or town and the job you need done. We'll confirm whether it's a same-day callout or schedule the next available slot in your area.",
  },
  {
    q: "Do you charge extra for outlying areas?",
    a: "Most callout fees are quoted upfront based on distance from Ladysmith. We'll always tell you the total cost before starting any work — no surprises on the invoice.",
  },
  {
    q: "Is MG Installations affiliated with DStv or MultiChoice?",
    a: "No — we're an independent, experienced DStv installer. We handle dish installs, decoder setup, and signal repairs, but account, billing, or subscription queries need to go directly to MultiChoice.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
  style: { willChange: "transform, opacity" },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function ServiceAreasPage() {
  return (
    <div className="bg-[#F5F5F4] text-[#1C1917] min-h-screen font-sans flex flex-col pb-20 md:pb-0">
      <SEO
        title="Service Areas | DStv, CCTV & TV Installer Near You | MG Installations"
        description="MG Installations installs and repairs DStv, CCTV, and TVs across Ladysmith, Ezakheni, Colenso, Winterton, Bergville and the rest of uMnambithi. Find your area and get a free quote."
        path="/service-areas"
        schema={faqSchema}
      />
      <Navbar />

      <main className="pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">

        <motion.div {...fadeUp()} className="max-w-2xl mb-14">
          <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">Where We Work</p>
          <h1 className="font-black text-4xl md:text-5xl tracking-tight leading-tight mb-4">
            Your local installer, <span className="text-[#2563EB]">wherever you are.</span>
          </h1>
          <p className="text-[#57534E] text-lg leading-relaxed">
            MG Installations is based in Ladysmith and covers DStv, CCTV, TV mounting, and repair callouts across
            uMnambithi. Searching for an installer near me? Find your town below and message us for a free quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {SERVICE_AREAS.map((area, i) => (
            <motion.div key={area} {...fadeUp((i % 6) * 0.05)}
              className="bg-white border border-[#E7E5E4] rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563EB] flex-shrink-0" aria-hidden="true" />
                <h2 className="font-bold text-base text-[#1C1917]">{area}</h2>
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed">
                {AREA_BLURBS[i % AREA_BLURBS.length](area)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div {...fadeUp()} className="max-w-3xl mb-8">
          <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">Questions</p>
          <h2 className="font-black text-3xl md:text-4xl tracking-tight text-[#1C1917]">Frequently asked.</h2>
        </motion.div>
        <div className="flex flex-col gap-3 max-w-3xl">
          {FAQS.map((faq, i) => (
            <motion.div key={faq.q} {...fadeUp(i * 0.05)}>
              <details className="group bg-white border border-[#E7E5E4] rounded-2xl p-6 open:shadow-sm">
                <summary className="font-bold text-base text-[#1C1917] cursor-pointer list-none flex items-center justify-between gap-4">
                  {faq.q}
                  <span className="text-[#2563EB] text-xl leading-none shrink-0">+</span>
                </summary>
                <p className="text-sm text-[#57534E] leading-relaxed mt-3">{faq.a}</p>
              </details>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp()}
          className="mt-20 max-w-4xl mx-auto rounded-3xl overflow-hidden relative"
          style={{ background: "linear-gradient(135deg,#1a2a4a 0%,#0f172a 60%,#0a0a0a 100%)" }}>
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-16 gap-6 text-white">
            <h2 className="font-black text-3xl md:text-4xl tracking-tight leading-tight">
              Don't see your area listed?
            </h2>
            <p className="text-white/50 text-base max-w-md">
              Message us anyway — we still take on jobs just outside our usual radius.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <motion.a href={mkWA("Hi Raja! I'd like to check if you cover my area.")} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex-1 py-4 rounded-2xl font-black text-white flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 text-sm"
                style={{ background: "linear-gradient(135deg,#25D366 0%,#128C7E 100%)" }}>
                <WA_ICON /> WhatsApp Raja
              </motion.a>
              <a href="tel:0606038238"
                className="flex-1 py-4 rounded-2xl font-black text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
              </a>
            </div>
            <Link to="/free-quote"
              className="text-white/60 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
              Or request a free quote online <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
