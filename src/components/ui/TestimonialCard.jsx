import { motion } from "framer-motion";

export default function TestimonialCard({ 
  quote, 
  name, 
  role, 
  className = "",
  ...props 
}) {
  return (
    <motion.div
      {...props}
      className={`rounded-3xl p-10 md:p-14 bg-white/[0.04] border border-white/[0.07] backdrop-blur-md ${className}`}
    >
      <p className="display text-[clamp(1.3rem,3vw,2rem)] font-600 leading-[1.45] tracking-[-0.02em] mb-10 text-white/78" style={{ fontWeight: 600 }}>
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold display bg-white/10">
          {name ? name[0] : ""}
        </div>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs mt-0.5 text-white/30">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}