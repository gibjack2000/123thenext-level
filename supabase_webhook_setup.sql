-- ==============================================================================
-- SUPABASE DATABASE WEBHOOK SETUP FOR BLOG DRAFT EMAIL ALERTS
-- ==============================================================================
-- Trigger: Whenever a new row is inserted into public.blogs with status = 'draft'
-- Action:  Send automated email notification to gibjack2000@googlemail.com
-- Target:  https://123thenextlevel.com/api/webhooks/blog-draft-alert
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- OPTION 1: Supabase Dashboard UI (Recommended — 60 Seconds Setup)
-- ------------------------------------------------------------------------------
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/_/database/webhooks
-- 2. Go to "Database" -> "Webhooks" (or "Integrations" -> "Webhooks").
-- 3. Click "Create a new webhook".
-- 4. Set the following fields:
--    - Name: blog_draft_email_alert
--    - Table: public.blogs
--    - Events: Check "Insert" ONLY
--    - Type: HTTP Request
--    - Method: POST
--    - URL: https://123thenextlevel.com/api/webhooks/blog-draft-alert
--    - HTTP Headers:
--        Content-Type: application/json
-- 5. Click "Save Webhook" or "Create Webhook".
-- ------------------------------------------------------------------------------


-- ------------------------------------------------------------------------------
-- OPTION 2: SQL / pg_net Extension (Direct PostgreSQL Database Trigger)
-- ------------------------------------------------------------------------------
-- If you prefer configuring via the Supabase SQL Editor:

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.notify_blog_draft_created()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  -- Trigger only if the inserted article status is 'draft'
  IF NEW.status = 'draft' THEN
    payload := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', jsonb_build_object(
        'id', NEW.id,
        'title', NEW.title,
        'category', NEW.category,
        'status', NEW.status,
        'slug', NEW.slug,
        'created_at', NEW.created_at
      )
    );

    -- POST event directly to server webhook endpoint
    PERFORM net.http_post(
      url := 'https://123thenextlevel.com/api/webhooks/blog-draft-alert',
      body := payload,
      headers := jsonb_build_object(
        'Content-Type', 'application/json'
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to public.blogs (if created)
DROP TRIGGER IF EXISTS trigger_notify_blogs_draft ON public.blogs;
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blogs') THEN
    CREATE TRIGGER trigger_notify_blogs_draft
    AFTER INSERT ON public.blogs
    FOR EACH ROW
    EXECUTE FUNCTION public.notify_blog_draft_created();
  END IF;
END $$;

-- Attach trigger to public.blog_posts (active table)
DROP TRIGGER IF EXISTS trigger_notify_blog_posts_draft ON public.blog_posts;
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_posts') THEN
    CREATE TRIGGER trigger_notify_blog_posts_draft
    AFTER INSERT ON public.blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION public.notify_blog_draft_created();
  END IF;
END $$;


-- ==============================================================================
-- 2. QUEUE EMPTY ALERTS: HANDLED VIA ADMIN DASHBOARD ACTIONS
-- ==============================================================================
-- Queue Empty checks are triggered automatically by the Admin Dashboard (/admin/blogs)
-- whenever an admin manually clicks "Approve & Publish" or deletes an article.
-- This ensures bulk database seeding and migrations NEVER trigger false positive alerts.

DROP TRIGGER IF EXISTS trigger_queue_empty_blogs ON public.blogs;
DROP TRIGGER IF EXISTS trigger_queue_empty_blog_posts ON public.blog_posts;
DROP FUNCTION IF EXISTS public.notify_blog_queue_empty_check();



