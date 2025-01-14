import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nanuhzpdmhhauocadgqt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hbnVoenBkbWhoYXVvY2FkZ3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NTI0MDAsImV4cCI6MjAyNjAyODQwMH0.vxHWUYvEj8VVBxq-QXOzjYBBP5gHmE_Uu3cZHhZGBYk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
