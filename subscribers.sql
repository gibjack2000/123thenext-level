-- Supabase Schema for Lead Tracking & Quiz Scores
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NULL,
    lead_source TEXT NOT NULL DEFAULT 'Unknown',
    quiz_score INTEGER NULL,
    subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Active public row level security policy for frontend inserts
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'subscribers' 
        AND policyname = 'Allow public insert to subscribers'
    ) THEN
        CREATE POLICY "Allow public insert to subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);
    END IF;
END $$;
