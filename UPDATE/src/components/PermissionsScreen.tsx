import React, { useState } from 'react';
import { Bell, MapPin } from 'lucide-react';
import { Button } from './Button';

interface PermissionsScreenProps {
  onContinue: () => void;
}

export function PermissionsScreen({ onContinue }: PermissionsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  
  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Header */}
      <div className="mt-16 mb-12">
        <h1 className="mb-2">Permissões Necessárias</h1>
      </div>
      
      {/* Permission Cards */}
      <div className="flex-1 space-y-4">
        {/* Notifications Card */}
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[rgb(var(--color-primary))] flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2">Notificações</h3>
              <p className="text-[rgb(var(--color-text-secondary))] mb-4">
                Usamos notificações para lembrá-lo sobre registros de humor e horários de medicação.
              </p>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="mt-8">
        <Button onClick={onContinue} fullWidth size="large">
          Continuar
        </Button>
      </div>
    </div>
  );
}