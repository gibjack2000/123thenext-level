-- SQL Migration for Urinalysis Readings Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS urinalysis_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL UNIQUE,
  
  -- 10 parameters with clinical value restrictions
  glucose TEXT CHECK (glucose IN ('Negative', 'Trace', 'Positive')),
  ketones TEXT CHECK (ketones IN ('Negative', 'Trace', 'Small', 'Moderate', 'Large')),
  bilirubin TEXT CHECK (bilirubin IN ('Negative', 'Small', 'Moderate', 'Large')),
  nitrite TEXT CHECK (nitrite IN ('Negative', 'Positive')),
  urobilinogen TEXT CHECK (urobilinogen IN ('0.2', '1.0', '2.0', '4.0', '8.0')),
  protein TEXT CHECK (protein IN ('Negative', 'Trace', 'Positive')),
  ph TEXT CHECK (ph IN ('5.0', '6.0', '6.5', '7.0', '8.0')),
  blood TEXT CHECK (blood IN ('Negative', 'Trace', 'Positive')),
  specific_gravity TEXT CHECK (specific_gravity IN ('1.005', '1.010', '1.015', '1.020', '1.025', '1.030')),
  leukocytes TEXT CHECK (leukocytes IN ('Negative', 'Trace', 'Positive'))
);

-- Enable Row Level Security (RLS)
ALTER TABLE urinalysis_readings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anon role) to insert, select, and update
CREATE POLICY "Allow public select by session_id" ON urinalysis_readings
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert" ON urinalysis_readings
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow public update by session_id" ON urinalysis_readings
  FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE urinalysis_readings;
