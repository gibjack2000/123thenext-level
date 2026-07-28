-- SQL Migration for Blood Pressure Logs Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS blood_pressure_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  systolic_mmhg INTEGER NOT NULL,
  diastolic_mmhg INTEGER NOT NULL,
  pulse_bpm INTEGER NOT NULL,
  logged_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT DEFAULT ''
);

-- Enable Row Level Security (RLS)
ALTER TABLE blood_pressure_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anon role) to insert and select
CREATE POLICY "Allow public select BP logs" ON blood_pressure_logs
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert BP logs" ON blood_pressure_logs
  FOR INSERT TO public WITH CHECK (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE blood_pressure_logs;
