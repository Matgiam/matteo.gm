// Both values are public by design: the publishable key only reaches what the
// database's row level security and function grants allow.
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publishableKey);

let client;

/**
 * The Supabase client, loaded on first use: pages that never touch bookings
 * (home, about, music...) never download the library.
 */
export function getSupabase() {
  client ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url, publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    }),
  );
  return client;
}
