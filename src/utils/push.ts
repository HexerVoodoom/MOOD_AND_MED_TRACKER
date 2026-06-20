// Client-side Web Push helpers: subscribe the browser, and sync the reminder
// schedule with the Supabase Edge Function that actually sends the pushes.

import { projectId, publicAnonKey } from './supabase/info';
import type { PushSchedule } from './pushSchedule';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-665d12ed`;
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY ?? '';

export function isPushSupported(): boolean {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

// VAPID keys are base64url; the subscribe API needs a Uint8Array.
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}

async function authedFetch(path: string, body: unknown): Promise<Response> {
  return fetch(`${SERVER_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify(body),
  });
}

/**
 * Requests permission, subscribes to Web Push and registers the subscription
 * (plus schedule) with the server. Returns true on success.
 */
export async function enablePush(schedule: PushSchedule): Promise<boolean> {
  if (!isPushSupported()) {
    console.warn('[push] Web Push is not supported in this browser.');
    return false;
  }
  if (!VAPID_PUBLIC_KEY) {
    console.warn('[push] Missing VITE_VAPID_PUBLIC_KEY; cannot subscribe.');
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  const registration = await navigator.serviceWorker.ready;
  const subscription =
    (await registration.pushManager.getSubscription()) ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
    }));

  const res = await authedFetch('/push/subscribe', { subscription, schedule });
  if (!res.ok) {
    console.error('[push] Failed to register subscription:', res.status);
    return false;
  }
  return true;
}

/** Pushes an updated schedule to the server for the current subscription. */
export async function syncSchedule(schedule: PushSchedule): Promise<boolean> {
  if (!isPushSupported()) return false;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return false;

  const res = await authedFetch('/push/subscribe', { subscription, schedule });
  return res.ok;
}

/** Unsubscribes locally and tells the server to drop the subscription. */
export async function disablePush(): Promise<boolean> {
  if (!isPushSupported()) return false;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return true;

  await authedFetch('/push/unsubscribe', { endpoint: subscription.endpoint });
  await subscription.unsubscribe();
  return true;
}

/** Whether the browser currently holds an active push subscription. */
export async function hasActiveSubscription(): Promise<boolean> {
  if (!isPushSupported()) return false;
  const registration = await navigator.serviceWorker.ready;
  return (await registration.pushManager.getSubscription()) !== null;
}

/** Triggers an immediate test notification via the server. */
export async function sendTestPush(): Promise<boolean> {
  if (!isPushSupported()) return false;
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  if (!subscription) return false;

  const res = await authedFetch('/push/test', { endpoint: subscription.endpoint });
  return res.ok;
}
