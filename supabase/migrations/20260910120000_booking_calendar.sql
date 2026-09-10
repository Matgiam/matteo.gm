-- Booking calendar: availability, booking requests with approval, admin access.
-- Apply with `npx supabase db push`, or paste the whole file into the SQL Editor.
--
-- Public visitors never touch the tables directly. They read the calendar through
-- get_calendar() and create requests through the booking-request Edge Function.
-- The admin reads the tables (RLS) and changes them through the functions below.

-- ── tables ───────────────────────────────────────────────────────────────

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.blocked_days (
  day date primary key,
  note text check (char_length(note) <= 200),
  created_at timestamptz not null default now()
);

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  day date not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'declined', 'expired', 'cancelled')),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  phone text not null check (char_length(phone) between 6 and 40),
  venue text check (char_length(venue) <= 200),
  booking_type text not null check (booking_type in ('house', 'venue', 'film', 'other')),
  message text check (char_length(message) <= 4000),
  language text not null default 'en' check (language in ('en', 'fr')),
  -- salted hash of the visitor's IP, only used to limit abuse
  ip_hash text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days'),
  reminded_at timestamptz,
  decided_at timestamptz
);

-- One evening, one booking: at most one pending or confirmed request per day.
-- This index is what makes two simultaneous requests for the same date impossible.
create unique index if not exists booking_requests_one_active_per_day
  on public.booking_requests (day)
  where status in ('pending', 'confirmed');

create index if not exists booking_requests_created_at_idx
  on public.booking_requests (created_at);

create index if not exists booking_requests_status_expiry_idx
  on public.booking_requests (status, expires_at);

-- ── row level security ───────────────────────────────────────────────────

alter table public.admins enable row level security;
alter table public.blocked_days enable row level security;
alter table public.booking_requests enable row level security;

-- Writes only ever go through the security-definer functions below.
revoke insert, update, delete, truncate on public.admins, public.blocked_days, public.booking_requests
  from anon, authenticated;
revoke select on public.admins, public.blocked_days, public.booking_requests from anon;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

drop policy if exists "admins read blocked days" on public.blocked_days;
create policy "admins read blocked days" on public.blocked_days
  for select to authenticated using ((select public.is_admin()));

drop policy if exists "admins read booking requests" on public.booking_requests;
create policy "admins read booking requests" on public.booking_requests
  for select to authenticated using ((select public.is_admin()));

-- ── helpers ──────────────────────────────────────────────────────────────

create or replace function public.brussels_today()
returns date
language sql
stable
set search_path = ''
as $$
  select (now() at time zone 'Europe/Brussels')::date;
$$;

-- ── public: the calendar ─────────────────────────────────────────────────

-- Days that are not free, without any personal data. Confirmed bookings and days
-- blocked by the admin both read as 'unavailable'; live holds read as 'pending'.
create or replace function public.get_calendar(p_from date, p_to date)
returns table (day date, status text)
language sql
stable
security definer
set search_path = ''
as $$
  select b.day, 'unavailable'::text
  from public.blocked_days b
  where b.day between p_from and least(p_to, p_from + 400)
  union all
  select r.day, case when r.status = 'confirmed' then 'unavailable' else 'pending' end
  from public.booking_requests r
  where r.day between p_from and least(p_to, p_from + 400)
    and (r.status = 'confirmed' or (r.status = 'pending' and r.expires_at > now()))
    and not exists (select 1 from public.blocked_days b2 where b2.day = r.day);
$$;

-- ── service role: creating a request (called by the booking-request function) ──

create or replace function public.create_booking_request(
  p_day date,
  p_name text,
  p_email text,
  p_phone text,
  p_venue text,
  p_booking_type text,
  p_message text,
  p_language text,
  p_ip_hash text
)
returns public.booking_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_today date := public.brussels_today();
  v_email text := lower(btrim(coalesce(p_email, '')));
  v_row public.booking_requests;
begin
  if p_day is null or p_day <= v_today or p_day > (v_today + interval '12 months')::date then
    raise exception 'invalid_day' using errcode = 'P0001';
  end if;

  if char_length(btrim(coalesce(p_name, ''))) not between 1 and 120
     or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
     or btrim(coalesce(p_phone, '')) !~ '^[0-9+()./ -]{6,40}$'
     or coalesce(p_booking_type, '') not in ('house', 'venue', 'film', 'other') then
    raise exception 'invalid_input' using errcode = 'P0001';
  end if;

  if exists (select 1 from public.blocked_days where day = p_day) then
    raise exception 'day_unavailable' using errcode = 'P0001';
  end if;

  -- Every request puts an evening on hold for everyone, so cap how many can be made:
  -- 3 per visitor per day, 2 open holds per email address, 10 per day site-wide.
  if p_ip_hash is not null and (
    select count(*) from public.booking_requests
    where ip_hash = p_ip_hash and created_at > now() - interval '24 hours'
  ) >= 3 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  if (
    select count(*) from public.booking_requests
    where email = v_email and status = 'pending' and expires_at > now()
  ) >= 2 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  if (
    select count(*) from public.booking_requests
    where created_at > now() - interval '24 hours'
  ) >= 10 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  -- A hold nobody answered within 7 days frees the evening again.
  update public.booking_requests
  set status = 'expired'
  where day = p_day and status = 'pending' and expires_at <= now();

  begin
    insert into public.booking_requests
      (day, name, email, phone, venue, booking_type, message, language, ip_hash)
    values (
      p_day,
      btrim(p_name),
      v_email,
      btrim(p_phone),
      nullif(btrim(coalesce(p_venue, '')), ''),
      p_booking_type,
      nullif(btrim(coalesce(p_message, '')), ''),
      case when p_language in ('en', 'fr') then p_language else 'en' end,
      p_ip_hash
    )
    returning * into v_row;
  exception
    when unique_violation then
      raise exception 'day_taken' using errcode = 'P0001';
    when check_violation then
      raise exception 'invalid_input' using errcode = 'P0001';
  end;

  return v_row;
end;
$$;

-- ── admin: decisions and availability ────────────────────────────────────

-- pending -> confirmed | declined, confirmed -> cancelled.
create or replace function public.decide_booking_request(p_id uuid, p_decision text)
returns public.booking_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_row public.booking_requests;
begin
  if not public.is_admin() then
    raise exception 'not_authorized' using errcode = '42501';
  end if;

  select * into v_row from public.booking_requests where id = p_id for update;
  if not found then
    raise exception 'not_found' using errcode = 'P0001';
  end if;

  if not (
    (v_row.status = 'pending' and p_decision in ('confirmed', 'declined'))
    or (v_row.status = 'confirmed' and p_decision = 'cancelled')
  ) then
    raise exception 'invalid_transition' using errcode = 'P0001';
  end if;

  update public.booking_requests
  set status = p_decision, decided_at = now()
  where id = p_id
  returning * into v_row;

  return v_row;
end;
$$;

-- Block or free every day in a range. Days holding a live request or a confirmed
-- booking are never blocked; decide the request first. Returns how many days changed.
create or replace function public.set_days_blocked(
  p_from date,
  p_to date,
  p_blocked boolean,
  p_note text default null
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  if not public.is_admin() then
    raise exception 'not_authorized' using errcode = '42501';
  end if;

  if p_from is null or p_to is null or p_to < p_from or p_to - p_from > 400 then
    raise exception 'invalid_range' using errcode = 'P0001';
  end if;

  if p_blocked then
    insert into public.blocked_days (day, note)
    select d::date, nullif(btrim(coalesce(p_note, '')), '')
    from generate_series(p_from::timestamp, p_to::timestamp, interval '1 day') as d
    where not exists (
      select 1 from public.booking_requests r
      where r.day = d::date
        and (r.status = 'confirmed' or (r.status = 'pending' and r.expires_at > now()))
    )
    on conflict (day) do nothing;
  else
    delete from public.blocked_days where day between p_from and p_to;
  end if;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

-- ── service role: scheduled work (called by the booking-cron function) ────

create or replace function public.expire_booking_requests()
returns setof public.booking_requests
language sql
security definer
set search_path = ''
as $$
  update public.booking_requests
  set status = 'expired'
  where status = 'pending' and expires_at <= now()
  returning *;
$$;

-- Holds with less than 48 hours left that have not been reminded yet (marks them).
create or replace function public.take_booking_reminders()
returns setof public.booking_requests
language sql
security definer
set search_path = ''
as $$
  update public.booking_requests
  set reminded_at = now()
  where status = 'pending'
    and reminded_at is null
    and expires_at > now()
    and expires_at <= now() + interval '48 hours'
  returning *;
$$;

-- GDPR: requests (names, emails, phone numbers) are kept 12 months, then deleted.
create or replace function public.purge_old_booking_requests()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_count integer;
begin
  delete from public.booking_requests where created_at < now() - interval '12 months';
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

-- ── who may call what ────────────────────────────────────────────────────
-- Supabase grants EXECUTE on new functions to anon and authenticated by default,
-- so each one is revoked first and granted back only where it belongs.

revoke execute on function public.is_admin() from public, anon, authenticated;
revoke execute on function public.get_calendar(date, date) from public, anon, authenticated;
revoke execute on function public.create_booking_request(date, text, text, text, text, text, text, text, text)
  from public, anon, authenticated;
revoke execute on function public.decide_booking_request(uuid, text) from public, anon, authenticated;
revoke execute on function public.set_days_blocked(date, date, boolean, text) from public, anon, authenticated;
revoke execute on function public.expire_booking_requests() from public, anon, authenticated;
revoke execute on function public.take_booking_reminders() from public, anon, authenticated;
revoke execute on function public.purge_old_booking_requests() from public, anon, authenticated;

grant execute on function public.get_calendar(date, date) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.decide_booking_request(uuid, text) to authenticated;
grant execute on function public.set_days_blocked(date, date, boolean, text) to authenticated;
grant execute on function public.create_booking_request(date, text, text, text, text, text, text, text, text)
  to service_role;
grant execute on function public.expire_booking_requests() to service_role;
grant execute on function public.take_booking_reminders() to service_role;
grant execute on function public.purge_old_booking_requests() to service_role;

-- ── nightly GDPR clean-up ────────────────────────────────────────────────

do $$
begin
  if exists (select 1 from pg_available_extensions where name = 'pg_cron') then
    create extension if not exists pg_cron with schema pg_catalog;
    perform cron.schedule(
      'purge-old-booking-requests',
      '17 3 * * *',
      'select public.purge_old_booking_requests()'
    );
  end if;
end;
$$;

-- ── one-time admin setup (run by hand, not part of the migration) ─────────
-- 1. Authentication > Users > Add user, with the email you will log in with.
-- 2. Then in the SQL Editor:
--    insert into public.admins (user_id) select id from auth.users where email = 'your@email';
