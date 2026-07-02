import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Trash2, Star } from "lucide-react";

const EMPTY_FORM = { name: "", surname: "", service: "", stars: 5, text: "" };

export default function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    // loadReviews is also reused by handleSubmit/handleDelete to refresh the list after
    // a mutation, so it's hoisted out of the effect rather than inlined.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const { error } = await supabase.from("reviews").insert([form]);
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setForm(EMPTY_FORM);
    loadReviews();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) setError(error.message);
    else setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="bg-white border border-[#E7E5E4] rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="font-bold text-[#1C1917]">Add a review</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required placeholder="First name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm" />
          <input placeholder="Surname (optional)" value={form.surname}
            onChange={(e) => setForm({ ...form, surname: e.target.value })}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm" />
          <input required placeholder="Service (e.g. CCTV Installation)" value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm" />
          <select value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>)}
          </select>
        </div>
        <textarea required placeholder="Review text" rows={3} value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm resize-none" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={submitting}
          className="self-start bg-[#1C1917] text-white rounded-full px-6 py-2.5 font-bold text-sm disabled:opacity-50">
          {submitting ? "Adding..." : "Add Review"}
        </button>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-[#1C1917]">Existing reviews ({reviews.length})</h2>
        {loading ? (
          <p className="text-sm text-[#78716C]">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-[#78716C]">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="bg-white border border-[#E7E5E4] rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-[#1C1917] mb-2">"{r.text}"</p>
                <p className="text-xs text-[#78716C] font-semibold">
                  {r.name} {r.surname} — {r.service}
                </p>
              </div>
              <button onClick={() => handleDelete(r.id)} aria-label="Delete review"
                className="text-[#A8A29E] hover:text-red-500 shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
