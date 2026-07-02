import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ReviewsManager from "../../components/admin/ReviewsManager";
import PortfolioManager from "../../components/admin/PortfolioManager";
import PublishButton from "../../components/admin/PublishButton";

const TABS = [
  { id: "reviews", label: "Reviews" },
  { id: "portfolio", label: "Portfolio" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("reviews");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4]">
      <header className="bg-white border-b border-[#E7E5E4] px-6 py-4 flex items-center justify-between">
        <h1 className="font-black text-[#1C1917]">MG Installations Admin</h1>
        <div className="flex items-center gap-3">
          <PublishButton />
          <button onClick={handleLogout} className="text-sm font-semibold text-[#57534E] hover:text-[#1C1917]">
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                tab === t.id ? "bg-[#1C1917] text-white" : "bg-white text-[#57534E] border border-[#E7E5E4]"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === "reviews" ? <ReviewsManager /> : <PortfolioManager />}
      </div>
    </div>
  );
}
