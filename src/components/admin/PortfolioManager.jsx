import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { resizeImage } from "../../lib/resizeImage";
import { Trash2, Pencil, ChevronUp, ChevronDown } from "lucide-react";

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
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // The public gallery (PortfolioPage) orders by sort_order first — reordering here
  // always renumbers the whole list to 0..n-1 so it stays fully determined, rather
  // than relying on every row already having a sort_order set from creation.
  const loadItems = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("portfolio_items")
      .select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    // loadItems is also reused by handleSubmit/handleDelete/moveItem to refresh the
    // list after a mutation, so it's hoisted out of the effect rather than inlined.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadItems();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, category: item.category, description: item.description || "" });
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !file) {
      setError("Please choose a photo to upload.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const update = { ...form };

      // A new photo is required to create an item, but optional when editing —
      // editing usually just fixes the title/category/description.
      if (file) {
        const resized = await resizeImage(file);
        const path = `portfolio/${Date.now()}-${resized.name}`;
        const { error: uploadError } = await supabase.storage.from("images").upload(path, resized);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);
        update.image_url = urlData.publicUrl;
      }

      if (editingId) {
        const { error: updateError } = await supabase.from("portfolio_items").update(update).eq("id", editingId);
        if (updateError) throw updateError;
      } else {
        const nextOrder = items.length ? Math.max(...items.map((i) => i.sort_order ?? 0)) + 1 : 0;
        const { error: insertError } = await supabase.from("portfolio_items").insert([{ ...update, sort_order: nextOrder }]);
        if (insertError) throw insertError;
      }

      setForm(EMPTY_FORM);
      setFile(null);
      setEditingId(null);
      e.target.reset();
      loadItems();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) setError(error.message);
    else setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const moveItem = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const reordered = [...items];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setItems(reordered);
    await Promise.all(
      reordered.map((item, i) => supabase.from("portfolio_items").update({ sort_order: i }).eq("id", item.id))
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit} className="bg-white border border-[#E7E5E4] rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="font-bold text-[#1C1917]">{editingId ? "Edit photo" : "Add a photo"}</h2>
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
        <div className="flex flex-col gap-1.5">
          <input required={!editingId} type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])}
            className="text-sm" />
          {editingId && <p className="text-xs text-[#A8A29E]">Leave blank to keep the current photo. Photos are automatically resized on upload.</p>}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={submitting}
            className="self-start bg-[#1C1917] text-white rounded-full px-6 py-2.5 font-bold text-sm disabled:opacity-50">
            {submitting ? (editingId ? "Saving..." : "Uploading...") : editingId ? "Save Changes" : "Add Photo"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="text-sm font-semibold text-[#78716C] hover:text-[#1C1917]">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-[#1C1917]">Existing photos ({items.length})</h2>
        <p className="text-xs text-[#A8A29E] -mt-1">Use the arrows to control the order photos appear in on the site.</p>
        {loading ? (
          <p className="text-sm text-[#78716C]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[#78716C]">No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.map((item, i) => (
              <div key={item.id} className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden">
                <img src={item.image_url} alt={item.title} className="w-full h-32 object-cover" />
                <div className="p-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-[#1C1917]">{item.title}</p>
                    <p className="text-xs text-[#78716C]">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => moveItem(i, -1)} disabled={i === 0} aria-label="Move up"
                      className="text-[#A8A29E] hover:text-[#2563EB] disabled:opacity-30 disabled:hover:text-[#A8A29E]">
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button onClick={() => moveItem(i, 1)} disabled={i === items.length - 1} aria-label="Move down"
                      className="text-[#A8A29E] hover:text-[#2563EB] disabled:opacity-30 disabled:hover:text-[#A8A29E]">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button onClick={() => startEdit(item)} aria-label="Edit photo"
                      className="text-[#A8A29E] hover:text-[#2563EB]">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} aria-label="Delete photo"
                      className="text-[#A8A29E] hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
