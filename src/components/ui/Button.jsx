import { motion } from "framer-motion";

export default function Button({ 
  children, 
  variant = "primary", 
  className = "", 
  ...props 
}) {
  const baseStyles = "display rounded-full font-bold text-sm md:text-base tracking-tight flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer select-none disabled:opacity-30 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-white text-[#050505] hover:bg-[#f0f0f0] hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(255,255,255,0.12)] active:scale-[0.99]",
    ghost: "border border-white/[0.18] text-white/60 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.99]"
  };

  return (
    <motion.button
      whileHover={{ scale: variant === "primary" ? 1.02 : 1 }}
      whileTap={{ scale: 0.99 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}