-- Run this in Supabase SQL Editor
create table amazon_affiliate_products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  market text not null,
  category text not null,
  title text not null,
  asin text,
  affiliate_link text not null,
  image_url text,
  price numeric not null,
  currency text default 'USD',
  rating numeric default 5.0,
  is_active boolean default false,
  tags text[] default '{}',
  description text,
  short_benefit text,
  featured boolean default false,
  last_updated timestamp with time zone
);

create table blog_posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  category text not null,
  title text not null,
  slug text not null unique,
  author text not null,
  content text not null,
  image_url text,
  image_url_2 text,
  image_url_3 text,
  affiliate_product_1 uuid references amazon_affiliate_products(id),
  affiliate_product_2 uuid references amazon_affiliate_products(id),
  excerpt text,
  tags text[] default '{}',
  featured boolean default false,
  status text default 'published'
);

create table if not exists affiliate_link_mappings (
  key text primary key,
  product_id uuid references amazon_affiliate_products(id)
);

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
