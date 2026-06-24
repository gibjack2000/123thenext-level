-- Run this script in the Supabase SQL Editor to create the quiz_submissions table

CREATE TABLE IF NOT EXISTS quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT NOT NULL,
  name TEXT,
  score INTEGER,
  dimensions JSONB,
  plan_text TEXT
);

-- Enable Row Level Security (RLS) if required
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow the service role (backend) to perform all operations
CREATE POLICY "Allow service_role full access" ON quiz_submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Enable Realtime for quiz_submissions (optional but useful for dashboards)
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_submissions;
