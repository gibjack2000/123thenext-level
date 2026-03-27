import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI';

// Hardcoding the service role key from insert_products.ts for the local prototype to bypass RLS on the Admin page.
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDA2Mjg4MiwiZXhwIjoyMDg5NjM4ODgyfQ.FJeB0CuCAM968bN7aSpSyRyN3aguZ_IGsNxHru6t2qM";

export const hasValidSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasValidSupabaseConfig 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const adminSupabase = hasValidSupabaseConfig
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;
