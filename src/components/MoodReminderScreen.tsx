import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from './Button';

interface MoodReminderScreenProps {
  onFinish: () => void;
}

export function MoodReminderScreen({ onFinish }: MoodReminderScreenProps) {
  const [morningTime, setMorningTime] = useState('09:00');
  const [afternoonTime, setAfternoonTime] = useState('15:00');
  const [nightTime, setNightTime] = useState('21:00');
  
  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Header */}
      <div className="mt-16 mb-12">
        <h1 className="mb-2">Quando devemos lembrá-lo de registrar seu humor?</h1>
      </div>
      
      {/* Time Pickers */}
      <div className="flex-1 space-y-6">
        {/* Morning */}
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[rgb(var(--color-primary))]" />
              <h3>Manhã</h3>
            </div>
            <input
              type="time"
              value={morningTime}
              onChange={(e) => setMorningTime(e.target.value)}
              className="px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[44px]"
            />
          </div>
        </div>
        
        {/* Afternoon */}
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[rgb(var(--color-primary))]" />
              <h3>Tarde</h3>
            </div>
            <input
              type="time"
              value={afternoonTime}
              onChange={(e) => setAfternoonTime(e.target.value)}
              className="px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[44px]"
            />
          </div>
        </div>
        
        {/* Night */}
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[rgb(var(--color-primary))]" />
              <h3>Noite</h3>
            </div>
            <input
              type="time"
              value={nightTime}
              onChange={(e) => setNightTime(e.target.value)}
              className="px-4 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[44px]"
            />
          </div>
        </div>
        
        <small className="text-[rgb(var(--color-text-secondary))] block text-center">
          Você pode ajustar isso depois nas configurações.
        </small>
      </div>
      
      {/* Finish Button */}
      <div className="mt-8">
        <Button onClick={onFinish} fullWidth size="large">
          Concluir
        </Button>
      </div>
    </div>
  );
}