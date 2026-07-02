import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileStickyBar from "../components/layout/MobileStickyBar";
import SEO from "../components/SEO";
import { Cctv, Satellite, Tv, Wrench, Phone, ShieldCheck, BadgeCheck, Zap, Star, ArrowRight } from "lucide-react";

const WA_NUMBER = "27606038238";
const WA_MESSAGE = encodeURIComponent("Hi Raja! I'd like to get a free quote.");

const WA_ICON = ({ className = "w-5 h-5 flex-shrink-0" }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

const TRUST_BADGES = [
  { icon: BadgeCheck, label: "15+ Years Experience" },
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: Zap,        label: "Fast Response" },
];

const SERVICES = [
  { icon: Cctv,      title: "CCTV Systems",      desc: "Zero blind spots. Clean wiring, remote phone access, and full HD night vision.",  baseImg: "/images/CCTV", path: "/services/cctv" },
  { icon: Satellite, title: "DSTV & Signal",      desc: "Precision dish alignment for zero dropout, Smart LNB routing, decoder setup.",    baseImg: "/images/DSTV", path: "/services/dstv" },
  { icon: Tv,        title: "TV Wall Mounting",   desc: "Perfectly level structural mounts with every cable buried out of sight.",          baseImg: "/images/TVMount", path: "/services/tv-mounting" },
  { icon: Wrench,    title: "Repairs & Callouts", desc: "Rapid Ladysmith callouts to fix broken cameras, faulty signal, and dead tech.",   baseImg: "/images/Raja", path: "/services/repairs" },
];

// We keep this purely as an absolute fallback in case the Google Sheet is deleted or the network completely fails
const DEFAULT_REVIEWS = [
  { name: "Sibusiso", surname: "Ndlovu",  service: "CCTV Installation", stars: 5, text: "Professional service. They were on time and did a clean installation of my CCTV cameras. Highly recommended for anyone in Ladysmith." },
  { name: "Sarah", surname: "Miller",  service: "DSTV & CCTV", stars: 5, text: "Best DSTV and CCTV installer in Ladysmith. Very knowledgeable and explained everything clearly. Great value for money." },
  { name: "Johan", surname: "Pretorius",  service: "Gate Motors", stars: 5, text: "Great communication and fair pricing. Very happy with the gate motor installation. Clean work and very reliable." },
  { name: "Thabo", surname: "Mokoena",  service: "TV Wall Mounting", stars: 5, text: "Excellent TV wall mounting. Looks very neat with no cables showing. Would definitely use MG Installation again." }
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -100px 0px" },
  style: { willChange: "transform, opacity" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function HomePage() {
  const navigate = useNavigate();
  // Initial state must be identical on server and client — React hydration requires
  // the client's first render to match the prerendered HTML exactly, so this can't be
  // seeded differently per-environment. The reviews fill in client-side after mount.
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  // Serverless Fetch from Google Sheets with Skeleton Loader logic
  useEffect(() => {
    const fetchLiveReviews = async () => {
      try {
        const cachedData = localStorage.getItem('mg_reviews_cache');
        const cacheTimestamp = localStorage.getItem('mg_reviews_timestamp');
        const now = new Date().getTime();

        // If we have recent cache, use it immediately and skip the loading state
        if (cachedData && cacheTimestamp && now - cacheTimestamp < 86400000) {
          setReviews(JSON.parse(cachedData));
          setIsLoadingReviews(false);
          return;
        }

        const res = await fetch("https://script.google.com/macros/s/AKfycbxq_U8w6VA7GFq1_k1ujRDST_WLQXt6IQjBvfdGTMzpjTHn0Vp6VRi0bbRy6ABa4lAjzQ/exec");
        const data = await res.json();

        if (data && data.length > 0) {
          setReviews(data);
          localStorage.setItem('mg_reviews_cache', JSON.stringify(data));
          localStorage.setItem('mg_reviews_timestamp', now.toString());
        } else {
          setReviews(DEFAULT_REVIEWS); // Fallback if sheet is empty
        }
      } catch (error) {
        console.error("Could not fetch live reviews. Using fallbacks.", error);
        setReviews(DEFAULT_REVIEWS);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    
    fetchLiveReviews();
  }, []);

  return (
    <div className="bg-[#F5F5F4] text-[#1C1917] min-h-screen overflow-x-hidden font-sans pb-20 md:pb-0">
      <SEO
        title="MG Installations | Expert CCTV, DSTV & TV Mounting in uMnambithi"
        description="Fast, professional installations in uMnambithi, Ladysmith & surrounding areas. Specializing in CCTV, DSTV, Gate Motors, and TV Wall Mounting. Get a free quote today."
        path="/"
      />
      <Navbar />

      <main>
        {/* ── HERO SECTION ── */}
        <section className="relative min-h-dvh w-full flex items-center pt-20 pb-10 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 hidden md:flex items-center overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
            <span className="font-black text-[22vw] leading-none tracking-tighter text-[#ECEAE8] whitespace-nowrap">MG</span>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
              <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <div className="inline-flex items-center gap-2 mb-6 bg-[#1C1917] text-white px-3 py-1.5 rounded-full w-fit">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                  <span className="font-bold text-[10px] uppercase tracking-widest">Led by Master Installer, Raja</span>
                </div>
                <h1 className="text-4xl sm:text-5xl xl:text-[3.2rem] font-bold tracking-tight leading-[1.08] mb-6 text-[#1C1917]">
                  Expert Installations<br />in <span className="text-[#2563EB]">uMnambithi</span> &<br />Surrounding Areas.
                </h1>
                <p className="text-lg text-[#57534E] leading-relaxed mb-8 md:mb-10 max-w-md">
                  Quality workmanship, transparent pricing, and zero delays. Get your project sorted today with Raja and the team.
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                  {TRUST_BADGES.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#E7E5E4] flex items-center justify-center shadow-sm flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-semibold text-[#1C1917]">{label}</span>
                    </div>
                  ))}
                </div>
                <p className="lg:hidden flex items-center gap-1.5 text-xs text-[#78716C] font-medium mt-6">
                  ⚡ Usually replies in under 5 minutes on WhatsApp
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:flex justify-center lg:justify-end mt-2 lg:mt-0 will-change-transform">
                <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E7E5E4] shadow-xl shadow-black/5 p-6 md:p-8 flex flex-col items-center text-center gap-4 md:gap-6">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(135deg,#25D366 0%,#128C7E 100%)" }}>
                    <WA_ICON className="w-11 h-11" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black mb-2 tracking-tight text-[#1C1917]">Get a Free Quote</h2>
                    <p className="text-sm text-[#78716C] leading-relaxed">Message Raja on WhatsApp — he replies in minutes.</p>
                  </div>
                  <motion.a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
                    aria-label="Message Raja on WhatsApp"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-4 px-6 rounded-2xl font-black text-white text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/25"
                    style={{ background: "linear-gradient(135deg,#25D366 0%,#128C7E 100%)" }}>
                    <WA_ICON /> Message Raja
                  </motion.a>
                  <div className="w-full flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#E7E5E4]" />
                    <span className="text-xs text-[#78716C] font-bold uppercase tracking-wider">or call directly</span>
                    <div className="flex-1 h-px bg-[#E7E5E4]" />
                  </div>
                  <a href="tel:0606038238" aria-label="Call MG Installations directly at 060 603 8238"
                    className="w-full py-3.5 px-6 rounded-2xl font-bold text-[#1C1917] text-base border border-[#E7E5E4] bg-[#F5F5F4] hover:bg-[#ECEAE8] transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-[#57534E]" aria-hidden="true" /> 060 603 8238
                  </a>
                  <p className="text-xs text-[#78716C] font-medium">⚡ Usually replies in under 5 minutes</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section id="services" className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp()} className="mb-14">
              <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="font-black text-4xl md:text-5xl tracking-tight text-[#1C1917]">Everything Raja handles.</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div key={i} {...fadeUp(i * 0.07)}
                    onClick={() => navigate(s.path)}
                    className="group relative rounded-2xl overflow-hidden bg-[#F5F5F4] border border-[#E7E5E4] hover:shadow-xl hover:shadow-black/8 transition-all duration-300 cursor-pointer will-change-transform">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={`${s.baseImg}-1200px.webp`} 
                        srcSet={`${s.baseImg}-400px.webp 400w, ${s.baseImg}-800px.webp 800w, ${s.baseImg}-1200px.webp 1200w`}
                        sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
                        alt={s.title} width="800" height="600" loading="lazy" decoding="async"
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-[#1C1917]">{s.title}</h3>
                      <p className="text-[#57534E] text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </motion.div>
                );
              })}

              <motion.a {...fadeUp(SERVICES.length * 0.07)}
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
                aria-label="Ask about a custom job on WhatsApp"
                className="group rounded-2xl border-2 border-dashed border-[#D6D3D1] hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[220px] text-[#78716C] hover:text-[#2563EB] will-change-transform">
                <div className="w-12 h-12 rounded-xl border-2 border-current flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-center text-[#78716C] group-hover:text-[#1C1917] transition-colors">
                  Have a different job?<br /><span className="text-[#2563EB]">Ask Raja on WhatsApp</span>
                </p>
              </motion.a>
            </div>
          </div>
        </section>

        {/* ── LIVE REVIEWS SECTION ── */}
        <section className="py-24 px-6 bg-[#F5F5F4]">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp()} className="mb-14 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#2563EB] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Google Reviews
                </p>
                <h2 className="font-black text-4xl md:text-5xl tracking-tight text-[#1C1917]">People talk.</h2>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoadingReviews ? (
                // SKELETON LOADERS
                Array.from({ length: 4 }).map((_, i) => (
                  <motion.div key={`skeleton-${i}`} {...fadeUp(i * 0.1)} 
                    className="bg-white border border-[#E7E5E4] rounded-2xl p-8 flex flex-col gap-5 shadow-sm animate-pulse">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="w-4 h-4 bg-gray-200 rounded-sm" />
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                      <div className="h-4 bg-gray-200 rounded w-5/6" />
                      <div className="h-4 bg-gray-200 rounded w-4/6" />
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-[#E7E5E4] mt-auto">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0" />
                      <div className="space-y-2 w-full">
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                        <div className="h-2 bg-gray-200 rounded w-1/4" />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                // ACTUAL REVIEWS
                reviews.slice(0, 4).map((r, i) => {
                  const fullName = r.surname ? `${r.name} ${r.surname}` : r.name;
                  const starCount = parseInt(r.stars) || 5;

                  return (
                    <motion.div key={`review-${i}`} {...fadeUp(i * 0.1)}
                      className="bg-white border border-[#E7E5E4] rounded-2xl p-8 flex flex-col gap-5 shadow-sm will-change-transform">
                      <div className="flex gap-1">
                        {Array.from({ length: starCount }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                        ))}
                      </div>
                      <p className="text-[#1C1917] leading-relaxed text-[15px]">"{r.text}"</p>
                      <div className="flex items-center gap-3 pt-2 border-t border-[#E7E5E4] mt-auto">
                        <div className="w-9 h-9 rounded-full bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-[#2563EB] font-black text-sm uppercase">
                          {r.name ? r.name[0] : "C"}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-[#1C1917]">{fullName}</p>
                          <p className="text-xs text-[#78716C]">{r.service}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="py-24 px-6 bg-[#F5F5F4]">
          <motion.div {...fadeUp()}
            className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative will-change-transform"
            style={{ background: "linear-gradient(135deg,#1a2a4a 0%,#0f172a 60%,#0a0a0a 100%)" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-600/20 blur-[80px] pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 flex flex-col items-center text-center px-8 py-20 gap-8 text-white">
              <p className="text-xs text-blue-400 font-bold uppercase tracking-widest">Let's Get to Work</p>
              <h2 className="font-black text-4xl md:text-6xl tracking-tight leading-tight">
                Ready to get<br />started?
              </h2>
              <p className="text-white/50 text-lg max-w-md">
                Drop us a message or give us a call. Same-day callouts available in Ladysmith.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <motion.a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
                  aria-label="Message Raja on WhatsApp"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 py-4 rounded-2xl font-black text-white flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 text-sm"
                  style={{ background: "linear-gradient(135deg,#25D366 0%,#128C7E 100%)" }}>
                  <WA_ICON /> WhatsApp Raja
                </motion.a>
                <a href="tel:0606038238" aria-label="Call MG Installations directly at 060 603 8238"
                  className="flex-1 py-4 rounded-2xl font-black text-white border border-white/15 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Phone className="w-4 h-4" aria-hidden="true" /> Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}