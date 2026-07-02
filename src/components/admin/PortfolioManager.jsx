import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Trash2 } from "lucide-react";

const CATEGORIES = [
  { id: "cctv", label: "CCTV" },
  { id: "dstv", label: "DSTV" },
  { id: "mounting", label: "Mounting" },
];

const EMPTY_FORM = { title: "", category: "cctv", description: "" };

export default function PortfolioManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("portfolio_items").select("*").order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    // loadItems is also reused by handleSubmit/handleDelete to refresh the list after
    // a mutation, so it's hoisted out of the effect rather than inlined.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a photo to upload.");
      return;
    }
    setSubmitting(true);
    setError("");

    const path = `portfolio/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("images").upload(path, file);
    if (uploadError) {
      setSubmitting(false);
      setError(uploadError.message);
      return;
    }
    const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);

    const { error: insertError } = await supabase.from("portfolio_items").insert([{
      ...form,
      image_url: urlData.publicUrl,
    }]);
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setForm(EMPTY_FORM);
    setFile(null);
    e.target.reset();
    loadItems();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) setError(error.message);
    else setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="bg-white border border-[#E7E5E4] rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="font-bold text-[#1C1917]">Add a photo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm">
            {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <input placeholder="Short description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="bg-[#F5F5F4] border border-[#E7E5E4] rounded-xl px-4 py-2.5 outline-none focus:border-[#2563EB] text-sm" />
        <input required type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}
          className="text-sm" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={submitting}
          className="self-start bg-[#1C1917] text-white rounded-full px-6 py-2.5 font-bold text-sm disabled:opacity-50">
          {submitting ? "Uploading..." : "Add Photo"}
        </button>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-[#1C1917]">Existing photos ({items.length})</h2>
        {loading ? (
          <p className="text-sm text-[#78716C]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[#78716C]">No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden">
                <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover" />
                <div className="p-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#1C1917]">{item.title}</p>
                    <p className="text-xs text-[#78716C]">{item.category}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} aria-label="Delete photo"
                    className="text-[#A8A29E] hover:text-red-500 shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
