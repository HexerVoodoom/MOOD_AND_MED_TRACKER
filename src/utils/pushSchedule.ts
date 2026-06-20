// Builds the reminder schedule that is sent to the server so it can deliver
// Web Push notifications at the right time, even while the app is closed.

export interface ReminderTime {
  /** Stable id, e.g. "mood-morning" or "<medId>-08:00". */
  id: string;
  /** Local time "HH:MM" the reminder should fire. */
  time: string;
  title: string;
  body: string;
}

export interface PushSchedule {
  /** IANA timezone, e.g. "America/Sao_Paulo". */
  timezone: string;
  reminders: ReminderTime[];
}

interface NotificationReminderSetting {
  active?: boolean;
  time?: string;
}

interface MedicationLike {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  doseTimes?: string[];
}

interface NotificationSettingsLike {
  morning?: NotificationReminderSetting;
  afternoon?: NotificationReminderSetting;
  night?: NotificationReminderSetting;
  medication?: { active?: boolean };
}

const MOOD_REMINDERS: Array<{
  key: 'morning' | 'afternoon' | 'night';
  id: string;
  title: string;
  body: string;
}> = [
  { key: 'morning', id: 'mood-morning', title: 'Bom dia!', body: 'Como você está se sentindo hoje?' },
  { key: 'afternoon', id: 'mood-afternoon', title: 'Boa tarde!', body: 'Não esqueça de registrar seu humor.' },
  { key: 'night', id: 'mood-night', title: 'Boa noite!', body: 'Como foi o seu dia? Registre agora.' },
];

/** Translates the app's notification settings + medications into a server schedule. */
export function buildPushSchedule(
  notificationSettings: NotificationSettingsLike,
  medications: MedicationLike[]
): PushSchedule {
  const reminders: ReminderTime[] = [];

  for (const { key, id, title, body } of MOOD_REMINDERS) {
    const setting = notificationSettings[key];
    if (setting?.active && setting.time) {
      reminders.push({ id, time: setting.time, title, body });
    }
  }

  if (notificationSettings.medication?.active !== false) {
    for (const med of medications) {
      for (const time of med.doseTimes ?? []) {
        reminders.push({
          id: `${med.id}-${time}`,
          time,
          title: 'Hora do medicamento',
          body: `Tomar ${med.name} (${med.quantity} ${med.unit})`,
        });
      }
    }
  }

  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  return { timezone, reminders };
}
