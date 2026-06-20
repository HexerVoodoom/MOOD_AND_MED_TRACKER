import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import webpush from "npm:web-push@3.6.7";
import * as kv from "./kv_store.tsx";
const app = new Hono();

const PREFIX = "/make-server-665d12ed";
const SUB_PREFIX = "push_sub:";
// Only fire reminders that came due within this catch-up window (minutes), so a
// subscription created late in the day doesn't replay every past reminder.
const CATCH_UP_WINDOW_MIN = 120;

// Configure VAPID once (keys provided via Edge Function secrets).
const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY") ?? "";
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY") ?? "";
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") ?? "mailto:admin@example.com";
if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

interface ReminderTime {
  id: string;
  time: string; // "HH:MM"
  title: string;
  body: string;
}
interface PushSchedule {
  timezone: string;
  reminders: ReminderTime[];
}
interface SubRecord {
  subscription: { endpoint: string; keys: { p256dh: string; auth: string } };
  schedule: PushSchedule;
  sent: Record<string, string>; // reminderId -> "YYYY-MM-DD"
  updatedAt: string;
}

const subKey = (endpoint: string) => `${SUB_PREFIX}${endpoint}`;

// Current { date: "YYYY-MM-DD", minutes } in a given IANA timezone.
function nowInTimezone(timezone: string): { date: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone || "UTC",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  const hour = parseInt(get("hour"), 10) % 24;
  const minute = parseInt(get("minute"), 10);
  return { date: `${get("year")}-${get("month")}-${get("day")}`, minutes: hour * 60 + minute };
}

async function deliver(record: SubRecord, payload: object): Promise<"ok" | "gone" | "error"> {
  try {
    await webpush.sendNotification(record.subscription, JSON.stringify(payload));
    return "ok";
  } catch (err: any) {
    const status = err?.statusCode;
    if (status === 404 || status === 410) return "gone"; // expired/unsubscribed
    console.error("[push] send error:", status, err?.message);
    return "error";
  }
}

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-665d12ed/health", (c) => {
  return c.json({ status: "ok" });
});

// Register (or update) a push subscription together with its reminder schedule.
app.post(`${PREFIX}/push/subscribe`, async (c) => {
  const body = await c.req.json().catch(() => null);
  const subscription = body?.subscription;
  const schedule = body?.schedule;
  if (!subscription?.endpoint || !schedule?.reminders) {
    return c.json({ error: "Missing subscription or schedule" }, 400);
  }

  const key = subKey(subscription.endpoint);
  const existing = (await kv.get(key)) as SubRecord | null;
  const record: SubRecord = {
    subscription,
    schedule,
    sent: existing?.sent ?? {},
    updatedAt: new Date().toISOString(),
  };
  await kv.set(key, record);
  return c.json({ status: "ok", reminders: schedule.reminders.length });
});

// Remove a push subscription.
app.post(`${PREFIX}/push/unsubscribe`, async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body?.endpoint) return c.json({ error: "Missing endpoint" }, 400);
  await kv.del(subKey(body.endpoint));
  return c.json({ status: "ok" });
});

// Send an immediate test notification to a single subscription.
app.post(`${PREFIX}/push/test`, async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body?.endpoint) return c.json({ error: "Missing endpoint" }, 400);
  const record = (await kv.get(subKey(body.endpoint))) as SubRecord | null;
  if (!record) return c.json({ error: "Subscription not found" }, 404);

  const result = await deliver(record, {
    title: "Notificações ativadas ✅",
    body: "Você receberá seus lembretes mesmo com o app fechado.",
    tag: "test",
    url: "/",
  });
  if (result === "gone") await kv.del(subKey(body.endpoint));
  return c.json({ status: result });
});

// Cron entry point: deliver every reminder that is currently due.
// Intended to be called every minute by a Supabase scheduled job.
app.post(`${PREFIX}/push/send-due`, async (c) => {
  const records = (await kv.getByPrefix(SUB_PREFIX)) as SubRecord[];
  let sentCount = 0;
  let removed = 0;

  for (const record of records) {
    if (!record?.subscription?.endpoint || !record?.schedule) continue;
    const { date, minutes } = nowInTimezone(record.schedule.timezone);
    let mutated = false;
    let gone = false;

    for (const reminder of record.schedule.reminders) {
      if (gone) break;
      const [h, m] = reminder.time.split(":").map(Number);
      const reminderMinutes = h * 60 + m;
      const due = minutes >= reminderMinutes && minutes - reminderMinutes <= CATCH_UP_WINDOW_MIN;
      if (!due) continue;
      if (record.sent[reminder.id] === date) continue; // already sent today

      const result = await deliver(record, {
        title: reminder.title,
        body: reminder.body,
        tag: reminder.id,
        url: "/",
      });
      if (result === "ok") {
        record.sent[reminder.id] = date;
        mutated = true;
        sentCount++;
      } else if (result === "gone") {
        gone = true;
      }
    }

    if (gone) {
      await kv.del(subKey(record.subscription.endpoint));
      removed++;
    } else if (mutated) {
      await kv.set(subKey(record.subscription.endpoint), record);
    }
  }

  return c.json({ status: "ok", sent: sentCount, removed, subscriptions: records.length });
});

Deno.serve(app.fetch);