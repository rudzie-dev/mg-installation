import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

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

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchLiveReviews = async () => {
      try {
        const cachedData = localStorage.getItem('mg_reviews_cache');
        const cacheTimestamp = localStorage.getItem('mg_reviews_timestamp');
        const now = new Date().getTime();

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
          setReviews(DEFAULT_REVIEWS);
        }
      } catch (error) {
        console.error("Could not fetch live reviews. Using fallbacks.");
        setReviews(DEFAULT_REVIEWS);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    
    fetchLiveReviews();
  }, []);

  return (
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
  );
}