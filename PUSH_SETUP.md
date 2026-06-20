# Web Push setup (server-delivered reminders)

This app can deliver mood and medication reminders via **Web Push**, so they
fire even when the app is closed. Delivery is done by the Supabase Edge Function
in `src/supabase/functions/server/`, triggered every minute by a scheduled job.

Because real Web Push requires a server to send the messages with a private
VAPID key, the steps below run in **your** Supabase project — they cannot be
performed from the frontend alone.

## 1. Generate VAPID keys

```bash
npx web-push generate-vapid-keys
```

This prints a `Public Key` and a `Private Key`.

## 2. Configure the frontend

Copy `.env.example` to `.env` and set the **public** key:

```
VITE_VAPID_PUBLIC_KEY=<public key>
```

Rebuild/redeploy the frontend so the key is bundled.

## 3. Configure the Edge Function secrets

Set the keys as secrets on the function (never commit the private key):

```bash
supabase secrets set \
  VAPID_PUBLIC_KEY=<public key> \
  VAPID_PRIVATE_KEY=<private key> \
  VAPID_SUBJECT=mailto:you@example.com
```

## 4. Deploy the Edge Function

```bash
supabase functions deploy make-server-665d12ed
```

The function exposes (under `/functions/v1/make-server-665d12ed`):

| Route              | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `POST /push/subscribe`   | Store a subscription + its reminder schedule  |
| `POST /push/unsubscribe` | Remove a subscription                         |
| `POST /push/test`        | Send an immediate test notification           |
| `POST /push/send-due`    | Cron entry point: deliver all due reminders   |

## 5. Schedule the cron (every minute)

Using Supabase scheduled jobs (pg_cron + pg_net). Replace the URL/key:

```sql
select cron.schedule(
  'push-send-due',
  '* * * * *',
  $$
  select net.http_post(
    url     := 'https://<PROJECT_REF>.supabase.co/functions/v1/make-server-665d12ed/push/send-due',
    headers := '{"Content-Type":"application/json","Authorization":"Bearer <SERVICE_ROLE_OR_ANON_KEY>"}'::jsonb,
    body    := '{}'::jsonb
  );
  $$
);
```

> Notifications are de-duplicated per reminder per day, and only fire within a
> 120-minute catch-up window so a late subscription does not replay the whole
> day. Expired subscriptions (HTTP 404/410) are removed automatically.

## 6. Use it

In the app: **Configurações → Notificações → Em segundo plano**, toggle
"Receber lembretes com o app fechado" and accept the permission prompt. The app
syncs the schedule whenever reminder times or medications change.
