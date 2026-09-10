# Réservations : mise en place

Le calendrier s'appuie sur **Supabase** (base de données, connexion, Edge Functions) et
**EmailJS** (envoi des mails). Cette mise en place se fait une seule fois, dans l'ordre.

> Ne colle jamais une valeur secrète (clé `sb_secret_…`, clé privée EmailJS, `CRON_SECRET`)
> dans un chat, un commit ou le code du site. Elles vont uniquement dans les secrets Supabase.

## Comment ça marche

| Moment | Ce qui se passe |
|---|---|
| Un visiteur choisit une date libre et envoie le formulaire | La date passe en **orange** (option) pour tout le monde. Tu reçois un mail avec les coordonnées et deux boutons, le visiteur reçoit un accusé de réception. |
| Tu cliques sur « Accepter » ou « Refuser » dans le mail | Le tableau de bord s'ouvre sur la demande et te pose la question ; tu confirmes d'un clic. |
| Tu acceptes | La date passe en **rouge**, le visiteur reçoit une confirmation. |
| Tu refuses | La date redevient **verte**, le visiteur reçoit un mail poli. |
| 48 h avant la fin de l'option | Tu reçois un rappel. |
| 7 jours sans réponse | L'option expire, la date redevient verte, tu es prévenu par mail. |
| 12 mois après une demande | Elle est supprimée (RGPD). |

Garde-fous : une seule demande active par jour (garanti par la base), 3 demandes par visiteur
par 24 h, 2 options ouvertes par adresse e-mail, 10 demandes par jour sur tout le site.

## 1. Base de données

Supabase → **SQL Editor** → New query → colle tout le fichier
`supabase/migrations/20260910120000_booking_calendar.sql` → **Run**.

## 2. Ton compte admin

1. **Authentication → Sign In / Providers → Email** : désactive *Allow new users to sign up*.
2. **Authentication → Users → Add user → Create new user** : ton adresse, coche *Auto Confirm User*.
   Prends l'adresse de ton compte Supabase : sans serveur SMTP personnalisé, Supabase n'envoie
   les liens de connexion qu'aux membres de ton équipe.
3. **SQL Editor** :
   ```sql
   insert into public.admins (user_id) select id from auth.users where email = 'ton@adresse';
   ```
4. **Authentication → URL Configuration** :
   - *Site URL* : l'adresse du site sur Vercel
   - *Redirect URLs* : `https://<ton-site>/admin/confirm` et `http://localhost:5173/admin/confirm`
5. **Authentication → Emails → Magic Link** : remplace le lien du modèle par
   ```html
   <a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email">Se connecter</a>
   ```
   Gmail et Outlook ouvrent parfois les liens tout seuls pour les analyser, ce qui « use » un
   lien de connexion classique. Celui-ci ouvre une page avec un bouton.

## 3. EmailJS

1. **Email Templates → Create New Template**, nommé « Réservations » :
   - *Subject* : `{{subject}}`
   - *Content* (bouton « Edit Content » → mode code) : `{{{message_html}}}`
   - *To Email* : `{{to_email}}` · *Reply To* : `{{reply_to}}` · *From Name* : `Matteo.gm`
2. **Account → Security** : active *Allow EmailJS API for non-browser applications*.
3. Note l'ID du service, l'ID de ce template, ta *Public Key* et ta *Private Key*.

Le formulaire « Envoyer un message » continue d'utiliser ton template actuel.

## 4. Edge Functions

Depuis le dossier du projet :

```bash
npx supabase login
```

```bash
npx supabase link --project-ref hyrkkjbzvcdlnbpsowev
```

```bash
npx supabase functions deploy
```

Cela déploie les trois fonctions (`booking-request`, `booking-decide`, `booking-cron`) avec
les réglages de `supabase/config.toml`.

Crée ensuite le fichier `supabase/.env` (ignoré par git) :

```
SITE_URL=https://ton-site.vercel.app
ADMIN_EMAIL=ton@adresse
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=
CRON_SECRET=
IP_HASH_SALT=
```

Pour `CRON_SECRET` et `IP_HASH_SALT`, deux chaînes aléatoires différentes :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Puis :

```bash
npx supabase secrets set --env-file supabase/.env
```

Si une fonction répond *Missing secret SUPABASE_SERVICE_ROLE_KEY*, ajoute
`SERVICE_ROLE_KEY=` avec ta clé secrète (*Project Settings → API Keys*) et relance la commande.

## 5. Rappels et expirations (toutes les heures)

**SQL Editor**, en remplaçant `TON_CRON_SECRET` :

```sql
create extension if not exists pg_net;
select cron.schedule(
  'booking-cron',
  '0 * * * *',
  $$ select net.http_post(
       url := 'https://hyrkkjbzvcdlnbpsowev.supabase.co/functions/v1/booking-cron',
       headers := '{"Content-Type": "application/json", "x-cron-secret": "TON_CRON_SECRET"}'::jsonb,
       body := '{}'::jsonb
     ) $$
);
```

La suppression RGPD après 12 mois est déjà programmée par la migration.

## 6. Vercel

**Project Settings → Environment Variables** : ajoute `VITE_SUPABASE_URL` et
`VITE_SUPABASE_PUBLISHABLE_KEY` (valeurs dans `.env.local`), puis redéploie.
`vercel.json` fait déjà fonctionner les liens directs comme `/admin` ou `/book`.

## Tester en local

- **Sans backend** : `npm run dev:mock`. Faux calendrier, fausses demandes, et `/admin`
  ouvert sans connexion (uniquement en développement, jamais dans le site en ligne).
- **Avec Supabase** : `npm run dev`. Le calendrier lit la vraie base.
