// Supabase Edge Function: unsubscribe
//
// Marks a subscriber as unsubscribed by their unsubscribe_token. Uses the
// service-role key (server-side only — never exposed to the browser) so it can
// update a row the anon role is not allowed to set to 'unsubscribed'.
//
// The row is NEVER deleted — only status + unsubscribed_at are set.
//
// Auto-injected env (available in deployed functions): SUPABASE_URL,
// SUPABASE_SERVICE_ROLE_KEY. For local `supabase functions serve` these are
// provided by the CLI.
//
// Accepts POST JSON: { token }

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    console.error("[unsubscribe] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return json({ error: "Server not configured" }, 500);
  }

  let payload: { token?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const token = String(payload?.token ?? "").trim();
  if (!UUID_RE.test(token)) {
    return json({ error: "Invalid unsubscribe token" }, 400);
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/email_subscribers?unsubscribe_token=eq.${token}`,
      {
        method: "PATCH",
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          status: "unsubscribed",
          unsubscribed_at: new Date().toISOString(),
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("[unsubscribe] PostgREST responded", res.status, detail);
      return json({ error: "Could not process unsubscribe" }, 502);
    }

    // Idempotent: an unknown/already-unsubscribed token still returns ok so the
    // confirmation page is calm and never leaks whether a token exists.
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("[unsubscribe] Unexpected error", err);
    return json({ error: "Unexpected error" }, 500);
  }
});
