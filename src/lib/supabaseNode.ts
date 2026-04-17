// Node-friendly Supabase client for scripts (e.g., seed scripts)
// This file uses process.env instead of Vite's import.meta.env, which is unavailable in Node.
import { createClient } from '@supabase/supabase-js';

// Fallback defaults match those used in src/lib/supabase.ts
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
