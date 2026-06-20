/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** VAPID public key used to subscribe the browser to Web Push. */
  readonly VITE_VAPID_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
