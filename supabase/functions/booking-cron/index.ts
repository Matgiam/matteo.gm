// Run every hour by Supabase Cron, with the header x-cron-secret: <CRON_SECRET>.
// Frees holds nobody answered within 7 days, and reminds the admin 48 hours before.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { env, json, preflight, serviceRoleKey } from '../_shared/http.ts';
import { sendEmails } from '../_shared/email.ts';
import { adminExpired, adminReminder, type BookingRow } from '../_shared/templates.ts';

Deno.serve(async (req) => {
  const early = preflight(req);
  if (early) return early;
  if (req.headers.get('x-cron-secret') !== env('CRON_SECRET')) {
    return json({ error: 'not_authorized' }, 401);
  }

  const siteUrl = env('SITE_URL').replace(/\/$/, '');
  const adminEmail = env('ADMIN_EMAIL');
  const supabase = createClient(env('SUPABASE_URL'), serviceRoleKey(), {
    auth: { persistSession: false },
  });

  const expired = await supabase.rpc('expire_booking_requests');
  const reminders = await supabase.rpc('take_booking_reminders');
  if (expired.error || reminders.error) {
    console.error(expired.error ?? reminders.error);
    return json({ error: 'unknown' }, 500);
  }

  const expiredRows = (expired.data ?? []) as BookingRow[];
  const reminderRows = (reminders.data ?? []) as BookingRow[];

  // A scheduled run can take its time, so the emails are sent before answering.
  await sendEmails([
    ...reminderRows.map((b) => adminReminder(b, siteUrl, adminEmail)),
    ...expiredRows.map((b) => adminExpired(b, siteUrl, adminEmail)),
  ]);

  return json({ expired: expiredRows.length, reminded: reminderRows.length });
});
