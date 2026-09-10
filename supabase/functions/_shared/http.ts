// Helpers shared by the booking Edge Functions.

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-cron-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

/**
 * Serves a function: answers the browser's CORS preflight, and turns any crash
 * (a missing secret, a network failure) into a JSON error that still carries the
 * CORS headers. Without that, the browser reports every server error as "CORS".
 * The real cause is in the function's logs in the Supabase dashboard.
 */
export function serve(handler: (req: Request) => Promise<Response>): void {
  Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
    try {
      return await handler(req);
    } catch (error) {
      console.error(error);
      return json({ error: 'server_error' }, 500);
    }
  });
}

export function env(name: string): string {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing secret ${name}`);
  return value;
}

/** The service role key. If your project does not inject it, set SERVICE_ROLE_KEY yourself. */
export function serviceRoleKey(): string {
  return Deno.env.get('SERVICE_ROLE_KEY') ?? env('SUPABASE_SERVICE_ROLE_KEY');
}

/** The code a database function raised ("day_taken", ...), if it is one we expect. */
export function dbErrorCode(error: { message?: string } | null, known: string[]): string | null {
  const message = error?.message ?? '';
  return known.find((code) => message.includes(code)) ?? null;
}

type EdgeRuntimeLike = { waitUntil(promise: Promise<unknown>): void };

/** Keeps work (sending emails) running after the response has been returned. */
export function inBackground(promise: Promise<unknown>): void {
  const runtime = (globalThis as { EdgeRuntime?: EdgeRuntimeLike }).EdgeRuntime;
  if (runtime) runtime.waitUntil(promise);
  else promise.catch((error) => console.error(error));
}
