// Supabase Edge Function: send-welcome-email
//
// Sends a calm welcome email through Resend after a visitor subscribes.
// The Resend API key NEVER touches the browser — it lives only here as a
// Supabase secret.
//
// Secrets / env (set with `supabase secrets set`):
//   RESEND_API_KEY   (required) your Resend API key
//   RESEND_FROM      (optional) verified sender, e.g. "Guided by Grace <hello@yourdomain.com>"
//   APP_URL          (optional) base URL used in the email button (no trailing slash)
//
// Accepts POST JSON: { email, source, journey }

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Resend's shared sender works for testing; swap to a verified domain sender
// via RESEND_FROM for production deliverability.
const FROM = Deno.env.get("RESEND_FROM") ?? "Guided by Grace <onboarding@resend.dev>";
const APP_URL = (Deno.env.get("APP_URL") ?? "http://localhost:5173").replace(/\/$/, "");

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function welcomeText(beginUrl: string, unsubscribeUrl: string): string {
  return [
    "Hi,",
    "",
    "Welcome to Guided by Grace.",
    "",
    "I’m glad you’re here.",
    "",
    "This is a quiet space to begin your day with Scripture, prayer, and one simple step with God.",
    "",
    "No pressure.",
    "No noise.",
    "Just one quiet step at a time.",
    "",
    "Your first guided journey is:",
    "Finding Peace with God — 7 Days",
    "",
    "Begin whenever you’re ready:",
    beginUrl,
    "",
    "May this be a peaceful place for your walk with God.",
    "",
    "Guided by Grace",
    "Your daily walk with God.",
    "",
    "—",
    "You received this because you subscribed to Guided by Grace updates.",
    "If you no longer wish to receive these emails, you can unsubscribe here:",
    unsubscribeUrl,
    "",
    "Guided by Grace",
    "[Physical mailing address to be added]",
  ].join("\n");
}

function welcomeHtml(beginUrl: string, unsubscribeUrl: string): string {
  // Inline styles only — email clients ignore <style>/external CSS.
  const ivory = "#fbf8f1";
  const olive = "#3d5640";
  const oliveDeep = "#20333a";
  const sage = "#5d7a57";
  const muted = "#6f7c6b";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Welcome to Guided by Grace</title>
  </head>
  <body style="margin:0;padding:0;background-color:${ivory};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${ivory};">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;">
            <tr>
              <td style="font-family:Georgia,'Times New Roman',serif;color:${oliveDeep};font-size:22px;font-weight:normal;padding-bottom:24px;">
                Guided by Grace
              </td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;color:${olive};font-size:16px;line-height:1.7;">
                <p style="margin:0 0 18px;">Hi,</p>
                <p style="margin:0 0 18px;">Welcome to Guided by Grace.</p>
                <p style="margin:0 0 18px;">I’m glad you’re here.</p>
                <p style="margin:0 0 18px;">This is a quiet space to begin your day with Scripture, prayer, and one simple step with God.</p>
                <p style="margin:0 0 4px;">No pressure.</p>
                <p style="margin:0 0 4px;">No noise.</p>
                <p style="margin:0 0 18px;">Just one quiet step at a time.</p>
                <p style="margin:0 0 4px;">Your first guided journey is:</p>
                <p style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;color:${oliveDeep};font-size:18px;">Finding Peace with God — 7 Days</p>
                <p style="margin:0 0 20px;">Begin whenever you’re ready:</p>
              </td>
            </tr>
            <tr>
              <td style="padding:4px 0 28px;">
                <a href="${beginUrl}"
                   style="display:inline-block;background-color:${sage};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;text-decoration:none;padding:14px 28px;border-radius:9999px;">
                  Begin Today’s Walk
                </a>
              </td>
            </tr>
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;color:${olive};font-size:16px;line-height:1.7;">
                <p style="margin:0 0 24px;">May this be a peaceful place for your walk with God.</p>
                <p style="margin:0;font-family:Georgia,'Times New Roman',serif;color:${oliveDeep};font-size:16px;">Guided by Grace</p>
                <p style="margin:2px 0 0;color:${muted};font-size:14px;">Your daily walk with God.</p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:32px;">
                <hr style="border:none;border-top:1px solid #e7e1d5;margin:0 0 16px;" />
                <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;color:${muted};font-size:12px;line-height:1.6;">
                  You received this because you subscribed to Guided by Grace updates.<br />
                  If you no longer wish to receive these emails, you can
                  <a href="${unsubscribeUrl}" style="color:${muted};text-decoration:underline;">unsubscribe here</a>.
                </p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;color:${muted};font-size:12px;line-height:1.6;">
                  Guided by Grace<br />
                  [Physical mailing address to be added]
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("[send-welcome-email] RESEND_API_KEY is not set");
    return json({ error: "Email service not configured" }, 500);
  }

  let payload: { email?: string; source?: string; journey?: string };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = String(payload?.email ?? "").trim().toLowerCase();
  const source = payload?.source ?? null;
  const journey = payload?.journey ?? null;

  if (!EMAIL_RE.test(email)) {
    return json({ error: "A valid email is required" }, 400);
  }

  const beginUrl = `${APP_URL}/walk/day/1`;
  console.log(`[send-welcome-email] sending to subscriber (source=${source}, journey=${journey})`);

  // Look up this subscriber's unsubscribe token (service-role, server-side) so
  // every email carries a working one-click unsubscribe link. Falls back to a
  // tokenless link if the lookup fails — the email must still be compliant.
  let unsubscribeUrl = `${APP_URL}/unsubscribe`;
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (supabaseUrl && serviceKey) {
    try {
      const lookup = await fetch(
        `${supabaseUrl}/rest/v1/email_subscribers?email=eq.${encodeURIComponent(email)}&select=unsubscribe_token&limit=1`,
        { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
      );
      if (lookup.ok) {
        const rows = await lookup.json();
        const token = rows?.[0]?.unsubscribe_token;
        if (token) unsubscribeUrl = `${APP_URL}/unsubscribe?token=${token}`;
      }
    } catch (err) {
      console.error("[send-welcome-email] token lookup failed", err);
    }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: "Welcome to Guided by Grace",
        html: welcomeHtml(beginUrl, unsubscribeUrl),
        text: welcomeText(beginUrl, unsubscribeUrl),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[send-welcome-email] Resend responded", res.status, detail);
      return json({ error: "Failed to send welcome email" }, 502);
    }

    const data = await res.json();
    return json({ ok: true, id: data?.id ?? null }, 200);
  } catch (err) {
    console.error("[send-welcome-email] Unexpected error", err);
    return json({ error: "Unexpected error sending welcome email" }, 500);
  }
});
