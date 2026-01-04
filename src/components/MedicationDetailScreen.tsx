import React, { useState } from 'react';
import { ChevronLeft, Trash2, Calendar } from 'lucide-react';
import { Button } from './Button';
import { PillVisualization } from './PillVisualization';

interface MedicationDetailScreenProps {
  medication: {
    id: string;
    name: string;
    nextDose: string;
    adherence: number;
    startDate: string;
    endDate?: string;
    daysTaken: number;
    last7Days: boolean[];
    doseTimes: string[];
    pill?: {
      shape: 'capsule' | 'round' | 'square' | 'triangular';
      size: 'S' | 'M' | 'L';
      color1: string;
      color2: string;
    };
  };
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

export function MedicationDetailScreen({ medication, onBack, onEdit, onDelete }: MedicationDetailScreenProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDelete = () => {
    onDelete(medication.id);
  };
  
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date.getDate();
  });
  
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-11 h-11 rounded-full hover:bg-[rgb(var(--color-gray-100))] flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1>Detalhes do Medicamento</h1>
        </div>
        
        <button 
          onClick={() => setShowDeleteConfirm(true)}
          className="w-11 h-11 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors"
        >
          <Trash2 className="w-6 h-6 text-red-500" />
        </button>
      </div>
      
      {/* Pill Visualization */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-8 border border-[rgb(var(--color-border))] flex flex-col items-center">
          {medication.pill && (
            <PillVisualization 
              shape={medication.pill.shape}
              size="L"
              color1={medication.pill.color1}
              color2={medication.pill.color2}
              className="mb-4"
            />
          )}
          <h2 className="text-center">{medication.name}</h2>
        </div>
      </div>
      
      {/* Treatment Info */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <h3 className="mb-4">Período de Tratamento</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
              <div>
                <small className="text-[rgb(var(--color-text-secondary))] block">Data de Início</small>
                <p>{medication.startDate}</p>
              </div>
            </div>
            
            {medication.endDate && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[rgb(var(--color-text-secondary))]" />
                <div>
                  <small className="text-[rgb(var(--color-text-secondary))] block">Data de Término</small>
                  <p>{medication.endDate}</p>
                </div>
              </div>
            )}
            
            <div className="pt-3 border-t border-[rgb(var(--color-border))]">
              <small className="text-[rgb(var(--color-text-secondary))] block mb-1">Dias Tomados</small>
              <p className="text-[rgb(var(--color-primary))]">{medication.daysTaken} dias</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Last 7 Days */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <h3 className="mb-4">Últimos 7 Dias</h3>
          
          <div className="flex justify-between">
            {medication.last7Days.map((taken, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <small className="text-[rgb(var(--color-text-secondary))]">{days[index]}</small>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    taken 
                      ? 'bg-[rgb(var(--color-primary))] text-white' 
                      : 'bg-[rgb(var(--color-gray-100))] text-[rgb(var(--color-text-secondary))]'
                  }`}
                >
                  <small>{dates[index]}</small>
                </div>
                <div className={`w-2 h-2 rounded-full ${taken ? 'bg-[rgb(var(--color-primary))]' : 'bg-[rgb(var(--color-gray-300))]'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dose Times */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <h3 className="mb-4">Horário Diário</h3>
          
          <div className="space-y-2">
            {medication.doseTimes.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[rgb(var(--color-border))]">
                <span>{time}</span>
                <span className="text-[rgb(var(--color-text-secondary))]">Dose {index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Adherence */}
      <div className="px-6 mb-6">
        <div className="bg-[rgb(var(--color-surface))] rounded-2xl p-6 border border-[rgb(var(--color-border))]">
          <div className="flex items-center justify-between mb-3">
            <h3>Adesão</h3>
            <span className="text-[rgb(var(--color-primary))]">{medication.adherence}%</span>
          </div>
          
          <div className="w-full h-3 bg-[rgb(var(--color-gray-100))] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[rgb(var(--color-primary))] rounded-full transition-all"
              style={{ width: `${medication.adherence}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Edit Button */}
      <div className="px-6">
        <Button onClick={onEdit} fullWidth size="large">
          Editar Medicamento
        </Button>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h2 className="mb-3">Excluir Medicamento?</h2>
            <p className="text-[rgb(var(--color-text-secondary))] mb-6">
              Tem certeza que deseja excluir {medication.name}? Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowDeleteConfirm(false)} 
                variant="secondary"
                fullWidth
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleDelete} 
                fullWidth
                className="bg-red-500 hover:bg-red-600"
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}