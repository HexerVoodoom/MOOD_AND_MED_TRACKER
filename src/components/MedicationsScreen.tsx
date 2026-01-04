import React from 'react';
import { Plus } from 'lucide-react';
import { PillVisualization } from './PillVisualization';

interface Medication {
  id: string;
  name: string;
  nextDose: string;
  adherence: number;
  last7Days: boolean[];
  pill?: {
    shape: 'capsule' | 'round' | 'square' | 'triangular';
    size: 'S' | 'M' | 'L';
    color1: string;
    color2: string;
  };
}

interface MedicationsScreenProps {
  medications: Medication[];
  onAddMedication: () => void;
  onEditMedication: (id: string) => void;
}

export function MedicationsScreen({ medications, onAddMedication, onEditMedication }: MedicationsScreenProps) {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <h1>Seus Medicamentos</h1>
        <button 
          onClick={onAddMedication}
          className="w-11 h-11 rounded-full bg-[rgb(var(--color-primary))] hover:bg-[rgb(var(--color-primary-dark))] flex items-center justify-center transition-colors"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Medications List */}
      {medications.length === 0 ? (
        <div className="px-6 text-center mt-16">
          <div className="w-24 h-24 rounded-full bg-[rgb(var(--color-surface))] flex items-center justify-center mx-auto mb-4">
            <Plus className="w-12 h-12 text-[rgb(var(--color-gray-400))]" />
          </div>
          <h2 className="mb-2">Nenhum medicamento ainda</h2>
          <p className="text-[rgb(var(--color-text-secondary))] mb-6">
            Adicione seu primeiro medicamento para começar a monitorar a aderência.
          </p>
          <button
            onClick={onAddMedication}
            className="text-[rgb(var(--color-primary))] hover:underline"
          >
            Adicionar Medicamento
          </button>
        </div>
      ) : (
        <div className="px-6 space-y-4">
          {medications.map((med) => (
            <button
              key={med.id}
              onClick={() => onEditMedication(med.id)}
              className="w-full bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-primary))] transition-colors text-left"
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Pill Visualization */}
                {med.pill && (
                  <div className="w-16 h-16 rounded-xl bg-white border border-[rgb(var(--color-border))] flex items-center justify-center flex-shrink-0">
                    <PillVisualization 
                      shape={med.pill.shape}
                      size="S"
                      color1={med.pill.color1}
                      color2={med.pill.color2}
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="mb-1">{med.name}</h3>
                  <p className="text-[rgb(var(--color-text-secondary))]">
                    Próxima dose: {med.nextDose}
                  </p>
                </div>
                
                <div className="relative w-14 h-14 flex-shrink-0">
                  <svg className="transform -rotate-90 w-14 h-14">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="rgb(var(--color-gray-200))"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="rgb(var(--color-primary))"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - med.adherence / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs">{med.adherence}%</span>
                  </div>
                </div>
              </div>
              
              {/* Last 7 Days Indicator */}
              <div className="flex items-center gap-2">
                <small className="text-[rgb(var(--color-text-secondary))] mr-2">Últimos 7 dias:</small>
                {med.last7Days.map((taken, index) => (
                  <div 
                    key={index}
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      taken 
                        ? 'bg-[rgb(var(--color-primary))]' 
                        : 'bg-[rgb(var(--color-gray-200))]'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${taken ? 'bg-white' : 'bg-[rgb(var(--color-gray-400))]'}`} />
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}