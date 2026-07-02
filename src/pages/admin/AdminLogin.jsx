import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin", { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setError("Login failed. Check your email and password.");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border border-[#E7E5E4] rounded-2xl p-8 flex flex-col gap-4">
        <h1 className="text-xl font-black text-[#1C1917] mb-2">Admin Login</h1>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-3 outline-none focus:border-[#2563EB] text-sm" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-3 outline-none focus:border-[#2563EB] text-sm" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={submitting}
          className="bg-[#1C1917] text-white rounded-xl py-3 font-bold text-sm disabled:opacity-50 mt-2">
          {submitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
