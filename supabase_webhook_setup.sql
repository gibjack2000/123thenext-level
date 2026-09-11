-- ==============================================================================
-- SUPABASE DATABASE WEBHOOK SETUP FOR BLOG DRAFT ALERTS
-- ==============================================================================
-- Option 1: Supabase Dashboard (Recommended - 2 Minutes Setup)
-- 1. Go to your Supabase Dashboard -> Database -> Webhooks
-- 2. Click "Create a new webhook" (or "Enable Webhooks" if not already enabled)
-- 3. Name: "blog_draft_whatsapp_alert"
-- 4. Table: "public.blogs"
-- 5. Events: Check "Insert" ONLY
-- 6. Type: "HTTP Request"
-- 7. Method: "POST"
-- 8. URL: "https://123thenextlevel.com/api/webhooks/blog-draft-alert"
--    (Or your Make.com / Zapier Webhook URL)
-- 9. HTTP Headers: 
--    Content-Type: application/json
-- 10. Click Save!
-- ==============================================================================

-- Option 2: SQL / pg_net Extension (Direct Database Trigger)
-- If you prefer configuring via SQL with pg_net extension:

CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION public.notify_blog_draft_created()
RETURNS TRIGGER AS $$
DECLARE
  payload JSONB;
BEGIN
  -- Only trigger if the inserted article status is 'draft'
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

    -- Replace with your production domain or Make.com / Zapier webhook URL
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

DROP TRIGGER IF EXISTS trigger_notify_blog_draft ON public.blogs;
CREATE TRIGGER trigger_notify_blog_draft
AFTER INSERT ON public.blogs
FOR EACH ROW
EXECUTE FUNCTION public.notify_blog_draft_created();
