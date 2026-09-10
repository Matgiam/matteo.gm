// The admin accepts, declines or cancels a booking from the dashboard.
// The call runs with the admin's own session, so the database refuses anyone
// who is not listed in public.admins; this function only adds the visitor email.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { dbErrorCode, env, inBackground, json, preflight } from '../_shared/http.ts';
import { sendEmails } from '../_shared/email.ts';
import { visitorEmail, type BookingRow } from '../_shared/templates.ts';

const KNOWN = ['not_authorized', 'not_found', 'invalid_transition'];
const STATUS: Record<string, number> = {
  not_authorized: 403,
  not_found: 404,
  invalid_transition: 409,
};
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const authorization = req.headers.get('Authorization');
  const apikey = req.headers.get('apikey') ?? Deno.env.get('SUPABASE_ANON_KEY');
  if (!authorization || !apikey) return json({ error: 'not_authorized' }, 401);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid_transition' }, 400);
  }

  const id = typeof body.id === 'string' ? body.id : '';
  const decision = typeof body.decision === 'string' ? body.decision : '';
  if (!UUID.test(id)) return json({ error: 'not_found' }, 404);
  if (!['confirmed', 'declined', 'cancelled'].includes(decision)) {
    return json({ error: 'invalid_transition' }, 400);
  }

  const supabase = createClient(env('SUPABASE_URL'), apikey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.rpc('decide_booking_request', {
    p_id: id,
    p_decision: decision,
  });

  if (error) {
    const code = dbErrorCode(error, KNOWN);
    if (!code) console.error(error);
    return json({ error: code ?? 'unknown' }, code ? STATUS[code] : 500);
  }

  const booking = data as BookingRow;
  // A cancellation is usually talked through on the phone, so it sends nothing.
  if (decision === 'confirmed' || decision === 'declined') {
    const siteUrl = env('SITE_URL').replace(/\/$/, '');
    inBackground(sendEmails([visitorEmail(decision, booking, siteUrl)]));
  }

  return json(booking);
});
