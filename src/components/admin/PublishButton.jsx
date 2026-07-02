import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function PublishButton() {
  const [status, setStatus] = useState("idle"); // idle | publishing | done | error

  const handlePublish = async () => {
    setStatus("publishing");
    const { error } = await supabase.functions.invoke("trigger-deploy");
    setStatus(error ? "error" : "done");
    if (!error) setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <button onClick={handlePublish} disabled={status === "publishing"}
      className="text-sm font-bold px-4 py-2 rounded-full bg-[#2563EB] text-white disabled:opacity-50">
      {status === "publishing" ? "Publishing..." : status === "done" ? "Published! Rebuild started." : status === "error" ? "Failed — try again" : "Publish Changes"}
    </button>
  );
}
