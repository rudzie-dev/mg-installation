import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ 
  icon, 
  title, 
  desc, 
  onClick, 
  variants,
  className = ""
}) {
  return (
    <motion.div
      variants={variants}
      onClick={onClick}
      className={`group p-8 rounded-2xl border cursor-pointer transition-colors duration-300 bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.07] ${className}`}
    >
      <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.05] group-hover:border-white/10 group-hover:bg-white/[0.04] transition-all duration-300">
        {icon}
      </div>
      <h3 className="display text-lg font-700 mb-3 tracking-tight" style={{ fontWeight: 700 }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/35 font-light">
        {desc}
      </p>
      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium opacity-0 group-hover:opacity-60 transition-opacity">
        Learn more
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </motion.div>
  );
}