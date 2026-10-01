import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageToggle from '../components/LanguageToggle';
import { useI18n } from '../i18n/context';
import { bookingApi } from '../lib/bookingApi';

/**
 * Target of the password reset email. Supabase sends the link with the tokens in
 * the URL fragment and the client picks them up on load, leaving a recovery
 * session behind: `ready` only once that session is there.
 */
export default function ResetPassword() {
  const { t } = useI18n();
  const copy = t.admin.reset;
  const [ready, setReady] = useState(undefined);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [state, setState] = useState('idle');

  useEffect(() => {
    if (!bookingApi) {
      setReady(false);
      return undefined;
    }
    let active = true;
    const stop = bookingApi.onAuthChange((session) => {
      if (active) setReady(Boolean(session));
    });
    bookingApi.getSession().then((s) => active && setReady(Boolean(s)));
    return () => {
      active = false;
      stop();
    };
  }, []);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 8) return setState('tooShort');
    if (password !== confirm) return setState('mismatch');
    setState('sending');
    try {
      await bookingApi.updatePassword(password);
      setPassword('');
      setConfirm('');
      setState('done');
    } catch {
      setState('failed');
    }
  };

  let body;
  if (!bookingApi || state === 'done') {
    body = (
      <p className="form__status" role="status">
        {state === 'done' ? copy.done : copy.invalidLink}
      </p>
    );
  } else if (ready === undefined) {
    body = <p className="admin__loading">…</p>;
  } else if (!ready) {
    body = (
      <p className="form__status is-error" role="alert">
        {copy.invalidLink}
      </p>
    );
  } else {
    body = (
      <form className="form" onSubmit={submit}>
        <label className="field">
          {copy.password}
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="field">
          {copy.confirm}
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
        <button type="submit" className="btn btn--block" disabled={state === 'sending'}>
          {state === 'sending' ? copy.sending : copy.submit}
        </button>
        {state === 'mismatch' && (
          <p className="form__status is-error" role="alert">
            {copy.mismatch}
          </p>
        )}
        {state === 'tooShort' && (
          <p className="form__status is-error" role="alert">
            {copy.tooShort}
          </p>
        )}
        {state === 'failed' && (
          <p className="form__status is-error" role="alert">
            {copy.failed}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="shell admin__bar-inner">
          <Link to="/" className="wordmark wordmark--sm">
            GIAM
          </Link>
          <div className="admin__bar-actions">
            <LanguageToggle />
            <Link to="/admin" className="btn-outline btn-outline--sm">
              {t.admin.backToSite}
            </Link>
          </div>
        </div>
      </header>
      <main className="shell admin__main">
        <section className="admin__card">
          <div className="eyebrow">{t.admin.eyebrow}</div>
          <h1 className="display admin__title">{copy.title}</h1>
          <p className="admin__lede">{copy.lede}</p>
          {body}
        </section>
      </main>
    </div>
  );
}