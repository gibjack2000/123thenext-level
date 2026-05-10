-- 1. Extend the blog_posts table with rich content columns
-- Using BIGINT for product IDs to match the existing amazon_affiliate_products table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
ADD COLUMN IF NOT EXISTS image_url_3 TEXT,
ADD COLUMN IF NOT EXISTS affiliate_product_1 BIGINT REFERENCES amazon_affiliate_products(id),
ADD COLUMN IF NOT EXISTS affiliate_product_2 BIGINT REFERENCES amazon_affiliate_products(id),
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';

-- 2. Ensure supporting tables exist for the automation bot
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT
);

CREATE TABLE IF NOT EXISTS publish_jobs (
  category TEXT PRIMARY KEY,
  status TEXT DEFAULT 'idle', 
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS publish_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT,
  status TEXT, 
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Initialize the automation job rows
INSERT INTO publish_jobs (category) VALUES ('Health'), ('Fitness'), ('Nutrition'), ('Wellness')
ON CONFLICT (category) DO NOTHING;

-- 4. Enable Realtime for the new automation tables
ALTER PUBLICATION supabase_realtime ADD TABLE publish_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE publish_logs;

-- 5. Premium Digital Guides Table
CREATE TABLE IF NOT EXISTS premium_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Fitness', 'Nutrition', 'Wellness')),
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  price_display TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  image TEXT NOT NULL,
  file_name TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  included TEXT[] DEFAULT '{}',
  audience TEXT NOT NULL,
  disclaimer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime for premium_guides
ALTER PUBLICATION supabase_realtime ADD TABLE premium_guides;
