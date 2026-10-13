-- ==============================================================================
-- Supabase Schema: public.leads
-- Lead Capture, MailerLite Sync & 5-Minute Wellness Quiz Persistence
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NULL,
    source TEXT NOT NULL DEFAULT 'website_lead',
    quiz_score TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts and upserts from the application
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'leads' 
        AND policyname = 'Allow public insert and upsert to leads'
    ) THEN
        CREATE POLICY "Allow public insert and upsert to leads" ON public.leads 
        FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;
