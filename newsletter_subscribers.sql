-- SQL script to create the newsletter_subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  preferences TEXT[] DEFAULT '{}', -- e.g., ['Health', 'Fitness', 'Nutrition', 'Wellness']
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Realtime for subscribers table
ALTER PUBLICATION supabase_realtime ADD TABLE newsletter_subscribers;
