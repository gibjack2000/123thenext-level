import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function POST(req: Request) {
  try {
    const { email, firstName, source, quizScore, pdfTitle, downloadName, testName } = await req.json();

    // Validate that email is present and valid
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = firstName ? String(firstName).trim() : '';
    const cleanSource = source 
      ? source 
      : (testName 
          ? `clinical_test_requisition: ${testName}` 
          : (pdfTitle ? `pdf_download: ${pdfTitle}` : 'website_lead'));
    const cleanScore = quizScore !== undefined && quizScore !== null ? String(quizScore) : null;

    // 1. Save / Backup Lead in Supabase 'leads' table
    if (supabase) {
      try {
        const { error: dbError } = await supabase.from('leads').upsert(
          {
            email: cleanEmail,
            first_name: cleanName,
            source: cleanSource,
            quiz_score: cleanScore,
            created_at: new Date().toISOString(),
          },
          { onConflict: 'email' }
        );

        if (dbError) {
          console.warn('Supabase Lead Log Warning:', dbError.message);
        }

        try {
          await supabase
            .from('newsletter_subscribers')
            .upsert([{ email: cleanEmail, preferences: [cleanSource] }], { onConflict: 'email' });
        } catch (subErr) {
          // non-blocking
        }
      } catch (dbEx: any) {
        console.warn('Supabase Lead Log Exception:', dbEx?.message);
      }
    }

    // 2. Forward request server-side to the official MailerLite API v2
    const apiKey = (process.env.MAILERLITE_API_KEY || '').trim();
    if (apiKey) {
      try {
        // Target Group: "123thenextlevel Main Leads"
        const configuredGroupId = (process.env.MAILERLITE_GROUP_ID || '201226349911737620').trim();
        const KNOWN_MAIN_LEADS_GROUP = '201220531175818835';

        // If target group ID is 201226349911737620 (automation ID), route to corresponding group ID
        let targetGroupId = configuredGroupId === '201226349911737620' ? KNOWN_MAIN_LEADS_GROUP : configuredGroupId;

        const mailerlitePayload = {
          email: cleanEmail,
          fields: {
            name: cleanName || ""
          },
          groups: [targetGroupId]
        };

        let mailerliteRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(mailerlitePayload)
        });

        // If MailerLite returns 422 Unprocessable Entity, retry with KNOWN_MAIN_LEADS_GROUP
        if (!mailerliteRes.ok && mailerliteRes.status === 422 && targetGroupId !== KNOWN_MAIN_LEADS_GROUP) {
          mailerlitePayload.groups = [KNOWN_MAIN_LEADS_GROUP];
          mailerliteRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(mailerlitePayload)
          });
        }

        if (!mailerliteRes.ok) {
          const errorPayload = await mailerliteRes.json().catch(() => ({}));
          console.error('MailerLite API Sync Error:', mailerliteRes.status, errorPayload);
          return NextResponse.json(
            { error: 'Unable to subscribe at this moment. Please try again.' },
            { status: 500 }
          );
        }

        console.log(`[MailerLite] Subscriber ${cleanEmail} registered successfully. Group: ${mailerlitePayload.groups[0]}`);
      } catch (mlErr) {
        console.error('MailerLite network/request exception:', mlErr);
        return NextResponse.json(
          { error: 'Unable to subscribe at this moment. Please try again.' },
          { status: 500 }
        );
      }
    } else {
      console.warn('⚠️ [MailerLite] MAILERLITE_API_KEY is not set in environment.');
    }

    return NextResponse.json({
      success: true,
      message: 'Subscriber registered successfully'
    });
  } catch (error: any) {
    console.error('Subscription Endpoint Exception:', error);
    return NextResponse.json(
      { error: 'Unable to subscribe at this moment. Please try again.' },
      { status: 500 }
    );
  }
}
