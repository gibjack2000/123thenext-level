-- Run this in Supabase SQL Editor
create table if not exists premium_guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Fitness', 'Nutrition', 'Wellness')),
  short_description text not null,
  long_description text not null,
  price_display text not null,
  stripe_price_id text not null,
  image text not null,
  file_name text not null,
  featured boolean default false,
  tags text[] default '{}',
  included text[] default '{}',
  audience text not null,
  disclaimer text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Realtime for premium_guides (optional but recommended for Admin panel reactivity)
ALTER PUBLICATION supabase_realtime ADD TABLE premium_guides;
