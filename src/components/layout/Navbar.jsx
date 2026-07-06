import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";

const WA_NUMBER = "27606038238";
const WA_MESSAGE = encodeURIComponent("Hi MG Installations! I'd like to get a free quote.");

const WA_ICON = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on navigation — adjusted during render rather than in an
  // effect, so it takes effect in the same commit instead of causing an extra render.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const handleNavClick = (path, anchor) => {
    if (pathname === "/" && anchor) {
      const el = document.getElementById(anchor);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    navigate(path);
  };

  const NAV_LINKS = [
    { label: "Home",     action: () => navigate("/"),                   path: "/" },
    { label: "Services", action: () => handleNavClick("/", "services"),  path: null },
    { label: "Our Work", action: () => navigate("/portfolio"),            path: "/portfolio" },
    { label: "Contact",  action: () => navigate("/contact"),             path: "/contact" },
  ];

  // Home's hero is a dark photo, so the transparent (unscrolled) navbar needs a light
  // variant there — every other page's hero is light, so this only applies on "/".
  const onDarkHero = pathname === "/" && !isScrolled;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white backdrop-blur-md border-b border-[#E7E5E4] shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => navigate("/")} 
            aria-label="Go to homepage"
            className="flex items-center gap-3 cursor-pointer select-none group z-50 shrink-0 bg-transparent border-none p-0">
            <img src={onDarkHero ? "/images/logo-white.png" : "/images/logo-black.png"} alt="" aria-hidden="true"
              className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col justify-center text-left">
              <span className={`font-black text-xl tracking-tight leading-none ${onDarkHero ? "text-white" : "text-[#1C1917]"}`}>MG</span>
              <span className={`font-bold text-[10px] tracking-widest uppercase ${onDarkHero ? "text-white/70" : "text-[#57534E]"}`}>Installations</span>
            </div>
          </button>

          {/* Desktop nav links */}
          <nav className={`hidden md:flex items-center gap-7 text-sm font-semibold ${onDarkHero ? "text-white/80" : "text-[#57534E]"}`}>
            {NAV_LINKS.map(({ label, action, path }) => (
              <button key={label} onClick={action}
                className={`hover:text-[#2563EB] transition-colors ${path && pathname === path ? "text-[#2563EB]" : ""}`}>
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop right: phone + WA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0606038238"
              aria-label="Call MG Installations at 060 603 8238"
              className={`flex items-center gap-1.5 text-sm font-bold hover:text-[#2563EB] transition-colors ${onDarkHero ? "text-white" : "text-[#1C1917]"}`}>
              <Phone className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
              060 603 8238
            </a>
            <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank" rel="noopener noreferrer"
              aria-label="Message MG Installations on WhatsApp"
              className="flex items-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-full transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
              <WA_ICON /> WhatsApp Us
            </a>
          </div>

          {/* Mobile: phone icon + WA pill + hamburger */}
          <div className="md:hidden flex items-center gap-2 z-50">
            <a href="tel:0606038238"
              aria-label="Call MG Installations"
              className={`p-2 hover:text-[#2563EB] transition-colors ${onDarkHero ? "text-white" : "text-[#1C1917]"}`}>
              <Phone className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank" rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="flex items-center gap-1 text-xs font-bold text-white px-3 py-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
              <WA_ICON /> <span>Chat</span>
            </a>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={mobileMenuOpen}
              className={`p-2 ${onDarkHero ? "text-white/80 hover:text-white" : "text-[#57534E] hover:text-[#1C1917]"}`}>
              <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
                <span className={`h-px w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`h-[1.5px] w-full bg-current transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-px w-full bg-current transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
              </div>
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white z-40 flex flex-col px-8 pt-28 gap-6"
          >
            {NAV_LINKS.map(({ label, action }) => (
              <button key={label} onClick={action}
                className="text-2xl font-black text-left text-[#57534E] hover:text-[#1C1917] transition-colors">
                {label}
              </button>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
                aria-label="Message MG Installations on WhatsApp"
                className="w-full py-4 rounded-2xl font-black text-white text-center flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
                <WA_ICON /> WhatsApp Us
              </a>
              <a href="tel:0606038238"
                aria-label="Call MG Installations at 060 603 8238"
                className="w-full py-4 rounded-2xl font-black text-[#1C1917] text-center border-2 border-[#E7E5E4] flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-[#57534E]" aria-hidden="true" /> 060 603 8238
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}