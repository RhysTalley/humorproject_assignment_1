import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl =
  process.env.SUPABASE_URL ??
  (process.env.SUPABASE_PROJECT_ID
    ? `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co`
    : undefined);
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set SUPABASE_URL or SUPABASE_PROJECT_ID, and SUPABASE_ANON_KEY.",
  );
}

export const supabaseServer = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
  auth: {
    persistSession: false,
  },
  },
);
