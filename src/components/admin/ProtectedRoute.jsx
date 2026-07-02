import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | authed | anon

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "authed" : "anon");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authed" : "anon");
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen bg-[#F5F5F4] flex items-center justify-center text-[#78716C] text-sm">Loading...</div>;
  }
  if (status === "anon") {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
