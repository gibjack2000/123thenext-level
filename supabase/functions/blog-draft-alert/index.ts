// Supabase Edge Function: blog-draft-alert
// Invoked by Supabase Database Webhook whenever a new row is inserted into public.blogs
// Sends notification email to gibjack2000@googlemail.com

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ADMIN_EMAILS = (Deno.env.get("ADMIN_NOTIFICATION_EMAIL") || "jack@123thenextlevel.com, gibjack2000@googlemail.com")
  .split(',')
  .map((e) => e.trim())
  .filter(Boolean);
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
const FROM_EMAIL = Deno.env.get("SMTP_FROM") || "123TheNextLevel <hello@123thenextlevel.com>";


serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    const payload = await req.json();
    const record = payload.record || payload;
    const { title, category, status, slug } = record;

    const normalizedStatus = (status || "").toLowerCase();
    if (normalizedStatus && normalizedStatus !== "draft") {
      return new Response(
        JSON.stringify({ skipped: true, message: `Status is "${status}". Only draft records trigger alert.` }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const articleTitle = title || "Untitled Draft Article";
    const articleCategory = category || "General";
    const reviewUrl = "https://123thenextlevel.com/admin/blogs";
    const subject = `📝 New Blog Draft Ready: ${articleTitle}`;
    
    const plainText = `Title: ${articleTitle}\nCategory: ${articleCategory}\nStatus: Draft (Invisible on public site)\nReview & Publish Link: ${reviewUrl}`;

    const html = `
      <div style="font-family: sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 600px;">
        <h2 style="color: #10b981; margin-top: 0;">📝 New Blog Draft Ready</h2>
        <p style="color: #94a3b8;">A new article draft has been inserted into the database and is ready for editorial review.</p>
        <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #334155;">
          <p style="margin: 6px 0;"><strong>Title:</strong> ${articleTitle}</p>
          <p style="margin: 6px 0;"><strong>Category:</strong> ${articleCategory}</p>
          <p style="margin: 6px 0;"><strong>Status:</strong> <span style="color: #fbbf24;">Draft (Invisible on public site)</span></p>
        </div>
        <p style="margin-top: 24px;">
          <a href="${reviewUrl}" style="background-color: #059669; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Review & Publish Link ➜
          </a>
        </p>
      </div>
    `;

    // 1. Dispatch via Resend if configured
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: ADMIN_EMAILS,
          subject,
          text: plainText,
          html
        })
      });
      const data = await resendRes.json();
      return new Response(JSON.stringify({ success: true, provider: "resend", data }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Dispatch via SendGrid if configured
    if (SENDGRID_API_KEY) {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          personalizations: [{ to: ADMIN_EMAILS.map((e) => ({ email: e })) }],
          from: { email: "hello@123thenextlevel.com", name: "123TheNextLevel" },
          subject,
          content: [
            { type: "text/plain", value: plainText },
            { type: "text/html", value: html }
          ]
        })
      });
      return new Response(JSON.stringify({ success: true, provider: "sendgrid" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // Fallback response if edge function invoked without direct API keys
    return new Response(
      JSON.stringify({
        success: false,
        message: "No email provider key (RESEND_API_KEY or SENDGRID_API_KEY) configured in Edge Function secrets. Use server webhook https://123thenextlevel.com/api/webhooks/blog-draft-alert for SMTP delivery."
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
});
