import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const { email, firstName, source, quizScore } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = firstName ? firstName.trim() : '';

    // 1. Save / Backup Lead in Supabase 'leads' table
    const { error: dbError } = await supabase.from('leads').upsert(
      {
        email: cleanEmail,
        first_name: cleanName,
        source: source || 'website_lead',
        quiz_score: quizScore ? String(quizScore) : null,
        created_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );

    if (dbError) {
      console.warn('Supabase Lead Log Warning:', dbError.message);
    }

    // 2. Add Subscriber to MailerLite Group (Triggers Welcome Automation)
    const mailerliteRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email: cleanEmail,
        fields: {
          name: cleanName,
          source: source || 'website',
          quiz_score: quizScore ? String(quizScore) : '',
        },
        groups: process.env.MAILERLITE_GROUP_ID ? [process.env.MAILERLITE_GROUP_ID] : [],
      }),
    });

    if (!mailerliteRes.ok) {
      const errorPayload = await mailerliteRes.json();
      console.error('MailerLite API Sync Error:', errorPayload);
      return NextResponse.json(
        { error: 'Unable to register subscriber with MailerLite.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscriber successfully synced to MailerLite and database.',
    });
  } catch (error: any) {
    console.error('Subscription Endpoint Exception:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
