// A visitor asks for an evening. The database decides whether the date can be held
// (one booking per day, anti-abuse limits); this function then sends the emails.
import { createClient } from 'npm:@supabase/supabase-js@2';
import {
  dbErrorCode,
  env,
  inBackground,
  json,
  preflight,
  serviceRoleKey,
} from '../_shared/http.ts';
import { sendEmails } from '../_shared/email.ts';
import { adminNewRequest, visitorEmail, type BookingRow } from '../_shared/templates.ts';

const KNOWN = ['invalid_day', 'invalid_input', 'day_unavailable', 'day_taken', 'rate_limited'];

const STATUS: Record<string, number> = { day_taken: 409, rate_limited: 429 };

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.slice(0, max) : '';

/** Salted SHA-256 of the visitor's IP: enough to count requests, useless to identify anyone. */
async function hashIp(req: Request): Promise<string | null> {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (!ip) return null;
  const salt = Deno.env.get('IP_HASH_SALT') ?? env('SUPABASE_URL');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid_input' }, 400);
  }

  // Honeypot: a field people never see. Bots fill it in; answer as if all went well.
  if (text(body.website, 200)) return json({ ok: true });

  const day = text(body.day, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return json({ error: 'invalid_day' }, 400);

  const siteUrl = env('SITE_URL').replace(/\/$/, '');
  const adminEmail = env('ADMIN_EMAIL');
  const supabase = createClient(env('SUPABASE_URL'), serviceRoleKey(), {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.rpc('create_booking_request', {
    p_day: day,
    p_name: text(body.name, 200),
    p_email: text(body.email, 300),
    p_phone: text(body.phone, 60),
    p_venue: text(body.venue, 300),
    p_booking_type: text(body.bookingType, 20),
    p_message: text(body.message, 5000),
    p_language: text(body.language, 5),
    p_ip_hash: await hashIp(req),
  });

  if (error) {
    const code = dbErrorCode(error, KNOWN);
    if (!code) console.error(error);
    return json({ error: code ?? 'unknown' }, code ? (STATUS[code] ?? 400) : 500);
  }

  const booking = data as BookingRow;
  inBackground(
    sendEmails([
      adminNewRequest(booking, siteUrl, adminEmail),
      visitorEmail('received', booking, siteUrl),
    ]),
  );

  return json({ day: booking.day, expiresAt: booking.expires_at });
});
