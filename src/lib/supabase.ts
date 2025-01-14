import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nanuhzpdmhhauocadgqt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbnVoenBkbWhoYXVvY2FkZ3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTAzNjEsImV4cCI6MjA1MjQyNjM2MX0.vcol5mWWTQ-TbqjsU7Eg1SflP-nWaZMQyX4w3iy1Em0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
