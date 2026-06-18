import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const WA_NUMBER = "27606038238";
const WA_MESSAGE = encodeURIComponent("Hi MG Installations! I'd like to get a free quote.");

const WA_ICON = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

const AREAS = [
  "Ladysmith", "Steadville", "Ezakheni A–E", "Watersmeet",
  "Besters", "Colenso", "Roosboom", "Waaihoek",
  "Umbulwana", "Matiwane", "Winterton", "Bergville",
  "Ekuvukeni", "Limehill", "Vaalkop", "Uitval",
];

const NAV = [
  { label: "Home",      path: "/" },
  { label: "Our Work",  path: "/portfolio" },
  { label: "Contact",   path: "/contact" },
  { label: "Free Quote",path: "/free-quote" },
];

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F4] border-t border-[#E7E5E4] pt-20 pb-10 px-6 md:px-12 font-sans relative overflow-hidden">

      {/* Watermark logo */}
      <img src="/images/logo-black.png" alt=""
        className="absolute -right-16 -bottom-10 w-[70vw] max-w-[600px] opacity-[0.04] -rotate-12 pointer-events-none select-none grayscale" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#E7E5E4]">

          {/* Brand col */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div>
              <span className="font-black text-2xl tracking-tight text-[#1C1917]">MG</span>
              <span className="font-bold text-xs tracking-widest uppercase text-[#A8A29E] ml-2">Installations</span>
            </div>
            <p className="text-sm text-[#78716C] leading-relaxed max-w-xs">
              Professional CCTV, DSTV, and TV mounting installations across uMnambithi and surrounding areas.
            </p>
            <div className="flex flex-col gap-2.5 text-sm font-semibold text-[#1C1917]">
              <a href="tel:0606038238" className="flex items-center gap-2 hover:text-[#2563EB] transition-colors w-fit">
                <Phone className="w-4 h-4 text-[#2563EB]" /> 060 603 8238
              </a>
              <a href="mailto:info@mginstallations.co.za" className="flex items-center gap-2 hover:text-[#2563EB] transition-colors w-fit">
                <Mail className="w-4 h-4 text-[#2563EB]" /> info@mginstallations.co.za
              </a>
              <span className="flex items-center gap-2 text-[#78716C] font-normal">
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" /> Shop 19, Ladysmith Game Centre, KZN
              </span>
            </div>
            <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-black text-white px-4 py-2.5 rounded-full w-fit"
              style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
              <WA_ICON /> WhatsApp Us
            </a>
          </div>

          {/* Nav col */}
          <div className="md:col-span-2 md:col-start-6 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-1">Navigation</span>
            {NAV.map(({ label, path }) => (
              <button key={label} onClick={() => navigate(path)}
                className="text-sm text-[#57534E] hover:text-[#1C1917] font-medium text-left transition-colors w-fit">
                {label}
              </button>
            ))}
          </div>

          {/* Service areas col */}
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-1">Service Areas</span>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <span key={area}
                  className="text-xs font-medium text-[#57534E] bg-white border border-[#E7E5E4] px-2.5 py-1 rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A8A29E]">
          <span>© {year} MG Installations. All rights reserved.</span>
          <span>Built for uMnambithi & surrounding areas.</span>
        </div>

      </div>
    </footer>
  );
}