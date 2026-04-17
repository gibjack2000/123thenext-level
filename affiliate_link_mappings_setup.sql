create table if not exists affiliate_link_mappings (
  key text primary key,
  product_id uuid references amazon_affiliate_products(id)
);
alter publication supabase_realtime add table affiliate_link_mappings;
alter table affiliate_link_mappings disable row level security;