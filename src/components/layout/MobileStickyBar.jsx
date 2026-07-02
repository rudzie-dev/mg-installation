import { Phone } from "lucide-react";

const WA_NUMBER = "27606038238";
const WA_MESSAGE = encodeURIComponent("Hi Raja! I'd like a quote.");

const WA_ICON = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
    <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.672 4.8 1.844 6.79L2 30l7.41-1.82A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.83-1.598l-.418-.248-4.397 1.08 1.117-4.27-.27-.44A11.46 11.46 0 014.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.172-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.912-1.717-2.037-1.918-2.382-.2-.345-.02-.53.15-.702.155-.155.345-.4.518-.6.172-.2.23-.345.345-.575.114-.23.058-.43-.028-.603-.086-.172-.776-1.87-1.063-2.56-.28-.674-.565-.583-.776-.594l-.66-.011a1.27 1.27 0 00-.921.432c-.316.345-1.207 1.178-1.207 2.873s1.235 3.332 1.407 3.562c.172.23 2.43 3.71 5.888 5.204.823.355 1.465.567 1.966.726.826.264 1.578.226 2.172.137.663-.1 2.04-.834 2.328-1.638.287-.804.287-1.493.2-1.638-.086-.144-.316-.23-.66-.4z"/>
  </svg>
);

export default function MobileStickyBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-stretch gap-2 p-3 bg-white/95 backdrop-blur-md border-t border-[#E7E5E4] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`} target="_blank" rel="noopener noreferrer"
        aria-label="Message MG Installations on WhatsApp"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-black text-white text-sm shadow-lg shadow-green-500/20"
        style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}>
        <WA_ICON /> WhatsApp
      </a>
      <a href="tel:0606038238" aria-label="Call MG Installations at 060 603 8238"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-[#1C1917] text-sm border border-[#E7E5E4] bg-[#F5F5F4]">
        <Phone className="w-4 h-4 text-[#2563EB]" aria-hidden="true" /> Call
      </a>
    </div>
  );
}
