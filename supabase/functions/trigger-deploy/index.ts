// Supabase Edge Function: proxies a POST to the Vercel Deploy Hook.
// The hook URL is a bearer-token-equivalent secret and must never reach the client
// bundle — it's stored as a Supabase function secret (VERCEL_DEPLOY_HOOK_URL) and only
// read here, server-side. Supabase Edge Functions verify the caller's JWT by default
// (deploy WITHOUT --no-verify-jwt), so only a logged-in admin session can invoke this.

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const hookUrl = Deno.env.get("VERCEL_DEPLOY_HOOK_URL");
  if (!hookUrl) {
    return new Response(JSON.stringify({ error: "Deploy hook not configured" }), { status: 500 });
  }

  const res = await fetch(hookUrl, { method: "POST" });
  if (!res.ok) {
    return new Response(JSON.stringify({ error: "Deploy hook request failed" }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
