import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import SEO from "../components/SEO";
import { CheckCircle2, ArrowRight, ArrowLeft, Send } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

const SERVICES = [
  { id: "cctv", title: "CCTV Installation" },
  { id: "dstv", title: "DSTV & OVHD" },
  { id: "tv", title: "TV Wall Mounting" },
  { id: "gate", title: "Gate Motors & Access" },
  { id: "repairs", title: "System Repairs" },
  { id: "other", title: "Other / Custom" }
];

export default function FreeQuotePage() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({ service: "", type: "residential", name: "", phone: "", details: "" });

  const handleNext = () => setStep(p => Math.min(p + 1, 3));
  const handlePrev = () => setStep(p => Math.max(p - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => formPayload.append(key, value));

    try {
      const response = await fetch("https://formspree.io/f/mykveqwl", {
        method: "POST",
        body: formPayload,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#F8F9FA] text-[#202124] min-h-screen font-sans flex flex-col">
      <SEO
        title="Get a Free Quote | MG Installations Ladysmith"
        description="Request a free quote for CCTV, DSTV, TV wall mounting, gate motors, or repairs in Ladysmith and surrounding areas. Fast response, no obligation."
        path="/free-quote"
      />
      <Navbar />

      <main className="pt-36 pb-32 px-6 md:px-12 max-w-4xl mx-auto w-full relative z-10 flex-grow">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="text-center mb-16">
          <motion.span variants={fadeUp} className="text-[#1A73E8] text-[11px] font-bold uppercase tracking-widest mb-4 block">Deployment Estimator</motion.span>
          <motion.h1 variants={fadeUp} className="display font-900 text-[clamp(2.5rem,5vw,4.5rem)] tracking-[-0.03em] leading-[1.1] text-[#202124]">
            Request a <span className="text-[#1A73E8]">Quote.</span>
          </motion.h1>
        </motion.div>

        {status === "success" ? (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-gray-200 p-12 rounded-[2.5rem] shadow-md text-center max-w-xl mx-auto">
             <div className="w-20 h-20 bg-[#E6F4EA] rounded-full flex items-center justify-center mx-auto mb-6 text-[#188038]">
               <CheckCircle2 className="w-10 h-10" />
             </div>
             <h2 className="display text-3xl font-900 text-[#202124] mb-3">Request Logged.</h2>
             <p className="text-[#5F6368] font-light text-lg mb-8">Our estimators are reviewing your parameters and will contact you directly.</p>
             <button onClick={() => window.location.href = "/"} className="text-[#1A73E8] font-bold uppercase text-sm tracking-widest hover:underline">Return to Hub</button>
           </motion.div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-[2.5rem] shadow-md overflow-hidden p-6 md:p-12 relative">
            
            {/* Progress Bar */}
            <div className="flex gap-2 mb-10">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= i ? "bg-[#1A73E8]" : "bg-gray-100"}`} />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative min-h-[350px]">
              <AnimatePresence mode="wait">
                
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                    <div>
                      <h3 className="display text-2xl font-800 text-[#202124] mb-2">Select requirement.</h3>
                      <p className="text-[#5F6368] text-sm">Identify the primary deployment category.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICES.map(s => (
                        <div 
                          key={s.id} 
                          onClick={() => setFormData({...formData, service: s.title})}
                          className={`cursor-pointer border-2 rounded-2xl p-5 transition-all flex items-center justify-between ${formData.service === s.title ? "border-[#1A73E8] bg-[#E8F0FE]" : "border-gray-200 hover:border-gray-300 bg-white"}`}
                        >
                          <span className={`font-bold display ${formData.service === s.title ? "text-[#1A73E8]" : "text-[#202124]"}`}>{s.title}</span>
                          {formData.service === s.title && <CheckCircle2 className="w-5 h-5 text-[#1A73E8]" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                    <div>
                      <h3 className="display text-2xl font-800 text-[#202124] mb-2">Property Profile.</h3>
                      <p className="text-[#5F6368] text-sm">Give us context on the installation environment.</p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5F6368] ml-1">Environment Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Residential", "Commercial"].map(t => (
                          <div 
                            key={t} onClick={() => setFormData({...formData, type: t})}
                            className={`cursor-pointer border-2 rounded-2xl p-4 text-center transition-all ${formData.type === t ? "border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8]" : "border-gray-200 bg-white text-[#5F6368]"} font-bold display`}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#5F6368] ml-1">Specific Requirements (Optional)</label>
                      <textarea 
                        value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})}
                        className="bg-[#F1F3F4] border border-[#DADCE0] text-[#202124] focus:bg-white focus:border-[#1A73E8] focus:ring-4 focus:ring-blue-500/10 rounded-xl px-5 py-4 outline-none transition-all font-medium text-sm resize-none" 
                        rows="3" placeholder="e.g. 4 cameras outside, double story house..." 
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                    <div>
                      <h3 className="display text-2xl font-800 text-[#202124] mb-2">Contact Link.</h3>
                      <p className="text-[#5F6368] text-sm">Where should we route the final quote?</p>
                    </div>
                    <div className="flex flex-col gap-5 mt-2">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#5F6368] ml-1">Full Name</label>
                        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-[#F1F3F4] border border-[#DADCE0] text-[#202124] focus:bg-white focus:border-[#1A73E8] focus:ring-4 focus:ring-blue-500/10 rounded-xl px-5 py-4 outline-none transition-all font-medium text-sm" placeholder="John Doe" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#5F6368] ml-1">Phone Number (WhatsApp Preferred)</label>
                        <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-[#F1F3F4] border border-[#DADCE0] text-[#202124] focus:bg-white focus:border-[#1A73E8] focus:ring-4 focus:ring-blue-500/10 rounded-xl px-5 py-4 outline-none transition-all font-medium text-sm" placeholder="060 123 4567" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls */}
              <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button type="button" onClick={handlePrev} className="text-[#5F6368] font-bold flex items-center gap-2 hover:text-[#202124] px-4 py-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button type="button" disabled={step === 1 && !formData.service} onClick={handleNext} className="bg-[#202124] text-white px-8 py-3 rounded-full font-bold display flex items-center gap-2 hover:bg-black disabled:opacity-50 transition-all">
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={status === "submitting" || !formData.name || !formData.phone} className="bg-[#188038] text-white px-8 py-3 rounded-full font-bold display flex items-center gap-2 hover:bg-[#13652A] hover:shadow-lg disabled:opacity-50 transition-all">
                    {status === "submitting" ? "Transmitting..." : "Submit Request"} <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}