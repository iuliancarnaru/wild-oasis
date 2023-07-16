import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/db.types";

export const supabaseUrl = "https://jjahqteedgmywzkclgzq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYWhxdGVlZGdteXd6a2NsZ3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkxODA0MzUsImV4cCI6MjAwNDc1NjQzNX0.FuRcp7eagkX9ZphdxQGodgkdbweODS0EYe13-VrEFnw";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
