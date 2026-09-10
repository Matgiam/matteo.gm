import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import LanguageToggle from '../components/LanguageToggle';
import { useI18n } from '../i18n/context';
import { bookingApi, BookingError } from '../lib/bookingApi';
import { addDays, fromIso, monthStart, toIso, todayIso } from '../lib/dates';

const RETURN_KEY = 'matteo.gm:admin-return';
const capitalise = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const localeOf = (lang) => (lang === 'fr' ? 'fr-FR' : 'en-GB');

// Remembers "?request=..." across the sign-in email, which may open in another tab.
function rememberReturn(search) {
  try {
    window.localStorage.setItem(RETURN_KEY, search);
  } catch {
    /* storage blocked: the dashboard simply opens without the request highlighted */
  }
}

function takeReturn() {
  try {
    const search = window.localStorage.getItem(RETURN_KEY) ?? '';
    window.localStorage.removeItem(RETURN_KEY);
    return search;
  } catch {
    return '';
  }
}

export default function Admin() {
  const { t } = useI18n();
  const copy = t.admin;
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const onConfirmPage = pathname.startsWith('/admin/confirm');

  const [session, setSession] = useState(undefined); // undefined while checking
  const [access, setAccess] = useState('unknown');

  // Keep the dashboard out of search engines.
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!bookingApi) return undefined;
    let active = true;
    bookingApi.getSession().then((s) => active && setSession(s ?? null));
    const stop = bookingApi.onAuthChange((s) => setSession(s ?? null));
    return () => {
      active = false;
      stop();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setAccess('unknown');
      return undefined;
    }
    let active = true;
    bookingApi
      .isAdmin()
      .then((ok) => active && setAccess(ok ? 'granted' : 'denied'))
      .catch(() => active && setAccess('denied'));
    return () => {
      active = false;
    };
  }, [session]);

  useEffect(() => {
    if (onConfirmPage && session) navigate(`/admin${takeReturn()}`, { replace: true });
  }, [onConfirmPage, session, navigate]);

  let body;
  if (!bookingApi) body = <p className="admin__loading">{copy.notConfigured}</p>;
  else if (onConfirmPage && !session) body = <ConfirmLogin />;
  else if (session === undefined || (session && access === 'unknown')) {
    body = <p className="admin__loading">…</p>;
  } else if (!session) body = <Login search={search} />;
  else if (access === 'denied') body = <p className="admin__loading">{copy.denied}</p>;
  else body = <Dashboard />;

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="shell admin__bar-inner">
          <Link to="/" className="wordmark wordmark--sm" title={copy.backToSite}>
            Matteo<span className="accent">.</span>gm
          </Link>
          <div className="admin__bar-actions">
            <LanguageToggle />
            {session && (
              <button
                type="button"
                className="btn-outline btn-outline--sm"
                onClick={() => bookingApi.signOut()}
              >
                {copy.signOut}
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="shell admin__main">{body}</main>
    </div>
  );
}

function Login({ search }) {
  const { t } = useI18n();
  const copy = t.admin;
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  useEffect(() => {
    if (search.includes('request=')) rememberReturn(search);
  }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      await bookingApi.sendLoginLink(email.trim(), `${window.location.origin}/admin/confirm`);
      setState('sent');
    } catch (err) {
      setState(err instanceof BookingError && err.code === 'rate_limited' ? 'rateLimited' : 'sent');
    }
  };

  return (
    <section className="admin__card">
      <div className="eyebrow">{copy.eyebrow}</div>
      <h1 className="display admin__title">{copy.login.title}</h1>
      <p className="admin__lede">{copy.login.lede}</p>
      <form className="form" onSubmit={submit}>
        <label className="field">
          {copy.login.email}
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn--block" disabled={state === 'sending'}>
          {state === 'sending' ? copy.login.sending : copy.login.submit}
        </button>
        {state === 'sent' && (
          <p className="form__status is-ok" role="status">
            {copy.login.sent}
          </p>
        )}
        {state === 'rateLimited' && (
          <p className="form__status is-error" role="status">
            {copy.login.rateLimited}
          </p>
        )}
      </form>
    </section>
  );
}

// The sign-in email links here. Signing in takes a click on purpose: mail scanners
// that open links on their own would otherwise use up the one-time link.
function ConfirmLogin() {
  const { t } = useI18n();
  const copy = t.admin;
  const [params] = useSearchParams();
  const tokenHash = params.get('token_hash');
  const [state, setState] = useState(tokenHash ? 'ready' : 'waiting');

  // Without token_hash (Supabase's default email), the session arrives in the URL by itself.
  useEffect(() => {
    if (state !== 'waiting') return undefined;
    const timer = setTimeout(() => setState('expired'), 5000);
    return () => clearTimeout(timer);
  }, [state]);

  const confirm = async () => {
    setState('working');
    try {
      await bookingApi.confirmLogin(tokenHash, params.get('type') ?? 'email');
    } catch {
      setState('expired');
    }
  };

  if (state === 'waiting') return <p className="admin__loading">{copy.confirm.working}</p>;

  return (
    <section className="admin__card">
      <div className="eyebrow">{copy.eyebrow}</div>
      <h1 className="display admin__title">{copy.confirm.title}</h1>
      {state === 'expired' ? (
        <>
          <p className="admin__lede">{copy.confirm.expired}</p>
          <Link to="/admin" className="btn btn--block">
            {copy.confirm.newLink}
          </Link>
        </>
      ) : (
        <>
          <p className="admin__lede">{copy.confirm.lede}</p>
          <button
            type="button"
            className="btn btn--block"
            onClick={confirm}
            disabled={state === 'working'}
          >
            {state === 'working' ? copy.confirm.working : copy.confirm.submit}
          </button>
        </>
      )}
    </section>
  );
}

const isLive = (r) =>
  r.status === 'confirmed' || (r.status === 'pending' && new Date(r.expires_at) > new Date());

function Dashboard() {
  const { t } = useI18n();
  const copy = t.admin;
  const [params, setParams] = useSearchParams();
  const focusId = params.get('request');
  const focusAction = params.get('action');

  const today = todayIso();
  const [maxDate] = useState(() => {
    const now = fromIso(today);
    return toIso(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), 12));
  });
  const [month, setMonth] = useState(() => monthStart(today));
  const [data, setData] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [working, setWorking] = useState(false);
  const [notice, setNotice] = useState('');
  const [range, setRange] = useState({ from: '', to: '', note: '' });

  const load = useCallback(async () => {
    try {
      setData(await bookingApi.fetchAdminData());
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const requests = data?.requests ?? [];
  const liveByDay = useMemo(
    () => Object.fromEntries(requests.filter(isLive).map((r) => [r.day, r])),
    [requests],
  );

  const statuses = useMemo(() => {
    const map = {};
    for (const b of data?.blocked ?? []) map[b.day] = 'blocked';
    for (const r of Object.values(liveByDay))
      map[r.day] = r.status === 'confirmed' ? 'confirmed' : 'pending';
    return map;
  }, [data, liveByDay]);

  const focused = requests.find((r) => r.id === focusId);

  useEffect(() => {
    if (focused) {
      setMonth(monthStart(focused.day));
      document.getElementById(`request-${focused.id}`)?.scrollIntoView({ block: 'center' });
    }
  }, [focused?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const errorText = (err) => copy.requests.errors[err?.code] ?? copy.requests.errors.unknown;

  const onDay = async (day) => {
    const request = liveByDay[day];
    if (request) {
      setParams({ request: request.id });
      return;
    }
    setWorking(true);
    setNotice('');
    try {
      await bookingApi.setDaysBlocked(day, day, statuses[day] !== 'blocked');
      await load();
    } catch (err) {
      setNotice(errorText(err));
    } finally {
      setWorking(false);
    }
  };

  const applyRange = async (block) => {
    const [from, to] = [range.from, range.to].sort();
    setWorking(true);
    try {
      const count = await bookingApi.setDaysBlocked(from, to, block, range.note.trim() || null);
      setNotice(
        `${copy.dashboard.rangeDone(count)}${block ? ` ${copy.dashboard.rangeSkipped}` : ''}`,
      );
      await load();
    } catch (err) {
      setNotice(errorText(err));
    } finally {
      setWorking(false);
    }
  };

  const decide = async (id, decision) => {
    await bookingApi.decideRequest(id, decision);
    await load();
  };

  const byDay = (a, b) => a.day.localeCompare(b.day);
  const pending = requests.filter((r) => r.status === 'pending' && isLive(r)).sort(byDay);
  const upcoming = requests.filter((r) => r.status === 'confirmed' && r.day >= today).sort(byDay);
  const history = requests
    .filter((r) => !pending.includes(r) && !upcoming.includes(r))
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 20);

  const groups = [
    ['pending', pending],
    ['upcoming', upcoming],
    ['history', history],
  ];

  return (
    <div className="admin__dash">
      <div className="admin__head">
        <div>
          <div className="eyebrow">{copy.eyebrow}</div>
          <h1 className="display admin__title">{copy.dashboard.title}</h1>
        </div>
        <button type="button" className="btn-outline btn-outline--sm" onClick={load}>
          {copy.dashboard.refresh}
        </button>
      </div>

      {loadFailed && <p className="form__status is-error">{copy.dashboard.loadFailed}</p>}

      <div className="admin__grid">
        <section className="panel admin__calendar">
          <h2 className="admin__h2">{copy.dashboard.calendarTitle}</h2>
          <p className="book__lead">{copy.dashboard.calendarHint}</p>
          <BookingCalendar
            mode="admin"
            month={month}
            onMonthChange={setMonth}
            statuses={statuses}
            selected={focused?.day ?? null}
            onSelect={onDay}
            minDate={today}
            maxDate={maxDate}
            loading={!data || working}
          />

          <div className="admin__range">
            <h3 className="admin__h3">{copy.dashboard.rangeTitle}</h3>
            <div className="field-row">
              <label className="field">
                {copy.dashboard.from}
                <input
                  type="date"
                  min={today}
                  max={maxDate}
                  value={range.from}
                  onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
                />
              </label>
              <label className="field">
                {copy.dashboard.to}
                <input
                  type="date"
                  min={today}
                  max={maxDate}
                  value={range.to}
                  onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
                />
              </label>
            </div>
            <label className="field">
              {copy.dashboard.note}
              <input
                maxLength={200}
                value={range.note}
                onChange={(e) => setRange((r) => ({ ...r, note: e.target.value }))}
              />
            </label>
            <div className="req__actions">
              {[true, false].map((block) => (
                <button
                  key={String(block)}
                  type="button"
                  className={block ? 'btn btn--sm' : 'btn-outline btn-outline--sm'}
                  disabled={!range.from || !range.to || working}
                  onClick={() => applyRange(block)}
                >
                  {block ? copy.dashboard.block : copy.dashboard.unblock}
                </button>
              ))}
            </div>
            {notice && (
              <p className="form__status" role="status">
                {notice}
              </p>
            )}
          </div>
        </section>

        <div className="admin__requests">
          {groups.map(([key, items]) => (
            <section className="admin__group" key={key}>
              <h2 className="admin__group-title">
                {copy.requests[key]} <span className="admin__count">{items.length}</span>
              </h2>
              {items.length === 0 ? (
                <p className="admin__empty">{copy.requests.none}</p>
              ) : (
                items.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    focused={request.id === focusId}
                    initialAction={request.id === focusId ? focusAction : null}
                    onDecide={decide}
                  />
                ))
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function RequestCard({ request, focused, initialAction, onDecide }) {
  const { t, lang } = useI18n();
  const copy = t.admin.requests;
  const locale = localeOf(lang);

  const lapsed = request.status === 'pending' && new Date(request.expires_at) <= new Date();
  const status = lapsed ? 'expired' : request.status;
  const actions =
    status === 'pending' ? ['confirmed', 'declined'] : status === 'confirmed' ? ['cancelled'] : [];

  // A link from the email ("Accept" / "Decline") opens here with the question already asked.
  const [prompt, setPrompt] = useState(actions.includes(initialAction) ? initialAction : null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState(null);

  const day = capitalise(
    new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(fromIso(request.day)),
  );
  const received = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(request.created_at));

  const hoursLeft = (new Date(request.expires_at) - Date.now()) / 3_600_000;
  const relative = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const expires =
    hoursLeft >= 24
      ? relative.format(Math.round(hoursLeft / 24), 'day')
      : relative.format(Math.max(1, Math.round(hoursLeft)), 'hour');

  const run = async () => {
    setWorking(true);
    setError(null);
    try {
      await onDecide(request.id, prompt);
      setPrompt(null);
    } catch (err) {
      setError(err?.code ?? 'unknown');
    } finally {
      setWorking(false);
    }
  };

  return (
    <article id={`request-${request.id}`} className={`req${focused ? ' is-focused' : ''}`}>
      <div className="req__head">
        <h3 className="req__day">{day}</h3>
        <span className={`req__status req__status--${status}`}>{copy.statuses[status]}</span>
      </div>
      <p className="req__name">{request.name}</p>

      <dl className="req__details">
        <div>
          <dt>{copy.fields.phone}</dt>
          <dd>
            <a href={`tel:${request.phone.replace(/[^\d+]/g, '')}`}>{request.phone}</a>
          </dd>
        </div>
        <div>
          <dt>{copy.fields.email}</dt>
          <dd>
            <a href={`mailto:${request.email}`}>{request.email}</a>
          </dd>
        </div>
        {request.venue && (
          <div>
            <dt>{copy.fields.venue}</dt>
            <dd>{request.venue}</dd>
          </div>
        )}
        <div>
          <dt>{copy.fields.type}</dt>
          <dd>{t.book.types[request.booking_type] ?? request.booking_type}</dd>
        </div>
        <div>
          <dt>{copy.fields.language}</dt>
          <dd>{copy.languages[request.language] ?? request.language}</dd>
        </div>
      </dl>

      {request.message && <blockquote className="req__message">{request.message}</blockquote>}

      <p className="req__meta">
        {copy.received(received)}
        {status === 'pending' && ` · ${copy.expires(expires)}`}
      </p>

      {actions.length > 0 &&
        (prompt ? (
          <div className="req__confirm">
            <p>{copy.prompts[prompt]}</p>
            <div className="req__actions">
              <button type="button" className="btn btn--sm" onClick={run} disabled={working}>
                {copy.yes}
              </button>
              <button
                type="button"
                className="btn-outline btn-outline--sm"
                onClick={() => setPrompt(null)}
                disabled={working}
              >
                {copy.no}
              </button>
            </div>
          </div>
        ) : (
          <div className="req__actions">
            {actions.map((action) => (
              <button
                key={action}
                type="button"
                className={action === 'confirmed' ? 'btn btn--sm' : 'btn-outline btn-outline--sm'}
                onClick={() => setPrompt(action)}
              >
                {copy.actions[action]}
              </button>
            ))}
          </div>
        ))}

      {error && (
        <p className="form__status is-error" role="status">
          {copy.errors[error] ?? copy.errors.unknown}
        </p>
      )}
    </article>
  );
}
