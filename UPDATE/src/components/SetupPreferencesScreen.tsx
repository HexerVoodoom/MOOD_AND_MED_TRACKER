import React, { useState } from 'react';
import { Pill } from 'lucide-react';
import { Button } from './Button';

interface SetupPreferencesScreenProps {
  onContinue: (preferences: {
    trackMedication: boolean;
    trackWeatherTime: boolean;
    dietaryTrackers: {
      sugar: boolean;
      gluten: boolean;
      alcohol: boolean;
      caffeine: boolean;
    };
  }) => void;
}

export function SetupPreferencesScreen({ onContinue }: SetupPreferencesScreenProps) {
  const [trackMedication, setTrackMedication] = useState(true);
  
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8 mt-8">
        <h1 className="mb-3">Configurações de Medicação</h1>
        <p className="text-[rgb(var(--color-text-secondary))]">
          Você deseja monitorar seus medicamentos junto com seu humor?
        </p>
      </div>
      
      {/* Categories */}
      <div className="flex-1 space-y-4">
        {/* Medication */}
        <div
          className={`w-full rounded-3xl p-6 border-2 transition-all ${
            trackMedication
              ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/5'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
              trackMedication ? 'bg-[rgb(var(--color-primary))]' : 'bg-gray-100'
            }`}>
              <Pill className="w-7 h-7 text-white" />
            </div>
            
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between mb-2">
                <h3>Medicamentos</h3>
                <button
                  onClick={() => setTrackMedication(!trackMedication)}
                  className={`relative inline-flex h-[22px] w-[39px] items-center rounded-full transition-colors ${
                    trackMedication ? 'bg-[rgb(var(--color-primary))]' : 'bg-[#c5c5c5]'
                  }`}
                >
                  <span
                    className={`inline-block h-[17px] w-[17px] transform rounded-full bg-white transition-transform ${
                      trackMedication ? 'translate-x-[19px]' : 'translate-x-[2px]'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[rgb(var(--color-text-secondary))]">
                Registre doses e acompanhe sua aderência
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Button */}
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={() => onContinue({ 
            trackMedication, 
            trackWeatherTime: false, 
            dietaryTrackers: {
              sugar: false,
              gluten: false,
              alcohol: false,
              caffeine: false
            }
          })}
          className="w-full max-w-sm"
          size="large"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
