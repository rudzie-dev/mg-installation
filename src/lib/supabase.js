import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase env vars are missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). " +
    "Reviews, portfolio, and /admin will not work until they're set in .env."
  );
}

// Fall back to a syntactically valid placeholder so createClient() never throws at
// module-evaluation time — this module is imported at the top of public pages (not
// just /admin), and entry-server.jsx pulls in the whole route module graph during the
// SSR build regardless of which routes actually get prerendered, so a throw here would
// break the entire static build, not just the admin panel.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
