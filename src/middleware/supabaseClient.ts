import { createClient } from "@supabase/supabase-js";
const supabaseUrl =
  process.env.SUPABASE_URL || "https://ztjcsbbjaruhjbzzvdrd.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0amNzYmJqYXJ1aGpienp2ZHJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMTE1NDMsImV4cCI6MjA1MDc4NzU0M30.Y5NAe0RORfCmLWKGup7F9NOdgKQ7ai_CY5Im1XQk-ao";
export const supabase = createClient(supabaseUrl, supabaseKey);
