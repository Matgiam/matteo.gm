import { getSupabase, isSupabaseConfigured } from './supabase';
import { addDays, todayIso } from './dates';

/**
 * Everything the site asks of the booking backend. Components never call Supabase
 * directly, so a mock can stand in during development: `npm run dev:mock`
 * (never active in production builds).
 */

const KNOWN_ERRORS = [
  'day_taken',
  'day_unavailable',
  'invalid_day',
  'invalid_input',
  'rate_limited',
  'not_authorized',
  'invalid_transition',
  'not_found',
  'invalid_range',
  'link_expired',
];

export class BookingError extends Error {
  constructor(code) {
    super(code);
    this.name = 'BookingError';
    this.code = code;
  }
}

function fail(code) {
  throw new BookingError(KNOWN_ERRORS.includes(code) ? code : 'unknown');
}

// Database functions raise their error code as the message ("day_taken", ...).
const codeFrom = (error) =>
  KNOWN_ERRORS.find((code) => String(error?.message ?? '').includes(code));

async function invoke(name, body) {
  const supabase = await getSupabase();
  const { data, error } = await supabase.functions.invoke(name, { body });
  if (!error) return data;
  let code;
  try {
    code = (await error.context?.json())?.error;
  } catch {
    // network failure or empty body: reported as 'unknown'
  }
  return fail(code);
}

const real = {
  /** { 'YYYY-MM-DD': 'pending' | 'unavailable' } for days that are not free. */
  async fetchCalendar(from, to) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.rpc('get_calendar', { p_from: from, p_to: to });
    if (error) fail(codeFrom(error));
    return Object.fromEntries(data.map((row) => [row.day, row.status]));
  },

  /** payload: { day, name, email, phone, venue, bookingType, message, language, website } */
  requestBooking: (payload) => invoke('booking-request', payload),

  async getSession() {
    const supabase = await getSupabase();
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  /** Returns an unsubscribe function right away, even though the client loads asynchronously. */
  onAuthChange(callback) {
    let unsubscribe = () => {};
    let cancelled = false;
    getSupabase().then((supabase) => {
      if (cancelled) return;
      const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
      unsubscribe = () => data.subscription.unsubscribe();
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  },

  async sendLoginLink(email, redirectTo) {
    const supabase = await getSupabase();
    // shouldCreateUser: false, so only the account created by hand can ever get a link.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: redirectTo },
    });
    if (error?.status === 429) fail('rate_limited');
    // Any other error (such as an unknown address) is deliberately not revealed.
  },

  async confirmLogin(tokenHash, type) {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    if (error) fail('link_expired');
  },

  async signOut() {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
  },

  async isAdmin() {
    const supabase = await getSupabase();
    const { data, error } = await supabase.rpc('is_admin');
    if (error) fail(codeFrom(error));
    return data === true;
  },

  /** Blocked days and requests from 90 days ago onwards. */
  async fetchAdminData() {
    const supabase = await getSupabase();
    const since = addDays(todayIso(), -90);
    const [blocked, requests] = await Promise.all([
      supabase.from('blocked_days').select('day, note').gte('day', since).order('day'),
      supabase.from('booking_requests').select('*').gte('day', since).order('day'),
    ]);
    if (blocked.error || requests.error) fail(codeFrom(blocked.error || requests.error));
    return { blocked: blocked.data, requests: requests.data };
  },

  /** decision: 'confirmed' | 'declined' | 'cancelled' */
  decideRequest: (id, decision) => invoke('booking-decide', { id, decision }),

  /** Returns how many days changed. Days holding a request are never blocked. */
  async setDaysBlocked(from, to, blocked, note = null) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.rpc('set_days_blocked', {
      p_from: from,
      p_to: to,
      p_blocked: blocked,
      p_note: note,
    });
    if (error) fail(codeFrom(error));
    return data;
  },
};

// ── development stand-in ──────────────────────────────────────────────────

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
const inDays = (n) => new Date(Date.now() + n * 86_400_000).toISOString();

function createMock() {
  const today = todayIso();
  const blocked = new Set([addDays(today, 8), addDays(today, 9), addDays(today, 26)]);
  const requests = [
    {
      id: 'mock-1',
      day: addDays(today, 5),
      status: 'pending',
      name: 'Camille Durand',
      email: 'camille@example.com',
      phone: '+32 470 12 34 56',
      venue: 'Bruxelles, notre salon',
      booking_type: 'house',
      message: 'Pour un anniversaire, une trentaine d’invités.',
      language: 'fr',
      created_at: inDays(-2),
      expires_at: inDays(5),
    },
    {
      id: 'mock-2',
      day: addDays(today, 19),
      status: 'pending',
      name: 'Tom Peeters',
      email: 'tom@example.com',
      phone: '+32 488 00 11 22',
      venue: 'Gent, a small gallery',
      booking_type: 'venue',
      message: 'Opening night for an exhibition.',
      language: 'en',
      created_at: inDays(-6),
      expires_at: inDays(1),
    },
    {
      id: 'mock-3',
      day: addDays(today, 12),
      status: 'confirmed',
      name: 'Léa Martin',
      email: 'lea@example.com',
      phone: '+33 6 12 34 56 78',
      venue: 'Lille, chapelle',
      booking_type: 'venue',
      message: null,
      language: 'fr',
      created_at: inDays(-10),
      expires_at: inDays(-3),
      decided_at: inDays(-8),
    },
  ];
  const live = (r) =>
    r.status === 'confirmed' || (r.status === 'pending' && new Date(r.expires_at) > new Date());

  return {
    async fetchCalendar(from, to) {
      await wait();
      const days = {};
      for (const day of blocked) if (day >= from && day <= to) days[day] = 'unavailable';
      for (const r of requests) {
        if (live(r) && r.day >= from && r.day <= to && !blocked.has(r.day)) {
          days[r.day] = r.status === 'confirmed' ? 'unavailable' : 'pending';
        }
      }
      return days;
    },
    async requestBooking({ bookingType, website, ...rest }) {
      await wait(700);
      if (blocked.has(rest.day)) fail('day_unavailable');
      if (requests.some((r) => r.day === rest.day && live(r))) fail('day_taken');
      const row = {
        ...rest,
        id: `mock-${Date.now()}`,
        status: 'pending',
        booking_type: bookingType,
        created_at: inDays(0),
        expires_at: inDays(7),
      };
      requests.push(row);
      return { day: row.day, expiresAt: row.expires_at };
    },
    getSession: async () => ({ user: { email: 'admin@example.com' } }),
    onAuthChange: () => () => {},
    sendLoginLink: () => wait(),
    confirmLogin: () => wait(),
    signOut: async () => {},
    isAdmin: async () => true,
    async fetchAdminData() {
      await wait();
      return {
        blocked: [...blocked].sort().map((day) => ({ day, note: null })),
        requests: requests.map((r) => ({ ...r })),
      };
    },
    async decideRequest(id, decision) {
      await wait();
      const r = requests.find((x) => x.id === id);
      if (!r) fail('not_found');
      const allowed =
        (r.status === 'pending' && ['confirmed', 'declined'].includes(decision)) ||
        (r.status === 'confirmed' && decision === 'cancelled');
      if (!allowed) fail('invalid_transition');
      Object.assign(r, { status: decision, decided_at: inDays(0) });
      return { ...r };
    },
    async setDaysBlocked(from, to, isBlocked) {
      await wait();
      let changed = 0;
      for (let day = from; day <= to; day = addDays(day, 1)) {
        if (!isBlocked) {
          if (blocked.delete(day)) changed += 1;
        } else if (!blocked.has(day) && !requests.some((r) => r.day === day && live(r))) {
          blocked.add(day);
          changed += 1;
        }
      }
      return changed;
    },
  };
}

// `npm run dev:mock` starts Vite in "mock" mode; a production build never is.
const mockEnabled = import.meta.env.DEV && import.meta.env.MODE === 'mock';

/** Null when there is no backend: the booking page then offers only "send a message". */
export const bookingApi = mockEnabled ? createMock() : isSupabaseConfigured ? real : null;
