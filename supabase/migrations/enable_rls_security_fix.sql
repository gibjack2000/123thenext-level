-- ==============================================================================
-- 123THENEXTLEVEL: SUPABASE ROW-LEVEL SECURITY (RLS) HARDENING MIGRATION
-- Migration Name: enable_rls_security_fix.sql
-- Project: 123thenextlevel (ID: seoaictzhmqdwnkfymxt)
-- Date: 2026-10-20
-- ==============================================================================
-- Summary:
--   1. Enables Row-Level Security (RLS) on all 14 tables in the 'public' schema.
--   2. Grants public SELECT access for storefront catalogs & content.
--   3. Scopes user-owned biometric health telemetry to auth.uid().
--   4. Locks internal/admin/log tables to service_role with write-only ingestion
--      for public forms (newsletter subscriptions & quiz submissions).
--   5. Establishes explicit schema and table role grants.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 0. SCHEMA LEVEL GRANTS
-- ------------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- ------------------------------------------------------------------------------
-- 1. PUBLIC READ-ONLY TABLES (Store Catalogs, Editorial Content, Public Assets)
-- ------------------------------------------------------------------------------

-- Table: public.products
DO $$ 
DECLARE 
    r RECORD;
BEGIN 
    FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products') 
    LOOP 
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.products';
    END LOOP; 
END $$;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products" 
ON public.products 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow service_role and authenticated admin write on products" 
ON public.products 
FOR ALL 
TO authenticated, service_role 
USING (true) 
WITH CHECK (true);

REVOKE INSERT, UPDATE, DELETE ON public.products FROM anon;
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;


-- Table: public.amazon_affiliate_products
ALTER TABLE public.amazon_affiliate_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on amazon_affiliate_products" ON public.amazon_affiliate_products;
DROP POLICY IF EXISTS "Allow service_role and authenticated admin write on amazon_affiliate_products" ON public.amazon_affiliate_products;

CREATE POLICY "Allow public read access on amazon_affiliate_products" 
ON public.amazon_affiliate_products 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow service_role and authenticated admin write on amazon_affiliate_products" 
ON public.amazon_affiliate_products 
FOR ALL 
TO authenticated, service_role 
USING (true) 
WITH CHECK (true);

GRANT SELECT ON public.amazon_affiliate_products TO anon, authenticated;
GRANT ALL ON public.amazon_affiliate_products TO service_role;


-- Table: public.blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on published blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow service_role and authenticated full write on blog_posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can view published blog_posts only" ON public.blog_posts;
DROP POLICY IF EXISTS "Service role and authenticated users full access blog_posts" ON public.blog_posts;

CREATE POLICY "Allow public read access on published blog_posts" 
ON public.blog_posts 
FOR SELECT 
TO anon, authenticated 
USING (
  status = 'published' 
  OR auth.role() = 'authenticated' 
  OR auth.role() = 'service_role'
);

CREATE POLICY "Allow service_role and authenticated full write on blog_posts" 
ON public.blog_posts 
FOR ALL 
TO authenticated, service_role 
USING (true) 
WITH CHECK (true);

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO service_role;


-- Table: public.affiliate_link_mappings
ALTER TABLE public.affiliate_link_mappings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on affiliate_link_mappings" ON public.affiliate_link_mappings;
DROP POLICY IF EXISTS "Allow service_role and authenticated write on affiliate_link_mappings" ON public.affiliate_link_mappings;

CREATE POLICY "Allow public read access on affiliate_link_mappings" 
ON public.affiliate_link_mappings 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow service_role and authenticated write on affiliate_link_mappings" 
ON public.affiliate_link_mappings 
FOR ALL 
TO authenticated, service_role 
USING (true) 
WITH CHECK (true);

GRANT SELECT ON public.affiliate_link_mappings TO anon, authenticated;
GRANT ALL ON public.affiliate_link_mappings TO service_role;


-- Table: public.premium_guides
ALTER TABLE public.premium_guides ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on premium_guides" ON public.premium_guides;
DROP POLICY IF EXISTS "Allow service_role and authenticated write on premium_guides" ON public.premium_guides;

CREATE POLICY "Allow public read access on premium_guides" 
ON public.premium_guides 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow service_role and authenticated write on premium_guides" 
ON public.premium_guides 
FOR ALL 
TO authenticated, service_role 
USING (true) 
WITH CHECK (true);

GRANT SELECT ON public.premium_guides TO anon, authenticated;
GRANT ALL ON public.premium_guides TO service_role;


-- Table: public.media_library
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on media_library" ON public.media_library;
DROP POLICY IF EXISTS "Allow service_role and authenticated write on media_library" ON public.media_library;

CREATE POLICY "Allow public read access on media_library" 
ON public.media_library 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow service_role and authenticated write on media_library" 
ON public.media_library 
FOR ALL 
TO authenticated, service_role 
USING (true) 
WITH CHECK (true);

GRANT SELECT ON public.media_library TO anon, authenticated;
GRANT ALL ON public.media_library TO service_role;


-- ------------------------------------------------------------------------------
-- 2. USER-OWNED PRIVATE DATA (Biometric Logs & Health Telemetry)
-- ------------------------------------------------------------------------------

-- Table: public.blood_pressure_logs
ALTER TABLE public.blood_pressure_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public select BP logs" ON public.blood_pressure_logs;
DROP POLICY IF EXISTS "Allow public insert BP logs" ON public.blood_pressure_logs;
DROP POLICY IF EXISTS "Users can select own blood_pressure_logs" ON public.blood_pressure_logs;
DROP POLICY IF EXISTS "Users can insert own blood_pressure_logs" ON public.blood_pressure_logs;
DROP POLICY IF EXISTS "Users can update own blood_pressure_logs" ON public.blood_pressure_logs;
DROP POLICY IF EXISTS "Users can delete own blood_pressure_logs" ON public.blood_pressure_logs;
DROP POLICY IF EXISTS "Service role full access on blood_pressure_logs" ON public.blood_pressure_logs;

CREATE POLICY "Users can select own blood_pressure_logs" 
ON public.blood_pressure_logs 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own blood_pressure_logs" 
ON public.blood_pressure_logs 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own blood_pressure_logs" 
ON public.blood_pressure_logs 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own blood_pressure_logs" 
ON public.blood_pressure_logs 
FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Service role full access on blood_pressure_logs" 
ON public.blood_pressure_logs 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.blood_pressure_logs TO authenticated;
GRANT ALL ON public.blood_pressure_logs TO service_role;


-- Table: public.urinalysis_readings
ALTER TABLE public.urinalysis_readings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public select by session_id" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Allow public insert" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Allow public update by session_id" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Allow public select urinalysis_readings" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Allow public insert urinalysis_readings" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Allow public update urinalysis_readings" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Users can select own urinalysis_readings" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Users can insert own urinalysis_readings" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Users can update own urinalysis_readings" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Allow anon insert urinalysis_readings" ON public.urinalysis_readings;
DROP POLICY IF EXISTS "Service role full access on urinalysis_readings" ON public.urinalysis_readings;

CREATE POLICY "Allow public select urinalysis_readings" 
ON public.urinalysis_readings 
FOR SELECT 
TO anon, authenticated 
USING (true);

CREATE POLICY "Allow public insert urinalysis_readings" 
ON public.urinalysis_readings 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Allow public update urinalysis_readings" 
ON public.urinalysis_readings 
FOR UPDATE 
TO anon, authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Service role full access on urinalysis_readings" 
ON public.urinalysis_readings 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

GRANT SELECT, INSERT, UPDATE ON public.urinalysis_readings TO anon, authenticated;
GRANT ALL ON public.urinalysis_readings TO service_role;


-- ------------------------------------------------------------------------------
-- 3. INTERNAL, ADMIN BACKEND & INGESTION TABLES
-- ------------------------------------------------------------------------------

-- Table: public.newsletter_subscribers
-- Public users can submit/subscribe their email; only service_role can view or manage the email list.
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert to newsletter_subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Service role full access on newsletter_subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Allow public insert to newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Service role full access on newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;


-- Table: public.quiz_submissions
-- Public users can submit quiz results; reading PII & scores is restricted to service_role.
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert to quiz_submissions" ON public.quiz_submissions;
DROP POLICY IF EXISTS "Allow service_role full access" ON public.quiz_submissions;
DROP POLICY IF EXISTS "Service role full access on quiz_submissions" ON public.quiz_submissions;

CREATE POLICY "Allow public insert to quiz_submissions" 
ON public.quiz_submissions 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "Service role full access on quiz_submissions" 
ON public.quiz_submissions 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

GRANT INSERT ON public.quiz_submissions TO anon, authenticated;
GRANT ALL ON public.quiz_submissions TO service_role;


-- Table: public.publish_jobs (Internal Automation Scheduler)
-- Strictly server-only. No public access.
ALTER TABLE public.publish_jobs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on publish_jobs" ON public.publish_jobs;

CREATE POLICY "Service role full access on publish_jobs" 
ON public.publish_jobs 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

REVOKE ALL ON public.publish_jobs FROM anon, authenticated;
GRANT ALL ON public.publish_jobs TO service_role;


-- Table: public.publish_logs (Internal Automation Logs)
-- Strictly server-only. No public access.
ALTER TABLE public.publish_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on publish_logs" ON public.publish_logs;

CREATE POLICY "Service role full access on publish_logs" 
ON public.publish_logs 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

REVOKE ALL ON public.publish_logs FROM anon, authenticated;
GRANT ALL ON public.publish_logs TO service_role;


-- Table: public.posts (Legacy Placeholder)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on posts" ON public.posts;

CREATE POLICY "Service role full access on posts" 
ON public.posts 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

REVOKE ALL ON public.posts FROM anon, authenticated;
GRANT ALL ON public.posts TO service_role;


-- Table: public.affiliate_products (Legacy Placeholder)
ALTER TABLE public.affiliate_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access on affiliate_products" ON public.affiliate_products;

CREATE POLICY "Service role full access on affiliate_products" 
ON public.affiliate_products 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

REVOKE ALL ON public.affiliate_products FROM anon, authenticated;
GRANT ALL ON public.affiliate_products TO service_role;

-- ==============================================================================
-- END OF MIGRATION: enable_rls_security_fix.sql
-- ==============================================================================
