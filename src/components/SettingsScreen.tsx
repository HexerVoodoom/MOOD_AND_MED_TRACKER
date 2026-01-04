import React, { useState } from 'react';
import { ChevronLeft, Clock, Bell, MapPin, Info, Candy, Wheat, Wine, Coffee, CloudSun } from 'lucide-react';
import { Button } from './Button';

interface SettingsScreenProps {
  onBack: () => void;
  activeDietaryTrackers: {
    sugar: boolean;
    gluten: boolean;
    alcohol: boolean;
    caffeine: boolean;
  };
  onDietaryTrackersChange: (trackers: {
    sugar: boolean;
    gluten: boolean;
    alcohol: boolean;
    caffeine: boolean;
  }) => void;
  trackWeatherTime: boolean;
  onTrackWeatherTimeChange: (value: boolean) => void;
}

export function SettingsScreen({ onBack, activeDietaryTrackers, onDietaryTrackersChange, trackWeatherTime, onTrackWeatherTimeChange }: SettingsScreenProps) {
  const [morningTime, setMorningTime] = useState('09:00');
  const [afternoonTime, setAfternoonTime] = useState('15:00');
  const [nightTime, setNightTime] = useState('21:00');
  const [moodReminders, setMoodReminders] = useState(true);
  const [medicationReminders, setMedicationReminders] = useState(true);
  
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-6 flex items-center gap-4 border-b border-[rgb(var(--color-border))]">
        <button 
          onClick={onBack}
          className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>Configurações</h1>
      </div>
      
      <div className="p-6 space-y-8">
        {/* Mood Reminder Times */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-[rgb(var(--color-primary))]" />
            <h2>Horários de Lembrete de Humor</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <span>Manhã</span>
              <input
                type="time"
                value={morningTime}
                onChange={(e) => setMorningTime(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[44px]"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <span>Tarde</span>
              <input
                type="time"
                value={afternoonTime}
                onChange={(e) => setAfternoonTime(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[44px]"
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <span>Noite</span>
              <input
                type="time"
                value={nightTime}
                onChange={(e) => setNightTime(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[rgb(var(--color-border))] bg-white min-h-[44px]"
              />
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-[rgb(var(--color-primary))]" />
            <h2>Notificações</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <span>Lembretes de humor</span>
              <button
                onClick={() => setMoodReminders(!moodReminders)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  moodReminders ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    moodReminders ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <span>Lembretes de medicamento</span>
              <button
                onClick={() => setMedicationReminders(!medicationReminders)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  medicationReminders ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    medicationReminders ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* Dietary Trackers */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Candy className="w-5 h-5 text-[rgb(var(--color-primary))]" />
            <h2>Rastreadores Dietéticos</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <div className="flex items-center gap-3">
                <Candy className="w-5 h-5 text-gray-400" />
                <span>Rastreador de açúcar</span>
              </div>
              <button
                onClick={() => onDietaryTrackersChange({ ...activeDietaryTrackers, sugar: !activeDietaryTrackers.sugar })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  activeDietaryTrackers.sugar ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    activeDietaryTrackers.sugar ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <div className="flex items-center gap-3">
                <Wheat className="w-5 h-5 text-gray-400" />
                <span>Rastreador de glúten</span>
              </div>
              <button
                onClick={() => onDietaryTrackersChange({ ...activeDietaryTrackers, gluten: !activeDietaryTrackers.gluten })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  activeDietaryTrackers.gluten ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    activeDietaryTrackers.gluten ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <div className="flex items-center gap-3">
                <Wine className="w-5 h-5 text-gray-400" />
                <span>Rastreador de álcool</span>
              </div>
              <button
                onClick={() => onDietaryTrackersChange({ ...activeDietaryTrackers, alcohol: !activeDietaryTrackers.alcohol })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  activeDietaryTrackers.alcohol ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    activeDietaryTrackers.alcohol ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-gray-400" />
                <span>Rastreador de cafeína</span>
              </div>
              <button
                onClick={() => onDietaryTrackersChange({ ...activeDietaryTrackers, caffeine: !activeDietaryTrackers.caffeine })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  activeDietaryTrackers.caffeine ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    activeDietaryTrackers.caffeine ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* Weather & Location */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-[rgb(var(--color-primary))]" />
            <h2>Clima & Localização</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <div className="flex items-center gap-3">
                <CloudSun className="w-5 h-5 text-gray-400" />
                <span>Rastrear clima</span>
              </div>
              <button
                onClick={() => onTrackWeatherTimeChange(!trackWeatherTime)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  trackWeatherTime ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    trackWeatherTime ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-[rgb(var(--color-primary))]" />
            <h2>Sobre</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))]">
              <span className="text-[rgb(var(--color-text-secondary))]">Versão do aplicativo</span>
              <span>1.0.0</span>
            </div>
            
            <button className="w-full flex items-center justify-between p-4 bg-[rgb(var(--color-surface))] rounded-xl border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] transition-colors">
              <span>Política de Privacidade</span>
              <span className="text-[rgb(var(--color-text-secondary))]">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}